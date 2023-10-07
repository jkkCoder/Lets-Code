import React, {useState} from 'react'
import { useAppSelector } from '../../../redux/storeHook';
import ToolTip from './ToolTip';
import { Link } from 'react-router-dom';
import { codeOutputProps } from './Editor/useEditor';

interface OutputProps {
  onSubmit: () => void;
  submitLoading: boolean;
  codeOutput: codeOutputProps
}

const Output = ({onSubmit, submitLoading,codeOutput}:OutputProps) => {
  const user = useAppSelector(state => state.user)
  const currentQuestion = useAppSelector(state => state.questions.currentQuestion)
  const {_id} = currentQuestion
  const isDisabled = user?.email?.length === 0
  const [showToolTip, setShowToolTip] = useState(false)

  const Message = () => {
    return (
      <p>
        You need to{" "}
        <Link to={`/login?prevScreen=/solve/${_id}`}><span className='bg-orange-500 cursor-pointer rounded-sm px-1'>Login</span></Link> 
         {" "}to run the code
      </p>
    )
  }

  return (
    <div className='h-1/4 overflow-y-scroll'>
      <p className='font-bold text-lg'>Output : </p>
      <div className='p-2'>
        {submitLoading && <p>Executing...</p>}
        {!!codeOutput && codeOutput?.compileStatus ==='SUCCESS' && <p className='text-green-600'>All test cases executed successfully</p>}
        {!!codeOutput && codeOutput?.compileStatus === 'ERROR' &&
          <>
            <p className='text-red-600'>Your code failed for below testcase</p>
            <div className='text-sm'>
              <span className='font-semibold'>Input : </span>
              <span>{codeOutput?.input}</span>
            </div>
            <div className='text-sm'>
              <span className='font-semibold'>Expected Output : </span>
              <span>{codeOutput?.expectedOutput}</span>
            </div>
            <div className='text-sm'>
              <span className='font-semibold'>Your Output : </span>
              <span>{codeOutput?.actualOutput}</span>
            </div>
          </>
        }

      </div>
      {/* absolute submit button  */}
      <div 
        onMouseEnter={() => setShowToolTip(true)}
        onMouseLeave={() => setShowToolTip(false)}
        className='absolute bottom-2 right-10'>
        <button 
          disabled={isDisabled || submitLoading} 
          onClick={onSubmit} 
          className={`${isDisabled || submitLoading ? 'bg-orange-200' : 'bg-orange-400'} ${!isDisabled && !submitLoading && 'hover:bg-orange-500'} px-2 py-1 rounded-sm`}>
            Submit
          </button>

          {showToolTip && isDisabled && (
            <ToolTip Message={Message} />
          )}
      </div>
    </div>
  )
}

export default Output