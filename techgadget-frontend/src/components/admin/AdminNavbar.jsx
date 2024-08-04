import React, { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Logo from "../shared/Logo";
import HamburgerButton from "../shared/HamburgerButton";
import { logout, useSignOutMutation } from "../../features";
import { useDispatch } from "react-redux";

const AdminNavbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signOut] = useSignOutMutation();

  const [isOpen, setIsOpen] = useState(false);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = async () => {
    dispatch(logout());

    await signOut();

    navigate("/admin");
  };

  return (
    <div className="flex flex-row sticky top-0 px-10 justify-between items-center h-[18vh] w-full bg-white border-b-2 z-[100]">
      <div className="">
        <HamburgerButton
          onChange={toggleNav}
          isOpen={isOpen}
          className="self-start"
        />
      </div>
      <div className="flex-1 h-full flex justify-center">
        <Link to="/admin/">
          <Logo />
        </Link>
      </div>
      <div className="">
        <button
          onClick={handleLogOut}
          className="w-20 h-10 bg-black text-white"
        >
          Log out
        </button>
      </div>

      <div
        className={`absolute left-0 top-full bg-white transition-all h-[80vh] ${
          isOpen ? "w-full" : "w-0"
        } overflow-hidden z-40`}
      >
        <div className="relative h-full border">
          <div className="flex flex-col py-8 h-full">
            <div className="px-8 pt-4 h-14 hover:bg-slate-600">
              <NavLink
                to="/admin/"
                end
                className="active:bg-slate-600"
                onClick={toggleNav}
              >
                Products
              </NavLink>
            </div>
            <div className="px-8 pt-4 h-14 hover:bg-slate-600">
              <NavLink
                to="customers-management"
                end
                className="active:bg-slate-600"
                onClick={toggleNav}
              >
                Customers
              </NavLink>
            </div>
            <div className="px-8 pt-4 h-14 hover:bg-slate-600">
              <NavLink
                to="carts-management"
                end
                className="active:bg-slate-600"
                onClick={toggleNav}
              >
                Carts
              </NavLink>
            </div>
            <div className="px-8 pt-4 h-14 hover:bg-slate-600">
              <NavLink
                to="orders-management"
                end
                className="active:bg-slate-600"
                onClick={toggleNav}
              >
                Orders
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminNavbar;
