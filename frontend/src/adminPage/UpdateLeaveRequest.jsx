import React from "react";
import { useParams } from "react-router-dom";
import Select from "../global/Select.jsx";
import axios from "axios";
import Button from "../global/Button.jsx";
import { toast } from "react-hot-toast";
import { apiurl } from "../global/Api.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../app/authSlice.js";
import { useForm } from "react-hook-form";
import Loader from "../global/Loader.jsx";

const UpdateLeaveRequest = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { leaveId } = useParams();
  //console.log(leaveId);
  
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.loading);

  const onSubmit = async (data) => {
    dispatch(setLoading(true));

    const formData = {
      status: data.status,
    };

    try {
      const response = await axios.patch(
        `${apiurl}/admin/updateLeaveRequest/${leaveId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      //console.log(response.data.data);
      toast.success(response.data.message);
      navigate("/admin");
    } catch (error) {
      toast.error("Leave Request Update Failed");
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
          Update Leave Request
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <div>
            <Select
              label="Status"
              options={["Pending", "Approved", "Rejected"]}
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
              {"Update Leave"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateLeaveRequest;
