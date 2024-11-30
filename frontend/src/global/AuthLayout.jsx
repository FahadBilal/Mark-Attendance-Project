import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const AuthLayout = ({ children, authentication = true }) => {
  const navigate = useNavigate();
  const [loading, setLoading]=useState(true)

  const authStatus = useSelector((state) => state.status);

  useEffect(()=>{
    // if (authentication && authStatus !== authentication) {
    //     navigate("/login");
    //   } else if (!authentication && authStatus !== authentication) {
    //     navigate("/");
    //   }
      setLoading(false);
  },
  [navigate,authentication,authStatus])
  

  return loading? <Loader/>:<>{children}</>
};

export default AuthLayout;
