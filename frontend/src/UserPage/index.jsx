import React from "react";
import Logout from "../global/LogoutBtn";
import MarkAttendance from "./MarkAttendance.jsx";
import Button from "../global/Button.jsx";
import ViewAttendanceRecord from "./ViewAttendanceRecord.jsx";
import { Link } from "react-router-dom";

const UserPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="max-w-full bg-pink-500 md:h-screen ">
        <div className="sm:p-6 p-2 bg-white shadow-lg rounded-b-lg h-24 flex justify-between items-center ">
          <h1 className="font-satoshi sm:text-3xl text-2xl text-pink-500 font-extrabold">
            Student Dashboard
          </h1>
          <div className=" flex items-center sm:gap-4 gap-2">
            <h4 className="font-satoshi sm:text-2xl text-xl  text-black font-bold">
              {user.user.fullName}
            </h4>
            <Logout />
          </div>
        </div>
        <div className="w-48 h-48 mt-8 mx-auto">
          <img
            src={user.user.profileImage}
            alt="UserImage"
            className="object-cover rounded-full w-full  "
          />
        </div>

        {/* Grid */}
        <div className="mt-20 sm:p-6 p-2 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-8 gap-10">
          {/* Mark Attendance */}
          <div>
            <h2 className="text-center text-2xl font-satoshi font-bold sm:mb-6 mb-3 text-white">
              Today Attendance
            </h2>
            <MarkAttendance />
          </div>
          {/* Leave Request */}
          <div>
            <h2 className="text-center text-2xl font-satoshi font-bold sm:mb-6 mb-3 text-white">
              Leave Request
            </h2>
            <div className="w-full p-6 bg-white rounded-xl">
              <Link to={"/student/leaveRequest"}>
                <Button
                  className={`bg-green-500 hover:bg-green-600 text-white transition-all duration-300`}
                >
                  {"Request"}
                </Button>
              </Link>
            </div>
          </div>
          {/* Attendance Record */}
          <div>
            <h2 className="text-center text-2xl font-satoshi font-bold sm:mb-6 mb-3 text-white">
              Attendance Record
            </h2>
            <ViewAttendanceRecord />
          </div>
        </div>
        <div className="mt-10 absolute right-10 bottom-10">
          <Link to={"/student/changePassword"}>
            <p className="text-white underline font-poppins text-[16px] font-medium hover:text-red-200">
              Change Password
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserPage;
