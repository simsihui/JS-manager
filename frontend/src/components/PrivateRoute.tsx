import { Navigate, Outlet } from "react-router-dom";

import { useAppSelector } from "../hooks";

export default function PrivateRoute() {
  const { userInfo } = useAppSelector((state) => state.auth);
  return userInfo ? <Outlet /> : <Navigate to="/login" replace />;
}
