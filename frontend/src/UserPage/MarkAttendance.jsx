import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { setLoading } from "../app/authSlice";
import { apiurl } from "../global/Api.jsx";
import axios from "axios";
import Button from "../global/Button.jsx";
import Loader from "../global/Loader.jsx";

const MarkAttendance = () => {
  const [isMarked, setIsMarked] = useState(false);

  const loading = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const attendanceDate = localStorage.getItem("attendanceDate");
    const today = new Date().toISOString().split("T")[0];

    if (attendanceDate === today) {
      toast.error("Attendance is already Marked");
      setIsMarked(true);
    }
  }, []);

  const markAttendance = () => {
    if (!user?.accessToken) {
      toast.error("You need to logged In to mark the attendance");
      return;
    }

    dispatch(setLoading(true));
    try {
      const today = new Date().toISOString().split("T")[0];

      const response = axios.post(
        `${apiurl}/users/mark-attendance`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      localStorage.setItem("attendanceDate", today);

      toast.success(response.data.message);
      setIsMarked(true);
    } catch (error) {
      toast.error("Failed to mark Attendance");
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (loading) {
    <Loader />;
    return;
  }
  return (
    <div className="w-full p-6 bg-white rounded-xl">
      <Button
        onClick={markAttendance}
        disabled={isMarked}
        className={`bg-green-500 hover:bg-green-600 text-white transition-all duration-300 ${
          isMarked ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {`${isMarked ? "Attendance Marked" : "Mark Attendance"}`}
      </Button>
    </div>
  );
};

export default MarkAttendance;
