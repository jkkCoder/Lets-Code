import React from 'react'

interface TestCaseProps {
    number: number;
    testCase: {
        input: string;
        expectedOutput: string;
        explanation: string;
    }
}

const Testcase = ({number, testCase}: TestCaseProps) => {
  return (
    <div className='mt-4'>
        <p className='font-semibold'>{'Example ' + number}</p>
        <div className='p-2 m-1 border border-gray-300 shadow-lg'>
            <div>
                <span className='font-semibold'>Input : </span>
                <span>{testCase?.input}</span>
            </div>
            <div>
                <span className='font-semibold'>Output : </span>
                <span>{testCase?.expectedOutput}</span>
            </div>
            {
                testCase?.explanation && (
                    <div>
                        <span className='font-semibold'>Explanation : </span>
                        <span>{testCase?.explanation}</span>
                    </div>
                )
            }
        </div>
    </div>
  )
}

export default Testcase