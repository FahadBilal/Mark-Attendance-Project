import React, { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLoading } from "../app/authSlice.js";
import { FaCamera } from "react-icons/fa";
import { apiurl } from "../global/Api.jsx";

const AdminChangeProfile = ({ className }) => {
  const fileInputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Handle file selection
  const onHandleChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Save the file to state
      // console.log("File selected:", file);
      // Automatically submit the form after file selection
      onSubmit(e);
    } else {
      setSelectedFile(null); // No file selected
      console.error("No file selected");
    }
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      toast.error("File Selected before submitting");
    }

    const formData = new FormData();
    formData.append("profileImage", selectedFile);

    // Log FormData contents manually
    // for (let pair of formData.entries()) {
    //   console.log(pair[0], pair[1]); // Logs the field name and its value (file)
    // }

    dispatch(setLoading(true));

    try {
      const response = await axios.post(
        `${apiurl}/users/update-profile-Image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      // console.log("Response:", response);
      toast.success(response.data.message);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      setSelectedFile(null);
      navigate("/student")
    } catch (error) {
      console.error(
        "Error during submission:",
        error.response || error.message
      );
      toast.error("Profile Image update failed");
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className={`${className}`}>
      <form onSubmit={onSubmit} encType="multipart/form-data">
        <label
          className="inline-block mb-1 pl-1 text-[16px] font-poppins font-medium"
          htmlFor="imageFile"
        >
          <FaCamera className="text-white text-2xl cursor-pointer" />
        </label>
        <input
          id="imageFile"
          type="file"
          className="hidden"
          accept="image/*"
          onChange={onHandleChangeFile}
          ref={fileInputRef}
        />
        <button type="submit" className="text-transparent">
          submit
        </button>{" "}
        {/* Submit button (hidden) */}
      </form>
    </div>
  );
};

export default AdminChangeProfile;
