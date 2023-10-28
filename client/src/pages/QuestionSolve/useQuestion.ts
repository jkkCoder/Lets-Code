import { useParams } from "react-router-dom"
import { useAppDispatch } from "../../redux/storeHook";
import { useEffect } from "react";
import { API } from "../../utils/API";
import { addCurrentQuestion, removeCurrentQuestion, setCurrentQuestionLoading } from "../../redux/questionSlice";
import { deleteToastMessage } from "../../utils/constants";

export const useQuestion = () => {
  const params = useParams();
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(setCurrentQuestionLoading(true))
    const fetchQuestsionData = async () => {
      try{
        const response = await API.get('/question/' + params?.id)
        dispatch(addCurrentQuestion({
          ...response?.data?.question,
          Category: response?.data?.question?.Category?.name
        }))
      }catch(err){
        deleteToastMessage(err?.response?.data?.message || 'SERVER ERROR')
      }finally{
        dispatch(setCurrentQuestionLoading(false))
      }
    }
    fetchQuestsionData()
  },[params])
}
