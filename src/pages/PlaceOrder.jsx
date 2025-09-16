// ? ========= Start API ===========
// ? ========= Start API ===========

// import React, { useContext, useState } from 'react';
// import Title from '../components/Title';
// import { ShopContext } from '../context/ShopContext';
// import { toast } from 'react-toastify';
// import axios from 'axios';
// import { backendUrl } from '../App';

// const PlaceOrder = () => {
//     const [method, setMethod] = useState('cod');
//     const [orderType, setOrderType] = useState('عادي');
//     const [showPromoInput, setShowPromoInput] = useState(false);
//     const [promoCode, setPromoCode] = useState('');
//     const {
//         navigate,
//         resetCart,
//         isLoggedIn,
//         cartData,
//         currency,
//         userData,
//         updateQuantity,
//         cartTotalPrice,
//     } = useContext(ShopContext);

//     const subtotal = cartTotalPrice;
//     const shippingFee = 100.0;
//     const giftWrappingFee = orderType === 'إهداء' ? 10.0 : 0.0;
//     const totalAmount = subtotal + shippingFee + giftWrappingFee;

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const form = e.target;
//         const isValid = form.checkValidity();

//         if (!isValid) {
//             form.reportValidity();
//             return;
//         }

//         if (!isLoggedIn) {
//             toast.error('يرجى تسجيل الدخول أولاً قبل إتمام الطلب.');
//             navigate('/login');
//             return;
//         }

//         if (cartData.length === 0) {
//             toast.error('سلة التسوق فارغة. يرجى إضافة منتجات قبل إتمام الطلب.');
//             return;
//         }

//         const orderData = {
//             user_id: userData?.id || 1,
//             user_first_name: form.firstName.value,
//             user_last_name: form.lastName.value,
//             phone: form.phone.value,
//             email: form.email.value,
//             city: form.city.value,
//             governorate: form.state.value,
//             address: form.address.value,
//             country: form.country.value,
//             postal_code: form.zipcode.value,
//             items: cartData.map((item) => ({
//                 product_id: item.product_id,
//                 quantity: item.quantity,
//                 price: item.product_price,
//             })),
//             payment_method:
//                 method === 'cod' ? 'Cash' : method.charAt(0).toUpperCase() + method.slice(1),
//             order_type: orderType,
//         };

//         try {
//             const token = localStorage.getItem('token');
//             if (!token) {
//                 throw new Error('No token found');
//             }

//             const response = await axios.post(`${backendUrl}/api/order`, orderData, {
//                 headers: { Authorization: `Bearer ${token}` },
//             });

//             if (response.data.status === 200) {
//                 toast.success('تم إتمام الطلب بنجاح!');
//                 resetCart();
//                 navigate('/orders');
//             } else {
//                 throw new Error(response.data.message || 'فشل إتمام الطلب');
//             }
//         } catch (error) {
//             if (error.response?.status === 401 || error.response?.status === 422) {
//                 toast.error('جلسة تسجيل الدخول منتهية، يرجى تسجيل الدخول مرة أخرى');
//                 localStorage.removeItem('token');
//                 localStorage.removeItem('userData');
//                 navigate('/login');
//             } else {
//                 toast.error(`فشل إتمام الطلب: ${error.response?.data?.message || error.message}`);
//             }
//         }
//     };

//     const applyPromoCode = () => {
//         if (promoCode) {
//             toast.success(`تم تطبيق كود الخصم: ${promoCode}`);
//         } else {
//             toast.error('يرجى إدخال كود خصم صالح');
//         }
//     };

//     const handleEditCart = () => {
//         navigate('/cart');
//     };

//     const handleRemoveItem = async (itemId) => {
//         try {
//             await updateQuantity(itemId, 0, true);
//             toast.success('تم إزالة المنتج من السلة');
//         } catch (error) {
//             toast.error('فشل إزالة المنتج من السلة');
//         }
//     };

//     return (
//         <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-6 text-right rtl dark:bg-[#121a2e]">
//             <form
//                 onSubmit={handleSubmit}
//                 className="space-y-8 bg-white dark:bg-[#1a2338] p-6 rounded-xl shadow-lg lg:order-2 order-1"
//             >
//                 <div className="text-xl sm:text-2xl my-3">
//                     <Title text1={'معلومات'} text2={'التوصيل'} />
//                 </div>

