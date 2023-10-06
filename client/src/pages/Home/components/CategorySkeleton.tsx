import React from 'react';

const CategorySkeleton = () => {
  return (
    <>{
    Array.from({ length: 10 }, (_, index) => (
        <div className='p-2 m-2 bg-gray-200 rounded-lg animate-pulse'>
            <div className='w-24 h-6 bg-gray-200 rounded'></div>
        </div>
    ))
}
    </>
  );
};

export default CategorySkeleton;
