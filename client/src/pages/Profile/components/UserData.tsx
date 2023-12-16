import React, { useRef } from 'react';
import { FaEdit, FaUserCircle } from 'react-icons/fa';
import UserDataSkeleton from './UserDataSkeleton';
import { APIH } from '../../../utils/API';
import { updateProfile } from '../../../redux/userSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/storeHook';
import { ToastContainer } from 'react-toastify';
import { deleteToastMessage } from '../../../utils/constants';

interface UserDataProps {
  userName: string;
  fullName: string;
  emailId: string;
  isLoading: boolean;
}

const UserData = ({isLoading, userName, fullName, emailId }: UserDataProps) => {
  const fileInputRef = useRef(null);
  const dispatch = useAppDispatch()
  const profileUrl = useAppSelector(state => state.user.profileUrl)
  const handleFileInputClick = () => {
    // Trigger click on the hidden file input
    fileInputRef.current.value = null
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('profile', file);
    try{
      const response = await APIH.post('/user/updateProfile', formData,  {
        headers: {
          'Content-Type': 'multipart/form-data',
      }})
      if(response?.data?.success){
        dispatch(updateProfile({url: response?.data?.url}))
      }
    }catch(err){
      deleteToastMessage(err?.response?.data?.message || 'Image not uploaded')
    }
  };

  if(isLoading) return <UserDataSkeleton />

  return (
    <div className="bg-gray-50 border-solid border-gray-300 p-4 rounded-lg shadow-lg">
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-white p-4 border border-gray-300 shadow-lg flex flex-col justify-center items-center relative">
          <h1 className="text-xl font-semibold">User Name</h1>
          <p>{userName}</p>
          {/* <FaEdit className="absolute bottom-2 right-2 text-gray-600" />  */}
        </div>
        <div className="rounded-lg bg-white p-4 border border-gray-300 shadow-lg flex flex-col justify-center items-center relative">
          <h1 className="text-xl font-semibold">Full Name</h1>
          <p>{fullName}</p>
          {/* <FaEdit className="absolute bottom-2 right-2 text-gray-600" />  */}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="rounded-lg bg-white p-4 border border-gray-300 shadow-lg flex flex-col justify-center items-center relative">
          <h1 className="text-xl font-semibold">Email</h1>
          <p>{emailId}</p>
        </div>
        <div className="rounded-lg bg-white p-4 border border-gray-300 shadow-lg flex flex-col justify-center items-center relative">
          <h1 className="text-xl font-semibold">Profile Picture</h1>
          {profileUrl ? 
            <img className='rounded-[50%] w-20 h-20' src={profileUrl} alt="pro pic" />
            : <FaUserCircle className="text-5xl text-gray-600" />} 
          <label
            className="absolute bottom-2 right-2 text-gray-600 cursor-pointer"
            onMouseDown={handleFileInputClick}
          >
            <FaEdit />
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileChange}
        />
      </label>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default UserData;
