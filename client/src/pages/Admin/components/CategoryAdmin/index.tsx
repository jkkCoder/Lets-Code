import React from 'react'
import {  useAppSelector } from '../../../../redux/storeHook';
import Accordion from '../../../Category/components/Accordion';
import CategoryFormModal from '../CategoryFormModal';
import { ToastContainer } from 'react-toastify';
import useCategoryAdmin from './useCategoryAdmin';

const CategoryAdmin = () => {
  const categories = useAppSelector((state) => state.categories.categories);
  const {setShowFormModal, showFormModal, createCategory,handleEdit,modalClose, selectedCategory} = useCategoryAdmin()

  return (
    <div>
      <button onClick={() => {setShowFormModal(true)}} className='text-white p-2 bg-black my-2 rounded-sm'>Create Category</button>
      <Accordion categories={categories} showEdit editCta={handleEdit}/>

      <ToastContainer />
      {showFormModal && <CategoryFormModal selectedCategory={selectedCategory}  onClose={modalClose} onSubmit={createCategory}/>}
    </div>
  )
}

export default CategoryAdmin