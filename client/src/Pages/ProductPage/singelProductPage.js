import React, { useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";
import Wrapper from "../../components/Wrapper";
import axios from "axios";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import Rating from "../../components/Rating";

const SingleProduct = () => {
  const { user } = useSelector((state) => state.user);
  const [singleProduct, setSingleProduct] = useState();
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const getSingleProductDate = async () => {
    try {
      const response = await axios.get(`/api/product/get-single-product/${id}`);
      if (response.data.success) {
        setSingleProduct(response.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const addToCart = async (product) => {
    try {
      const userId = user._id;
      const newItem = {
        productTitle: product.productTitle,
        productPrice: product.productPrice,
        productId: product._id,
        quantity: 1,
      };
      const response = await axios.post(
        "/api/cart/create-cart",
        {
          userId,
          items: [newItem],
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);

        setCart(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong");
    }
  };

  useEffect(() => {
    getSingleProductDate();
  }, []);
  return (
    <Wrapper>
      <div>
        <h1>
          <BiArrowBack
            className="cursor-pointer text-3xl mt-10"
            onClick={() => navigate("/")}
          />
        </h1>
        <section className="text-gray-700 w-full body-font overflow-hidden bg-white">
          <div className="container px-5 py-24 mx-auto">
            <div className="lg:w-full mx-auto flex flex-wrap">
              <img
                alt="ecommerce"
                className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                src="https://www.pexels.com/photo/photography-of-guy-wearing-yellow-hoodie-1183266/"
              />
              <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                <h2 className="text-sm title-font text-gray-500 tracking-widest">
                  {singleProduct?.productBrand}
                </h2>
                <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                  {singleProduct?.productTitle}
                </h1>
                <div className="flex mb-4">
                  <span className="flex items-center">
                    <Rating value={singleProduct?.productRating} />
                    <span className="text-gray-600 ml-3">4 Reviews</span>
                  </span>
                </div>
                <p className="leading-relaxed">
                  {singleProduct?.productDescription}
                </p>
                <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                  <div className="flex">
                    <span className="mr-3">Color</span>
                    <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                    <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                  </div>
                  <div className="flex ml-6 items-center">
                    <span className="mr-3">Size</span>
                    <div className="relative">
                      <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                        <option>SM</option>
                        <option>M</option>
                        <option>L</option>
                        <option>XL</option>
                      </select>
                      <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                        <svg
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          className="w-4 h-4"
                          viewBox="0 0 24 24"
                        >
                          <path d="M6 9l6 6 6-6"></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex mt-6">
                  <span className="title-font font-medium text-2xl text-gray-900">
                    ${singleProduct?.productPrice}
                  </span>
                  <button
                    onClick={() => addToCart(singleProduct)}
                    className="flex ml-auto text-white bg-primary border-0 py-2 px-6 focus:outline-none  rounded"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Wrapper>
  );
};

export default SingleProduct;
