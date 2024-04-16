import React from "react";
import AdminNavbar from "../../components/admin/AdminNavbar";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

const AdminLayout = () => {
  const isAuth = useSelector((state) => state.admin.isAuth);

  // if (!isAuth) {
  //   return <Navigate to="/admin_auth" />;
  // }

  return (
    <div>
      <Toaster position="top-center" />
      <AdminNavbar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
