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
import Textarea from "../global/Textarea.jsx";

const LeaveRequest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.loading);

  const user = JSON.parse(localStorage.getItem("user"));

  const onSubmit = async (data) => {
    dispatch(setLoading(true));

    const formData = {
      leaveDate: data.date,
      reason: data.reason,
    };

    try {
      const response = await axios.post(
        `${apiurl}/users/submitLeaveRequest`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      console.log(response);
      toast.success(response.data.message);
      const leave = response.data.data;
      console.log(leave);
      JSON.stringify(localStorage.setItem("leaveRequest", response.data.data));

      navigate("/student");
    } catch (error) {
      toast.error("Leave Request Submiited Failed");
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
          Leave Request
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          {/* date */}
          <div>
            <Input
              label="Date"
              type="date"
              placeholder="Enter your Email"
              className={`${errors.email ? "border-red-500" : ""}`}
              {...register("date", {
                required: "Date is required",
              })}
            />
            {errors.date && (
              <span className="text-red-500">{errors.date.message}</span>
            )}
          </div>

          {/* Reason */}

          <div>
            <Textarea
              label="Reason"
              placeholder="Enter your Reason..."
              className={`${errors.reason ? "border-red-500" : ""}`}
              {...register("reason", {
                required: "Reason is Required",
              })}
            />
            {errors.reason && (
              <span className="text-red-500">{errors.reason.message}</span>
            )}
          </div>

          {/* Button */}
          <div>
            <Button
              type="Submit"
              className={`text-white  mt-8 transition-all duration-500 bg-pink-500 hover:bg-pink-600`}
            >
              {"Submit Leave Request"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LeaveRequest;
