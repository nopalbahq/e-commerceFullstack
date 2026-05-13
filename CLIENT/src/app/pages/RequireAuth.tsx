import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUseInfoQuery } from "./account/accountApi";

export default function RequireAuth() {
  const { data: user, isLoading } = useUseInfoQuery();
  const location = useLocation();

  if (isLoading) return <div>..isLoading</div>;

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return <Outlet />;
}
