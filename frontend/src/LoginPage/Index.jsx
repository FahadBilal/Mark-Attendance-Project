import React from "react";
import Input from "../global/Input.jsx";
import Button from "../global/Button.jsx";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { apiurl } from "../global/Api.jsx";
import axios from "axios";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, setLoading } from "../app/authSlice.js";
import Loader from "../global/Loader.jsx";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const  loading  = useSelector((state) => state.loading);

  const onSubmit = async (data) => {
    dispatch(setLoading(true));

    const formData = {
      email: data.email,
      password: data.password,
    };

    try {
      const response = await axios.post(
        `${apiurl}/users/login`, formData
      );
      console.log(response);
      toast.success(response.data.message);
      const userData = response.data.data;
      console.log(userData);
      
      dispatch(login(userData));
      navigate(userData.role === "admin" ? "/admin" : "/student");
    } catch (error) {
      toast.error("Login Failed. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (loading) {
    return <Loader/>;
  }

  return (
    <div className="grid justify-items-center content-center  min-h-screen px-2 bg-pink-500">
      <div className=" w-full bg-white p-10  max-w-lg rounded-lg shadow-lg ">
        <h2 className="text-pink-500 font-satoshi font-extrabold text-2xl text-center mb-4">
          Login
        </h2>
        <p className="text-black font-poppins text-[14px] font-medium text-center mb-4">
          Not a member yet?{" "}
          <Link to={"/register"} className="text-pink-500 underline">
            Register
          </Link>
        </p>
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
              className={`text-white  mt-8 transition-all duration-500 bg-pink-500 hover:bg-pink-600`}
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
