import React from 'react';

const QuestionDetailSkeleton = () => {
  return (
    <div className='flex flex-col'>
      <div className='bg-gray-200 h-12 animate-pulse w-full mb-4'></div>
      <div className='flex items-center mt-4'>
        <div className='bg-gray-200 h-8 w-20 animate-pulse rounded-full'></div>
        <div className='ml-6 bg-gray-200 h-8 w-40 animate-pulse rounded-2xl'></div>
      </div>

      <div className='bg-gray-200 h-16 animate-pulse w-full mt-4'></div>

      {/* Create skeleton loading for test cases */}
      <div className='grid gap-4 mt-4'>
        {[1, 2, 3].map((index) => (
          <div key={index} className='bg-gray-200 h-12 animate-pulse w-full'></div>
        ))}
      </div>
    </div>
  );
};

export default QuestionDetailSkeleton;
