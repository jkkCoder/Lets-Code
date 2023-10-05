import React from 'react'
import useQuestions from './useQuestions'
import FilterContainer from './components/FilterContainer'
import { useAppSelector } from '../../redux/storeHook'
import QuestionContainer from './components/QuestionContainer'

const Home = () => {
  const questions = useAppSelector(state => state.questions.questions)
  useQuestions()

  
  return (
    <div className='flex justify-center'>
      <div className='inline-block'>
        <FilterContainer />
        {
          questions.map((question,index) => <QuestionContainer 
            key={question?._id}
            number={index+1} 
            question={question} 
          />
          )
        }

      </div>
    </div>
    
  )
}

export default Home