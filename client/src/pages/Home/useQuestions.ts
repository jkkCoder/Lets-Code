import { useDispatch } from "react-redux"
import {useEffect} from "react"
import { API } from "../../utils/API"
import { addQuestions } from "../../redux/questionSlice"

const useQuestions = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchQuestion = async () => {
            try{
                const response = await API.get('/question/getQuestions')
                dispatch(addQuestions(response?.data?.questions || []))
            }catch(err){

            }
        
        }
        fetchQuestion()
    },[])


}

export default useQuestions;