//                 <div className="space-y-4">
//                     <h2 className="text-xl font-bold border-b pb-2 dark:border-gray-600 dark:text-white">
//                         بيانات العميل
//                     </h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block mb-1 font-medium flex items-center gap-2 dark:text-white">
//                                 الاسم الأول <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                                 name="firstName"
//                                 type="text"
//                                 className="w-full border border-gray-500 bg-white dark:bg-[#121a2e] text-gray-600 dark:text-white rounded px-3 py-2 focus:ring-2 focus:ring-green-600"
//                                 placeholder="أدخل الاسم الأول"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block mb-1 font-medium flex items-center gap-2 dark:text-white">
//                                 الاسم الأخير <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                                 name="lastName"
//                                 type="text"
//                                 className="w-full border border-gray-500 bg-white dark:bg-[#121a2e] text-gray-600 dark:text-white rounded px-3 py-2 focus:ring-2 focus:ring-green-600"
//                                 placeholder="أدخل الاسم الأخير"
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block mb-1 font-medium flex items-center gap-2 dark:text-white">
//                                 رقم الهاتف <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                                 name="phone"
//                                 type="tel"
//                                 className="w-full border border-gray-500 bg-white dark:bg-[#121a2e] text-gray-600 dark:text-white rounded px-3 py-2 focus:ring-2 focus:ring-green-600"
//                                 placeholder="أدخل رقم الهاتف (مثال: +201234567890)"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block mb-1 font-medium flex items-center gap-2 dark:text-white">
//                                 البريد الإلكتروني <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                                 name="email"
//                                 type="email"
//                                 className="w-full border border-gray-500 bg-white dark:bg-[#121a2e] text-gray-600 dark:text-white rounded px-3 py-2 focus:ring-2 focus:ring-green-600"
//                                 placeholder="أدخل البريد الإلكتروني"
//                                 required
//                             />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="space-y-2">
//                     <h2 className="text-xl font-bold border-b pb-2 flex items-center gap-2 dark:border-gray-600 dark:text-white">
//                         نوع الطلب
//                     </h2>
//                     <div className="flex gap-4">
//                         <button
//                             type="button"
//                             onClick={() => setOrderType('إهداء')}
//                             className={`flex-1 py-3 border rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${orderType === 'إهداء'
//                                 ? 'border-green-800 text-green-800 bg-green-50 dark:bg-green-900 dark:text-white'
//                                 : 'border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700'
//                                 }`}
//                         >
//                             إهداء الطلب
//                             {orderType === 'إهداء' && (
//                                 <span className="flex items-center justify-center w-5 h-5 bg-green-800 text-white rounded-full">
//                                     ✓
//                                 </span>
//                             )}
//                         </button>
//                         <button
//                             type="button"
//                             onClick={() => setOrderType('عادي')}
//                             className={`flex-1 py-3 border rounded-xl flex items-center justify-center gap-2 transition-all duration-300 ${orderType === 'عادي'
//                                 ? 'border-green-800 text-green-800 bg-green-50 dark:bg-green-900 dark:text-white'
//                                 : 'border-gray-300 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700'
//                                 }`}
//                         >
//                             طلب عادي
//                             {orderType === 'عادي' && (
//                                 <span className="flex items-center justify-center w-5 h-5 bg-green-800 text-white rounded-full">
//                                     ✓
//                                 </span>
//                             )}
//                         </button>
//                     </div>
//                     {orderType === 'إهداء' && (
//                         <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
//                             سيتم إضافة رسوم تغليف الهدايا بقيمة 10 جنيهات
//                         </p>
//                     )}
//                 </div>
//                 {orderType === 'إهداء' && (
//                     <div className="space-y-4">
//                         <h2 className="text-xl font-bold border-b pb-2 flex items-center gap-2 dark:border-gray-600 dark:text-white">
//                             بيانات مستلم الهدية
//                         </h2>
//                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block mb-1 font-medium flex items-center gap-2 dark:text-white">
//                                     اسم مستلم الهدية <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                     name="recipientName"
//                                     type="text"
//                                     className="w-full border border-gray-300 bg-white dark:bg-[#121a2e] text-gray-600 dark:text-white rounded-xl px-3 py-2 focus:ring-2 focus:ring-green-600"
//                                     placeholder="اسم مستلم الهدية"
//                                     required
//                                 />
//                             </div>
//                             <div>
//                                 <label className="block mb-1 font-medium flex items-center gap-2 dark:text-white">
//                                     رقم هاتف مستلم الهدية <span className="text-red-500">*</span>
//                                 </label>
//                                 <input
//                                     name="recipientPhone"
//                                     type="tel"
//                                     className="w-full border border-gray-300 bg-white dark:bg-[#121a2e] text-gray-600 dark:text-white rounded-xl px-3 py-2 focus:ring-2 focus:ring-green-600"
//                                     placeholder="رقم هاتف مستلم الهدية"
//                                     required
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 )}
//                 <div className="space-y-4">
//                     <h2 className="text-xl font-bold border-b pb-2 flex items-center gap-2 dark:border-gray-600 dark:text-white">
//                         عنوان التوصيل
//                     </h2>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block mb-1 font-medium dark:text-white">
//                                 المدينة <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                                 name="city"
//                                 type="text"
//                                 className="w-full border border-gray-500 bg-white dark:bg-[#121a2e] text-gray-600 dark:text-white rounded px-3 py-2 focus:ring-2 focus:ring-green-600"
//                                 placeholder="أدخل اسم المدينة"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block mb-1 font-medium dark:text-white">
//                                 المحافظة <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                                 name="state"
//                                 type="text"
//                                 className="w-full border border-gray-500 bg-white dark:bg-[#121a2e] text-gray-600 dark:text-white rounded px-3 py-2 focus:ring-2 focus:ring-green-600"
//                                 placeholder="أدخل اسم المحافظة"
//                                 required
//                             />
//                         </div>
//                     </div>
//                     <div>
//                         <label className="block mb-1 font-medium dark:text-white">
//                             العنوان الكامل <span className="text-red-500">*</span>
//                         </label>
//                         <textarea
//                             name="address"
//                             className="w-full border border-gray-500 bg-white dark:bg-[#121a2e] text-gray-600 dark:text-white rounded px-3 py-2 h-24 focus:ring-2 focus:ring-green-600"
//                             placeholder="أدخل العنوان الكامل"
//                             required
//                         />
//                     </div>
//                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                         <div>
//                             <label className="block mb-1 font-medium dark:text-white">
//                                 الرمز البريدي <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                                 name="zipcode"
//                                 type="text"
//                                 className="w-full border border-gray-500 bg-white dark:bg-[#121a2e] text-gray-600 dark:text-white rounded px-3 py-2 focus:ring-2 focus:ring-green-600"
//                                 placeholder="أدخل الرمز البريدي"
//                                 required
//                             />
//                         </div>
//                         <div>
//                             <label className="block mb-1 font-medium dark:text-white">
//                                 الدولة <span className="text-red-500">*</span>
//                             </label>
//                             <input
//                                 name="country"
//                                 type="text"
//                                 className="w-full border border-gray-500 bg-white dark:bg-[#121a2e] text-gray-600 dark:text-white rounded px-3 py-2 focus:ring-2 focus:ring-green-600"
//                                 placeholder="أدخل اسم الدولة"
//                                 required
//                             />
//                         </div>
//                     </div>
//                 </div>
//                 <div className="space-y-4">
//                     <Title text1={'طريقة'} text2={'الدفع'} />
//                     <div className="flex gap-3 flex-col lg:flex-row">
//                         {['stripe', 'razorpay', 'cod'].map((methodType) => (
//                             <div
//                                 key={methodType}
//                                 onClick={() => setMethod(methodType)}
//                                 className="flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition dark:border-gray-600"
//                             >
//                                 <p
//                                     className={`min-w-3.5 h-3.5 border rounded-full ${method === methodType ? 'bg-green-400' : ''
//                                         }`}
//                                 ></p>
//                                 <p className="text-gray-500 dark:text-gray-300 text-sm font-medium mx-4">
//                                     {methodType === 'cod' ? 'الدفع عند الاستلام' : methodType.toUpperCase()}
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 </div>
//                 <div className="pt-4">
//                     <button
//                         type="submit"
//                         className="w-full bg-green-900 text-white py-3 rounded-full text-lg font-semibold hover:bg-green-800 transition-all duration-300 dark:hover:bg-green-700"
//                     >
//                         أكمل إلى الدفع
//                     </button>
//                 </div>
//             </form>
//             <div className="bg-white dark:bg-[#1a2338] rounded-xl shadow-lg p-6 lg:order-1 order-2 max-h-[500px] flex flex-col">
//                 <div className="flex justify-between items-center mb-4">
//                     <h2 className="text-xl font-bold dark:text-white">ملخص السلة</h2>
//                     <button
//                         onClick={handleEditCart}
//                         className="border px-4 py-1 rounded-full text-sm font-medium hover:bg-gray-100 dark:border-gray-600 dark:text-white dark:hover:bg-gray-700 transition"
//                     >
//                         تعديل
//                     </button>
//                 </div>

