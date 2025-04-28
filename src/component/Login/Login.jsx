
import axios from "axios";
import { useState } from "react";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setDepartment ,setSubAdminRole , setPermission } from "../../hooks/useGetDepartment";
// subAdminPermission,subAdminRole,department

import frameImage from "../../assets/login/Frame.png";
import useRole from "../../hooks/useRole";
// import { UserContext } from "../../hooks/UserContext";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const { setRole} = useRole();
  // const {department,setDepartment} = useContext(UserContext)
  // console.log(department)
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData((oldVal) => ({
      ...oldVal,
      [name]: value,
    }));
  };

  // Handle login submission
  const submitData = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      const { email, password } = loginData;
      const loadingToast = toast.loading("Loading...");

      try {
        const response = await axios.post(
          "https://api.rupaylender.com/inquiry/login",
          { email, password }
        );

        if (response?.data?.success) {
          toast.update(loadingToast, {
            render: "Successfully Login!",
            type: "success",
            isLoading: false,
            autoClose: 3000,
          });

      
          // setDepartment(response?.data?.department)
          sessionStorage.setItem("token", JSON.stringify(response?.data?.token));
          setSubAdminRole(response?.data?.role);
          // setPermission
          setRole(response?.data?.role)
          setDepartment(response?.data?.department)
          setPermission(response?.data?.permissions)
          if (response?.data?.role === "blogger" || response?.data?.role === "blogger") {
            navigate("/create-blog");
          } else {
            navigate("/vendor");
          }
        } else {
          throw new Error("Something went wrong! Please try again.");
        }
      } catch (error) {
        toast.update(loadingToast, {
          render: error.message || "Something went wrong! Please try again.",
          type: "error",
          isLoading: false,
          autoClose: 5000,
        });
      }
    }
  };

  // useEffect to handle redirection based on role
  // useEffect(() => {
  //   // if (subAdminRole || role) {
  //     if (subAdminRole === "blogger" || role === "blogger") {
  //       navigate("/create-blog");
  //     } else {
  //       navigate("/vendor");
  //     }
  //   // }
  // }, []);

  return (
    <div className="min-h-[100vh] h-full md:h-[100vh] w-full bg-[#F89D28] flex items-center justify-center">
      <ToastContainer position="top-right" />

      <div className="w-[90%] sm:w-[25rem] gap-6 md:gap-4 md:w-[90%] max-w-[60rem] bg-white flex flex-col md:flex-row">
        <div className="w-full md:w-[50%] py-[2rem] flex items-center justify-center h-[45vh] md:h-[70vh]">
          <div className="w-[80%] mx-auto">
            <h1 className="text-[#3B3935] font-bold text-2xl md:text-3xl mb-[10px] md:mb-[1rem]">
              Rupay Lender Login
            </h1>

            <form onSubmit={submitData} className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-2">
                <label htmlFor="Email" className="text-base md:text-lg text-[#000000] font-normal">
                  Email
                </label>
                <div className="px-3 py-2 rounded-lg border-[1.5px] border-[#12121de7] bg-[#FFFFFF]">
                  <input
                    value={loginData.email}
                    name="email"
                    onChange={handleInputChange}
                    className="text-[#12121dcb] placeholder:text-[#12121dcb] bg-transparent w-full outline-none font-normal text-base md:text-lg"
                    type="email"
                    id="Email"
                    placeholder="Enter Email"
                    required
                  />
                </div>
              </div>

              <div className="flex flex-col gap-y-2">
                <label htmlFor="Password" className="text-base md:text-lg text-[#000000] font-normal">
                  Password
                </label>
                <div className="px-3 py-2 rounded-lg border-[1.5px] border-[#12121de7] bg-[#FFFFFF] flex justify-between items-center">
                  <input
                    value={loginData.password}
                    name="password"
                    onChange={handleInputChange}
                    className="text-[#12121dcb] placeholder:text-[#12121dcb] outline-none font-normal text-base md:text-lg"
                    type={showPassword ? "text" : "password"}
                    id="Password"
                    placeholder="Enter Password"
                    required
                  />

                  {showPassword ? (
                    <FaRegEyeSlash onClick={() => setShowPassword(!showPassword)} className="text-base md:text-lg cursor-pointer" />
                  ) : (
                    <IoEyeOutline onClick={() => setShowPassword(!showPassword)} className="text-base md:text-lg cursor-pointer" />
                  )}
                </div>
              </div>

              <button
                className="bg-[#F89D28] hover:bg-[#f89e28ed] active:bg-[#F89D28] focus:outline-none focus:ring focus:ring-violet-300 mt-4 uppercase text-[#FFFFFF] font-bold text-sm md:text-base w-full py-2 rounded-3xl"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="w-full md:w-[50%] h-[40rem] h-[40vh] md:h-[70vh]">
          <img src={frameImage} className="w-full h-full" alt="Login Visual" />
        </div>
      </div>
    </div>
  );
};

export default Login;
