import React from "react";
import Input from "../global/Input.jsx";
import Button from "../global/Button.jsx";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { apiurl } from "../global/Api.jsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../app/authSlice.js";
import Loader from "../global/Loader.jsx";

const ChangedPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.loading);

  const onSubmit = async (data) => {
    dispatch(setLoading(true));

    const formData = {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    };

    try {
      const response = await axios.patch(
        `${apiurl}/users/change-password`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      console.log(response);
      toast.success(response.data.message);
      const userData = response.data.data;
      console.log(userData);
      navigate("/student");
    } catch (error) {
      toast.error("Password Changed Failed");
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
        <h2 className="text-green-500 font-satoshi font-extrabold text-2xl text-center mb-4">
          Change Password
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {/* New Password */}
          <div>
            <Input
              label="Old Password"
              type="password"
              placeholder="Enter your Old Password"
              className={`${errors.oldPassword ? "border-red-500" : ""}`}
              {...register("oldPassword", {
                required: "Old Password is required",
              })}
            />
            {errors.oldPassword && (
              <span className="text-red-500">{errors.oldPassword.message}</span>
            )}
          </div>
          {/* New Password */}
          <div>
            <Input
              label=" New Password"
              type="password"
              placeholder="Enter your New Password"
              className={`${errors.newPassword ? "border-red-500" : ""}`}
              {...register("newPassword", {
                required: "New Password is required",
              })}
            />
            {errors.newPassword && (
              <span className="text-red-500">{errors.newPassword.message}</span>
            )}
          </div>

          {/* Button */}
          <div>
            <Button
              type="Submit"
              className={`text-white  mt-8 transition-all duration-500 bg-green-500 hover:bg-green-600`}
            >
              {"Update Password"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangedPassword;
