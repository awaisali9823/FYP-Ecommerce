import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { hideLoading, showLoading } from "../../redux/loaderSlice";
import toast from "react-hot-toast";
import { BiArrowBack } from "react-icons/bi";
import Wrapper from "../../components/Wrapper";

const ForgetPassword = ({ userEmail }) => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (data) => {
    try {
      dispatch(showLoading());

      const response = await axios.post(
        "/api/user/forget-password",

        data,

        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        setIsEmailSent(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };
  const handleOTP = async (data) => {
    try {
      dispatch(showLoading());

      const response = await axios.post("/api/user/verify-otp", data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/login");
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
      {isEmailSent ? (
        <div>
          <div className="flex sm:flex-row xs:flex-col items-center gap-[100px]">
            <div>
              <dotlottie-player
                src="https://lottie.host/ef11f132-200a-47b7-969a-ad9c59321065/5hBrRuLgju.json"
                background="transparent"
                speed="1"
                sstyle={{ width: "400px", height: "400px" }}
                loop
                autoplay
              ></dotlottie-player>
            </div>
            <div className=" mt-[50px] rounded ">
              <h1 className="font-medium text-3xl flex gap-2 items-center">
                <BiArrowBack
                  className="cursor-pointer"
                  onClick={() => setIsEmailSent(false)}
                />
                Verify OTP
              </h1>
              <p className="text-gray-600 mt-6">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Dignissimos dolorem vel cupiditate laudantium dicta.
              </p>

              <Form onFinish={handleOTP} layout="vertical">
                <div className="mt-8 grid lg:grid-cols-2 gap-4">
                  <div>
                    <Form.Item
                      label="Email"
                      name="userEmail"
                      className="text-sm text-gray-700 block mb-1 font-medium"
                    >
                      <Input className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item
                      label="New Password"
                      name="newPassword"
                      className="text-sm text-gray-700 block mb-1 font-medium"
                    >
                      <Input className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" />
                    </Form.Item>
                  </div>
                  <div>
                    <Form.Item
                      label="OTP Code"
                      name="otpCode"
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
                      Update Password
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-[100px]">
            <div>
              <dotlottie-player
                src="https://lottie.host/ef11f132-200a-47b7-969a-ad9c59321065/5hBrRuLgju.json"
                background="transparent"
                speed="1"
                sstyle={{ width: "400px", height: "400px" }}
                loop
                autoplay
              ></dotlottie-player>
            </div>
            <div className=" mt-[50px] rounded ">
              <h1 className="font-medium text-3xl">Forget Password</h1>
              <p className="text-gray-600 mt-6">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Dignissimos dolorem vel cupiditate laudantium dicta.
              </p>

              <Form onFinish={onFinish} layout="vertical" initialValues={user}>
                <div className="mt-8 grid lg:grid-cols-2 gap-4">
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

                <div className="space-x-4 mt-8">
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ backgroundColor: "#000", height: "40px" }}
                      className="px-8"
                    >
                      Send Otp
                    </Button>
                  </Form.Item>
                </div>
              </Form>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default ForgetPassword;
