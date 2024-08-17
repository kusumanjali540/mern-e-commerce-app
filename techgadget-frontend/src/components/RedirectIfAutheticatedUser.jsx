import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useCurrentUserQuery } from "../features";

// If logged in, redirect user
const RedirectIfAutheticatedUser = ({ children }) => {
  const { data: user, isLoading, isError, refetch } = useCurrentUserQuery();

  useEffect(() => {
    refetch();
  }, []);

  console.log(user?.currentCustomer);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if(isError) {
    return <div>Oops, Something went wrong!</div>
  }

  if (user?.currentCustomer) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RedirectIfAutheticatedUser;
