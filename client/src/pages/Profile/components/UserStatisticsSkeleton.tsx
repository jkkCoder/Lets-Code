import React from 'react';

const UserStatisticsSkeleton = () => {
  return (
    <div className="h-80 w-[80%] mx-auto border-solid border-gray-300 border rounded shadow-lg">
      <div className="flex flex-col mt-14">
        <p className="ml-2 text-gray-500">Solved Questions</p>
        <div className="flex flex-row justify-center items-center">
          <div className="w-1/4">
            <div className="bg-gray-200 w-48 h-48 rounded-full animate-pulse" />
          </div>
          <div className="m-2 ml-5 w-3/4">
            <div className="mb-2">
              <div className="flex flex-row">
                <p className="w-3/4 bg-gray-200 h-6 rounded-md animate-pulse" />
              </div>
              <div className="bg-gray-200 h-4 w-full rounded-md animate-pulse" />
            </div>

            <div className="mb-2">
              <div className="flex flex-row">
                <p className="w-3/4 bg-gray-200 h-6 rounded-md animate-pulse" />
              </div>
              <div className="bg-gray-200 h-4 w-full rounded-md animate-pulse" />
            </div>

            <div>
              <div className="flex flex-row">
                <p className="w-3/4 bg-gray-200 h-6 rounded-md animate-pulse" />
              </div>
              <div className="bg-gray-200 h-4 w-full rounded-md animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserStatisticsSkeleton;
