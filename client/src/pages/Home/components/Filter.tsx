import React,{useState} from 'react'
import { FaChevronDown,  } from "react-icons/fa";
import { TiTick } from "react-icons/ti"

interface FilterProps {
    title: string;
    options: string[];
    handleClick: (option: string) => void;
    filtersSelected: string[];
    dropDownOpen: boolean;
    setDropDownOpen:  (title:string) => void;
}

const Filter = ({title, options, handleClick, filtersSelected , dropDownOpen, setDropDownOpen}: FilterProps) => {  
  return (
    <div className='inline-block  relative mr-8 '>
        <div onClick={() => setDropDownOpen(title)} className='bg-gray-100 rounded-sm px-2 py-2 flex items-center'>
           <span className='text-s mr-4'>{title}</span>
           <FaChevronDown />
        </div>
        {
            dropDownOpen && (
                <div className='bg-white absolute shadow-md flex flex-col border w-[150%] p-1 border-gray-300 mt-1 rounded-md '>
                    {
                        options.map(option => (
                            <div key={option} onClick={() => {setDropDownOpen(title); handleClick(option)}} className='cursor-pointer rounded-sm hover:bg-gray-100 p-2 text-s flex items-center'>
                                <p className='w-[90%]'>{option}</p>
                                {filtersSelected?.includes(option) && <TiTick color="green"/>}
                            </div>
                        ))
                    }
                </div>
            )
        }
    </div>
  )
}

export default Filter