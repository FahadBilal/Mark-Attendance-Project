import React from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { setLoading } from "../app/authSlice";
import { apiurl } from "../global/Api.jsx";
import axios from "axios";
import Button from "../global/Button.jsx";


const MarkAttendance = () => {

  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));


  const markAttendance = async () => {
    if (!user?.accessToken) {
      toast.error("You need to logged In to mark the attendance");
      return;
    }

    dispatch(setLoading(true));
    try {
      const response = await axios.post(
        `${apiurl}/users/mark-attendance`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      console.log(response)
      toast.success(response.data.message);
    } catch (error) {
        toast.error("Attendance is already Marked");
    } finally {
      dispatch(setLoading(false));
    }
  };

 
  return (
    <div className="w-full p-6 bg-white rounded-xl">
      <Button
        onClick={markAttendance}
        className={`bg-green-500 hover:bg-green-600 text-white transition-all duration-300`}
      >
        { "Mark Attendance"}
      </Button>
    </div>
  );
};

export default MarkAttendance;
