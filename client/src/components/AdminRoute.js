import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = (props) => {
  const { user } = useSelector((state) => state.user);

  if (user && user.isAdmin === true) {
    return props.children;
  } else {
    return <Navigate to="/login" />;
  }
};

export default AdminRoute;
