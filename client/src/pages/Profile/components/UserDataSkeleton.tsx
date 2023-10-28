import React from 'react';

const UserDataSkeleton = () => {
  return (
    <div className="bg-gray-50 border-solid border-gray-300 p-4 rounded-lg shadow-lg">
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg bg-white p-4 border border-gray-300 shadow-lg flex flex-col justify-center items-center relative animate-pulse">
          <div className="w-24 h-6 bg-gray-300 rounded-md mb-2" />
          <div className="w-16 h-4 bg-gray-300 rounded-md" />
        </div>
        <div className="rounded-lg bg-white p-4 border border-gray-300 shadow-lg flex flex-col justify-center items-center relative animate-pulse">
          <div className="w-24 h-6 bg-gray-300 rounded-md mb-2" />
          <div className="w-16 h-4 bg-gray-300 rounded-md" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="rounded-lg bg-white p-4 border border-gray-300 shadow-lg flex flex-col justify-center items-center relative animate-pulse">
          <div className="w-24 h-6 bg-gray-300 rounded-md mb-2" />
          <div className="w-16 h-4 bg-gray-300 rounded-md" />
        </div>
        <div className="rounded-lg bg-white p-4 border border-gray-300 shadow-lg flex flex-col justify-center items-center relative animate-pulse">
          <div className="w-24 h-6 bg-gray-300 rounded-md mb-2" />
          <div className="w-16 h-4 bg-gray-300 rounded-md" />
        </div>
      </div>
    </div>
  );
};

export default UserDataSkeleton;
