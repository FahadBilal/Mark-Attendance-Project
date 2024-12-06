import React, { useEffect, useRef, useState } from "react";
import Button from "../global/Button.jsx";
import { toast } from "react-hot-toast";
import { apiurl } from "../global/Api.jsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../app/authSlice.js";
import { useForm } from "react-hook-form";
import Loader from "../global/Loader.jsx";
import Input from "../global/Input.jsx";
import Select from "../global/Select.jsx";

const CreateAttendance = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const userId = useRef();

  const user = JSON.parse(localStorage.getItem("user"));
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${apiurl}/admin/allUsers`, {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
        setUserList(response.data.data);
      } catch (error) {
        toast.error("Failed to load User");
      }
    };
    fetchUsers();
  }, [user.accessToken]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.loading);

  const onSubmit = async (data) => {
    dispatch(setLoading(true));

    const formData = {
      userId: data.userId,
      date: data.date,
      status: data.status,
    };

    try {
      const response = await axios.post(
        `${apiurl}/admin/attendance`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      console.log(response.data.data);
      toast.success(response.data.message);
      navigate("/admin")
    } catch (error) {
      toast.error("Attendance Already Marked");
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (loading) {
    return <Loader className={`bg-red-500`} />;
  }

  return (
    <div className="grid justify-items-center content-center  min-h-screen px-2 bg-red-500">
      <div className=" w-full bg-white p-10  max-w-lg rounded-lg shadow-lg ">
        <h2 className="text-emerald-500 font-satoshi font-extrabold text-2xl text-center mb-4">
          Create Attendance
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div>
            {/* User ID */}
            <div className="w-full mb-4">
              <label
                className="inline-block mb-1 pl-1 text-[16px] font-poppins font-medium"
                htmlFor="UserId"
              >
                Select User
              </label>
              <select
                id="UserId"
                className={`w-full px-3 py-2 font-poppins rounded-lg  border focus:outline-none ${
                  errors.userId ? "border-red-500" : ""
                } `}
                ref={userId}
                {...register("userId", {
                  required: "true",
                })}
              >
                {userList.map((user) => (
                  <option key={user._id} value={user._id}>
                    {user.fullName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Date */}
          <div>
            <Input
              label="Date"
              type="date"
              className={`${errors.date ? "border-red-500" : ""}`}
              {...register("date", {
                required: "Date is required",
              })}
            />
            {errors.date && (
              <span className="text-red-500">{errors.date.message}</span>
            )}
          </div>
          <div>
            <Select
              label="Status"
              options={["Present", "Absent"]}
              className={`${errors.status ? "border-red-500" : ""}`}
              {...register("status", {
                required: true,
              })}
            />
          </div>

          {/* Button */}
          <div>
            <Button
              type="Submit"
              className={`text-white  mt-8 transition-all duration-500 bg-emerald-500 hover:bg-emerald-600`}
            >
              {"Create Attendance"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAttendance;
