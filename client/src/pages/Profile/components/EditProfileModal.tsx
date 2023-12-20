import React, { useEffect, useState } from "react";
import { useAppSelector } from "../../../redux/storeHook";
import { APIH } from "../../../utils/API";
import { ToastContainer } from "react-toastify";
import {
  deleteToastMessage,
  successToastMessage,
} from "../../../utils/constants";

interface EditProfileModalProps {
  setShowProfileModal:  React.Dispatch<React.SetStateAction<boolean>> ;
}


const EditProfileModal = ({ setShowProfileModal } : EditProfileModalProps) => {
  const userData = useAppSelector((state) => state.user);
  const [mailID, setMailID] = useState(userData.email);
  const [userName, setUserName] = useState(userData.userName);
  const [fullName, setFullName] = useState(userData.fullName);
  const [disabled, setDisabled] = useState(false);

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

  console.log("user data is : ", userData);

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
