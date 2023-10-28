import React, { useState } from 'react';
import { FaEdit, FaUserCircle } from 'react-icons/fa';
import UserDataSkeleton from './UserDataSkeleton';

interface UserDataProps {
  userName: string;
  fullName: string;
  emailId: string;
  isLoading: boolean;
}

const UserData = ({isLoading, userName, fullName, emailId }: UserDataProps) => {

  if(isLoading) return <UserDataSkeleton />

  return (
    <div className="bg-gray-50 border-solid border-gray-300 p-4 rounded-lg shadow-lg">
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-white p-4 border border-gray-300 shadow-lg flex flex-col justify-center items-center relative">
          <h1 className="text-xl font-semibold">User Name</h1>
          <p>{userName}</p>
          <FaEdit className="absolute bottom-2 right-2 text-gray-600" /> {/* Edit icon */}
        </div>
        <div className="rounded-lg bg-white p-4 border border-gray-300 shadow-lg flex flex-col justify-center items-center relative">
          <h1 className="text-xl font-semibold">Full Name</h1>
          <p>{fullName}</p>
          <FaEdit className="absolute bottom-2 right-2 text-gray-600" /> {/* Edit icon */}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="rounded-lg bg-white p-4 border border-gray-300 shadow-lg flex flex-col justify-center items-center relative">
          <h1 className="text-xl font-semibold">Email</h1>
          <p>{emailId}</p>
        </div>
        <div className="rounded-lg bg-white p-4 border border-gray-300 shadow-lg flex flex-col justify-center items-center relative">
          <h1 className="text-xl font-semibold">Profile Picture</h1>
          <FaUserCircle className="text-5xl text-gray-600" /> {/* User-circle icon */}
          <FaEdit className="absolute bottom-2 right-2 text-gray-600" /> {/* Edit icon */}
        </div>
      </div>
    </div>
  );
};

export default UserData;
