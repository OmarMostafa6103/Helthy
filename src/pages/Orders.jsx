import { useContext, useEffect, useState, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContextCore";
import { toast } from "react-toastify";
import axios from "axios";

const Orders = () => {
  const { t } = useTranslation();
  const { currency, isLoggedIn, backendUrl, navigate, isAuthChecked } =
    useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasShownAuthWarning = useRef(false);

  const showAuthWarning = useCallback(() => {
    if (hasShownAuthWarning.current) return;
    hasShownAuthWarning.current = true;
    toast.warn(
      <div>
        {t("orders.auth_expired")}
        <button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("userData");
            navigate("/login");
          }}
          className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
        >
          {t("orders.login")}
        </button>
      </div>,
      { autoClose: false }
    );
  }, [navigate, t]);

  useEffect(() => {
    const fetchOrders = async (retries = 3, delay = 1000) => {
      setIsLoading(true);
      setError(null);

      if (!isLoggedIn) {
        setIsLoading(false);
        toast.error(t("orders.login_required"));
        navigate("/login");
        return;
      }

      const token = localStorage.getItem("token");
      if (!token) {
        setIsLoading(false);
        setError(t("orders.no_token"));
        toast.error(t("orders.login_required"));
        navigate("/login");
        return;
      }

      try {
        for (let i = 0; i < retries; i++) {
          try {
            const response = await axios.get(`${backendUrl}/api/orders`, {
              headers: { Authorization: `Bearer ${token}` },
            });

            if (response.data.status === 200) {
              setOrderData(response.data.data || []);
              break;
            }
            throw new Error(response.data.message || t("orders.fetch_failed"));
          } catch (err) {
            console.error("Error fetching orders:", err);
            if (i === retries - 1) throw err;
            await new Promise((resolve) => setTimeout(resolve, delay));
          }
        }
      } catch (err) {
        console.error("Final error in fetchOrders:", err);
        setError(
          t("orders.fetch_error_with_reason", {
            message:
              err.response?.data?.message ||
              err.message ||
              t("orders.unknown_error"),
          })
        );
        toast.error(t("orders.fetch_error"));
        if (err.response?.status === 401 || err.response?.status === 422) {
          showAuthWarning();
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (!isAuthChecked) {
      const timer = setTimeout(() => fetchOrders(), 500);
      return () => clearTimeout(timer);
    }
    fetchOrders();
  }, [isLoggedIn, backendUrl, navigate, isAuthChecked, showAuthWarning, t]);

  return (
    <div className="border-t py-20">
      <div className="text-2xl">
        <Title text1={t("orders.title")} text2="" />
      </div>
      <div>
        {isLoading ? (
          <div className="w-full mt-20 flex flex-col justify-center items-center">
            <p className="font-medium mt-2 text-lg sm:text-2xl">
              {t("orders.loading")}
            </p>
          </div>
        ) : error ? (
          <div className="w-full mt-20 flex flex-col justify-center items-center">
            <p className="font-medium mt-2 text-lg sm:text-2xl text-red-500">
              {error}
            </p>
          </div>
        ) : orderData.length > 0 ? (
          orderData.map((order, index) => (
            <div
              key={index}
              className="py-4 border-t border-b flex flex-col md:flex-row md:items-center justify-between gap-3"
            >
              <div className="flex flex-col gap-4">
                {order.order_item && order.order_item.length > 0 ? (
                  order.order_item.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex gap-4">
                      <img
                        src={item.product_image || assets.placeholder_image}
                        alt={item.product_name}
                        className="w-28 h-28 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium">{item.product_name}</p>
                        <div>
                          <p>
                            {t("orders.price_label")} {currency}
                            {item.total_price}
                          </p>
                          <p>
                            {t("orders.quantity_label")} {item.quantity}
                          </p>
                        </div>
                        <p>
                          {t("orders.order_date_label")} {order.order_date}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>لا توجد منتجات في هذا الطلب</p>
                )}
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p
                    className={`min-w-2 h-2 rounded-full ${
                      order.order_status === "Delivered"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }`}
                  ></p>
                  <p className="text-sm md:text-base">{order.order_status}</p>
                </div>
                <button
                  onClick={() =>
                    toast.success(
                      t("orders.status_toast", { status: order.order_status })
                    )
                  }
                  className="border px-4 py-2 text-sm font-medium rounded-sm"
                >
                  {t("orders.track_button")}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full mt-20 flex flex-col justify-center items-center">
            <p className="font-medium mt-2 text-lg sm:text-2xl">
              {t("orders.no_orders")}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
