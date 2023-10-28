import React,{useEffect, useState} from 'react'
import Filter from './Filter'
import { deleteToastMessage, difficultyOptions, questionsPerPage, statusOptions } from '../../../utils/constants'
import FilterTip from './FilterTip'
import { API } from '../../../utils/API'
import { useAppDispatch, useAppSelector } from '../../../redux/storeHook'
import { addFilters, addQuestions, setQuestionsLoading } from '../../../redux/questionSlice'
import { addCategory, setCategoryLoading } from '../../../redux/categorySlice'

interface FilterContainerProps {
  currentPage : number
  setTotalQuestions : React.Dispatch<React.SetStateAction<number>>
  setCurrentPage : React.Dispatch<React.SetStateAction<number>>
}

const FilterContainer = ({currentPage, setTotalQuestions, setCurrentPage}:FilterContainerProps) => {

  const user = useAppSelector( state => state.user )
  const questions = useAppSelector(state => state.questions.questions)
  const categories = useAppSelector(state => state.categories.categories)
  const dispatch = useAppDispatch()
  const [difficultySelected, setDifficultySelected] = useState<string[]>([])
  const [statusSelected, setStatusSelected] = useState<string[]>([])
  const [dropDownOpen, setDropDownOpen ] = useState("")     //contains which drop down is open currently

  useEffect(() => {
    dispatch(addFilters({
      difficultySelected,
      statusSelected
    }))
  },[difficultySelected, statusSelected])

  useEffect(() => {
    const getCategories = async() => {
      try{
        const response = await API.get('/category/allCategories')
        dispatch(addCategory(response?.data?.categories))
      }catch(err){
        deleteToastMessage(err?.response?.data?.message || 'SERVER ERROR')
      }finally{
        dispatch(setCategoryLoading(false))
      }
    }
    if(categories?.length === 0){
      dispatch(setCategoryLoading(true))
      getCategories()
    }
  },[])

  useEffect(() => {
    setCurrentPage(1)
  },[difficultySelected, statusSelected])

  useEffect(() => {
    dispatch(setQuestionsLoading(true))
    const filterQuestions = async() => {
      try{
        const response = await API.get(`/question/filterQuestions?difficulty=${difficultySelected.join(',')}&status=${statusSelected}&userId=${user._id}&itemsPerPage=${questionsPerPage}&page=${currentPage}`)
        setTotalQuestions(response?.data?.totalQuestions);
        dispatch(addQuestions(response?.data?.questions))
      }catch(err){
        deleteToastMessage(err?.response?.data?.message || 'SERVER ERROR')
      }finally{
        dispatch(setQuestionsLoading(false))
      }
    }
    
    filterQuestions()
  },[difficultySelected, statusSelected, currentPage])
  
  const handleDifficultyClick = (option:string) => {
    if(difficultySelected.includes(option)){
      setDifficultySelected(prev => prev.filter(item => item !== option))
      return;
    }
    setDifficultySelected(prev => [...prev, option])
  }

  const handleStatusSelected = (option:string) => {
    if(option === statusSelected[0]){
      setStatusSelected([])
      return;
    }
    setStatusSelected([option])
  }

  const handleDropDownClick = (title: string) => {
    if(title === dropDownOpen){
        setDropDownOpen('')
        return;
    } 
    setDropDownOpen(title)
  }

  const removeFilter = (name:string) => {
    //remove this filter filter either from difficulty or status
    setDifficultySelected(prev => prev.filter(item => item !== name))
    setStatusSelected(prev => prev.filter(item => item !== name))
  }

  return (
    <>
        <div className='flex'> 
            <Filter 
                title="Difficulty" 
                options={difficultyOptions} 
                handleClick={handleDifficultyClick} 
                filtersSelected={difficultySelected}
                dropDownOpen={dropDownOpen === "Difficulty"}
                setDropDownOpen={handleDropDownClick}
            />
            <Filter 
                title="Status" 
                options={statusOptions} 
                handleClick={handleStatusSelected} 
                filtersSelected={statusSelected} 
                dropDownOpen={dropDownOpen === "Status"}
                setDropDownOpen={handleDropDownClick}
            /> 
        </div>
        <div className='my-2'>
            {
                [...difficultySelected, ...statusSelected].map(filters => <FilterTip key={filters} name={filters} removeFilter={removeFilter}/>)
            }
        </div>
            
    </>
  )
}

export default FilterContainer