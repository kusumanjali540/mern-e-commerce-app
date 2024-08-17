import React from "react";
import QuickLinks from "./QuickLinks";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col">
      <QuickLinks />
      <div className="py-4 flex flex-col items-center gap-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">@ 2024, Made by Nguyen Chi Kha</p>
          <p className="text-gray-600">
            Tools used: React.js, Node.js with Express, and MongoDB
          </p>
        </div>
        <div className="w-40 p-4 bg-black text-white">
          <Link to="/admin">Go to Admin Page</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
