import React, { useState } from "react";
import Wrapper from "../../components/Wrapper";
import { Button, Form, Input } from "antd";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/loaderSlice";

import ForgetPassword from "../User/forgetPassword";

const Login = () => {
  const [isForgetPassword, setIsForgetPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (data) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/user-login", data);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);

        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  // // forget password
  // const [isEmailSent, setIsEmailSent] = useState(false);
  // const passwordHandle = async (data) => {
  //   try {
  //     dispatch(showLoading());

  //     const response = await axios.post(
  //       "/api/user/forget-password",

  //       data,

  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     dispatch(hideLoading());
  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //       setIsEmailSent(true);
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     dispatch(hideLoading());
  //     console.log(error);
  //   }
  // };
  // const handleOTP = async (data) => {
  //   try {
  //     dispatch(showLoading());

  //     const response = await axios.post(
  //       "/api/user/verify-otp",

  //       data,

  //       {
  //         headers: {
  //           Authorization: `Bearer ${localStorage.getItem("token")}`,
  //         },
  //       }
  //     );
  //     dispatch(hideLoading());
  //     if (response.data.success) {
  //       toast.success(response.data.message);
  //       navigate("/login");
  //     } else {
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     dispatch(hideLoading());
  //     console.log(error);
  //   }
  // };
  return (
    <Wrapper>
      {isForgetPassword ? (
        <ForgetPassword />
      ) : (
        <div className="flex items-center gap-[100px]">
          <div>
            {/* <dotlottie-player
              src="https://lottie.host/4b2c8fd5-a833-4474-850e-912d32b0f471/Ttmh874MKZ.json"
              background="transparent"
              speed="1"
              style={{ width: "400px", height: "400px" }}
              loop
              autoplay
            ></dotlottie-player> */}
            
          </div>
          <div className=" mt-[50px] rounded ">
            <h1 className="font-medium text-3xl">Login</h1>
            <p className="text-gray-600 mt-6">
              Welcome
            </p>

            <Form layout="vertical" onFinish={onFinish}>
              <div className="mt-8 grid lg:grid-cols-1 gap-4">
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
                    label="Password"
                    name="password"
                    className="text-sm text-gray-700 block mb-1 font-medium"
                  >
                    <Input className="bg-gray-100 border border-gray-200 rounded py-1 px-3 block focus:ring-blue-500 focus:border-blue-500 text-gray-700 w-full" />
                  </Form.Item>
                </div>
              </div>

              <div className="space-x-4 mt-8">
                <Form.Item>
                  <Button
                    htmlType="submit"
                    type="primary"
                    style={{ backgroundColor: "#000", height: "40px" }}
                    className="px-8"
                  >
                    Login
                  </Button>
                </Form.Item>
              </div>
            </Form>
            <div>
              <p className="text-gray-600 mt-6">
                Don't have an account?{" "}
                <Link className="hover:underline text-primary" to="/register">
                  Register
                </Link>
              </p>
            </div>
            <div>
              <p
                onClick={() => setIsForgetPassword(true)}
                className="hover:underline text-primary cursor-pointer"
              >
                <Link to="/forget-password">Forget Password?</Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default Login;
