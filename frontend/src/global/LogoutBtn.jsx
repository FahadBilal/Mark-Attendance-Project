import React from "react";
import Button from "../global/Button.jsx";
import { toast } from "react-hot-toast";
import { apiurl } from "../global/Api.jsx";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout, setLoading } from "../app/authSlice.js";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const user = JSON.parse(localStorage.getItem("user"));

  const onSubmit = async () => {
    if(!user?.accessToken){
      toast.error("You are not logged In");
      return;
    }
    dispatch(setLoading(true));

    try {
      const response = await axios.post(
        `${apiurl}/users/logout`,
        {},
        {
          headers:{
            Authorization:`Bearer ${user.accessToken}`
          },
        }
      );
      //console.log(response);
      dispatch(logout());
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error("Logout Failed. Please try again.");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Button
        type="Submit"
        onClick={onSubmit}
        className={`text-black  transition-all duration-500  hover:bg-pink-500 hover:text-white`}
      >
        {"Logout"}
      </Button>
    </div>
  );
};

export default Logout;
