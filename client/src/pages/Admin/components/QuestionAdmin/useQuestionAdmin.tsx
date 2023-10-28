import {useState} from "react"
import { QuestionSlice, addQuestions, setQuestionsLoading } from "../../../../redux/questionSlice"
import { API, APIH } from "../../../../utils/API"
import { deleteToastMessage, successToastMessage } from "../../../../utils/constants"
import { useDispatch } from "react-redux"
import { useAppSelector } from "../../../../redux/storeHook"

const useQuestionAdmin = () => {

  const filterSelected = useAppSelector(state => state.questions.filterSelected)
  const user  = useAppSelector(state => state.user)

  const [deleteModal, setDeleteModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [selectedTitle, setSelectedTitle] = useState<QuestionSlice>({} as QuestionSlice)

  const dispatch = useDispatch()
  
  const handleDeleteCta = async (question: QuestionSlice) => {
    setSelectedTitle(question)
    setDeleteModal(true)
  }

  const deleteModalClose = () => {
    setDeleteModal(false)
    setSelectedTitle({} as QuestionSlice)
  }

  const editModalClose = () => {
    setEditModal(false)
    setSelectedTitle({} as QuestionSlice)
  }

  const handleEditCta = (question: QuestionSlice) => {
    setSelectedTitle(question)
    setEditModal(true)
  }

  
    const filterQuestions = async() => {
      dispatch(setQuestionsLoading(true))
      try{
        const response = await API.get(`/question/filterQuestions?difficulty=${filterSelected?.difficultySelected.join(',')}&status=${filterSelected?.statusSelected}&userId=${user._id}`)
        dispatch(addQuestions(response?.data?.questions))
      }catch(err){
        deleteToastMessage(err?.response?.data?.message || 'SERVER ERROR')
      }finally{
        dispatch(setQuestionsLoading(false))
      }
    }

  const deleteQuestion = async () => {
    try{
        const response = await APIH.delete('/question/' + selectedTitle?._id)
        if(response?.data?.success){
            successToastMessage('Question delete successfully')
            filterQuestions()
        }
    }catch(err){
        deleteToastMessage(err?.response?.data?.message || 'Question not deleted, Internal server error')
    }finally{
        setSelectedTitle({} as QuestionSlice)
        setDeleteModal(false)
    }
  }

  const createOrEditQuestion = async (formData : QuestionSlice) => {
    if(!selectedTitle?._id){     //make a create api
        try{
            const response = await APIH.post('/question/createQuestion',formData)
            if(response?.data?.success){
                successToastMessage('Question created successfully')
                filterQuestions()
            }
        }catch(err){
            deleteToastMessage(err?.response?.data?.message || 'Question not created, Internal server error')
            filterQuestions()
        }finally{
            setEditModal(false)
        }
    }else{  //make an edit api
        try{
            const response = await APIH.put('/question/' +  selectedTitle?._id, {updatedQuestion: formData})
            if(response?.data?.success){
                successToastMessage('Question edited successfully')
                filterQuestions()
            }

        }catch(err){
            deleteToastMessage(err?.response?.data?.message || 'Question not edited, Internal server error')
        }finally{
            setSelectedTitle({} as QuestionSlice)
            setEditModal(false)
        }
    }
  }

  return {
    setEditModal,
    handleEditCta,
    handleDeleteCta,
    deleteModal,
    deleteModalClose,
    selectedTitle, 
    deleteQuestion,
    editModal,
    editModalClose, 
    createOrEditQuestion
  }
}

export default useQuestionAdmin