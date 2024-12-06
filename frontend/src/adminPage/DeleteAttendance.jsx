import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from "../global/Button.jsx";
import { toast } from "react-hot-toast";
import { apiurl } from "../global/Api.jsx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../app/authSlice.js";
import Loader from "../global/Loader.jsx";

const DeleteAttedance = () => {
  

  const { attendanceId } = useParams();
  //console.log(attendanceId);
  
  const user = JSON.parse(localStorage.getItem("user"));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loading = useSelector((state) => state.loading);

  const onSubmit = async () => {
    dispatch(setLoading(true));

    try {
      const response = await axios.delete(
        `${apiurl}/admin/deleteAttendance/${attendanceId}`,
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
      toast.error("Attendance Deleted Failed");
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
        <h2 className="text-red-500 font-satoshi font-extrabold text-2xl text-center mb-4">
          Delete Attendance
        </h2>
          {/* Button */}
          <div>
            <Button
            onClick={onSubmit}
              className={`text-white  mt-8 transition-all duration-500 bg-red-500 hover:bg-red-500-600`}
            >
              {"Confrim Delete"}
            </Button>
          </div>
      </div>
    </div>
  );
};

export default DeleteAttedance;
