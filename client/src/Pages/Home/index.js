import { Carousel } from "antd";
import React, { useEffect, useState } from "react";
import slider1 from "../../assets/images/slider1.jpg";
import slider2 from "../../assets/images/slider2.jpg";
import slider3 from "../../assets/images/slider3.jpg";
import ProductList from "../../components/ProductList";
import axios from "axios";
import { useSelector } from "react-redux";
import Rating from "../../components/Rating";
import { Link, Navigate, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const [productlist, setProductList] = useState([]);
  const [cart, setCart] = useState([]);
  const [singleProduct, setSingleProduct] = useState();
  const navigate = useNavigate();
  console.log(cart);
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
  const getData = async () => {
    try {
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get("/api/product/get-all-product");
      if (response.data.success) {
        setProductList(response.data.data);
      }
    } catch (error) {}
  };

  const handleView = async (productId) => {
    try {
      const response = await axios.get(
        `/api/product/get-single-product/${productId}`
      );
      if (response.data.success) {
        setSingleProduct(response.data.data);
        navigate(`/product/view/${productId}`);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
    getProducts();
  }, []);

  return (
    <div>
      {/* Carousel */}
      {/* <Carousel autoplay>
        <div>
          <img
            style={{ width: "100%", height: "1000px" }}
            src={slider2}
            alt="Carousel 1"
          />
        </div>
        <div>
          <img
            style={{ width: "100%", height: "1000px" }}
            src={slider3}
            alt="Carousel 1"
          />
        </div>
        <div>
          <img
            style={{ width: "100%", height: "1000px" }}
            src={slider1}
            alt="Carousel 1"
          />
        </div>
      </Carousel> */}
      {/* Product List */}
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Latest Products
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {productlist.map((product) => (
              <div class="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
                <Link
                  class="relative mx-3 mt-3 flex h-60 overflow-hidden rounded-xl"
                  href="#"
                >
                  <img
                    class="object-cover"
                    
                    src="https://images.pexels.com/photos/5380089/pexels-photo-5380089.jpeg"
                    alt="product image"
                  />
                  <span class="absolute top-0 left-0 m-2 rounded-full bg-black px-2 text-center text-sm font-medium text-white">
                    39% OFF
                  </span>
                </Link>
                <div class="mt-4 px-5 pb-5">
                  <div
                    className="cursor-pointer"
                    onClick={() => handleView(product._id)}
                  >
                    <h5 class="text-xl text-ellipsis tracking-tight text-slate-900">
                      {product.productTitle}
                    </h5>
                  </div>
                  <div class="mt-2 mb-5 flex items-center justify-between">
                    <p>
                      <span class="text-3xl font-bold text-slate-900">
                        ${product.productPrice}
                      </span>
                      {/* <span class="text-sm text-slate-900 line-through">
                        $699
                      </span> */}
                    </p>
                    <div class="flex items-center">
                      <Rating value={product.productRating} />
                      <span class="mr-2 ml-3 rounded bg-primary text-white px-2.5 py-0.5 text-xs font-semibold">
                        {product.productRating}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(product)}
                    class="flex items-center justify-center rounded-md bg-slate-900 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="mr-2 h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                    Add to cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
