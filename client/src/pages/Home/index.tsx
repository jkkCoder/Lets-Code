import React from 'react'
import useQuestions from './useQuestions'
import FilterContainer from './components/FilterContainer'

const Home = () => {
  useQuestions()

  
  return (
    <div className=''>
      <FilterContainer />
      
    </div>
  )
}

export default Home