import React from "react"
import AccordionItems from "./AccordionItems";
import { CategorySlice } from "../../../redux/categorySlice";
import { QuestionSlice } from "../../../redux/questionSlice";

interface AccordionInterface{
    categories: CategorySlice[]
    showEdit?: boolean;
    editCta?: (id: string,name: string, question: QuestionSlice[]) => void;
}

const  Accordion = ({ categories, showEdit, editCta }: AccordionInterface) => {
    return (
      <div className=" w-[80%] mx-auto">
        {categories.map((category) => (
          <AccordionItems 
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