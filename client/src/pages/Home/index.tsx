import React from 'react'
import FilterContainer from './components/FilterContainer'
import { useAppSelector } from '../../redux/storeHook'
import QuestionContainer from './components/QuestionContainer'
import QuestionContainerSkeleton from './components/QuestionSkeleton'
import CategoryName from './components/CategoryName'
import { Link } from 'react-router-dom'
import CategorySkeleton from './components/CategorySkeleton'

const Home = () => {
  const questions = useAppSelector(state => state.questions.questions)
  const category = useAppSelector(state => state.categories)
  const {categories, categoryLoading} = category
  const questionsLoading = useAppSelector(state => state.questions.questionsLoading)
  
  return (    
    <div className='flex flex-row mt-4'>
      <div className='overflow-y-scroll w-9/12 min-h-[12rem]'>
        {/* api calls to fetch question and categories made inside filterContainer component */}
        <FilterContainer />
        { questionsLoading && <QuestionContainerSkeleton /> }
        {
          !questionsLoading && questions.map((question,index) => <QuestionContainer 
            key={question?._id}
            number={index+1} 
            question={question} 
          />
          )
        }
      </div>
      <div className=' w-3/12 m-2'>
        <p className='font-bold text-3xl mb-5'>Categories</p>
        <div className='flex my-2 flex-wrap'>
          {categoryLoading && <CategorySkeleton />}
          {!categoryLoading && categories.map(category => (
            <Link key={category?._id} to={`/category?=name=${category?.name}`}>
                <CategoryName name={category?.name}/>
            </Link>
          ))}
        </div>
      </div>
    </div>

    
  )
}

export default Home