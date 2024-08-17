import { Navigate, useLocation } from "react-router-dom";
import { useCurrentAdminQuery } from "../../features";
import { useEffect } from "react";

const ProtectedRouteAdmin = ({ children }) => {
  const { data: admin, isLoading, isError, refetch } = useCurrentAdminQuery();
  const location = useLocation();

  useEffect(() => {
    refetch();
  }, [location.key]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error has occured!</div>;
  }

  if (!admin.currentAdmin) {
    return <Navigate to="/admin_auth" />;
  }

  return children;
};

export default ProtectedRouteAdmin;
