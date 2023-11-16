import React from "react";
import Wrapper from "../../components/Wrapper";
import { Button, Form, Input } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import TextArea from "antd/es/input/TextArea";

const AddProduct = () => {
  const dispatch = useDispatch();
  const onFinish = async (data) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/product/create-product", data);
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
  return (
    <Wrapper>
      <div className="flex items-center gap-[100px]">
        <div>
          {/* <dotlottie-player
            src="https://lottie.host/97ec9be7-8894-4c26-aa11-5a379bf533b4/1xJhfpWrZ5.json"
            background="transparent"
            speed="1"
            style={{ width: "400px", height: "400px" }}
            loop
            autoplay
          ></dotlottie-player> */}
        </div>
        <div className=" mt-[50px] rounded ">
          <h1 className="font-medium text-3xl">Add New Product</h1>
          <p className="text-gray-600 mt-6">
           
          </p>

          <Form onFinish={onFinish} layout="vertical">
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
                  Add Product
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </Wrapper>
  );
};

export default AddProduct;
