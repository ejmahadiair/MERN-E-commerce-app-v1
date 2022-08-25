import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ redirectPath = "/account" }) => {
  const { loading, isAuthenticated } = useSelector((state) => state.user);
  if (!loading && isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to={redirectPath} />;
  }
};

export default ProtectedRoute;
