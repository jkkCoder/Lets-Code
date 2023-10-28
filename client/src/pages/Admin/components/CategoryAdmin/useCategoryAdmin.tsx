import {useState , useEffect} from "react"
import { useAppDispatch } from "../../../../redux/storeHook"
import { API, APIH } from "../../../../utils/API"
import { deleteToastMessage, successToastMessage } from "../../../../utils/constants"
import { addCategory } from "../../../../redux/categorySlice"
import { QuestionSlice } from "../../../../redux/questionSlice"

export interface selectedCategoryInterface {
    categoryId: string;
    name: string;
    questions: QuestionSlice[]
}

const useCategoryAdmin = () => {
  const dispatch = useAppDispatch()

  const [showFormModal, setShowFormModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<selectedCategoryInterface>({} as selectedCategoryInterface)

  useEffect(() => {
    getCategories();
  }, []);

  const createCategory = async (name: string, questionIds: string[]) =>{

    if(selectedCategory?.categoryId?.length > 0){       //edit existing category
        try{
            const response = await APIH.put('/category/updateQuestionsInCategory/' + selectedCategory?.categoryId, 
                {questions: questionIds}
            )
            if(response?.data?.success){
                successToastMessage('Category edited successfully')
            }
        }catch(err){
            deleteToastMessage(err?.response?.data?.message || 'Category not edited, Internal server error')
        }finally{
            setShowFormModal(false)
            setSelectedCategory({} as selectedCategoryInterface)
            getCategories()
        }
    }else{              //create new category
        try{          
            const response = await APIH.post('/category/createCategory',{
              name,
              questions: questionIds
            })
            if(response?.data?.success){
              successToastMessage('Category created successfully')
            }
          }catch(err){
            deleteToastMessage(err?.response?.data?.message || 'Category not created, Internal server error')
          }finally{
            setShowFormModal(false)
            setSelectedCategory({} as selectedCategoryInterface)
            getCategories()
        }
    }
  }

  const getCategories = async () => {
    try {
      const response = await API.get('/category/allCategories');
      dispatch(addCategory(response?.data?.categories));
    } catch (err) {
        deleteToastMessage(err?.response?.data?.message || 'SERVER ERROR')
    } finally {
    }
  };

  const handleEdit = async (categoryId: string, name:string, questions: QuestionSlice[]) => {
    setSelectedCategory({
        categoryId, name, questions
    })
    setShowFormModal(true)
  }

  const modalClose = () => {
    setShowFormModal(false)
    setSelectedCategory({} as selectedCategoryInterface)
  }

  return {
    setShowFormModal, showFormModal, createCategory,handleEdit, modalClose, selectedCategory
  }
}

export default useCategoryAdmin;