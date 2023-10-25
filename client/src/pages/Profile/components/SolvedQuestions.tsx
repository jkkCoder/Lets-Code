import React, { useState } from 'react';
import { QuestionSlice } from '../../../redux/questionSlice';
import { capitalizeFirstLetter, difficultyOptions } from '../../../utils/constants';

interface SolvedQuestionProps {
  solvedQuestions: {
    easy: {
      _id: string;
      question: QuestionSlice;
    }[];
    medium: {
      _id: string;
      question: QuestionSlice;
    }[];
    hard: {
      _id: string;
      question: QuestionSlice;
    }[];
  };
}

const SolvedQuestions = ({ solvedQuestions }: SolvedQuestionProps) => {
  const [activeTab, setActiveTab] = useState('easy');

  const handleTabClick = (tab:string) => {
    setActiveTab(tab);
  };

  return (
    <div className=' border border-gray-100 rounded-md shadow-lg h-1/2 px-4 py-2'>
      <div className="mb-4">
        <h1 className="text-xl font-semibold mb-2">Solved Questions</h1>
        <div className="flex space-x-4">
          {
            difficultyOptions?.map(tab => (
              <button
                onClick={() => handleTabClick(tab)}
                className={`${
                  activeTab === tab
                    ? 'bg-black text-white'
                    : 'bg-gray-100 text-gray-600'
                } py-2 px-4 rounded-lg flex-1 focus:outline-none focus:bg-black transition duration-300 ease-in-out`}
              >
                {capitalizeFirstLetter(tab)}
              </button>
            ))
          }
        </div>
      </div>

      <div className="grid grid-cols-2 gap-0.5 overflow-y-scroll h-[70%]">
        {solvedQuestions?.[activeTab]?.map((solvedQuestion:{_id:string,question: QuestionSlice}) => (
          <div key={solvedQuestion?._id} className="mb-4">
            <h2 className="text-base font-semibold mb-2 cursor-pointer">
              <span className="text-black-500 text-base pr-2">&#8226;</span>
              <span className='hover:underline'>{solvedQuestion?.question?.title}</span>
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolvedQuestions;
