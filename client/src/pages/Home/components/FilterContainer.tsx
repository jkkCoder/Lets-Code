import React,{useState} from 'react'
import Filter from './Filter'
import { difficultyOptions, statusOptions } from '../../../utils/constants'
import FilterTip from './FilterTip'

const FilterContainer = () => {

  const [difficultySelected, setDifficultySelected] = useState<string[]>([])
  const [statusSelected, setStatusSelected] = useState<string[]>([])
  const [dropDownOpen, setDropDownOpen ] = useState("")     //contains which drop down is open currently
  
  const handleDifficultyClick = (option:string) => {
    if(difficultySelected.includes(option)){
      setDifficultySelected(prev => prev.filter(item => item !== option))
      return;
    }
    setDifficultySelected(prev => [...prev, option])
  }

  const handleStatusSelected = (option:string) => {
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