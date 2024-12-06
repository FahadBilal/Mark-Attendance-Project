import React from "react";
import Button from "../global/Button.jsx";
import { toast } from "react-hot-toast";
import { apiurl } from "../global/Api.jsx";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../app/authSlice.js";

const GenerateGrade = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const onSubmit = async () => {
    if (!user?.accessToken) {
      toast.error("You are not logged In");
      return;
    }
    dispatch(setLoading(true));

    try {
      const response = await axios.post(
        `${apiurl}/admin/generateGrade`,
        {},
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      console.log(response.data.data);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("All Grade Generated Failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="w-full p-6  bg-white rounded-xl">
      <Button
        className={`bg-emerald-500 hover:bg-emerald-600 text-white transition-all duration-300`}
        onClick={onSubmit}
      >
        {"Generate Grade"}
      </Button>
    </div>
  );
};

export default GenerateGrade;
