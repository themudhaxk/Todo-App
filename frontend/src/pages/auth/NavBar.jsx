import { useState } from "react";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import {
  AiOutlineLogin,
  AiOutlineMenu,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FaPencilAlt, FaRegUser, FaTimes } from "react-icons/fa";
import { RxExit } from "react-icons/rx";

const Navbar = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(true);
  };

  const unToggleMenu = () => {
    setShowMenu(false);
  };

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
    <header
      style={{ zIndex: "20" }}
      className="bg-black sticky top-0 left-0 right-0"
    >
      <nav className="flex justify-between items-center bg-gray-900 mx-auto h-[80px] relative p-4">
        <span className="text-black text-2xl font-bold font-sans flex flex-row justify-center items-center">
          <Link to="/todos">
            <span className="text-green-500">L</span>
            <span className="text-blue-500">O</span>
            <span className="text-orange-500">G</span>
            <span className="text-red-500">O</span>
          </Link>
        </span>

        <div>
          {userInfo && (
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <Link to="/todos">Todos</Link>
            </button>
          )}
        </div>
        <div className="m-2 p-2 flex ">
          {userInfo ? (
            <span className="text-white flex relative">
              <Link
                to="/profile"
                className="flex text-red-500 items-center hover:font-semibold mr-4"
              >
                <FaRegUser />
                Hello!
                <span className="text-red-500 ml-1">
                  {" "}
                  {userInfo.name?.substring(0, 12)}
                </span>
                ..
              </Link>
            </span>
          ) : (
            <></>
          )}
          {userInfo && (
            <>
              <button
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mr-4 hidden sm:block md:block"
                onClick={handleLogout}
              >
                LOGOUT
              </button>
            </>
          )}
          {!userInfo && (
            <>
              <Link to="/login">
                <button className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-700 hidden sm:block md:block mr-4">
                  LOGIN
                </button>
              </Link>
              <Link to="/register">
                <button className="bg-blue-500 text-white px-5 py-2 rounded-lg hover:bg-[#87acec] hidden sm:block md:block mr-4">
                  REGISTER
                </button>
              </Link>
            </>
          )}
          <AiOutlineMenu
            onClick={toggleMenu}
            className={`text-5xl cursor-pointer md:hidden text-white ${
              showMenu ? "hidden" : ""
            }`}
          />
          <FaTimes
            onClick={unToggleMenu}
            className={`text-5xl cursor-pointer md:hidden text-white ${
              showMenu ? "" : "hidden"
            }`}
          />
          {/* Mobile Menu */}
          <div className={`${showMenu ? "block" : "hidden"} md:hidden`}>
            <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700">Home</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700">About</a>
        <a href="#" className="block py-2 px-4 text-sm hover:bg-gray-700">Contact</a>
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
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
