import React, { useEffect } from "react";
import { toast } from "react-toastify";
import getDecodedToken from "../../utils/decodeToken";
const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem("token");
  const role = getDecodedToken()?.role || "";

  useEffect(() => {
    if (!(token && allowedRoles.includes(role))) {
      toast.error("Unauthorized access");
    }
  }, [token, role, allowedRoles]);

  if (token && allowedRoles.includes(role)) {
    return children;
  } else {
    return null;
  }
};

export default ProtectedRoute;
