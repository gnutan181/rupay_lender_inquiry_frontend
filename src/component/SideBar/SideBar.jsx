
import  { useState, useEffect, useRef } from "react";
import logo from "../../assets/Logo/logo.png";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import { department } from "../../hooks/useGetDepartment";
const SideBar = ({ displaySideBar, setDisplaySideBar }) => {
  // const { department } = useRole(); // Assuming department is an array of strings
  const [filteredItems, setFilteredItems] = useState([]);
  const sideBarRef = useRef(null);
  const [open] = useState(true);
  // const { pathname } = useLocation();
  // const {department} = useContext(UserContext)
  // List of all sidebar items
  const allItems =
    [
      { title: "Vendor Lead", route: "/vendor" },
      { title: "Home Loan", route: "/service/home-loan" },
      { title: "Home Loan Balance Transfer", route: "/service/hlbt-loan" },
      { title: "Personal Loan", route: "/service/personal-loan" },
      { title: "Personal Loan Balance Transfer", route: "/service/plbt-loan" },
      { title: "Loan Against Property", route: "/service/lap-loan" },
      { title: "Loan Against Property Balance Transfer", route: "/service/lap-bt-loan" },
      { title: "Credit Card", route: "/service/credit-card" },
      { title: "Business Loan", route: "/service/business-loan" },
    ]


  // Filter items based on the department array
  useEffect(() => {
    // console.log("allItems:", allItems);
    // console.log("department:", department);
    // if (department.length() < 1 || !Array.isArray(department)) {
    //   console.error("department is undefined or not an array");
    //   setFilteredItems([]);
    //   return;
    // }
    const filtered = allItems.filter((item) =>
      department.some((dep) =>
        item.title.toLowerCase().includes(dep.toLowerCase())
      )
    );
    setFilteredItems(filtered);
  }, []);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sideBarRef.current && !sideBarRef.current.contains(event.target)) {
        setDisplaySideBar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setDisplaySideBar]);

  return (
    <div
      className={`z-40 h-[100vh] shrink-0 bottom-0 absolute w-full lg:w-fit ${
        displaySideBar
          ? "left-0 transition-all duration-300"
          : "left-[-100%] transition-all duration-300"
      } lg:static`}
    >
      <div
        ref={sideBarRef}
        className={`${
          open ? "w-[250px]" : "w-[250px] sm:w-20"
        } py-[1rem] bg-[#3B3935] font-Hind bg-dark-purple transition-all h-full pb-2 duration-300 relative flex flex-col`}
      >
        <div className="h-[4rem] flex items-center justify-center gap-2">
          <img src={logo} alt="logo" className="h-10 md:h-12" />
          <h1 className="text-[#F89D28] font-bold text-base md:text-lg uppercase">
            Rupay lender
          </h1>
        </div>

        <div className="bg-[#3B3935] text-white">
          <ul className="h-[85vh] overflow-y-scroll scrollbar-thin scrollbar-track-[#3B3935] scrollbar-thumb-[#F89D28]">
            {filteredItems.map((val, index) => (
              <li key={index} className="mx-4 my-2">
                <NavLink
                  to={val.route}
                  className={({ isActive }) =>
                    isActive
                      ? "bg-[#F89D28] block p-2 text-[#FFFFFF] font-medium text-base md:text-lg rounded-md"
                      : "block p-2 hover:bg-[#f89e282a] text-[#FFFFFF] font-medium text-base md:text-lg"
                  }
                >
                  {val.title}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

SideBar.propTypes = {
  displaySideBar: PropTypes.bool.isRequired,
  setDisplaySideBar: PropTypes.func.isRequired,
};

export default SideBar;
