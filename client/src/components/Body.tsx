import React, { useEffect } from 'react'
import Header from './Header'
import {Outlet, useNavigate} from "react-router-dom"
import { useAppDispatch } from '../redux/storeHook'
import { addUser } from '../redux/userSlice'
import { API } from '../utils/API'

const Body = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token')
      try{
        const userPayload = await API.get('/user/getUser/' + token)
        dispatch(addUser({
          _id: userPayload?.data?.userPayload?._id,
          userName: userPayload?.data?.userPayload?.userName,
          email: userPayload?.data?.userPayload?.email,
          isAdmin: userPayload?.data?.userPayload?.isAdmin,
          fullname: userPayload?.data?.userPayload?.fullName
      }))
      }catch(err){
        
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