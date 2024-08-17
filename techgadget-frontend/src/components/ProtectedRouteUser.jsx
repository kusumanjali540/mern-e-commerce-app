import { Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useCurrentUserQuery } from "../features";

// If not logged in, redirect to auth page
const ProtectedRouteUser = ({ children }) => {
  const { data: user, isLoading, isError, refetch } = useCurrentUserQuery();
  const location = useLocation();

  useEffect(() => {
    refetch();
  }, [location.key]);

  console.log("User", user?.currentCustomer);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if(isError) {
    return <div>Oops! Something went wrong!</div>
  }

  if (!user?.currentCustomer) {
    return <Navigate to="/signin" />;
  }

  return children;
};

export default ProtectedRouteUser;
