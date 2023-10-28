import React, { useState, useEffect } from 'react';
import { QuestionSlice } from '../../../../redux/questionSlice';
import { API } from '../../../../utils/API';
import { selectedCategoryInterface } from '../CategoryAdmin/useCategoryAdmin';
import { ToastContainer } from 'react-toastify';
import { deleteToastMessage } from '../../../../utils/constants';

interface SearchModalProps {
    selectedCategory: selectedCategoryInterface
    onClose: () => void;
    onSubmit: (name: string, selectedQuestions: string[]) => void;
}

const SearchModal = ({ selectedCategory, onClose, onSubmit }: SearchModalProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>([]);
  const [questions, setQuestions] = useState<QuestionSlice[]>([]);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [categoryName, setCategoryName] = useState('');

  useEffect(() => {
    setSelectedQuestions(selectedCategory?.questions?.map(ques => ques?._id) || [])
  },[])

  useEffect(() => {
    getQuestion();
  }, [searchQuery]);

  const getQuestion = async () => {
    setQuestionLoading(true);
    try {
      const response = await API.get('/question/search?query=' + searchQuery);
      setQuestions(response?.data?.questions || []);
    } catch (err) {
      deleteToastMessage(err?.response?.data?.message || 'SERVER ERROR')    
    } finally {
      setQuestionLoading(false);
    }
  };

  const toggleQuestionSelection = (id: string) => {
    const isSelected = selectedQuestions.includes(id);
    if (isSelected) {
      setSelectedQuestions(selectedQuestions.filter((q) => q !== id));
    } else {
      setSelectedQuestions([...selectedQuestions, id]);
    }
  };

  const isQuestionSelected = (question: QuestionSlice) => {
    return selectedQuestions.includes(question?._id);
  };

  const handleSubmit = () => {
    setSearchQuery("")
    setSelectedQuestions([])
    onSubmit(categoryName, selectedQuestions)
  }

  const getBorderColor = (difficulty: string) => {
    console.log("difficulty is ", difficulty)
    switch (difficulty) {
      case 'easy':
        return 'border-green-500';
      case 'medium':
        return 'border-orange-500';
      case 'hard':
        return 'border-red-500';
      default:
        return 'border-gray-300';
    }
  };


  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900 overflow-y-scroll">
      <div className="bg-white p-4 rounded-lg w-[50%] h-[70%]"> {/* Adjust the width and height as needed */}
        <h1 className="text-2xl font-bold mb-4">Search Questions</h1>
        <div className="mb-4 flex flex-row items-center justify-center">
          {
            selectedCategory?.name?.length > 0 ? 
            <span className='block text-gray-600 mb-2 font-bold'>{selectedCategory?.name}</span> :
            <>
              <label className="block text-gray-600 mb-2 font-bold">Name:</label>
                <input
                  type="text"
                  placeholder="Enter Category Name"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full border border-gray-300 rounded px-2 py-1 mx-2"
                />
            </> 
          }
          
        </div>
        <input
          type="text"
          placeholder="Search your questions here"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1 mb-4"
        />
        <div className="overflow-y-auto max-h-[58%]"> {/* Scrollable container */}
          <ul>
            {questionLoading && <div>Loading...</div>}
            {!questionLoading && questions?.map((question, index) => (
              <li
                key={question._id}
                onClick={() => toggleQuestionSelection(question._id)}
                className={`cursor-pointer rounded border p-2 mb-4 ${getBorderColor(question?.difficulty)} ${isQuestionSelected(question) ? 'bg-blue-100' : ''}`}
              >
                <div className="flex justify-between">
                  <span>{index + 1}. {question.title}</span>
                  <span className={`text-${question.difficulty}`}>{question.difficulty}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mr-2"
          >
            Close
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded hover-bg-green-600"
          >
            {selectedCategory?.categoryId ? "Edit" : "Create"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchModal;
