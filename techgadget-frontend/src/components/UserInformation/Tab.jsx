import React, { useEffect, useRef, useState } from "react";
import { Navigate, NavLink, useNavigate } from "react-router-dom";
import { useSignOutUserMutation } from "../../features/apis/userAuthApi";
import TailSpin from "react-loading-icons/dist/esm/components/tail-spin";

const Tab = () => {
  const navigate = useNavigate();
  const [logout, { isLoading, isError }] = useSignOutUserMutation();
  const [activeIndex, setActiveIndex] = useState(0);
  const handleTabClick = (index) => {
    setActiveIndex(index);
  };

  const ulRef = useRef(null);
  const [ulWidth, setUlWidth] = useState(0);

  const tabs = [
    { to: "address", tabName: "Address" },
    { to: "order", tabName: "Orders" },
  ];

  useEffect(() => {
    // Create a ResizeObserver instance
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        setUlWidth(entry.contentRect.width);
      }
    });

    // Start observing the <ul> element
    if (ulRef.current) {
      resizeObserver.observe(ulRef.current);
    }

    // Cleanup the observer on component unmount
    return () => {
      if (ulRef.current) {
        resizeObserver.unobserve(ulRef.current);
      }
    };
  }, []);

  const handleLogOut = async () => {
    console.log("I called");
    await logout();
    if (!isError) {
      navigate("/account");
    }
  };

  return (
    <div className="navbar w-full h-14 border-b-[1px] gap-x-4 flex justify-center">
      <ul
        ref={ulRef}
        className="w-1/2 h-full flex flex-row justify-center items-center relative"
      >
        {tabs.map((tab, index) => (
          <li key={tab.to} className="w-1/3 h-full">
            <NavLink
              to={tab.to}
              className={`w-full h-full flex justify-center items-center hover:underline hover:cursor-pointer ${
                activeIndex === index ? "bg-slate-400" : ""
              }`}
              onClick={() => handleTabClick(index)}
            >
              {tab.tabName}
            </NavLink>
          </li>
        ))}
        <li
          className={`w-1/3 h-full flex justify-center items-center hover:underline hover:cursor-pointer`}
        >
          <div onClick={handleLogOut}>
            {isLoading ? (
              <TailSpin
                stroke="black"
                strokeOpacity={0.25}
                speed={1.5}
                width="5px"
                height="5px"
              />
            ) : (
              "Log Out"
            )}
          </div>
        </li>
        <div
          className="absolute bottom-0 left-[16%] h-0 w-0 border-b-black border-b-[5px] border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent transition-all duration-500 ease-in-out indicator"
          style={{
            transform: `translateX(${activeIndex * parseFloat(ulWidth / 3)}px)`,
          }}
        ></div>
      </ul>
    </div>
  );
};

export default Tab;
