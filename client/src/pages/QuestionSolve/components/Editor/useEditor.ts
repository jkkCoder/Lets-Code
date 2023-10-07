import { useEffect, useState } from "react"
import { defaultLanguageCode } from "../../../../utils/constants"
import { APIH } from "../../../../utils/API"
import { useAppSelector } from "../../../../redux/storeHook"

export interface codeOutputProps {
    success: boolean,
    compileStatus?: string,
    input?: string,
    expectedOutput?: string,
    actualOutput?: string
}

const useEditor = () => {
    const [languageSelected, setLanguageSelected] = useState('c')
    const [code, setCode] = useState(defaultLanguageCode['c'])
    const [codeOutput, setCodeOutput] = useState<codeOutputProps>({} as codeOutputProps)
    const [submitLoading, setSubmitLoading] = useState(false)

    const questionId = useAppSelector(state => state.questions.currentQuestion._id)
  
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