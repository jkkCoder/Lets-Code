import React from 'react';

const QuestionContainerSkeleton = () => {
  // You can adjust the number of skeleton items as needed
  const skeletonItems = Array.from({ length: 10 }, (_, index) => (
    <div key={index} className={`bg-gray-200 h-7 my-1 animate-pulse w-[90%] p-1`}></div>
  ));

  return <div>{skeletonItems}</div>;
};

export default QuestionContainerSkeleton;
