import React from 'react'
import CodeEditor from '@monaco-editor/react';
import useEditor from './useEditor';
import Output from '../Output';
import { ToastContainer } from 'react-toastify';
import { useAppSelector } from '../../../../redux/storeHook';
import Avatar from 'react-avatar';
import PrimaryModal from '../../../../components/PrimaryModal';


const Editor = () => {
  const user = useAppSelector(state => state.user)
  
  const { 
    handleLanguage, 
    languageSelected, 
    getLanguage, 
    code, 
    setCode, 
    handleCodeSubmit,
    submitLoading, 
    codeOutput, 
    socketConnected,
    handleRoomCta,
    roomMembers,
    session,
    isLoggedin,
    navigateToLogin,
    goBackCta,
    socketServerAwake
  } = useEditor()
  return (
    <>
        <div className='h-3/4 bg-blue-100'>
          <div className='h-10 flex items-center'>
            <select value={languageSelected} className="ml-2 my-[0.5] rounded-sm border border-black" onChange={handleLanguage}>
                <option value='c'>C</option>
                <option value='c++'>C++</option>
                <option value='py'>Python</option>
            </select>
            {
              user?._id && 
              <>
                <button 
                  className='p-1 bg-orange-400 rounded-sm ml-5 text-white'
                  onClick={handleRoomCta}
                >{socketConnected ? "Copy Room's Link" : socketServerAwake ? "Invite Friends" : "Invite Friends Loading..."}</button>
                <div className='ml-5'>
                  {roomMembers?.map(member => <Avatar key={member?.username} className='mr-2' name={member?.username} size='30' round />)}
                </div>

              </>
            }
          </div>
          {
              session && !isLoggedin ? (
                <PrimaryModal 
                  clickCta={navigateToLogin}
                  message='Only Logged in Users can join the room, Please Login'
                  btnName='Login now'
                  goBackCta={goBackCta}
                />
              ) : <CodeEditor
                    height="calc(100% - 42px)"
                    theme="vs-dark"
                    language={getLanguage()}
                    value={code}
                    onChange={(value) => setCode(value)}
                  />

            }
            
        </div>
        <Output codeOutput={codeOutput} submitLoading={submitLoading} onSubmit={handleCodeSubmit}/>
    </>
  )
}

export default Editor