import React from 'react';

const SolvedQuestionsSkeleton = () => {
  return (
    <div className="border border-gray-100 rounded-md shadow-lg h-[90%] px-4 py-2">
      <div className="mb-4">
        <h1 className="text-xl font-semibold mb-2">Solved Questions</h1>
        <div className="flex space-x-4">
          <div className="bg-gray-100 text-gray-600 py-2 px-4 rounded-lg flex-1" />
          <div className="bg-gray-100 text-gray-600 py-2 px-4 rounded-lg flex-1" />
          <div className="bg-gray-100 text-gray-600 py-2 px-4 rounded-lg flex-1" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-0.5 overflow-y-scroll">
        {[1, 2, 3, 4, 5, 6].map((index) => (
          <div key={index} className="mb-4">
            <h2 className="text-base font-semibold mb-2 cursor-pointer">
              <span className="text-black-500 text-base pr-2">&#8226;</span>
              <span className="bg-gray-200 h-6 w-[80%] rounded-md animate-pulse" />
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolvedQuestionsSkeleton;
