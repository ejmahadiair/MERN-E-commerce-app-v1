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
    if (user.role !== "admin") {
      alert.error(
        "If you think you are an admin you have admin panal. Go with admin panal button."
      );
    }
    return <Navigate to={redirectPath} />;
  }
};

export default AdminProtectedRoute;
