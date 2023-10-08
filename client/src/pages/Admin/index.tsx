import React from 'react'
import Tab from './components/Tab'
import QuestionAdmin from './components/QuestionAdmin'
import CategoryAdmin from './components/CategoryAdmin'
import useAdmin from './useAdmin'

const Admin = () => {
  
   const {tabIndex, toggleTab} = useAdmin()

  return (
    <div className='mt-5'>
        <div className='flex'>
            <Tab name="QUESTION" isSelected={tabIndex === 1} handleClick={toggleTab}/>
            <Tab name="CATEGORY" isSelected={tabIndex === 2} handleClick={toggleTab}/>
        </div>

        {
            tabIndex === 1 ? <QuestionAdmin /> : <CategoryAdmin />
        }
    </div>
  )
}

export default Admin