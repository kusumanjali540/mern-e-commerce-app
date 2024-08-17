import React, { useEffect, useState } from "react";
import HambuderButton from "../shared/HamburgerButton";
import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import {
  AiOutlineArrowLeft,
  AiOutlineArrowRight,
  AiOutlineDown,
  AiOutlineShopping,
  AiOutlineUser,
} from "react-icons/ai";
import AddToCartNotification from "./AddToCartNotification";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";
import Logo from "../shared/Logo";
import HamburgerButton from "../shared/HamburgerButton";
import Search from "./Search";
import Modal from "react-modal";
import { useSelector } from "react-redux";
import DropdownArrowAnimatedIcon from "../shared/DropdownArrowAnimatedIcon";

// const customStyles = {
//   content: {
//     top: '5vh',
//     left: '0%',
//     right: 'auto',
//     bottom: 'auto',
//   },
// };

// Modal.setAppElement('#root');

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCatalog, setIsOpenCatalog] = useState(false);
  const [isOpenCService, setIsOpenCService] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const cartCount = useSelector((state) => state.cart.count);
  const location = useLocation();

  useEffect(() => {
    handleCloseNav();
  }, [location]);

  const toggleNav = () => {
    setIsOpen(!isOpen);
  };

  const handleCatalogClick = (event) => {
    event.preventDefault();
    setIsOpenCService(false);
    setIsOpenCatalog(!isOpenCatalog);
  };

  const handleCServiceClick = (event) => {
    event.preventDefault();
    setIsOpenCatalog(false);
    setIsOpenCService(!isOpenCService);
  };

  const handleCloseNav = () => {
    setIsOpen(false);
    setIsOpenCatalog(false);
    setIsOpenCService(false);
  };

  const handleSearchOpen = () => {
    console.log("Click");
    setSearchOpen(true);
  };

  return (
    <div className="flex flex-row sticky top-0 px-10 lg:px-48 justify-between items-center h-[15vh] w-full bg-white border-b-2 z-[100]">
      <Search
        setIsOpen={setSearchOpen}
        className={`${searchOpen ? "block" : "hidden"}`}
      />

      <div className="flex-1 lg:hidden">
        <HamburgerButton
          onChange={toggleNav}
          isOpen={isOpen}
          className="self-start"
        />
      </div>
      <div className="flex justify-start h-full lg:pr-10">
        <Link to="/">
          <Logo />
        </Link>
      </div>
      <div className="hidden lg:block flex-grow">
        <div className="flex flex-row justify-start gap-8">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              [isActive ? "text-black text-lg" : "text-slate-600"].join(" ")
            }
            onClick={handleCloseNav}
          >
            Home
          </NavLink>
          <NavLink
            to="products"
            className={({ isActive }) =>
              [
                isActive ? "text-black text-lg" : "text-slate-600",
                "relative",
              ].join(" ")
            }
          >
            <button
              onClick={handleCatalogClick}
              className="flex flex-row justify-between items-center gap-2"
            >
              Catalog
              <DropdownArrowAnimatedIcon isOpen={isOpenCatalog} />
            </button>
            {isOpenCatalog && (
              <div className="absolute flex flex-col justify-center items-start top-full border rounded-sm bg-white w-52 p-4">
                <NavLink to="/products/earbuds" className="hover:underline">
                  Earbuds
                </NavLink>
                <NavLink to="/products/speakers" className="hover:underline">
                  Speakers
                </NavLink>
                <NavLink to="/products/mouse" className="hover:underline">
                  Mouse
                </NavLink>
              </div>
            )}
          </NavLink>
          <NavLink
            to="customer-service"
            className={({ isActive }) =>
              [
                isActive ? "text-black text-lg" : "text-slate-600",
                "relative",
              ].join(" ")
            }
          >
            <button
              onClick={handleCServiceClick}
              className="flex flex-row justify-between items-center gap-2"
            >
              Customer Service
              <DropdownArrowAnimatedIcon isOpen={isOpenCService} />
            </button>
            {isOpenCService && (
              <div className="absolute flex flex-col justify-center items-start top-full border rounded-sm bg-white w-52 p-4">
                <NavLink
                  to="/customer-service/privacy-policy"
                  className="hover:underline"
                >
                  Privacy Policy
                </NavLink>
                <NavLink
                  to="/customer-service/refund-policy"
                  className="hover:underline"
                >
                  Refund Policy
                </NavLink>
                <NavLink
                  to="/customer-service/terms-of-service"
                  className="hover:underline"
                >
                  Terms Of Service
                </NavLink>
                <NavLink
                  to="/customer-service/contact"
                  className="hover:underline"
                >
                  Contact Us
                </NavLink>
              </div>
            )}
          </NavLink>
        </div>
      </div>
      <div className="flex-1">
        <div className="flex flex-row gap-x-4 justify-end items-center">
          <div>
            <button onClick={handleSearchOpen}>
              <AiOutlineSearch className="text-2xl md:text-4xl" />
            </button>
          </div>

          <div>
            <Link to="/cart">
              <button className="relative">
                <AiOutlineShopping className="text-2xl md:text-4xl" />
                <div className="absolute right-0 bottom-0 rounded-full text-white bg-black text-xs px-1">
                  {cartCount}
                </div>
              </button>
            </Link>
          </div>
          <div>
            <Link to="/account">
              <AiOutlineUser className="text-2xl md:text-4xl" />
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`absolute lg:hidden left-0 top-full bg-white transition-all h-[100vh] ${
          isOpen ? "w-full" : "w-0"
        } overflow-hidden z-40`}
      >
        <div className="relative h-full border">
          <div className="flex flex-col py-8 h-full">
            <div className="px-8 pt-4 h-14 hover:bg-slate-300">
              <NavLink
                to="/"
                end
                className="active:bg-slate-600"
                onClick={handleCloseNav}
              >
                Home
              </NavLink>
            </div>
            <div className="px-8 pt-4 h-14  hover:bg-slate-300">
              <NavLink to="catalog">
                <button
                  onClick={handleCatalogClick}
                  className="flex w-full flex-row justify-between items-center"
                >
                  Catalog
                  <AiOutlineArrowRight />
                </button>
              </NavLink>
            </div>
            <div className="px-8 pt-4 h-14  hover:bg-slate-300">
              <NavLink to="customer-service">
                <button
                  onClick={handleCServiceClick}
                  className="flex w-full flex-row justify-between items-center"
                >
                  Customer Service
                  <AiOutlineArrowRight />
                </button>
              </NavLink>
            </div>
          </div>

          <div
            className={`${
              isOpenCatalog ? "w-full" : "w-0"
            } absolute lg:hidden right-0 top-0 flex flex-col bg-white transition-all h-full overflow-hidden z-50`}
          >
            <button
              onClick={handleCatalogClick}
              className="flex flex-row justify-start items-center px-8 h-14 text-sm bg-slate-600"
            >
              <AiOutlineArrowLeft className="mr-4" />
              Catalog
            </button>
            <NavLink
              className="px-8 pt-4 h-14  hover:bg-slate-300"
              onClick={handleCloseNav}
              to="/products/earbuds"
            >
              Earbuds
            </NavLink>
            <NavLink
              className="px-8 pt-4 h-14  hover:bg-slate-300"
              onClick={handleCloseNav}
              to="/products/mouse"
            >
              Mouse
            </NavLink>
            <NavLink
              className="px-8 pt-4 h-14  hover:bg-slate-300"
              onClick={handleCloseNav}
              to="/products/speakers"
            >
              Speakers
            </NavLink>
          </div>

          <div
            className={`${
              isOpenCService ? "w-full" : "w-0"
            } absolute lg:hidden right-0 top-0 flex flex-col bg-white transition-all h-full overflow-hidden z-50`}
          >
            <button
              onClick={handleCServiceClick}
              className="flex flex-row justify-start items-center px-8 h-14 text-sm bg-slate-600"
            >
              <AiOutlineArrowLeft className="mr-4" />
              Customer Service
            </button>
            <NavLink
              className="px-8 pt-4 h-14  hover:bg-slate-300"
              onClick={handleCloseNav}
              to="/customer-service/privacy-policy"
            >
              Privacy Policy
            </NavLink>
            <NavLink
              className="px-8 pt-4 h-14  hover:bg-slate-300"
              onClick={handleCloseNav}
              to="/customer-service/refund-policy"
            >
              Refund Policy
            </NavLink>
            <NavLink
              className="px-8 pt-4 h-14  hover:bg-slate-300"
              onClick={handleCloseNav}
              to="/customer-service/terms-of-service"
            >
              Terms Of Service
            </NavLink>
            <NavLink
              className="px-8 pt-4 h-14  hover:bg-slate-300"
              onClick={handleCloseNav}
              to="/customer-service/contact"
            >
              Contact Us
            </NavLink>
          </div>
        </div>
      </div>
      <AddToCartNotification />
    </div>
  );
};

export default NavBar;
