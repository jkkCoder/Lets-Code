import React, {useEffect, useState} from 'react'
import { useAppDispatch, useAppSelector } from '../../../../redux/storeHook';
import { API, APIH } from '../../../../utils/API';
import { addCategory, setCategoryLoading } from '../../../../redux/categorySlice';
import Accordion from '../../../Category/components/Accordion';
import CategoryFormModal from './components/CategoryFormModal';
import { deleteToastMessage, successToastMessage } from '../../../../utils/constants';
import { ToastContainer } from 'react-toastify';

const CategoryAdmin = () => {
  const categories = useAppSelector((state) => state.categories.categories);
  const dispatch = useAppDispatch()

  const [showFormModal, setShowFormModal] = useState(false)

  const createCategory = async (name: string, questionIds: string[]) =>{
    try{
      const response = await APIH.post('/category/createCategory',{
        name,
        questions: questionIds
      })
      if(response?.data?.success){
        successToastMessage('Category created successfully')
      }
    }catch(err){
      deleteToastMessage(err?.response?.data?.message || 'Question not created, Internal server error')
    }finally{
      setShowFormModal(false)
      getCategories()
    }
  }

  const getCategories = async () => {
    try {
      const response = await API.get('/category/allCategories');
      dispatch(addCategory(response?.data?.categories));
    } catch (err) {
      // Handle errors
    } finally {
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className='mt-2'>
      <button onClick={() => {setShowFormModal(true)}} className='text-white p-2 bg-black my-2 rounded-sm'>Create Category</button>
      <Accordion categories={categories} />

      <ToastContainer />
      {showFormModal && <CategoryFormModal onClose={() => {setShowFormModal(false)}} onSubmit={createCategory}/>}
    </div>
  )
}

export default CategoryAdmin