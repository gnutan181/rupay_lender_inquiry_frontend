import React, { useState, useEffect, useRef } from "react";

// import all required images.
import logo from "../../assets/Logo/logo.png";
import PropTypes from "prop-types";

import { NavLink } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';

import { useLocation } from "react-router-dom";

import { IoIosArrowDown } from "react-icons/io";

const Dropdown = ({ title, children }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="dropdown">
      <div className="flex items-center justify-between">
        <div className="p-2 bg-[#3B3935] w-full text-left">{title}</div>
        <IoIosArrowDown
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer"
        />
      </div>
      {isOpen && <div className="dropdown-menu bg-[#3B3935]">{children}</div>}
    </div>
  );
};

const DropdownItem = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      isActive
        ? "bg-[#F89D28] block p-2 text-[#FFFFFF] font-medium  text-base md:text-lg"
        : "block p-2 hover:bg-[#f89e282a] text-[#FFFFFF] font-medium  text-base md:text-lg"
    }
  >
    {children}
  </NavLink>
);

const SideBar = ({ displaySideBar, setDisplaySideBar }) => {
  // const navigate = useNavigate();

  // store value of side bar full opened or half
  const [open] = useState(true);

  // // get current pathname.
  const { pathname } = useLocation();

  // side bar ref
  const sideBarRef = useRef(null);

  // if click on outside the side bar. then side bar will close.
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
        // dispatch(setDisplaySideBar(false))
        setDisplaySideBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setDisplaySideBar]);

  // const handleLogout = ()=>{
  //   sessionStorage.removeItem('token')
  //   navigate('/login')
  // }

  return (
    <div
      className={`z-40  h-[100vh] shrink-0  bottom-0 absolute w-full lg:w-fit  ${
        displaySideBar
          ? "left-0 transition-all duration-300"
          : "left-[-100%] transition-all duration-300"
      } lg:static`}
    >
      <div
        ref={sideBarRef}
        className={` ${
          open ? "w-[250px]" : "w-[250px] sm:w-20"
        } py-[1rem] bg-[#3B3935] font-Hind bg-dark-purple transition-all h-full pb-2 duration-300 relative flex flex-col justify-start lg:justify-betweens`}
      >
        <div className="h-[4rem] flex items-center justify-center gap-2">
          <img src={logo} alt="logo" className="h-10 md:h-12" />
          <h1 className="text-[#F89D28] font-bold text-base md:text-lg uppercase">
            Rupay lender
          </h1>
        </div>

        <div className="bg-[#3B3935] text-white">
          <ul className="h-[85vh] overflow-y-scroll scrollbar-thin  scrollbar-track-[#3B3935] scrollbar-thumb-[#F89D28]">
            {
              [
                {title: 'Home Loan', route : '/service/home-loan'},
                {title: 'Hlbt', route : '/service/hlbt-loan'},
                {title: 'Personal Loan', route : '/service/personal-loan'},
                {title: 'Plbt', route : '/service/plbt-loan'},
                {title: 'Lap', route : '/service/lap-loan'},
                {title: 'Lapbt', route : '/service/lap-bt-loan'},
                {title: 'Credit Card', route : '/service/credit-card'},
                {title: 'Business Loan', route : '/service/business-loan'},
              ].map((val,index)=>{
                return(
                  <li key={index} className="mx-4 my-2">
              <NavLink
                to={val.route}
                className={({ isActive }) =>
                  isActive
                    ? "bg-[#F89D28] block p-2 text-[#FFFFFF] font-medium  text-base md:text-lg rounded-md"
                    : "block p-2 hover:bg-[#f89e282a] text-[#FFFFFF] font-medium  text-base md:text-lg"
                }
              >
                {val.title}
              </NavLink>
            </li>
                )

              })
            }

            
            
          </ul>
        </div>
      </div>
    </div>
  );
};
Dropdown.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
SideBar.propTypes = {
  displaySideBar: PropTypes.bool.isRequired,
  setDisplaySideBar: PropTypes.func.isRequired,
};
DropdownItem.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
export default SideBar;
