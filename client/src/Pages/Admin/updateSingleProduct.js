import React, { useEffect, useState } from "react";
import Wrapper from "../../components/Wrapper";
import { Button, Form, Input } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import TextArea from "antd/es/input/TextArea";
import { useNavigate, useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";

import { setProduct } from "../../redux/productSlice";

const UpdateSingleProduct = () => {
  const { product } = useSelector((state) => state.product);
  console.log(product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const onFinish = async (data) => {
    try {
      dispatch(showLoading());
      const response = await axios.put(
        `/api/product/update-product/${id}`,
        data
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  const getSingleProduct = async () => {
    try {
      const response = await axios.get(`/api/product/get-single-product/${id}`);
      if (response.data.success) {
        dispatch(setProduct(response.data.data));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleProduct();
  }, [id]);
  return (
    <Wrapper>
      <h1>
        <BiArrowBack
          className="cursor-pointer text-3xl mt-10"
          onClick={() => navigate("/admin-dashboard")}
        />
      </h1>
      <div className="flex items-center gap-[100px]">
        <div>
          <dotlottie-player
            src="https://lottie.host/97ec9be7-8894-4c26-aa11-5a379bf533b4/1xJhfpWrZ5.json"
            background="transparent"
            speed="1"
            style={{ width: "400px", height: "400px" }}
            loop
            autoplay
          ></dotlottie-player>
        </div>
        <div className=" mt-[50px] rounded ">
          <h1 className="font-medium text-3xl">Update Product</h1>
          <p className="text-gray-600 mt-6">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Dignissimos dolorem vel cupiditate laudantium dicta.
          </p>

          <Form onFinish={onFinish} layout="vertical" initialValues={product}>
            <div className="mt-8 grid lg:grid-cols-2 gap-4">
              <div>
                <Form.Item
                  label="Product Title"
                  name="productTitle"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  <Input className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label="Product Category"
                  name="productCategory"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  <Input className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label=" Product Brand"
                  name="productBrand"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  <Input className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label="Product Inventory"
                  name="productInventory"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  <Input className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" />
                </Form.Item>
              </div>
            </div>
            <div className="mt-8 grid lg:grid-cols-1 gap-4">
              <div>
                <Form.Item
                  label="Product Description"
                  name="productDescription"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  <TextArea className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" />
                </Form.Item>
              </div>
            </div>
            <div className="mt-8 grid lg:grid-cols-2 gap-4">
              <div>
                <Form.Item
                  label="Product Rating"
                  name="productRating"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  <Input className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label=" Product Price"
                  name="productPrice"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  <Input className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" />
                </Form.Item>
              </div>
            </div>

            <div className="space-x-4 mt-8">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: "#000", height: "40px" }}
                  className="px-8"
                >
                  Update Product
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default UpdateSingleProduct;
