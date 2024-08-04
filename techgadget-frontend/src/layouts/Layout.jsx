import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar/NavBar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import AnouncementBar from "../components/AnouncementBar";
import { Toaster } from "react-hot-toast";
import Modal from "react-modal";

Modal.setAppElement("#root");

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsModalOpen(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Toaster position="top-center" />
      <AnouncementBar />
      <NavBar />
      <Outlet />
      <Footer />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="fixed inset-0 flex items-center justify-center z-50"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 z-40"
      >
        <div className="bg-white p-6 rounded-lg shadow-lg z-50 mx-20 my-20">
          <h2 className="text-sm lg:text-xl font-bold mb-4">
            Thank you for visiting our website. Please note that this site is
            currently under active development. As we work to improve and
            enhance your experience, you may encounter some missing features or
            unstable components.
          </h2>
          <h2 className="text-sm lg:text-xl font-bold mb-4">
            We appreciate your patience and understanding as we continue to make
            updates and improvements. If you experience any issues or have any
            feedback, please don't hesitate to contact us.
          </h2>
          <h2 className="text-sm lg:text-xl font-bold mb-4">
            Thank you for your support!
          </h2>

          <button
            onClick={closeModal}
            className="mt-4 bg-black text-white py-2 px-4 hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Layout;
