import { useEffect, useRef, useState } from "react"
import { defaultLanguageCode, deleteToastMessage } from "../../../../utils/constants"
import { APIH, ENDPOINT } from "../../../../utils/API"
import { useAppSelector } from "../../../../redux/storeHook"
import io from 'socket.io-client';
import { useLocation, useNavigate } from "react-router-dom";

export interface codeOutputProps {
    success: boolean,
    compileStatus?: string,
    input?: string,
    expectedOutput?: string,
    actualOutput?: string
}

const useEditor = () => {
    const socketRef:any = useRef()
    const location = useLocation();
    const navigate = useNavigate()
    console.log("location is ", location)
    const queryParams = new URLSearchParams(location.search);
    const session = queryParams.get('session');
    const user = useAppSelector(state => state.user)
    const [roomMember, setRoomMembers] = useState([])

    console.log("rtoom member is ", roomMember)

    const [languageSelected, setLanguageSelected] = useState('c')
    const [code, setCode] = useState(defaultLanguageCode['c'])
    const [codeOutput, setCodeOutput] = useState<codeOutputProps>({} as codeOutputProps)
    const [submitLoading, setSubmitLoading] = useState(false)

    const questionId = useAppSelector(state => state.questions.currentQuestion._id)

    useEffect(() => {
      console.log("session is ", session, " user is ", user)
      if(!session){
        return;
      }
      const {email, userName} = user
      if(email.length === 0){    //not logged in
        //show popup to login or else navigate to question page

      }

      socketRef.current = io(ENDPOINT);
      console.log("emitting join request ", userName, session)
      socketRef.current.emit('join', { userName , session }, (error:string) => {
        if (error) {
          deleteToastMessage(error)
          navigate(location.pathname)
        }
      });

      socketRef.current.on('roomMembers', ({users}) => {
        setRoomMembers(users)
      })

      socketRef.current.on('receiveCode', (code:string) => {
        setCode(code)
      })
      return () => {
        socketRef.current.disconnect();
      };
    },[user])

    useEffect(() => {
      if(user.email.length === 0){   
        return;
      }
      if(!session && !socketRef.current){
        return;
      }
      socketRef.current.emit('sendCode', code)
    },[code])
  
    useEffect(() => {
      setCode(defaultLanguageCode[languageSelected])
    },[languageSelected])
  
    const handleLanguage = (e) =>{
      setLanguageSelected(e.target.value)
    }
  
    const getLanguage = () => {
      if(languageSelected === 'c' || languageSelected === 'c++')
        return 'C++'
      else 
        return 'Python'
    }

    const handleCodeSubmit = async () => {
        setCodeOutput({} as codeOutputProps)
        setSubmitLoading(true)
        try{
            const response = await APIH.post('/solution/compile',{
                lang: languageSelected,
                code,
                questionId: questionId
            })
            console.log("response is ", response)
            setCodeOutput(response?.data)
        }catch(err){

        }finally{
            setSubmitLoading(false)
        }
    }

    return {
        handleLanguage, getLanguage, code, setCode, handleCodeSubmit, submitLoading, codeOutput
    }
  
}

export default useEditor;