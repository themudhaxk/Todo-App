import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { useLogoutMutation } from "../../redux/api/userApiSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/auth/authSlice";
import { FaPencilAlt, FaRegUser, FaTimes } from "react-icons/fa";
import { RxExit } from "react-icons/rx";
const Nav = () => {
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
      <nav className="bg-gray-800 text-white justify-between">
        <div className=" mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-4">
              {/* Logo */}
              <div>
                <a
                  href="#"
                  className="flex items-center py-5 px-2 text-gray-700 hover:text-gray-900"
                >
                  <span className="text-black text-2xl font-bold font-sans flex flex-row justify-center items-center">
                    <Link to="/todos">
                      <span className="text-green-500">L</span>
                      <span className="text-blue-500">O</span>
                      <span className="text-orange-500">G</span>
                      <span className="text-red-500">O</span>
                    </Link>
                  </span>
                </a>
              </div>
            </div>
            <div className="flex md:hidden justify-center items-center">
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
            </div>
            
            {/* Primary Nav */}
            <div className="hidden md:flex items-center justify-between ">
              <div className="mr-[] ml-[]">
                {userInfo && (
                  <button className="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <Link to="/todos">TODOS</Link>
                  </button>
                )}
              </div>
            </div>
            <div className="hidden md:flex items-center">
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
                <button className="bg-blue-500 hover:bg-blue-700 mr-3 text-white font-bold py-2 px-4 rounded">
                  <Link to="/profile">PROFILE</Link>
                </button>
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
                <button className="bg-green-500 hover:bg-green-700 mr-3 text-white font-bold py-2 px-4 rounded">
                  <Link to="/login">LOGIN</Link>
                </button>
              )}
              {!userInfo && (
                <button className="bg-blue-500 hover:bg-blue-700 mr-3 text-white font-bold py-2 px-4 rounded">
                <Link to="/register">REGISTER</Link>
              </button>
              )}
              
              {/* Secondary Nav */}
              {/* <div className="hidden md:flex items-center space-x-1">
                <AiOutlineSearch className="text-xl" />
                <input
                  type="text"
                  placeholder="Search"
                  className="py-2 px-4 rounded-full"
                />
              </div> */}
            </div>
            {/* Mobile button */}
            <div className="md:hidden flex items-center">
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
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        {userInfo && (
          <div className={`${showMenu ? "block" : "hidden"} md:hidden`}>
            <span className="text-white text-2xl flex relative mb-5">
              <Link
                to="/todos"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <FaPencilAlt className="mr-2 mt-[4px]" size={23} />
                TODOS
              </Link>
            </span>
            <span className="text-white text-2xl flex relative mb-5">
              <Link
                to="/profile"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <FaRegUser className="mr-2 mt-[4px]" size={23} />
                PROFILE
              </Link>
            </span>
            <span className="text-white flex relative mb-5">
              <button
                onClick={handleLogout}
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <RxExit className="mr-2 mt-[4px]" size={23} />
                LOGOUT
              </button>
            </span>
          </div>
        )}
        {!userInfo && (
          <div className={`${showMenu ? "block" : "hidden"} md:hidden`}>
            <span className="text-white text-2xl flex relative mb-5">
              <Link
                to="/login"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <FaRegUser className="mr-2 mt-[4px]" size={23} />
                LOGIN
              </Link>
            </span>
            <span className="text-white text-2xl flex relative mb-5">
              <Link
                to="/register"
                className="flex items-center transition-transform transform hover:translate-x-2"
              >
                <FaRegUser className="mr-2 mt-[4px]" size={23} />
                REGISTER
              </Link>
            </span>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Nav;