//                 <div className="flex-1 overflow-y-auto border-t pt-4 space-y-4 dark:border-gray-600">
//                     {cartData.length > 0 ? (
//                         cartData.map((item) => {
//                             // استخدام item.price بدلاً من item.product_price
//                             const price = parseFloat(item.price) || 0;
//                             return (
//                                 <div key={item.item_id} className="flex items-start justify-between">
//                                     <div className="flex items-start gap-3">
//                                         <img
//                                             src={item.image || '/path/to/placeholder-image.jpg'}
//                                             alt={item.product_name}
//                                             className="w-16 h-16 rounded object-cover"
//                                             onError={(e) => {
//                                                 e.target.src = '/path/to/placeholder-image.jpg';
//                                                 e.target.onerror = null;
//                                             }}
//                                         />
//                                         <div className="flex-1 text-sm">
//                                             <div className="font-medium dark:text-white">{item.product_name}</div>
//                                             <div className="text-gray-500 dark:text-gray-400 text-xs">
//                                                 العدد: {item.quantity}
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="flex items-center gap-2">
//                                         <div className="bg-yellow-300 text-black font-bold text-sm px-2 py-1 rounded dark:bg-yellow-400">
//                                             {currency} {price.toFixed(2)} {/* عرض سعر المنتج الواحد باستخدام item.price */}
//                                         </div>

