import React, { useEffect, useState } from 'react';
import { QuestionSlice } from '../../../../redux/questionSlice';

const initialTestCase = {
  input: '',
  expectedOutput: '',
  explanation: '',
};

const initialFormData: QuestionSlice = {
  title: '',
  description: '',
  difficulty: 'easy',
  testCases: [initialTestCase],
};

const deepCopy = (obj: QuestionSlice) => JSON.parse(JSON.stringify(obj));

interface QuestionFormModalProps {
    onClose : () => void;
    onSubmit: (formData: QuestionSlice) => void;
    selectedQuestion?: QuestionSlice
}

const QuestionFormModal = ({ onClose, onSubmit, selectedQuestion }:QuestionFormModalProps) => {
  const [formData, setFormData] = useState(!selectedQuestion?._id ? initialFormData : selectedQuestion);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTestCaseChange = (e, index:number) => {
    const { name, value } = e.target;
    const updatedFormData = deepCopy(formData);
    updatedFormData.testCases[index][name] = value;
    setFormData(updatedFormData);
  };

  const addTestCase = () => {
    const lastTestCase = formData?.testCases[formData?.testCases?.length - 1]
    if(lastTestCase["input"] === "" || lastTestCase["expectedOutput"] === "" )
        return;       
    const updatedFormData = deepCopy(formData);
    updatedFormData.testCases.push(initialTestCase);
    setFormData(updatedFormData);
  };

  const removeTestCase = (index:number) => {
    if(formData?.testCases?.length <= 1)
        return;
    const updatedFormData = deepCopy(formData); 
    updatedFormData.testCases.splice(index, 1);
    setFormData(updatedFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form datra is ", formData)
    onSubmit(formData);
    setFormData(initialFormData)    
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50 bg-gray-900 overflow-y-scroll">
      <div className="bg-white p-4 rounded-lg">
        <h1 className="text-2xl font-bold mb-4">Create Question</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Description:</label>
            <textarea
              rows={5}
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1 resize-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Difficulty:</label>
            <select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-2 py-1"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-600">Test Cases:</label>
            {formData?.testCases?.map((testCase, index) => (
              <div key={index} className="flex flex-col mb-4">
                <div className="flex items-center mb-2">
                  <input
                    type="text"
                    name="input"
                    value={testCase.input}
                    onChange={(e) => handleTestCaseChange(e, index)}
                    placeholder="Input"
                    className="border border-gray-300 rounded px-2 py-1 mr-2"
                  />
                  <input
                    type="text"
                    name="expectedOutput"
                    value={testCase.expectedOutput}
                    onChange={(e) => handleTestCaseChange(e, index)}
                    placeholder="Expected Output"
                    className="border border-gray-300 rounded px-2 py-1 mr-2"
                  />
                  <button
                    type="button"
                    onClick={() => removeTestCase(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  >
                    -
                  </button>
                </div>
                <div className="flex items-center mb-2">
                    <input
                        type="text"
                        name="explanation"
                        value={testCase.explanation}
                        onChange={(e) => handleTestCaseChange(e, index)}
                        placeholder="Explanation"
                        className="border border-gray-300 rounded px-2 py-1 w-11/12"
                    />
                    <button
                        type="button"
                        onClick={addTestCase}
                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 w-1/12 ml-2"
                    >+</button>
                </div>
                
              </div>
            ))}
          </div>
          <div className="flex">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
            >
              {!selectedQuestion?._id ? "Submit" : "Edit"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionFormModal;
