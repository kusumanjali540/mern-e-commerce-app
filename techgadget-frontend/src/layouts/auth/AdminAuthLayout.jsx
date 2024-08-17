import React from "react";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";

const AdminAuthLayout = () => {
  return (
    <div>
      <Toaster />
      <Outlet />
    </div>
  );
};

export default AdminAuthLayout;
