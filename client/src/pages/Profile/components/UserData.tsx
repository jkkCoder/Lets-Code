import React from 'react';
import {  FaUserCircle } from 'react-icons/fa';
import UserDataSkeleton from './UserDataSkeleton';
import { ToastContainer } from 'react-toastify';
import { useAppSelector } from '../../../redux/storeHook';


interface UserDataProps {
  userName: string;
  fullName: string;
  emailId: string;
  isLoading: boolean;
}

const UserData = ({isLoading, userName, fullName, emailId }: UserDataProps) => {
  
  const profileUrl = useAppSelector(state => state.user.profileUrl)
  if(isLoading) return <UserDataSkeleton />

  return (

    <div className="flex h-100 items-center md:h-64 flex-col md:flex-row rounded-lg border-solid border-gray-300  p-4 shadow-lg">
      <div className="w-1/2 rounded-lg mx-auto md:mx-0 border-gray-300 p-4 h-50 flex items-center justify-center">{profileUrl ? 
             <img className='rounded-[50%] w-48 h-48' src={profileUrl} alt="pro pic" />
            : <FaUserCircle size={150} className="text-5xl text-gray-600" />}
      </div>
      <div className="flex w-1/2  justify-center flex-col rounded-lg border-gray-300 p-2">
        <p className='text-lg lg:text-2xl font-bold'>{fullName}</p>
        <span className=''>@{userName}</span>
        <p className='text-lg lg:text-2xl font-bold mt-2'>{emailId}</p>
      </div>
      <ToastContainer />
    </div>

  );
};

export default UserData;
