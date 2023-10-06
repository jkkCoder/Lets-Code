import React from 'react'
import { useAppSelector } from '../../../redux/storeHook'
import { capitalizeFirstLetter } from '../../../utils/constants'
import Testcase from './Testcase'
import QuestionDetailSkeleton from './QuestionDescriptionSkeleton'


const QuestionDescription = () => {
  const question = useAppSelector(state => state.questions)
  const {currentQuestion , currentQuestionLoading} = question
  const {title="", description="", Category="", testCases=[], difficulty=""} = currentQuestion

  if(currentQuestionLoading) return <QuestionDetailSkeleton />
  return (
    <div className='flex flex-col'>
        <p className='font-bold text-2xl'>{capitalizeFirstLetter(title)}</p>
        <div className='flex items-centers mt-2'>
            <p className={`self-center ${difficulty === 'easy' ? `text-[#28B5B0]` : difficulty === 'medium'? `text-[#FFC218]`: `text-[#FF2D55]`}`}>
                {capitalizeFirstLetter(difficulty)}
            </p>
            {!!Category && <p className='ml-5 bg-orange-400 rounded-2xl px-2 py-1 text-white'>{Category}</p>}
        </div>

        <p className='mt-2'>{description}</p>
        {testCases.map((testCase, index) => (
            <Testcase key={testCase?.input} testCase={testCase} number={index+1}/>
        ))}        
    </div>
  )
}

export default QuestionDescription