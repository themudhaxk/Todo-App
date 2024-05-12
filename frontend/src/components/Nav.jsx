import { useState } from "react";
import { AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import {
  AiOutlineLogin,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FaPencilAlt, FaRegUser } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);

  // const [showMenu, setShowMenu] = useState(false);

  // const toggleMenu = () => {
  //   setShowMenu(true);
  // };

  // const unToggleMenu = () => {
  //   setShowMenu(false);
  // };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between">
          <div className="flex space-x-4">
            {/* Logo */}
            <div>
              <a
                href="#"
                className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900"
              >
                <span className="font-bold">Your Logo</span>
              </a>
            </div>
            {/* Primary Nav */}
            <div className="hidden md:flex items-center space-x-1">
              <a href="#" className="py-5 px-3 hover:underline">
                Home
              </a>
              <a href="#" className="py-5 px-3 hover:underline">
                About
              </a>
              <a href="#" className="py-5 px-3 hover:underline">
                Contact
              </a>
            </div>
          </div>
          {/* Secondary Nav */}
          <div className="hidden md:flex items-center space-x-1">
            <AiOutlineSearch className="text-xl" />
            <input
              type="text"
              placeholder="Search"
              className="py-2 px-4 rounded-full"
            />
          </div>
          {/* Mobile button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)}>
              <AiOutlineMenu className="text-3xl" />
            </button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        {/* <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700">Home</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700">About</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700">Contact</a> */}
        {userInfo && (
          <ul>
            <li>
              <span className="text-white flex relative">
                <Link
                  to="/todos"
                  className="flex items-center transition-transform transform hover:translate-x-2"
                >
                  <FaPencilAlt className="mr-2 mt-[4px]" size={23} />
                  Todos
                </Link>
              </span>
            </li>
            <li>
              <span className="text-white flex relative mb-5">
                <Link
                  to="/profile"
                  className="flex items-center transition-transform transform hover:translate-x-2"
                >
                  <FaRegUser className="mr-2 mt-[4px]" size={23} />
                  PROFILE
                </Link>
              </span>
            </li>
            <li>
              <span className="text-white flex relative mb-5">
                <button
                  onClick={handleLogout}
                  className="flex items-center transition-transform transform hover:translate-x-2"
                >
                  <RxExit className="mr-2 mt-[4px]" size={23} />
                  LOGOUT
                </button>
              </span>
            </li>
          </ul>
        )}
        {!userInfo && (
          <ul className="md:static md:hidden flex md:flex-row flex-col md:items-center gap-[4vw]">
            <li>
              <Link
                to="/login"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <AiOutlineLogin className="mr-2 mt-[4px]" size={23} />
                <span className="">LOGIN</span>
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="flex items-center transition-transform transform hover:translate-x-2 mb-5"
              >
                <AiOutlineUserAdd className="mr-2 mt-[4px]" size={23} />
                <span className="">REGISTER</span>
              </Link>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Nav;
