import axios from "axios";
import { useState } from "react";

const useLogin = () => {

    const [isSignIn, setSignIn] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        userName: "",
        emailAddress: "",
        passWord: ""
    })

    const toggleSignInForm = () => {
        
        setFormData(prev => ({...prev, emailAddress: "", passWord: ""}))
        setSignIn(prev => !prev)             
    }

    const handleCta = async () => {
        if(isSignIn){
            const response = await axios.post('/user/login', {
                loginField: formData.emailAddress,
                password: formData.passWord,        
            })
            response.data.success && localStorage.setItem('token',response.data.payload.jwtToken)  
            
        } else {
            const response = await axios.post('/user/register', {
                email: formData.emailAddress,
                password: formData.passWord,
                userName: formData.userName,
                fullName: formData.fullName,
            })
            response.data.success && localStorage.setItem('token',response.data.payload.jwtToken)
            
        }
    }
    
    return {
        isSignIn, formData, setFormData, toggleSignInForm, handleCta
    }

}

export default useLogin;