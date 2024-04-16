import React from "react";
import QuickLinks from "./QuickLinks";

const Footer = () => {
  return (
    <footer className="flex flex-col">
      <QuickLinks />
      <div className="py-4">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            @ 2024, Made with ❤️ by Nguyen Chi Kha
          </p>
          <p className="text-gray-600">
            Tools used: React.js, Node.js with Express, and MongoDB
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
