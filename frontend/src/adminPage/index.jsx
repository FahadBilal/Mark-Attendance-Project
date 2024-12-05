import React from "react";
import Logout from "../global/LogoutBtn";
import { Link } from "react-router-dom";
import ChangeProfile from "../UserPage/ChangeProfile";

const AdminPage = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="max-w-full bg-pink-500 md:h-screen relative ">
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
        <div className="w-48 h-48 mt-8  rounded-full mx-auto relative">
          <img
            src={user.user.profileImage}
            alt="UserImage"
            className="object-cover object-center w-full rounded-full "
          />
          <ChangeProfile className="absolute bottom-0 right-0"/>
        </div>

        <div className="mt-10 absolute right-10 sm:bottom-10 bottom-5">
          <Link to={"/admin/changePassword"}>
            <p className="text-white underline font-poppins text-[16px] font-medium hover:text-green-500">
              Change Password
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default AdminPage;
