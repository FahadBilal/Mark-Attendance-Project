import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const AuthLayout = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loading, setLoading]=useState(true)

  const user = useSelector((state) => state.user);

  useEffect(()=>{
    if (authentication && !user) {
        navigate("/login");
      }else if(user){
        navigate(user.role==="admin"?"/admin":"/student");
      }
      setLoading(false);
  },
  [navigate,authentication,user])
  

  return loading? <Loader/>:<>{children}</>
};

export default AuthLayout;
