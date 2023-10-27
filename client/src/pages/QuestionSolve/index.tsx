import React from "react"
import { useQuestion } from './useQuestion';
import QuestionDescription from "./components/QuestionDescription";
import Editor from "./components/Editor/index";
import { ToastContainer } from 'react-toastify';

const QuestionSolve = () => {
  <ToastContainer />
  useQuestion()
  return (
    <div className="flex flex-grow mt-2">
      <div style={{ height: 'calc(100vh - 5rem)' }} className=" flex w-4/12 overflow-y-scroll">
        <QuestionDescription/>
      </div>
      <div style={{ height: 'calc(100vh - 5rem)' }} className="flex flex-col w-8/12">
        <Editor />
      </div>
    </div>
  )
}

export default QuestionSolve