import React, {  useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/storeHook";
import { APIH } from "../../../utils/API";
import { ToastContainer } from "react-toastify";
import {
  deleteToastMessage,
  successToastMessage,
} from "../../../utils/constants";
import { FaUpload, FaUserCircle } from "react-icons/fa";
import { updateProfile } from "../../../redux/userSlice";

interface EditProfileModalProps {
  setShowProfileModal:  React.Dispatch<React.SetStateAction<boolean>> ;
}

const EditProfileModal = ({ setShowProfileModal } : EditProfileModalProps) => {
  const userData = useAppSelector((state) => state.user);
  const [mailID, setMailID] = useState(userData.email);
  const [userName, setUserName] = useState(userData.userName);
  const [fullName, setFullName] = useState(userData.fullName);
  const [disabled, setDisabled] = useState(false);


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

  const closeModal = () => {
    setShowProfileModal(false);
  };

  const editCta = async () => {
    setDisabled(true);
    try {
      const res = await APIH.put("/user/editProfile/" + userData._id, {
        updatedUser: {
          userName: userName,
          email: mailID,
          fullName: fullName,
        },
      });
      if (res?.data?.success) {
        successToastMessage("Profile edited successfully");
      }
    } catch (err) {
      deleteToastMessage(err?.response?.data?.message || "SERVER ERROR");
    } finally {
      closeModal();
    }
  };


  return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white border-2 border-orange-500 rounded w-96 p-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-black text-lg font-bold">Edit Profile</h2>
            <button
              onClick={closeModal}
              className="text-black hover:text-orange-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div  className="mb-4 flex justify-center items-center">
            <div onMouseDown={handleFileInputClick} className="rounded-[50%] w-20 h-20  flex items-center justify-center cursor-pointer">
            {profileUrl ? 
            <img className='rounded-[50%] w-20 h-20' src={profileUrl} alt="pro pic" />
            : <FaUserCircle size={100} className="text-5xl text-gray-600" />}
              <FaUpload  className="absolute z-10"/>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleFileChange}/>
            </div>
          </div>
          <div className="mb-4">
            <p className="text-black">Full Name</p>
            <input
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-[2px] focus:border-orange-300"
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <p className="text-black">User Name</p>
            <input
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-[2px] focus:border-orange-300"
              type="text"
              placeholder="User Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <p className="text-black">Email ID</p>
            <input
              className="w-full px-4 py-2 mb-4 border rounded-md focus:outline-none focus:border-[2px] focus:border-orange-300"
              type="text"
              placeholder="Email"
              value={mailID}
              onChange={(e) => setMailID(e.target.value)}
            />
          </div>
          <div className="flex justify-end">
            <button
              className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-400"
              disabled={disabled}
              onClick={editCta}
            >
              Edit
            </button>
          </div>
        </div>
        <ToastContainer />
      </div>  
    
  );
};

export default EditProfileModal;