//                                     </div>
//                                 </div>
//                             );
//                         })
//                     ) : (
//                         <div className="text-center text-gray-500 dark:text-gray-400">
//                             السلة فارغة
//                         </div>
//                     )}
//                 </div>

//                 <div className="mt-4 border-t pt-4 space-y-2 text-sm text-gray-700 dark:text-gray-300 dark:border-gray-600">
//                     <div className="flex justify-between items-center">
//                         <button
//                             onClick={() => setShowPromoInput(!showPromoInput)}
//                             className="flex items-center gap-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white transition"
//                         >
//                             هل لديك بروموكود؟
//                         </button>
//                     </div>
//                     {showPromoInput && (
//                         <div className="flex gap-2 mt-2">
//                             <input
//                                 type="text"
//                                 value={promoCode}
//                                 onChange={(e) => setPromoCode(e.target.value)}
//                                 placeholder="أدخل كود الخصم"
//                                 className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#121a2e] text-gray-600 dark:text-white rounded-xl px-3 py-2 text-sm focus:ring-2 focus:ring-green-600"
//                             />
//                             <button
//                                 onClick={applyPromoCode}
//                                 type="button"
//                                 className="bg-green-600 text-white px-3 py-2 rounded-xl hover:bg-green-700 dark:hover:bg-green-800 transition"
//                             >
//                                 تطبيق
//                             </button>
//                         </div>
//                     )}
//                     <div className="flex justify-between">
//                         <span className="dark:text-white">المجموع</span>
//                         <span className="dark:text-white">
//                             {currency} {subtotal.toFixed(2)}
//                         </span>
//                     </div>
//                     <div className="flex justify-between">
//                         <span className="dark:text-white">مصاريف الشحن</span>
//                         <span className="dark:text-white">
//                             {currency} {shippingFee.toFixed(2)}
//                         </span>
//                     </div>
//                     {orderType === 'إهداء' && (
//                         <div className="flex justify-between">
//                             <span className="dark:text-white">رسوم تغليف الهدايا</span>
//                             <span className="dark:text-white">
//                                 {currency} {giftWrappingFee.toFixed(2)}
//                             </span>
//                         </div>
//                     )}
//                     <div className="flex justify-between font-bold border-t pt-2 text-lg dark:border-gray-600 dark:text-white">
//                         <span>الإجمالي</span>
//                         <span>
//                             {currency} {totalAmount.toFixed(2)}
//                         </span>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default PlaceOrder;

// ? ========= End API ===========
// ? ========= End API ===========

// !================ START STRIPE =================

import { useContext, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContextCore";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../config";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// وضع مفتاح Stripe العام (يفضل استخدام متغير بيئي في الإنتاج)
const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51RLm6iRuJljUepLrWePFSpZY4RZoyg6xJMECCwSNamLgjyyBARp5S4rM80hUf5m78oiqbWkdpF3s9WNXOcSr3bia00jjMShyon";

// تحميل Stripe
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)
  .then((stripe) => {
    console.log(
      "Stripe initialized with key:",
      STRIPE_PUBLISHABLE_KEY,
      "success:",
      !!stripe
    );
    if (!stripe) {
      console.error(
        "Failed to initialize Stripe: Publishable key is missing or invalid"
      );
      toast.error("فشل تحميل نظام الدفع. تأكد من إعدادات المفتاح.");
    }
    return stripe;
  })
  .catch((error) => {
    console.error("Error loading Stripe:", error);
    toast.error("خطأ في تحميل نظام الدفع. تحقق من الاتصال أو إعدادات المفتاح.");
    return null;
  });

