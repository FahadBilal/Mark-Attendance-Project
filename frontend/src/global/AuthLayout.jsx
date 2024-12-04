import React from "react";
import { Navigate } from "react-router-dom";
import Loader from "./Loader";
import { useEffect } from "react";

const ProtectedRoute = ({ children, role = "student" }) => {
  const [loading, setLoading] = React.useState(true);
  const user = JSON.parse(localStorage.getItem("user"))

  useEffect(() => {
    // Simulate loading for role validation
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
    // If user is not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  if (user.user.role !== role) {
    // If user role doesn't match, redirect to unauthorized page or dashboard
    return <Navigate to={`/${user.user.role}`} />;
  }

  // Render children if all checks pass
  return children;
};

export default ProtectedRoute;
