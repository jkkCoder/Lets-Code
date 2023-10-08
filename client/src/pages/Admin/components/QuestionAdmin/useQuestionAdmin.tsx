import {useState} from "react"
import { QuestionSlice } from "../../../../redux/questionSlice"
import { APIH } from "../../../../utils/API"
import { deleteToastMessage, successToastMessage } from "../../../../utils/constants"

const useQuestionAdmin = () => {

  const [deleteModal, setDeleteModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [selectedTitle, setSelectedTitle] = useState<QuestionSlice>({} as QuestionSlice)
  
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

  const deleteQuestion = async () => {
    try{
        const response = await APIH.delete('/question/' + selectedTitle?._id)
        if(response?.data?.success){
            successToastMessage('Question delete successfully')
        }
    }catch(err){
        deleteToastMessage('Question not deleted, Internal server error')
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
            }
        }catch(err){
            deleteToastMessage('Question not created, Internal server error')
        }finally{
            setEditModal(false)
        }
    }else{  //make an edit api
        try{
            const response = await APIH.put('/question/' +  selectedTitle?._id, {updatedQuestion: formData})
            if(response?.data?.success){
                successToastMessage('Question edited successfully')
            }

        }catch(err){
            deleteToastMessage('Question not edited, Internal server error')
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