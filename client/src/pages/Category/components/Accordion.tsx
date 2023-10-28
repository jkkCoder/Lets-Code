import React,{useEffect} from "react"
import AccordionItems from "./AccordionItems";
import { CategorySlice } from "../../../redux/categorySlice";
import { QuestionSlice } from "../../../redux/questionSlice";
import { useLocation } from "react-router-dom";

interface AccordionInterface{
    categories: CategorySlice[]
    showEdit?: boolean;
    editCta?: (id: string,name: string, question: QuestionSlice[]) => void;
}

const  Accordion = ({ categories, showEdit, editCta }: AccordionInterface) => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryName = queryParams.get('name');
  
  useEffect(() => {
    if(!categoryName)
      return;
  
    const index = categories?.findIndex(category => category?.name === categoryName)
    if(index !== -1)
      scrollToAccordion(index);
  },[categories])

  const scrollToAccordion = (index:number) => {
    const accordionItem = document.getElementById(`accordion-${index}`)
    if (accordionItem) {
      accordionItem.click()
      accordionItem.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

    return (
      <div className=" w-[80%] mx-auto">
        {categories?.map((category,index:number) => (
          <AccordionItems 
            index={index}
            key={category?._id} 
            id={category?._id}
            name={category?.name} 
            questions={category?.questions} 
            showEdit={showEdit} 
            editCta={editCta}
          />
        ))}
      </div>
    );
}

export default Accordion;