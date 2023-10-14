import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/storeHook';
import { API } from '../../utils/API';
import { addCategory, setCategoryLoading } from '../../redux/categorySlice';
import Accordion from './components/Accordion';

const Category = () => {
  const categories = useAppSelector((state) => state.categories.categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await API.get('/category/allCategories');
        dispatch(addCategory(response?.data?.categories));
      } catch (err) {
        // Handle errors
      } finally {
        dispatch(setCategoryLoading(false));
      }
    };
    if (categories?.length === 0) {
      dispatch(setCategoryLoading(true));
      getCategories();
    }
  }, []);

  return (
    <div style={{ height: 'calc(100vh - 6rem)'}} className="mt-5 overflow-y-scroll">
      <Accordion categories={categories} />
    </div>
  );
};

export default Category;
