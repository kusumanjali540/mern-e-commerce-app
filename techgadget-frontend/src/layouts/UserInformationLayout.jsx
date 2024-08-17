import React from "react";
import { Outlet } from "react-router-dom";
import { useFetchCustomerBySessionQuery } from "../features";
import Tab from "../components/UserInformation/Tab";

const UserInformation = () => {
  const { data, isFetching, isError, refetch } =
    useFetchCustomerBySessionQuery();

  console.log(data);
  if (isFetching) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error has occurred!</div>;
  }

  return (
    <div>
      <Tab />
      <Outlet />
    </div>
  );
};

export default UserInformation;
