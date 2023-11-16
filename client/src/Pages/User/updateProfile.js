import React from "react";
import { Button, Form, Input, Tabs } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import toast from "react-hot-toast";

const UpdateProfile = () => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (data) => {
    try {
      dispatch(showLoading());

      const response = await axios.put(
        "/api/user/update-user",
        {
          _id: user._id,
          ...data,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
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

  return (
    <div>
      <div className="flex items-center gap-[100px]">
        <div>
          <dotlottie-player
            src="https://lottie.host/9cf3aa14-f27d-499f-b11d-5b49f0defbc4/MgXwxX99e9.json"
            background="transparent"
            speed="1"
            sstyle={{ width: "400px", height: "400px" }}
            loop
            autoplay
          ></dotlottie-player>
        </div>
        <div className=" mt-[50px] rounded ">
          <h1 className="font-medium text-3xl">Update Profile</h1>
          <p className="text-gray-600 mt-6">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
            Dignissimos dolorem vel cupiditate laudantium dicta.
          </p>

          <Form onFinish={onFinish} layout="vertical" initialValues={user}>
            <div className="mt-8 grid lg:grid-cols-2 gap-4">
              <div>
                <Form.Item
                  label="First Name"
                  name="firstName"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  <Input className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label="Last Name"
                  name="lastName"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  <Input className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label=" User Name"
                  name="userName"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  <Input className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" />
                </Form.Item>
              </div>
              <div>
                <Form.Item
                  label="Email"
                  name="userEmail"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  <Input className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" />
                </Form.Item>
              </div>
            </div>
            <div className="mt-8 grid lg:grid-cols-1 gap-4">
              <div>
                <Form.Item
                  label="Address"
                  name="address"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  <Input className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" />
                </Form.Item>
              </div>
            </div>
            <div className="mt-8 grid lg:grid-cols-2 gap-4">
              <div>
                <Form.Item
                  label="Phone"
                  name="phone"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  <Input className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" />
                </Form.Item>
              </div>
              {/* <div>
                <Form.Item
                  label=" Password"
                  name="password"
                  className="text-sm text-gray-700 block mb-1 font-medium"
                >
                  <Input.Password className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" />
                </Form.Item>
              </div> */}
            </div>

            <div className="space-x-4 mt-8">
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: "#000", height: "40px" }}
                  className="px-8"
                >
                  Update
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
