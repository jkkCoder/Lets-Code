import React, { useEffect } from 'react'
import Header from './Header'
import {Outlet, useNavigate} from "react-router-dom"
import axios from 'axios'
import { useAppDispatch } from '../redux/storeHook'
import { addUser } from '../redux/userSlice'

const Body = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      if(!token){
        navigate('/login')
        return;
      }
      try{
        const userPayload = await axios.get('/user/getUser/' + token)
        dispatch(addUser({
          userName: userPayload?.data?.userPayload?.userName,
          email: userPayload?.data?.userPayload?.email,
          isAdmin: userPayload?.data?.userPayload?.isAdmin,
          fullname: userPayload?.data?.userPayload?.fullName
      }))
      }catch(err){
        navigate('/login')
      }
    }
    fetchUser()
  },[])

  return (
    <div>
        <Header />
        <div className='px-3'>
          <Outlet />
        </div>
    </div>
  )
}

export default Body