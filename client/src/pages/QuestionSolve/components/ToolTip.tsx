import React from 'react'

interface ToolTipProps {
    Message:  () => React.JSX.Element
}
const ToolTip = ({Message}: ToolTipProps) => {
  return (
    <div
        className='text-xs absolute w-[150%] bg-gray-700 text-white p-1 rounded-sm bottom-[100%] right-[50%]'
    >
        {<Message />}
    </div>
  )
}

export default ToolTip