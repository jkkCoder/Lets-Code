import { useEffect, useState } from "react";
import {isValidEmail, isValidPassword} from "../../utils/constants"
import {useNavigate, useLocation} from "react-router-dom"
import { addUser } from "../../redux/userSlice";
import { useAppDispatch, useAppSelector } from "../../redux/storeHook";
import { API } from "../../utils/API";



const useLogin = () => {
    const dispatch = useAppDispatch()
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const prevScreen = queryParams.get('prevScreen');
    const type = queryParams.get('type')
    const user = useAppSelector(state => state.user)

    useEffect(() => {
        if(user?._id?.length > 0){
             //this means user exists, and is signed in
            navigate('/')
        }
    },[])
    
    const navigate = useNavigate()
    const [isSignIn, setSignIn] = useState(type === "SignUp" ? false : true);
    const [errorMessage, setErrorMessage] = useState("")
    const [formData, setFormData] = useState({
        fullName: "",
        userName: "",
        emailAddress: "",
        passWord: ""
    })
    const [disabled, setDisabled] = useState(false);

    useEffect(() => {
        setSignIn(type === 'SignUp' ? false : true)
    },[type])

    const toggleSignInForm = () => {
        setErrorMessage('')
        setFormData(prev => ({...prev, emailAddress: "", passWord: ""}))
        setSignIn(prev => !prev)   
    }

    const handleCta = async () => {
        setDisabled(true);
        setErrorMessage('')       
        if(isSignIn){            
            if(!formData.emailAddress || !formData.passWord){
                setErrorMessage('Please provide all required fields')
                return;
            }
            try{                
                const response = await API.post('/user/login', {
                    loginField: formData.emailAddress,
                    password: formData.passWord,        
                })
                response?.data?.success && localStorage.setItem('token',response?.data?.payload?.jwtToken)  
                dispatch(addUser({
                    _id: response?.data?.payload?._id,
                    userName: response?.data?.payload?.userName,
                    email: response?.data?.payload?.email,
                    isAdmin: response?.data?.payload?.isAdmin,
                    fullname: response?.data?.payload?.fullname
                }))
                if(prevScreen?.length > 0){
                    navigate(prevScreen)
                    return;
                }
                navigate('/')
            }catch(err){
                if(err?.response?.status === 400 || err?.response?.status === 500){
                    setErrorMessage(err?.response?.data?.message)
                }
            }            
        } else {
            if(!formData.emailAddress || !formData.passWord || !formData.fullName || !formData.userName){
                setErrorMessage('Please provide all required fields')
                return;
            }
            if(!isValidEmail(formData?.emailAddress)){
                setErrorMessage("Please enter valid email address")
                return   
            }
            if(!isValidPassword(formData?.passWord)){
                setErrorMessage('Password must contain Minimum eight characters, at least one uppercase letter, one number and one special character')
                return
            }
            try{
                const response = await API.post('/user/register', {
                    email: formData.emailAddress,
                    password: formData.passWord,
                    userName: formData.userName,
                    fullName: formData.fullName,
                })
                response?.data?.success && localStorage.setItem('token',response?.data?.payload?.jwtToken)
                dispatch(addUser({
                    _id: response?.data?.payload?._id,
                    userName: response?.data?.payload?.userName,
                    email: response?.data?.payload?.email,
                    isAdmin: response?.data?.payload?.isAdmin,
                    fullname: response?.data?.payload?.fullname
                }))
                if(prevScreen?.length > 0){
                    navigate(prevScreen)
                    return;
                }
                navigate('/')
            }catch(err){
                if(err?.response?.status === 400 || err?.response?.status === 500){
                    setErrorMessage(err?.response?.data?.message)
                }
            }                       
        }
        setDisabled(false);
    }
    
    return {
        isSignIn, errorMessage, formData, setFormData, toggleSignInForm, handleCta, disabled
    }

}

export default useLogin;