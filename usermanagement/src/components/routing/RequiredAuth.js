import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "./useAuth";
import Admin from "../admin/Admin";

const RequireAuth = ({ allowedRoles, children }) => {
  const { auth } = useAuth();
  const location = useLocation();

  const role = localStorage.getItem("role");

  console.log(location);

  return [role]?.find((role) => allowedRoles?.includes(role)) &&
    role === "ADMIN" ? (
    <div>
      <Admin />
      <Outlet/> 
    </div> 
  ) : [role]?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : (
    <Navigate to="/" replace />
  );
};

export default RequireAuth;
