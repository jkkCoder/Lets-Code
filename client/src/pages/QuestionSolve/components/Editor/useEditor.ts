import { useEffect, useRef, useState } from "react"
import { defaultLanguageCode, deleteToastMessage, successToastMessage } from "../../../../utils/constants"
import { API, APIH, SOCKET_ENDPOINT } from "../../../../utils/API"
import { useAppSelector } from "../../../../redux/storeHook"
import io from 'socket.io-client';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

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
    const params = useParams();
    const navigate = useNavigate()
    const queryParams = new URLSearchParams(location.search);
    const session = queryParams.get('session');
        const user = useAppSelector(state => state.user)
    const [roomMembers, setRoomMembers] = useState([])
    const [shouldSync, setShouldSync] = useState(true)
    const [socketConnected, setSocketConnected] = useState(false)
    const [socketServerAwake, setSocketServerAwake] = useState(false)


    const [languageSelected, setLanguageSelected] = useState('c')
    const [code, setCode] = useState(defaultLanguageCode['c'])
    const [codeOutput, setCodeOutput] = useState<codeOutputProps>({} as codeOutputProps)
    const [submitLoading, setSubmitLoading] = useState(false)

    const questionId = useAppSelector(state => state.questions.currentQuestion._id)
    const isLoggedin = user?._id?.length > 0

    {/*  
        the below useEffect is only for waking onRenderer server, because it sleeps after 15 minutes
        of inactivity, and adaptable's server is not reliable for socket connections, so we are using 
        onRenderer server for socket connection.
    */}
    useEffect(() => {   //wake up webSocket server (onRenderer)
      if(!isLoggedin)
        return;
      
      const timer = setInterval(async() => {
        await wakeUpServer()
      },2000)

      //stop connection attemp after 2 minutes
      const stopWakeUpTimer = setTimeout(() => {
        clearInterval(timer)
      },120000) //2 minutes

      const wakeUpServer = async() => {
        try{
          const res = await axios.get(`${SOCKET_ENDPOINT}/dummy`)
          if(res?.data?.connected){
            setSocketServerAwake(true)
            clearInterval(timer)
          }
        }catch(err){ }
      }

      return () => {
        clearInterval(timer)
        clearTimeout(stopWakeUpTimer)
      }
    },[])

    useEffect(() => {
      if(!session){
        return;
      }
      const {userName} = user

      socketRef.current = io(SOCKET_ENDPOINT, {
        withCredentials: true, 
        transports: ['websocket'],
      });

      socketRef.current.on('connect_error', (err:string) => deleteToastMessage(err))
      socketRef.current.on('connect_failed', (err:string) => deleteToastMessage(err))

      socketRef.current.emit('join', { userName ,session: session + params.id }, (error:string) => {
        if (error) {
          deleteToastMessage(error)
          navigate(location.pathname)
        }
        }, () => {
          //success callback
          setSocketConnected(true)
        }
      );

      socketRef.current.on('roomMembers', ({users}) => {      
        setRoomMembers(users)
      })

      socketRef.current.on('duplicateEntry', ({message}) => {
        successToastMessage(message)
        navigate(location.pathname)
      })

      socketRef.current.on('receiveCode', (code:string) => {
        setShouldSync(false)
        setCode(code)
      })

      socketRef.current.on('receiveLanguage', (lang: string) => {
        setShouldSync(false)
        setLanguageSelected(lang)
      })

      socketRef.current.on('leaveMessage',({username}) => {
        if(username !== '')
          deleteToastMessage(`${username} left`)
      })

      return () => {
        setRoomMembers([])
        setSocketConnected(false)
        socketRef.current.disconnect();
        socketRef.current.off('roomMembers')
        socketRef.current.off('receiveCode')
        socketRef.current.off('receiveLanguage')
        socketRef.current.off('duplicateEntry')
      };
    },[user, session])

    useEffect(() => {
      if(!session){
        return;
      }
      socketRef.current.on('joined', ({userName, socketId}) => {
        if(userName !== '')
          successToastMessage(`${userName} joined`)
        socketRef.current.emit('sync-code', {code,languageSelected , socketId})
      })

      return (() => {
        socketRef.current.off('joined')
      })
    }, [code,languageSelected])

    useEffect(() => {
      if(!isLoggedin){   
        return;
      }
      if(!session && !socketRef.current){
        return;
      }
      if(!shouldSync){
        setShouldSync(true)
        return;
      }
      socketRef.current.emit('sendCode', code)
    },[code])

  
    useEffect(() => {
      setCode(defaultLanguageCode[languageSelected])
      if(!isLoggedin){   
        return;
      }
      if(!session && !socketRef.current){
        return;
      }
      socketRef.current.emit('sendLanguage', languageSelected)
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
            setCodeOutput(response?.data)
        }catch(err){
          deleteToastMessage(err?.response?.data?.message || 'SERVER ERROR')
        }finally{
            setSubmitLoading(false)
        }
    }

    const handleRoomCta = () => {
      if(socketConnected){
        navigator.clipboard.writeText(window.location.href);
        successToastMessage("Room's Link Copied")
      }else{
        socketServerAwake && navigate(`${location.pathname}?session=${user?._id}`)
      }
    }

    const navigateToLogin = () => {
      navigate(`/login?prevScreen=${location.pathname}?session=${session}`)
    }

    const goBackCta = () => {
      navigate(location.pathname)
    }

    return {
        handleLanguage, getLanguage, code, setCode, handleCodeSubmit, submitLoading, isLoggedin, goBackCta,
        codeOutput, languageSelected,socketConnected, handleRoomCta, roomMembers, session, navigateToLogin, socketServerAwake
    }
  
}

export default useEditor;