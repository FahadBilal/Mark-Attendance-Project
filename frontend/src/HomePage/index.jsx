import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-pink-500 h-screen">
      {/* Navbar */}
      <nav className="max-w-[1350px] h-20 mx-auto px-2 flex justify-between items-center">
        <div>
          <img
            src="images/unnamed.png"
            alt="logo-image"
            className="w-16 h-16 object-cover "
          />
        </div>
        <div>
          <ul className="flex items-center gap-8">
            <li>
              <Link
                to={"/login"}
                className="text-white text-[18px] leading-5 font-poppins font-medium px-3 py-2 rounded-lg transition-all duration-500 hover:bg-white hover:text-pink-500 "
              >
                Sign In
              </Link>
            </li>
            <li>
              <Link
                to={"/register"}
                className="text-white text-[18px] leading-5 font-poppins font-medium px-3 py-2 rounded-lg transition-all duration-500 hover:bg-white hover:text-pink-500 "
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* heading */}
      <div className="max-w-[1350px] mx-auto px-2 flex justify-center h-[calc(100vh-80px)] items-center">
        <h1
        className="text-[100px] text-yellow-100 font-satoshi font-extrabold leading-10"
        >
          Attendance Mark
        </h1>
      </div>
    </div>
  );
};

export default Home;
