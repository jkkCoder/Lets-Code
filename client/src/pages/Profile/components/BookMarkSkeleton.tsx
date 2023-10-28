import React from 'react';

const BookMarkSkeleton = () => {
  return (
    <div className='border border-gray-100 rounded-md shadow-lg h-[90%] px-4 py-2'>
      <h1 className="text-xl font-semibold mb-2">Loading...</h1>
      <div className="grid grid-cols-2 gap-0.5 overflow-y-scroll h-[90%]">
        {/* Create placeholders for bookmarks */}
        {[1, 2, 3, 4, 5]?.map((index) => (
          <div key={index} className="mb-4">
            <div className="animate-pulse rounded-lg h-8 w-3/4 bg-gray-200"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookMarkSkeleton;