// مكون نموذج الدفع باستخدام Stripe
const CheckoutForm = ({
  orderId,
  cartData,
  token,
  navigate,
  resetCart,
  totalAmount,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardError, setCardError] = useState(null);
  const { t } = useTranslation();

  useEffect(() => {
    console.log("CheckoutForm - Stripe:", !!stripe, "Elements:", !!elements);
    if (!stripe || !elements) {
      toast.error(t("placeOrder.payment_unavailable"));
    }
  }, [stripe, elements, t]);

  const handlePayment = async () => {
    if (!stripe || !elements) {
      console.error("Stripe or Elements not loaded");
      toast.error("فشل تحميل نظام الدفع. يرجى المحاولة مرة أخرى.");
      return;
    }

    setIsProcessing(true);
    try {
      console.log(
        "Initiating payment for orderId:",
        orderId,
        "with totalAmount:",
        totalAmount
      );
      const response = await axios.post(
        `${backendUrl}/api/pay`,
        {
          order_id: orderId,
          item_id: cartData[0]?.item_id,
          amount: Math.round(totalAmount * 100), // Convert to cents (Stripe expects amount in cents)
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log("Payment API full response:", response.data);
      const { clientSecret } = response.data;
      if (!clientSecret) {
        throw new Error(t("placeOrder.missing_client_secret"));
      }
      console.log("Received clientSecret:", clientSecret);

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: { card: elements.getElement(CardElement) },
      });

      if (result.error) {
        console.error("Payment failed:", result.error);
        toast.error(
          t("placeOrder.payment_failed_with_reason", {
            message: result.error.message,
          })
        );
      } else if (result.paymentIntent.status === "succeeded") {
        console.log("Payment succeeded:", result.paymentIntent);
        toast.success(t("placeOrder.payment_success"));
        await axios.post(
          `${backendUrl}/api/order/confirm`,
          {
            order_id: orderId,
            payment_intent_id: result.paymentIntent.id,
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        resetCart();
        navigate("/orders");
      }
    } catch (error) {
      console.error("Payment error:", error);
      toast.error(
        t("placeOrder.payment_failed_with_reason", {
          message: error.response?.data?.message || error.message,
        })
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCardChange = (event) => {
    if (event.error) {
      setCardError(event.error.message);
    } else {
      setCardError(null);
    }
  };

  if (!stripe || !elements) {
    return (
      <div className="text-center text-red-500 dark:text-red-400">
        {t("placeOrder.payment_loading")}
      </div>
    );
  }

  return (
    <div className="space-y-6" aria-hidden={false}>
      <h2 className="text-xl font-bold dark:text-white">
        {t("placeOrder.enter_card_details")}
      </h2>
      <div>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#1a202c",
                "::placeholder": { color: "#a0aec0" },
              },
              invalid: { color: "#e53e3e" },
            },
            hidePostalCode: true,
          }}
          onChange={handleCardChange}
          className="border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a2338] rounded-lg p-3 focus:ring-2 focus:ring-green-600"
        />
        {cardError && (
          <div
            className="text-red-500 dark:text-red-400 text-sm mt-2"
            role="alert"
          >
            {cardError}
          </div>
        )}
      </div>
      <div className="flex gap-4">
        <button
          onClick={handlePayment}
          disabled={isProcessing || cardError}
          className={`flex-1 bg-green-900 text-white py-3 rounded-lg font-semibold transition-all duration-300 ${
            isProcessing || cardError
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-green-800"
          }`}
        >
          {isProcessing ? t("placeOrder.processing") : t("placeOrder.pay_now")}
        </button>
      </div>
    </div>
  );
};

// PropTypes for CheckoutForm
import PropTypes from "prop-types";

CheckoutForm.propTypes = {
  orderId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  cartData: PropTypes.array,
  token: PropTypes.string,
  navigate: PropTypes.func,
  resetCart: PropTypes.func,
  totalAmount: PropTypes.number,
};

const PlaceOrder = () => {
  const { t } = useTranslation();
  const [method, setMethod] = useState("cod");
  const [orderType, setOrderType] = useState("regular");
  const [showPromoInput, setShowPromoInput] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    navigate,
    resetCart,
    isLoggedIn,
    cartData,
    currency,
    userData,
    cartTotalPrice,
  } = useContext(ShopContext);

  useEffect(() => {
    console.log("Payment method:", method);
    console.log("Show payment form:", showPaymentForm);
  }, [method, showPaymentForm]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form with payment method:", method);

    const form = e.target;
    if (!form.checkValidity()) {
      console.log("Form validation failed");
      form.reportValidity();
      return;
    }

    if (!isLoggedIn) {
      console.log("User not logged in");
      toast.error(t("placeOrder.errors.login_required"));
      navigate("/login");
      return;
    }

    if (cartData.length === 0) {
      console.log("Cart is empty");
      toast.error(t("placeOrder.errors.cart_empty"));
      return;
    }

    const orderData = {
      user_id: userData?.id || 1,
      user_first_name: form.firstName.value,
      user_last_name: form.lastName.value,
      phone: form.phone.value,
      email: form.email.value,
      city: form.city.value,
      governorate: form.state.value,
      address: form.address.value,
      country: form.country.value,
      postal_code: form.zipcode.value,
      items: cartData.map((item) => ({
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.product_price,
      })),
      payment_method:
        method === "cod"
          ? "Cash"
          : method.charAt(0).toUpperCase() + method.slice(1),
      order_type: orderType,
      total_amount:
        cartTotalPrice + 100.0 + (orderType === "إهداء" ? 10.0 : 0.0), // Subtotal + shipping + gift wrapping
    };

    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("لم يتم العثور على رمز الدخول");
      }

      console.log("Sending order data:", orderData);
      const response = await axios.post(`${backendUrl}/api/order`, orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Order API response:", response.data);

      if (response.data.status === 200) {
        const orderId = response.data.data?.order_id;
        if (!orderId) {
          throw new Error("لم يتم إرجاع معرف الطلب من الخادم");
        }
        setOrderId(orderId);

        if (method === "stripe") {
          console.log("Switching to payment form");
          setShowPaymentForm(true);
        } else {
          console.log("Order completed without payment form");
          toast.success(t("placeOrder.success.order_created"));
          resetCart();
          navigate("/orders");
        }
      } else {
        throw new Error(response.data.message || "فشل إنشاء الطلب");
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      if (error.response?.status === 401 || error.response?.status === 422) {
        toast.error(t("placeOrder.errors.session_expired"));
        localStorage.removeItem("token");
        localStorage.removeItem("userData");
        navigate("/login");
      } else {
        toast.error(
          t("placeOrder.errors.order_failed_with_reason", {
            message: error.response?.data?.message || error.message,
          })
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const applyPromoCode = () => {
    if (promoCode.trim()) {
      toast.success(t("placeOrder.promo.applied", { code: promoCode }));
    } else {
      toast.error(t("placeOrder.promo.invalid"));
    }
  };

  const handleEditCart = () => {
    navigate("/cart");
  };

  // remove item handler intentionally removed (UI remove button is commented out)

  const handleBackToForm = () => {
    setShowPaymentForm(false);
  };

  const subtotal = cartTotalPrice;
  const shippingFee = 100.0;
  const giftWrappingFee = orderType === "gift" ? 10.0 : 0.0;
  const totalAmount = subtotal + shippingFee + giftWrappingFee;

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-6 text-right rtl dark:bg-[#121a2e]">
      {!showPaymentForm ? (
        <form
          onSubmit={handleSubmit}
          className="space-y-8 bg-white dark:bg-[#1a2338] p-6 rounded-xl shadow-lg lg:order-2 order-1"
        >
          <div className="text-xl sm:text-2xl my-3">
            <Title
              text1={t("placeOrder.title.part1")}
              text2={t("placeOrder.title.part2")}
            />
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold border-b pb-2 dark:border-gray-600 dark:text-white">
              {t("placeOrder.sections.customer_info")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1 font-medium flex items-center gap-2 dark:text-white">
                  {t("placeOrder.fields.first_name.label")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  name="firstName"
                  type="text"
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a2338] text-gray-900 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600"
                  placeholder={t("placeOrder.fields.first_name.placeholder")}
                  required
                />
              </div>
              <div>
                <label className="mb-1 font-medium flex items-center gap-2 dark:text-white">
                  {t("placeOrder.fields.last_name.label")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  name="lastName"
                  type="text"
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a2338] text-gray-900 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600"
                  placeholder={t("placeOrder.fields.last_name.placeholder")}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="mb-1 font-medium flex items-center gap-2 dark:text-white">
                  {t("placeOrder.fields.phone.label")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  name="phone"
                  type="tel"
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a2338] text-gray-900 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600"
                  placeholder={t("placeOrder.fields.phone.placeholder")}
                  required
                />
              </div>
              <div>
                <label className="mb-1 font-medium flex items-center gap-2 dark:text-white">
                  {t("placeOrder.fields.email.label")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  name="email"
                  type="email"
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a2338] text-gray-900 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600"
                  placeholder={t("placeOrder.fields.email.placeholder")}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold border-b pb-2 dark:border-gray-600 dark:text-white">
              {t("placeOrder.sections.order_type")}
            </h2>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setOrderType("إهداء")}
                className={`flex-1 py-3 border rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                  orderType === "إهداء"
                    ? "border-green-800 bg-green-50 dark:bg-green-900 text-green-800 dark:text-white"
                    : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {t("placeOrder.order_types.gift")}
                {orderType === "إهداء" && (
                  <span className="flex items-center justify-center w-5 h-5 bg-green-800 text-white rounded-full">
                    ✓
                  </span>
                )}
              </button>
              <button
                type="button"
                onClick={() => setOrderType("عادي")}
                className={`flex-1 py-3 border rounded-lg flex items-center justify-center gap-2 transition-all duration-300 ${
                  orderType === "عادي"
                    ? "border-green-800 bg-green-50 dark:bg-green-900 text-green-800 dark:text-white"
                    : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                {t("placeOrder.order_types.regular")}
                {orderType === "عادي" && (
                  <span className="flex items-center justify-center w-5 h-5 bg-green-800 text-white rounded-full">
                    ✓
                  </span>
                )}
              </button>
            </div>
            {orderType === "إهداء" && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("placeOrder.gift.wrapping_fee", {
                  currency,
                  amount: "10.00",
                })}
              </p>
            )}
          </div>

          {orderType === "إهداء" && (
            <div className="space-y-4">
              <h2 className="text-xl font-bold border-b pb-2 dark:border-gray-600 dark:text-white">
                {t("placeOrder.sections.recipient_info")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 font-medium flex items-center gap-2 dark:text-white">
                    {t("placeOrder.fields.recipient_name.label")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="recipientName"
                    type="text"
                    className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a2338] text-gray-900 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600"
                    placeholder={t(
                      "placeOrder.fields.recipient_name.placeholder"
                    )}
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 font-medium flex items-center gap-2 dark:text-white">
                    {t("placeOrder.fields.recipient_phone.label")}{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="recipientPhone"
                    type="tel"
                    className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a2338] text-gray-900 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600"
                    placeholder={t(
                      "placeOrder.fields.recipient_phone.placeholder"
                    )}
                    required
                  />
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <h2 className="text-xl font-bold border-b pb-2 dark:border-gray-600 dark:text-white">
              {t("placeOrder.sections.delivery_address")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium dark:text-white">
                  {t("placeOrder.fields.city.label")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  name="city"
                  type="text"
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a2338] text-gray-900 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600"
                  placeholder={t("placeOrder.fields.city.placeholder")}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium dark:text-white">
                  {t("placeOrder.fields.state.label")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  name="state"
                  type="text"
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a2338] text-gray-900 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600"
                  placeholder={t("placeOrder.fields.state.placeholder")}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block mb-1 font-medium dark:text-white">
                {t("placeOrder.fields.address.label")}{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a2338] text-gray-900 dark:text-white rounded-lg px-3 py-2 h-24 focus:ring-2 focus:ring-green-600"
                placeholder={t("placeOrder.fields.address.placeholder")}
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium dark:text-white">
                  {t("placeOrder.fields.zipcode.label")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  name="zipcode"
                  type="text"
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a2338] text-gray-900 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600"
                  placeholder={t("placeOrder.fields.zipcode.placeholder")}
                  required
                />
              </div>
              <div>
                <label className="block mb-1 font-medium dark:text-white">
                  {t("placeOrder.fields.country.label")}{" "}
                  <span className="text-red-500">*</span>
                </label>
                <input
                  name="country"
                  type="text"
                  className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a2338] text-gray-900 dark:text-white rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-600"
                  placeholder={t("placeOrder.fields.country.placeholder")}
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Title
              text1={t("placeOrder.payment.title.part1")}
              text2={t("placeOrder.payment.title.part2")}
            />
            <div className="flex gap-3 flex-col lg:flex-row">
              {["stripe", "razorpay", "cod"].map((methodType) => (
                <div
                  key={methodType}
                  onClick={() => setMethod(methodType)}
                  className={`flex items-center gap-3 border p-2 px-3 cursor-pointer rounded-lg transition-all duration-200 ${
                    method === methodType
                      ? "bg-green-50 dark:bg-green-900 border-green-800"
                      : "border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                >
                  <span
                    className={`min-w-3.5 h-3.5 border rounded-full ${
                      method === methodType ? "bg-green-500" : ""
                    }`}
                  />
                  <p className="text-gray-700 dark:text-gray-200 text-sm font-medium mx-4">
                    {methodType === "cod"
                      ? t("placeOrder.payment.methods.cod")
                      : methodType.toUpperCase()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full bg-green-900 text-white py-3 rounded-lg font-semibold transition-all duration-300 ${
                isLoading
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-green-800"
              }`}
            >
              {isLoading
                ? t("placeOrder.processing")
                : t("placeOrder.proceed_to_payment")}
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-8 bg-white dark:bg-[#1a2338] p-6 rounded-xl shadow-lg lg:order-2 order-1">
          <div className="flex items-center justify-between">
            <Title
              text1={t("placeOrder.payment_finish.part1")}
              text2={t("placeOrder.payment_finish.part2")}
            />
            <button
              onClick={handleBackToForm}
              className="text-gray-600 dark:text-gray-300 hover:text-green-800 dark:hover:text-green-500 font-medium"
            >
              {t("placeOrder.actions.back")}
            </button>
          </div>
          <Elements stripe={stripePromise}>
            <CheckoutForm
              orderId={orderId}
              cartData={cartData}
              token={localStorage.getItem("token")}
              navigate={navigate}
              resetCart={resetCart}
              totalAmount={totalAmount}
            />
          </Elements>
        </div>
      )}

      <div className="bg-white dark:bg-[#1a2338] rounded-xl shadow-lg p-6 lg:order-1 order-2 max-h-[500px] flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">
            {t("placeOrder.cart.title")}
          </h2>
          <button
            onClick={handleEditCart}
            className="border border-gray-300 dark:border-gray-600 px-4 py-1 rounded-lg text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white transition"
          >
            {t("placeOrder.actions.edit_cart")}
          </button>
        </div>

        <div className="flex-1 overflow-y-auto border-t pt-4 space-y-4 dark:border-gray-600">
          {cartData.length > 0 ? (
            cartData.map((item) => {
              const unitPrice = parseFloat(item.product_price || item.price) || 0;
              const lineTotal = unitPrice * (item.quantity || 1);
              return (
                <div
                  key={item.item_id}
                  className="flex items-start justify-between"
                >
                  <div className="flex items-start gap-3">
                    <img
                      src={item.image || "/placeholder-image.jpg"}
                      alt={item.product_name}
                      className="w-16 h-16 rounded-lg object-cover"
                      onError={(e) => {
                        e.target.src = "/placeholder-image.jpg";
                        e.target.onerror = null;
                      }}
                    />
                    <div className="flex-1 text-sm">
                      <div className="font-medium dark:text-white">
                        {item.product_name}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400 text-xs">
                        العدد: {item.quantity} · {currency} {unitPrice.toFixed(2)} لكل
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-yellow-300 text-black font-bold text-sm px-2 py-1 rounded-lg dark:bg-yellow-400">
                      {currency} {lineTotal.toFixed(2)}
                    </div>
                    {/* <button
                      onClick={() => handleRemoveItem(item.item_id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                    >
                      إزالة
                    </button> */}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400">
              {t("placeOrder.cart.empty")}
            </div>
          )}
        </div>

        <div className="mt-4 border-t pt-4 space-y-2 text-sm dark:border-gray-600">
          <div className="flex justify-between items-center">
            <button
              onClick={() => setShowPromoInput(!showPromoInput)}
              className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-green-800 dark:hover:text-green-500 transition"
            >
              {t("placeOrder.promo.prompt")}
            </button>
          </div>
          {showPromoInput && (
            <div className="flex gap-2 mt-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder={t("placeOrder.promo.placeholder")}
                className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#1a2338] text-gray-900 dark:text-white rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-green-600"
              />
              <button
                onClick={applyPromoCode}
                type="button"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 dark:hover:bg-green-800 transition"
              >
                {t("placeOrder.promo.apply")}
              </button>
            </div>
          )}
          <div className="flex justify-between text-gray-700 dark:text-gray-300">
            <span>{t("placeOrder.cart.subtotal")}</span>
            <span>
              {currency} {subtotal.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between text-gray-700 dark:text-gray-300">
            <span>{t("placeOrder.cart.shipping_fee")}</span>
            <span>
              {currency} {shippingFee.toFixed(2)}
            </span>
          </div>
          {orderType === "gift" && (
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>{t("placeOrder.gift.label")}</span>
              <span>
                {currency} {giftWrappingFee.toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between font-bold border-t pt-2 text-lg dark:border-gray-600 dark:text-white">
            <span>{t("placeOrder.cart.total")}</span>
            <span>
              {currency} {totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
