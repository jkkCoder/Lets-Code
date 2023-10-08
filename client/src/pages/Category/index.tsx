import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/storeHook';
import { API } from '../../utils/API';
import { addCategory, setCategoryLoading } from '../../redux/categorySlice';
import QuestionContainer from '../Home/components/QuestionContainer';

// const faqs = [
//   {
//     title: 'Where are these chairs assembled?',
//     text:
//       'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus.',
//   },
//   {
//     title: 'How long do I have to return my chair?',
//     text: 'Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus.',
//   },
//   {
//     title: 'Do you ship to countries outside the EU?',
//     text: 'Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!',
//   },
// ];

const Category = () => {

  const categories = useAppSelector(state => state.categories.categories)
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getCategories = async() => {
      try{
        const response = await API.get('/category/allCategories')
        dispatch(addCategory(response?.data?.categories))
      }catch(err){
        
      }finally{
        dispatch(setCategoryLoading(false))
      }
    }
    if(categories?.length === 0){
      dispatch(setCategoryLoading(true))
      getCategories()
    }
  },[])
  console.log(categories);

  return (
    <div className='mt-5'>
      <Accordion categories={categories} />
    </div>
  );
};

function Accordion({ categories }) {
  return (
    <div>
      {categories.map((el, i) => (
        <AccordionItems key={el._id} name={el.name} questions={el.questions}/>
      ))}
    </div>
  );
}

function AccordionItems({ name, questions }) {
  const [isOpen, setIsOpen] = useState(false);
  console.log('ques are : ',questions)
  const handleToggle = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  return (
    <div className="border border-orange-500 rounded p-4 mb-2">
      <div className="flex justify-between items-center cursor-pointer" onClick={handleToggle}>
        <p className="font-semibold text-orange-500">{name}</p>
        <p className="text-lg">{isOpen ? '-' : '+'}</p>
      </div>
      {isOpen && (
        questions.map((question,index) => <QuestionContainer 
        key={question?._id}
        number={index+1} 
        question={question} 
      />
      ) 
        )}        
    </div>
  );
}

export default Category;
