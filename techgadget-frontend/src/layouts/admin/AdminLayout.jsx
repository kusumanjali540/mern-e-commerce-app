import React from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { Outlet } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const AdminLayout = () => {
  return (
    <div>
      <Toaster position="top-center" />
      <AdminNavbar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
