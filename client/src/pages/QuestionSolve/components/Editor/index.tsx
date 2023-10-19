import React from 'react'
import CodeEditor from '@monaco-editor/react';
import useEditor from './useEditor';
import Output from '../Output';
import { ToastContainer } from 'react-toastify';


const Editor = () => {

  const {handleLanguage, getLanguage, code, setCode, handleCodeSubmit,submitLoading, codeOutput} = useEditor()
  return (
    <>
        <div className='h-3/4 bg-blue-100'>
            <select className="ml-2 my-[0.5] rounded-sm border border-black" onChange={handleLanguage}>
                <option value='c'>C</option>
                <option value='c++'>C++</option>
                <option value='py'>Python</option>
            </select>
            <CodeEditor
                height="calc(100% - 30px)"
                theme="vs-dark"
                language={getLanguage()}
                value={code}
                onChange={(value) => setCode(value)}
            />
        </div>
        <Output codeOutput={codeOutput} submitLoading={submitLoading} onSubmit={handleCodeSubmit}/>
        <ToastContainer />
    </>
  )
}

export default Editor