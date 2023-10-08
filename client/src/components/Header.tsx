import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/storeHook";
import { logout } from "../redux/userSlice";

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user)

  const isLoggedIn = user.email.length > 0
  const [searchInput, setSearchInput] = useState("");

  const handleLogout = () => {
    localStorage.removeItem('token')
    dispatch(logout())
  }

  return (
    <nav className="flex items-center justify-between h-16 bg-orange-500 shadow-md px-4 sm:px-6 lg:px-8">
      <Link to="/" className="flex items-center">
        <div className="h-10 w-auto flex items-center justify-center rounded-lg bg-white">
          <img src="/LetsCodeLogo.png" alt="letcode logo" className="h-8 w-auto" />
        </div>
      </Link>
      
      <div className="flex items-center ml-4">
        <div className="relative">
          <input
            value={searchInput}
            type="text"
            placeholder="Search Questions"
            className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500 w-96"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <AiOutlineSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        <Link to="/category" className="ml-4 text-white hover:text-blue-500 transition duration-300 ease-in-out">
          Category
        </Link>
        {
          user?.isAdmin && <Link to="/admin" className="ml-4 text-white hover:text-blue-500 transition duration-300 ease-in-out">
            Admin
          </Link>
        }
        { !isLoggedIn ? 
        <>
          <Link to="/login" className="ml-4 text-white hover:text-blue-500 transition duration-300 ease-in-out">
            <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out">
              Login
            </button>
          </Link>
          <Link to="/login?type=SignUp" className="ml-4">
            <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out">
              Sign Up
            </button>
          </Link> 
          </>
          :
          <>
          <Link to={"/profile/"+user._id} className="ml-4 text-white hover:text-blue-500 transition duration-300 ease-in-out">
            Profile
          </Link>
          <button onClick={handleLogout} className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out">
            Logout
          </button>
        </>
        }
      </div>
    </nav>
  );
};

export default Header;
