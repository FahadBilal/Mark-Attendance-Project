import React, { useState } from "react";
import Input from "../global/Input.jsx";
import Select from "../global/Select.jsx";
import Button from "../global/Button.jsx";
import { useForm } from "react-hook-form";
import axios from "axios";
import { apiurl } from "../global/Api.jsx";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, setLoading } from "../app/authSlice.js";
import Loader from "../global/Loader.jsx";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading } = useSelector((state) => state.loading);

  const [isOptSent, setIsOptSent] = useState(false);
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const requestOpt = async (data) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.post(`${apiurl}/users/requestOpt`, {
        email: data.email,
      });
      console.log(response);
      setIsOptSent(true);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Failed to send OTP. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const verifyOpt = async (data) => {
    dispatch(setLoading(true));

    try {
      const response = await axios.post(`${apiurl}/users/verifyOpt`, {
        email: data.email,
        opt: data.opt,
      });
      console.log(response);
      setIsEmailVerified(true);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Invalid OPT. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  const onSubmit = async (data) => {
    dispatch(setLoading(true));

    if (!isEmailVerified) {
      toast.error("Please Verify Email before Registering.");
      return;
    }

    const formData = {
      fullName: data.fullName,
      email: data.email,
      role: data.role,
      password: data.password,
    };

    if (data.profileImage && data.profileImage[0]) {
      formData.profileImage = data.profileImage[0];
    }

    try {
      const response = await axios.post(`${apiurl}/users/register`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      //console.log(response);
      toast.success(response.data.message);
      const userData = response.data.createdUser;
      dispatch(login(userData));
      navigate(userData.role === "admin" ? "/admin" : "/student");
    } catch (error) {
      toast.error("Registration Failed. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="grid justify-items-center content-center  min-h-screen px-2 bg-pink-500">
      <div className=" w-full bg-white p-10  max-w-lg rounded-lg shadow-lg ">
        <h2 className="text-pink-500 font-satoshi font-extrabold text-2xl text-center mb-4">
          Register
        </h2>
        <p className="text-black font-poppins text-[14px] font-medium text-center mb-4">
          Already a member?{" "}
          <Link to={"/login"} className="text-pink-500 underline">
            Login
          </Link>
        </p>

        <form
          onSubmit={handleSubmit(
            isOptSent ? (isEmailVerified ? onSubmit : verifyOpt) : requestOpt
          )}
          encType="multipart/form-data"
        >
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

          {/* Opt */}
          {isOptSent && !isEmailVerified && (
            <div>
              <Input
                label="Opt"
                type="text"
                placeholder="Enter Opt"
                className={`${errors.opt ? "border-red-500" : ""}`}
                {...register("opt", {
                  required: "Opt is required",
                })}
              />
              {errors.opt && (
                <span className="text-red-500">{errors.opt.message}</span>
              )}
            </div>
          )}

          {/* EmailVerified */}
          {isEmailVerified && (
            <>
              {/* FullName */}
              <div>
                <Input
                  label="FullName"
                  type="text"
                  placeholder="Enter your Full name"
                  className={`${errors.fullName ? "border-red-500" : ""}`}
                  {...register("fullName", {
                    required: "FullName is required",
                  })}
                />
                {errors.fullName && (
                  <span className="text-red-500">
                    {errors.fullName.message}
                  </span>
                )}
              </div>

              {/* Profile Image */}
              <div>
                <Input
                  label="Profile Image"
                  type="file"
                  className={`${errors.profileImage ? "border-red-500" : ""}`}
                  {...register("profileImage", {
                    required: "Profile Image is required",
                  })}
                />
                {errors.profileImage && (
                  <span className="text-red-500">
                    {errors.profileImage.message}
                  </span>
                )}
              </div>

              {/* Role */}
              <div>
                <Select
                  label="Role"
                  options={["Student", "Admin"]}
                  className={`${errors.role ? "border-red-500" : ""}`}
                  {...register("role", {
                    required: true,
                  })}
                />
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
                  <span className="text-red-500">
                    {errors.paasword.message}
                  </span>
                )}
              </div>
            </>
          )}

          {/* Button */}
          <div>
            <Button
              type="Submit"
              className={`text-white  mt-8 transition-all duration-500 ${
                isOptSent
                  ? isEmailVerified
                    ? "bg-green-500 hover:bg-green-600"
                    : "bg-yellow-500 hover:bg-yellow-600"
                  : "bg-pink-500 hover:bg-pink-600"
              }`}
            >
              {isOptSent
                ? isEmailVerified
                  ? "Register"
                  : "Verify OPT"
                : "Send OPT"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
