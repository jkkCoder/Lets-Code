import React from 'react'
import FilterContainer from './components/FilterContainer'
import { useAppSelector } from '../../redux/storeHook'
import QuestionContainer from './components/QuestionContainer'

const Home = () => {
  const questions = useAppSelector(state => state.questions.questions)
  
  return (
    <div className='flex justify-center'>
      <div className='inline-block'>

        {/* api calls to fetch question made inside filterContainer component */}
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