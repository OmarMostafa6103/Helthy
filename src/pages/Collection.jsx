import { useContext, useState, useMemo, useEffect, useRef } from "react";
import { ShopContext } from "../context/ShopContextCore";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../config";

const Collection = () => {
  const {
    products,
    search,
    showSearch,
    fetchProducts,
    isLoadingProducts,
    setProducts,
  } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory] = useState([]); // setter intentionally omitted
  const [sortType, setSortType] = useState("relevant");
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [error, setError] = useState(null);
  const [localLoading, setLocalLoading] = useState(false);
  const [, setCategoryError] = useState(null); // state value intentionally ignored
  const hasFetchedCategories = useRef(false);
  const productGridRef = useRef(null);
  const [expandedParents, setExpandedParents] = useState([]);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      if (hasFetchedCategories.current) return;
      hasFetchedCategories.current = true;

      setIsLoadingCategories(true);
      setError(null);

      try {
        const token = localStorage.getItem("token");
        const url = `${backendUrl}/api/categories?limit=40`;
        console.log("Fetching categories from:", url);

        const response = await axios.get(url, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });

        console.log("Categories API response:", response.data);

        if (response.data.status !== 200) {
          throw new Error(response.data.message || "فشل في جلب الفئات");
        }

        const data = response.data.data;
        if (!Array.isArray(data)) {
          console.error("Categories data is not array:", data);
          setCategories([]);
        } else {
          console.log("Setting categories:", data);
          setCategories(data);
        }
      } catch (err) {
        setError("فشل في تحميل الفئات. يرجى المحاولة لاحقًا.");
        setCategories([]);
        console.error("Error fetching categories:", err);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Load products
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!mounted) return;
      if (!isLoadingProducts && products.length === 0) {
        try {
          setLocalLoading(true);
          await fetchProducts(1, 25, false);
        } catch (err) {
          console.error("Collection initial fetch failed:", err);
        } finally {
          if (mounted) setLocalLoading(false);
        }
      }
    };
    load();
    return () => {
      mounted = false;
    };
    // fetchProducts is stable via useCallback in context
  }, [isLoadingProducts, products.length, fetchProducts]);

  // _fetchAllCategoryProducts removed (unused) to satisfy linter

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      if (!mounted) return;
      setProducts([]);
      setCategoryError(null);
      try {
        setLocalLoading(true);
        if (category.length > 0) {
          // pass category as fifth param (categoryId)
          await fetchProducts(1, 25, false, null, category.join(","));
        } else {
          await fetchProducts(1, 25, false);
        }
      } catch (err) {
        console.error("Collection category fetch failed:", err);
      } finally {
        if (mounted) setLocalLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, [category, fetchProducts, setProducts]);

  // Get child category ids
  const getAllChildCategoryIds = (parentId) => {
    return categories
      .filter(
        (cat) =>
          cat.parent &&
          (cat.parent.id === parentId || cat.parent.category_id === parentId)
      )
      .map((cat) => cat.category_id);
  };

  // Toggle category (include children when parent selected)
  const toggleCategory = (categoryId) => {
    const isParent = !categories.find((cat) => cat.category_id === categoryId)
      ?.parent;
    let idsToToggle = [categoryId];
    if (isParent) {
      idsToToggle = [categoryId, ...getAllChildCategoryIds(categoryId)];
    }
    setCategory((prev) => {
      const newSet = new Set(prev);
      let allSelected = idsToToggle.every((id) => newSet.has(id));
      if (allSelected) {
        idsToToggle.forEach((id) => newSet.delete(id));
      } else {
        idsToToggle.forEach((id) => newSet.add(id));
      }
      return Array.from(newSet);
    });
  };

  // _handleLoadMore removed (unused) to satisfy linter

  const categoryProductCounts = useMemo(() => {
    const counts = {};
    products.forEach((product) => {
      const categoryId = product.category_id;
      if (categoryId) {
        counts[categoryId] = (counts[categoryId] || 0) + 1;
      }
    });
    return counts;
  }, [products]);

  // _filteredCategories removed (unused) to satisfy linter

  const filteredAndSortedProducts = useMemo(() => {
    let productsCopy = [...products];

    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.map(String).includes(String(item.category_id))
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    switch (sortType) {
      case "low-high":
        return productsCopy.sort((a, b) => a.price - b.price);
      case "high-low":
        return productsCopy.sort((a, b) => b.price - a.price);
      default:
        return productsCopy;
    }
  }, [products, search, showSearch, category, subCategory, sortType]);

  const toggleExpand = (parentId) => {
    setExpandedParents((prev) =>
      prev.includes(parentId)
        ? prev.filter((id) => id !== parentId)
        : [...prev, parentId]
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 pt-10 border-t">
      {/* Sidebar - Filters */}
      <div className="w-full md:w-48 lg:w-52 xl:w-56 max-w-full md:max-w-[14rem] lg:max-w-[16rem]">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          فلاتر
          <img
            src={assets.dropdown_icon}
            alt=""
            className={`h-3 md:hidden ${showFilter ? "rotate-90" : ""}`}
          />
        </p>

        <div
          className={`border border-gray-300 pl-5 py-3 mt-2 ${
            showFilter ? "" : "hidden"
          } md:block rounded-lg shadow-sm bg-white dark:bg-gray-800 w-full`}
        >
          <p className="mb-3 text-sm font-medium">الفئات</p>

          {isLoadingCategories ? (
            <p className="text-gray-500">جارٍ تحميل الفئات...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : !Array.isArray(categories) || categories.length === 0 ? (
            <p className="text-gray-500">لا توجد فئات متاحة.</p>
          ) : (
            <div className="flex flex-col gap-2 text-sm font-light">
              {categories
                .filter((cat) => !cat.parent) // فقط الآباء
                .map((parent) => (
                  <div key={parent.category_id} className="mb-2">
                    <div
                      className={`flex items-center gap-2 cursor-pointer ${
                        category.includes(parent.category_id)
                          ? "bg-green-100 font-bold"
                          : "font-bold"
                      }`}
                      onClick={() => toggleExpand(parent.category_id)}
                    >
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-green-600"
                        checked={category.includes(parent.category_id)}
                        onChange={() => toggleCategory(parent.category_id)}
                        onClick={(e) => e.stopPropagation()}
                      />
                      <span>
                        {parent.category_name}
                        <span className="ml-2 text-xs text-gray-500">
                          ({categoryProductCounts[parent.category_id] || 0})
                        </span>
                      </span>
                      <span className="ml-auto">
                        {expandedParents.includes(parent.category_id)
                          ? "▲"
                          : "▼"}
                      </span>
                    </div>
                    {/* قائمة الأبناء */}
                    {expandedParents.includes(parent.category_id) && (
                      <div className="pl-6 mt-1 flex flex-col gap-1">
                        {categories
                          .filter(
                            (cat) =>
                              cat.parent &&
                              (cat.parent.id === parent.category_id ||
                                cat.parent.category_id === parent.category_id)
                          )
                          .map((child) => (
                            <label
                              key={child.category_id}
                              className="flex items-center gap-2 text-gray-700 dark:text-gray-300"
                            >
                              <input
                                type="checkbox"
                                className="w-4 h-4 accent-green-600"
                                checked={category.includes(child.category_id)}
                                onChange={() =>
                                  toggleCategory(child.category_id)
                                }
                              />
                              <span>
                                {child.category_name}
                                <span className="ml-2 text-xs text-gray-500">
                                  (
                                  {categoryProductCounts[child.category_id] ||
                                    0}
                                  )
                                </span>
                              </span>
                            </label>
                          ))}
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1" ref={productGridRef}>
        <div className="flex flex-col md:flex-row justify-between items-center text-base sm:text-2xl mb-4">
          <Title text1="جميع" text2="المجموعات" />
          <select
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 bg-gray-500 dark:bg-white text-white dark:text-black text-xs sm:text-sm px-1 sm:px-2 rounded mt-2 md:mt-0 w-full md:w-auto max-w-[10rem]"
          >
            <option value="relevant">الترتيب حسب: الأهمية</option>
            <option value="low-high">من الأقل إلى الأعلى</option>
            <option value="high-low">من الأعلى إلى الأقل</option>
          </select>
        </div>

        {/* حالة التحميل */}
        {products.length === 0 && (isLoadingProducts || localLoading) ? (
          <p className="text-center text-gray-500 text-lg py-10 animate-pulse">
            جارٍ تحميل المنتجات...
          </p>
        ) : filteredAndSortedProducts.length === 0 ? (
          <p className="text-gray-500 text-center">لا توجد منتجات متاحة.</p>
        ) : (
          <>
            <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6">
              {filteredAndSortedProducts.map((item, index) => (
                <ProductItem
                  key={index}
                  id={item.product_id}
                  name={item.name || "غير مسمى"}
                  image={item.image || ""}
                  price={item.price || 0}
                  description={item.description || ""}
                  quantity={item.quantity || 0}
                />
              ))}
            </div>
            {/* مؤشر تحميل صغير أسفل القائمة عند تحميل المزيد */}
            {isLoadingProducts && products.length > 0 && (
              <div className="text-center py-4">
                <span className="text-gray-500 animate-pulse">
                  جارٍ تحميل المزيد...
                </span>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Collection;
