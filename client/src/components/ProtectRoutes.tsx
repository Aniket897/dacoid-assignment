import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

interface ProtectRoutesProps {
  type: "dashboard" | "auth";
}

function ProtectRoutes({ type }: ProtectRoutesProps) {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  // protecting auth routes
  if (type == "auth") {
    if (isAuthenticated) {
      return <Navigate to={"/dashboard"} />;
    } else {
      return <Outlet />;
    }
  }

  // protecting dashboard / private routes
  if (type == "dashboard") {
    if (!isAuthenticated) {
      return <Navigate to={"/login"} />;
    } else {
      return <Outlet />;
    }
  }
}

export default ProtectRoutes;
