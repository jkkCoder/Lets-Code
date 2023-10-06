import React,{useEffect, useState} from 'react'
import Filter from './Filter'
import { difficultyOptions, statusOptions } from '../../../utils/constants'
import FilterTip from './FilterTip'
import { API } from '../../../utils/API'
import { useAppDispatch, useAppSelector } from '../../../redux/storeHook'
import { addQuestions, setQuestionsLoading } from '../../../redux/questionSlice'

const FilterContainer = () => {

  const user = useAppSelector( state => state.user )
  const dispatch = useAppDispatch()
  const [difficultySelected, setDifficultySelected] = useState<string[]>([])
  const [statusSelected, setStatusSelected] = useState<string[]>([])
  const [dropDownOpen, setDropDownOpen ] = useState("")     //contains which drop down is open currently

  useEffect(() => {
    dispatch(setQuestionsLoading(true))
    const filterQuestions = async() => {
      try{
        const response = await API.get(`/question/filterQuestions?difficulty=${difficultySelected.join(',')}&status=${statusSelected}&userId=${user._id}`)
        dispatch(addQuestions(response?.data?.questions))
      }catch(err){

      }finally{
        dispatch(setQuestionsLoading(false))
      }
    }
    filterQuestions()
  },[difficultySelected, statusSelected])
  
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