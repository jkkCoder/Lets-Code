import React from "react"
import { useQuestion } from './useQuestion';
import QuestionDescription from "./components/QuestionDescription";
import Editor from "./components/Editor";
import Output from "./components/Output";


const QuestionSolve = () => {
  
  useQuestion()
  return (
    <div className="flex flex-grow mt-2">
      <div style={{ height: 'calc(100vh - 2.5rem)' }} className=" flex w-3/12 overflow-y-scroll">
        <QuestionDescription/>
      </div>
      <div style={{ height: 'calc(100vh - 2.5rem)' }} className="flex flex-col w-9/12 overflow-y-scroll">
        <Editor />
        <Output />
      </div>
    </div>
  )
}

export default QuestionSolve