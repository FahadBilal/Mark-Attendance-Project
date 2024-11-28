import React from "react";
import Input from "../global/Input.jsx";
import Button from "../global/Button.jsx";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { apiurl } from "../global/Api.jsx";
import axios from "axios";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${apiurl}/users/login`,
        { email: data.email, password: data.password },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Login Failed. Please try again.");
    }
  };
  return (
    <div className="grid justify-items-center content-center  min-h-screen px-2">
      <div className=" w-full bg-pink-300 p-10  max-w-lg rounded-lg shadow-lg ">
        <h2 className="text-white font-satoshi font-extrabold text-2xl text-center mb-4">
          Login
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {/* Email */}
          <div>
            <Input
              label="Email"
              type="email"
              placeholder="Enter your Email"
              className={`${errors.email ? "border-red-500" : ""}`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Inavlid Email address",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </div>

          {/* Password */}
          <div>
            <Input
              label="Password"
              type="password"
              placeholder="Enter your Password"
              className={`${errors.password ? "border-red-500" : ""}`}
              {...register("password", {
                required: "Password is required",
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.paasword.message}</span>
            )}
          </div>

          {/* Button */}
          <div>
            <Button
              type="Submit"
              className={`text-white  mt-8 transition-all duration-500 bg-blue-500 hover:bg-blue-600`}
            >
              {"Login"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
