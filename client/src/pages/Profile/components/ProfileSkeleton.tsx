import React from 'react'

const ProfileSkeleton = () => {
    return (
      <div style={{ height: "calc(100vh - 7rem)" }} className='mt-10 flex h-screen'>
        <div className='w-1/2'>
          <div className='mx-20 h-1/2'>
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-24 h-6 bg-gray-300 rounded-lg mb-2"></div>
              <div className="w-36 h-8 bg-gray-400 rounded-lg mb-4"></div>
              <div className="w-20 h-6 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
          <div>
            <div className="animate-pulse mx-20 h-/12">
              <div className="w-64 h-6 bg-gray-300 rounded-lg mb-2"></div>
              <div className="w-44 h-6 bg-gray-300 rounded-lg mb-4"></div>
              <div className="w-52 h-6 bg-gray-300 rounded-lg mb-2"></div>
              <div className="w-36 h-6 bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
        <div className='w-1/2'>
          <div className="animate-pulse">
            <div className="w-64 h-6 bg-gray-300 rounded-lg mb-2"></div>
            <div className="w-44 h-6 bg-gray-300 rounded-lg mb-4"></div>
            <div className="w-52 h-6 bg-gray-300 rounded-lg mb-2"></div>
            <div className="w-36 h-6 bg-gray-300 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
}  

export default ProfileSkeleton