import React from "react"
import { useQuestion } from './useQuestion';
import QuestionDescription from "./components/QuestionDescription";
import Editor from "./components/Editor/index";
import { ToastContainer } from 'react-toastify';

const QuestionSolve = () => {
  
  useQuestion()
  return (
    <div className="flex flex-col md:flex-row flex-grow mt-2">
      <div className="mb-5 md:mb-0 h-auto md:h-[calc(100vh-5rem)] flex w-[100%] md:w-4/12 overflow-y-scroll">
        <QuestionDescription/>
      </div>
      <div className="h-[calc(100vh-5rem)] flex flex-col w-[100%] md:w-8/12">
        <Editor />
      </div>
    </div>
  )
}

export default QuestionSolve