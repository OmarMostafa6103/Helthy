import { useContext } from "react";
import { ShopContext } from "../context/ShopContextCore";
import CookieLoader from "./CookieLoader";

const GlobalLoader = () => {
  const { products, isLoadingProducts } = useContext(ShopContext);

  // Show loader only when products are empty and we're loading (initial fetch)
  if (!isLoadingProducts || (Array.isArray(products) && products.length > 0)) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div className="bg-transparent p-4 rounded">
        <CookieLoader />
      </div>
    </div>
  );
};

export default GlobalLoader;
