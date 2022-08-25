import React from "react";
import { useAlert } from "react-alert";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectedRoute = ({ redirectPath = "/account" }) => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const alert = useAlert();
  if (isAuthenticated && user.role === "admin") {
    return <Outlet />;
  } else {
    alert.error("You are not an admin");
    return <Navigate to={redirectPath} />;
  }
};

export default AdminProtectedRoute;
