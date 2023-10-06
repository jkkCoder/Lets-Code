import React from 'react'

interface CategoryNameProps{
    name:string;
}

const CategoryName = ({name}:CategoryNameProps) => {
  return (
    <span className='p-2 m-2 bg-orange-400 rounded-lg'>
        {name}
    </span>
  )
}

export default CategoryName