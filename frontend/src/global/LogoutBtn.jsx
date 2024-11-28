import React from "react";
import Button from "../global/Button.jsx";
import { toast } from "react-hot-toast";
import { apiurl } from "../global/Api.jsx";
import axios from "axios";

const Logout = () => {
  const onSubmit = async () => {
    try {
      const response = await axios.post(`${apiurl}/users/logout`);
      console.log(response);
      toast.success(response.data.message);
    } catch (error) {
      toast.error("Logout Failed. Please try again.");
    }
  };
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
