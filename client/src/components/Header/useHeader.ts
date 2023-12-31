import  { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../redux/storeHook";
import { logout } from "../../redux/userSlice";
import { API, searchSuggestionAPI, setAPIHAuthorization } from "../../utils/API";
import { deleteToastMessage } from "../../utils/constants";

const useHeader = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const location = useLocation();
  const [searchInput, setSearchInput] = useState("");
  const [logoutModal, setLogoutModal] = useState(false);
  const [showSuggestions, setShowSuggestion] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState<searchSuggestionAPI>(undefined)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

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
          deleteToastMessage(err?.response?.data?.message || 'SERVER ERROR')
          setShowSuggestion(false)
        }
        
      }
      search()
    }, 200);

    return () => {
      clearTimeout(timer)
    }
  },[searchInput])

  useEffect(() => {
    setSearchInput('')
    setSearchSuggestions(undefined)
    setShowSuggestion(false)
    setIsSearchOpen(false)
  },[location])


  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logout());
    setLogoutModal(false);
    setAPIHAuthorization('')
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

  const handleSearchCta = () => {
    setIsSearchOpen(true)
    setShowSuggestion(false)
  }


  return  {searchInput,setShowSuggestion,setSearchInput,handleSearchCta, searchSuggestions,showSuggestions, routeProfile ,routeQuestion, isSearchOpen, setIsSearchOpen, logoutModal, setLogoutModal , handleLogout }
}

export default useHeader;