import React, { useState } from 'react';
import { QuestionSlice } from '../../../redux/questionSlice';

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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-semibold mb-2">Solved Questions</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => handleTabClick('easy')}
            className={`${
              activeTab === 'easy'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-600'
            } py-2 px-4 rounded-lg flex-1 focus:outline-none focus:bg-black transition duration-300 ease-in-out`}
          >
            Easy
          </button>
          <button
            onClick={() => handleTabClick('medium')}
            className={`${
              activeTab === 'medium'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-600'
            } py-2 px-4 rounded-lg flex-1 focus:outline-none focus:bg-black transition duration-300 ease-in-out`}
          >
            Medium
          </button>
          <button
            onClick={() => handleTabClick('hard')}
            className={`${
              activeTab === 'hard'
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-600'
            } py-2 px-4 rounded-lg flex-1 focus:outline-none focus:bg-black transition duration-300 ease-in-out`}
          >
            Hard
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-0.5">
        {solvedQuestions?.[activeTab]?.map((solvedQuestion) => (
          <div key={solvedQuestion?._id} className="mb-4">
            <div className="border p-2 rounded-lg border-gray-500">  {/* shadow-lg  */}
              <h2 className="text-base font-semibold mb-2">
                {/* Add a bullet point using Tailwind CSS */}
                <span className="text-black-500 text-base pr-2">&#8226;</span>
                {solvedQuestion?.question?.title}
              </h2>
              {/* Add additional information about the question here */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SolvedQuestions;
