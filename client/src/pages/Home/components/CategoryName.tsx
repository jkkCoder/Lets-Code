import React from 'react'

interface CategoryNameProps{
    name:string;
}

const CategoryName = ({name}:CategoryNameProps) => {
  return (
    <p className='p-2 m-2 bg-orange-400 hover:bg-orange-500 rounded-lg'>
        {name}
    </p>
  )
}

export default CategoryName