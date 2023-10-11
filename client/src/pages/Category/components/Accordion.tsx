import React from "react"
import AccordionItems from "./AccordionItems";
import { CategorySlice } from "../../../redux/categorySlice";

interface AccordionInterface{
    categories: CategorySlice[]
}

const  Accordion = ({ categories }: AccordionInterface) => {
    return (
      <div className=" w-[80%] mx-auto">
        {categories.map((category) => (
          <AccordionItems key={category?._id} name={category?.name} questions={category?.questions} />
        ))}
      </div>
    );
}

export default Accordion;