import React from "react";
import { Link } from "react-router-dom";

const QuickLinks = () => {
  return (
    <div className="w-full py-8 px-4 border-b border-t">
      <div className="flex flex-col justify-center items-start md:items-center gap-8 px-8">
        <h1 className="text-2xl">Quick links</h1>
        <div className="flex flex-col md:flex-row text-slate-500 gap-4 justify-center items-start gap-x-4">
          <Link to="blogs">Blogs</Link>
          <Link to="customer-service/privacy-policy">Privacy Policy</Link>
          <Link to="customer-service/refund-policy">Refund Policy</Link>
          <Link to="customer-service/terms-of-service">Terms of Service</Link>
        </div>
      </div>
    </div>
  );
};

export default QuickLinks;
