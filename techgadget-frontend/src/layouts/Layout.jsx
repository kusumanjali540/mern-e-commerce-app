import React from "react";
import NavBar from "../components/Navbar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import AnouncementBar from "../components/AnouncementBar";
import { Toaster } from "react-hot-toast";

const Layout = () => {
  return (
    <div>
      <Toaster position="top-center" />
      <AnouncementBar />
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
