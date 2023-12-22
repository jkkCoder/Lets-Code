import React from 'react';

const UserDataSkeleton = () => {
  return (
    <div className="flex h-64 flex-row rounded-lg border-solid border-gray-300 p-4 shadow-lg">
      <div className="w-1/2 rounded-lg border-gray-300 p-4 h-50 flex items-center justify-center bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse">
        {/* Loading Skeleton for Profile Picture */}
      </div>
      <div className="flex w-1/2 justify-center flex-col rounded-lg border-gray-300 p-2">
        <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-8 animate-pulse mb-2"></div>
        <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-4 animate-pulse mb-1"></div>
        <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 h-8 animate-pulse"></div>
      </div>
    </div>
  );
};

export default UserDataSkeleton;
