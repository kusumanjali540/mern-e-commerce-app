import React, { useEffect } from "react";
import { useCurrentAdminQuery } from "../../features";
import { Navigate } from "react-router-dom";

const RedirectIfAutheticated = ({ children }) => {
  const { data: admin, isLoading, isError, refetch } = useCurrentAdminQuery();

  useEffect(() => {
    refetch();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if(isError) {
    return <div>An error has occured!</div>
  }

  if (admin?.currentAdmin) {
    return <Navigate to="/admin" />;
  }

  return children;
};

export default RedirectIfAutheticated;
