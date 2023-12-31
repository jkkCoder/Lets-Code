import React from 'react'
import { QuestionSlice } from '../../../redux/questionSlice'
import { Link } from 'react-router-dom'
import {MdOutlineEdit, MdDelete} from "react-icons/md"

interface QuestionContainerProps {
    number: number
    question:  QuestionSlice
    showEdit?: boolean
    handleEditCta?: () => void;
    handleDeleteCta?: () => void;
}

const QuestionContainer = ({number, question, showEdit = false, handleDeleteCta, handleEditCta}:QuestionContainerProps) => {
    
  
  return (
    <div className={`${number % 2 === 0 ? `bg-[white]` : `bg-[#F3F4F6]`} flex p-1`}>
        <div className='flex w-9/12 hover:text-blue-700'>
            <p className='mr-2 w-8'>{`${number}) `}</p>
            <p className=''>{question?.title}</p>
        </div>
        <p 
        className={`w-3/12 self ${question?.difficulty === 'easy' ? `text-[#28B5B0]` : question?.difficulty === 'medium'? `text-[#FFC218]`: `text-[#FF2D55]`}`}>
            {question?.difficulty}
        </p>
        {
            showEdit && <>
                <MdOutlineEdit className="mr-10 cursor-pointer" onClick={handleEditCta}/>
                <MdDelete className='cursor-pointer'  onClick={handleDeleteCta}/>
            </>
        }
    </div>
  )
}

export default QuestionContainer