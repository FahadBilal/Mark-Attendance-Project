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

  const { loading } = useSelector((state) => state.loading);

  const onSubmit = async () => {
    dispatch(setLoading(true));

    try {
      const response = await axios.post(`${apiurl}/users/logout`);
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

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <Button
        type="Submit"
        onClick={onSubmit}
        className={`text-white  mt-8 transition-all duration-500 bg-blue-500 hover:bg-blue-600`}
      >
        {"Logout"}
      </Button>
    </div>
  );
};

export default Logout;
