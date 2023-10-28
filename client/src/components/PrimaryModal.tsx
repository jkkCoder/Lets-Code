import React from 'react'
import {AiOutlineArrowLeft} from 'react-icons/ai'

interface PrimaryModalProps {
    message: string;
    clickCta : () => void;
    btnName: string;
    goBackCta: () => void;
}

const PrimaryModal = ({message, clickCta, btnName, goBackCta}: PrimaryModalProps) => {
    console.log("are we here")
  return (
    <div className='fixed z-50 top-0 left-0 w-screen h-screen flex items-center justify-center bg-black opacity-90'>
        <div className='bg-white min-w-[100px] min-h-[50px] p-10'>
            <div className='text-grey mb-4 cursor-pointer' onClick={goBackCta}>
                <AiOutlineArrowLeft size={20} />
            </div>
            <p className='text-xl font-semibold'>{message}</p>
            <button className='mt-5 text-center w-full bg-blue-500 p-5 text-white' onClick={clickCta}>{btnName}</button>
        </div>
    </div>
  )
}

export default PrimaryModal