import React from 'react'
import { QuestionSlice } from '../../../redux/questionSlice'
import { GREEN, ORANGE, RED} from "../../../utils/colors"
import { Link } from 'react-router-dom'

interface QuestionContainerProps {
    number: number
    question:  QuestionSlice
}

const QuestionContainer = ({number, question}:QuestionContainerProps) => {
    
  
  return (
    <Link to={`/solve/${question?._id}`}>
        <div className={`${number % 2 === 0 ? `bg-[white]` : `bg-[#F3F4F6]`} flex w-[50rem] p-1`}>
            <div className='flex w-9/12 hover:text-blue-700'>
                <p className='mr-5'>{`${number}) `}</p>
                <p className=''>{question?.title}</p>
            </div>
            <p 
            className={`w-3/12 self ${question?.difficulty === 'easy' ? `text-[#28B5B0]` : question?.difficulty === 'medium'? `text-[#FFC218]`: `text-[#FF2D55]`}`}>
                {question?.difficulty}
            </p>
        </div>
    </Link>
  )
}

export default QuestionContainer