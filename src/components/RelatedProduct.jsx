import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContextCore";
import ProductItem from "./ProductItem";
import Title from "./Title";
import { useNavigate } from "react-router-dom";

const RelatedProduct = ({ category, subCategory, scrollToProduct }) => {
  const { products } = useContext(ShopContext);
  const navigate = useNavigate();
  const [related, setRelated] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter((item) => category === item.category);
      productsCopy = productsCopy.filter(
        (item) => subCategory === item.subCategory
      );
      setRelated(productsCopy.slice(0, 10));
    }
  }, [products, category, subCategory]);

  return (
    <div className="my-24">
      <div className="text-center py-2 text-3xl">
        <Title text1={"RELATED"} text2={"PRODUCTS"} />
        <p className="w-3/4 m-auto text-xs sm:text:sm md:text-base ">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit.
        </p>
      </div>

      <div className="grid overflow-hidden grid-cols-2 mt-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6">
        {related.map((item, index) => (
          <div
            className="cursor-pointer p-0"
            key={index}
            onClick={() => {
              // scrollToProduct may move the page; navigate client-side to keep SPA behavior
              scrollToProduct();
              navigate(`/product/${item.product_id}`);
            }}
          >
            <ProductItem
              id={item.product_id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProduct;

RelatedProduct.propTypes = {
  category: PropTypes.string,
  subCategory: PropTypes.string,
  scrollToProduct: PropTypes.func,
};
