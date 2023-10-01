import React, { useState } from 'react' 
import axios from 'axios'

const Login = () => {
    const [isSignIn, setSignIn] = useState(false);
    const [fullName, setFullName] = useState("");
    const [userName, setUserName] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [passWord, setPassWord] = useState("");
    
    const toggleSignInForm = () => {
        setEmailAddress("")
        setPassWord("")   
        setSignIn(prev => !prev)             
    }

    const handleCta = async () => {
        if(isSignIn){
            const response = await axios.post('/user/login', {
                loginField: emailAddress,
                password: passWord,        
            })
            response.data.success && localStorage.setItem('token',response.data.payload.jwtToken)  
            
        } else {
            const response = await axios.post('/user/register', {
                email: emailAddress,
                password: passWord,
                userName: userName,
                fullName: fullName,
            })
            response.data.success && localStorage.setItem('token',response.data.payload.jwtToken)
            
        }
    }
    

    return (
    <div>
        <h1>LetsCode</h1>
        <h2>{isSignIn ? 'Sign In' : 'Sign Up'}</h2>
        <form onSubmit={e =>  e.preventDefault() }>
            {!isSignIn && (<>            
                <input value={fullName} onChange={(e)=> setFullName(e.target.value)}type="text" placeholder='Full Name'/>
                <input value={userName} onChange={(e)=> setUserName(e.target.value)} type="text" placeholder='User Name'/>            
            </>)}
        
            <input value={emailAddress} onChange={(e)=>setEmailAddress(e.target.value)} type="text" placeholder={isSignIn ? 'Email address or User Name' : 'Email address'}/>
            <input value={passWord} onChange={(e)=>setPassWord(e.target.value)} type="password" placeholder='Password'/>
            <button onClick={handleCta}>{isSignIn ? 'Sign In' : 'Sign Up'}</button>
            <span onClick={toggleSignInForm}>{isSignIn ? "New to LetsCode ? Sign Up Now" : "Already a User ? Sign In"}</span>
        </form>
    </div>
  )
}

export default Login