import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/storeHook";
import { logout } from "../redux/userSlice";
import Modal from "./Modal";
import { API, searchSuggestionAPI } from "../utils/API";

const Header = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user);
  const navigate = useNavigate()

  const isLoggedIn = user?.email?.length > 0;
  const [searchInput, setSearchInput] = useState("");
  const [logoutModal, setLogoutModal] = useState(false);
  const [showSuggestions, setShowSuggestion] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState<searchSuggestionAPI>(undefined)

  useEffect(() => {
    if(searchInput?.length === 0){
      setShowSuggestion(false)
      return;
    }

    //debouncing logic
    const timer = setTimeout(() => {
      const search = async () => {
        try{
          const response = await API.get('/question/searchProf?query=' + searchInput)
          setShowSuggestion(true)
          setSearchSuggestions(response?.data)
        }catch(err){
          setShowSuggestion(false)
        }
        
      }
      search()
    }, 200);

    return () => {
      clearTimeout(timer)
    }
  },[searchInput])

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    setLogoutModal(false);
  };

  const routeProfile = (id:string) => {
    navigate('/profile/' + id)
    setShowSuggestion(false);
    setSearchInput("")
   
  }

  const routeQuestion = (id: string) => {
    navigate('/solve/' + id)
    setShowSuggestion(false);
    setSearchInput("")
  }

  return (
    <nav className="flex items-center justify-between h-16 bg-orange-500 shadow-md px-4 sm:px-6 lg:px-8">
      <Link to="/" className="flex items-center">
        <div className="h-10 w-auto flex items-center justify-center rounded-lg bg-white">
          <img src="/LetsCodeLogo.png" alt="letcode logo" className="h-8 w-auto" />
        </div>
      </Link>

      <div className="flex-grow flex items-center justify-center">
        <div className="flex items-center justify-center">
          <input
            value={searchInput}
            type="text"
            placeholder="Search Questions or Profile"
            className="border border-gray-300 h-12 rounded-md pl-4 py-2 px-4 pr-8 focus:outline-none focus:border-blue-500 w-[36rem] rounded-l-full"
            onChange={(e) => setSearchInput(e.target.value)}
          />
         <button className='border h-12 border-gray-400 py-2 px-5 bg-gray-100 rounded-r-full'>
          <AiOutlineSearch/>
         </button>
        </div>
        {
          (searchSuggestions?.profile.length > 0 || searchSuggestions?.questions.length > 0) && showSuggestions && (
            <div className='z-50 absolute top-[3.4rem] w-[36rem]'>
              <div className="bg-gray-50 py-2 px-5 w-full shadow-lg rounded-lg border border-gray-50">
                <ul>
                  {searchSuggestions?.profile?.map((s) => (
                    <li
                      key={s?._id}
                      onClick={() => routeProfile(s?._id)}
                      className="cursor-pointer py-2 px-3 shadow-sm hover:bg-gray-100"
                    >
                      <div className="flex justify-between items-center">
                        <div>{s?.fullName}</div>
                        <div className="bg-green-200 px-2 py-1 rounded-md">Profile</div>
                      </div>
                    </li>
                  ))}
                  {searchSuggestions?.questions?.map((s) => (
                    <li
                      key={s?._id}
                      onClick={() => routeQuestion(s?._id)}
                      className="cursor-pointer py-2 px-3 shadow-sm hover:bg-gray-100"
                    >
                      <div className="flex justify-between items-center">
                        <div>{s?.title}</div>
                        <div className="bg-blue-200 px-2 py-1 rounded-md">Question</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        }

      </div> 


      <div className="flex items-center">
        <Link to="/category" className="ml-4 text-white hover:text-blue-500 transition duration-300 ease-in-out">
          Category
        </Link>
        {user?.isAdmin && (
          <Link to="/admin" className="ml-4 text-white hover:text-blue-500 transition duration-300 ease-in-out">
            Admin
          </Link>
        )}
        {!isLoggedIn ? (
          <>
            <Link to="/login" className="ml-4 text-white hover:text-blue-500 transition duration-300 ease-in-out">
              <button className="bg-orange-500 hover-bg-orange-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out">
                Login
              </button>
            </Link>
            <Link to="/login?type=SignUp" className="ml-4">
              <button className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out">
                Sign Up
              </button>
            </Link>
          </>
        ) : (
          <>
            <Link to={"/profile/" + user._id} className="ml-4 text-white hover:text-blue-500 transition duration-300 ease-in-out">
              Profile
            </Link>
            <button onClick={() => setLogoutModal(true)} className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out">
              Logout
            </button>

            <Modal
              onClose={() => setLogoutModal(false)}
              showModal={logoutModal}
              primaryBtnName="Yes"
              secondaryBtnName="No"
              title={'Are you sure you want to Logout'}
              primaryCta={handleLogout}
              secondaryCta={() => setLogoutModal(false)}
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Header;
