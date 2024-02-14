import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router";
import { userContext } from "../context/userContext";

function PrivateRoute({ isLoginOpen, setIsLoginOpen, check }) {
  const { user } = useContext(userContext);
  if (check.includes(user?.role) && user) {
    return (
      <Outlet />
    )
  } else {
    setIsLoginOpen(true)
    return (
      <Navigate to={'/'} />
    )
  }
}

export default PrivateRoute;