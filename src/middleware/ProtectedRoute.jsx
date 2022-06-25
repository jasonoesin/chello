import React from "react";
import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { UserAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, nav } = UserAuth();

  if (!user) {
    console.log(user);
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;
