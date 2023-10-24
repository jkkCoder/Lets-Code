import React from 'react'

interface UserDataProps {
    userName : string
    fullName : string
    emailId : string
}

const UserData = ({userName, fullName, emailId}:UserDataProps) => {
  
    console.log(fullName)
    
    return (
        <>
            <div>
                <h1>User Name</h1>
                <p>{userName}</p> 
            </div>
            <div>
                <h1>Full Name</h1>
                <p>{fullName}</p> 
                
            </div>
            <div>
                <h1>Email</h1>
                <p>{emailId}</p> 
            </div>
        </>
  )
}

export default UserData