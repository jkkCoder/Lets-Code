import React from 'react'

interface TabProps {
    name: string
    isSelected: boolean
    handleClick: (name: string) => void;
}

const Tab = ({name, isSelected, handleClick}:TabProps) => {
  return (
    <div onClick={() => handleClick(name)} className={`cursor-pointer p-2 rounded-md mr-5 border border-orange-500 ${isSelected ? "bg-orange-500 text-white": " bg-white text-black"}`}>
        {name}
    </div>
  )
}

export default Tab