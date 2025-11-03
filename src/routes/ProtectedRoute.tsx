import { Navigate } from "react-router-dom";
import type { JSX } from "react";

interface ProtectedRouteProps {
  children: JSX.Element;
  allowedRoles: string[];
}

export const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("userRole");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role!)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
