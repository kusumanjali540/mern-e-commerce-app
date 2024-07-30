import React from "react";
import QuickLinks from "./QuickLinks";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="flex flex-col">
      <QuickLinks />
      <div className="relative py-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            @ 2024, Made by Nguyen Chi Kha
          </p>
          <p className="text-gray-600">
            Tools used: React.js, Node.js with Express, and MongoDB
          </p>
        </div>
        <Link className="absolute p-4 bg-black text-white right-8 top-1/2 -translate-y-1/2">Go to Admin Page</Link>
      </div>
    </footer>
  );
};

export default Footer;
