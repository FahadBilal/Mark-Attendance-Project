import React from "react";
import Logout from "../global/LogoutBtn";
import { Link } from "react-router-dom";
import ChangeProfile from "../UserPage/ChangeProfile";
import AllUser from "./AllUser.jsx";
import AllAttendance from "./AllAtendaces.jsx";
import Loader from "../global/Loader.jsx";
import { useSelector } from "react-redux";
import Button from "../global/Button.jsx";

const AdminPage = () => {
  const loading = useSelector((state) => state.loading);
  const user = JSON.parse(localStorage.getItem("user"));

  if (loading) {
    return <Loader className={`bg-red-500`} />;
  }

  return (
    <>
      <div className="max-w-full bg-red-500 min-h-screen relative ">
        <div className="sm:p-6 p-2 bg-white shadow-lg rounded-b-lg h-24 flex justify-between items-center ">
          <h1 className="font-satoshi sm:text-3xl text-2xl text-red-500 font-extrabold">
            Admin Dashboard
          </h1>
          <div className=" flex items-center sm:gap-4 gap-2">
            <h4 className="font-satoshi sm:text-2xl text-xl  text-black font-bold">
              {user.user.fullName}
            </h4>
            <Logout className={`hover:bg-red-600`} />
          </div>
        </div>
        {/* ProfileImage */}
        <div className="w-48 h-48 mt-8  rounded-full mx-auto relative">
          <img
            src={user.user.profileImage}
            alt="UserImage"
            className="object-cover object-center w-full rounded-full "
          />
          <ChangeProfile className="absolute bottom-0 right-0" />
        </div>

        {/* Grid */}
        <div className="mt-20 sm:p-6 p-2 grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-8 gap-10 sm:pb-0 pb-20">
          {/* Mark Attendance */}
          <div>
            <h2 className="text-center text-2xl font-satoshi font-bold sm:mb-6 mb-3 text-white">
              All Users
            </h2>
            <AllUser />
          </div>

          {/* Attendance Record */}
          <div>
            <h2 className="text-center text-2xl font-satoshi font-bold sm:mb-6 mb-3 text-white">
              All Attendance Records
            </h2>
            <AllAttendance />
          </div>

          {/* Create Attendance */}
          <div>
            <h2 className="text-center text-2xl font-satoshi font-bold sm:mb-6 mb-3 text-white">
              Create Attendance 
            </h2>
            <Link to={"/admin/createAttendance"}>
            <div className="w-full p-6  bg-white rounded-xl">
              <Button
                className={`bg-emerald-500 hover:bg-emerald-600 text-white transition-all duration-300`}
              >
                {"Create"}
              </Button>
            </div>
            </Link>
          </div>


        </div>

        {/* ChangePassword */}
        <div className="mt-10 absolute right-10 sm:bottom-10 bottom-5">
          <Link to={"/admin/changePassword"}>
            <p className="text-white underline font-poppins text-[16px] font-medium hover:text-emerald-500">
              Change Password
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
