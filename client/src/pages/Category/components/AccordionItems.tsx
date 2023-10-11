import React, {useState} from "react"
import QuestionContainer from "../../Home/components/QuestionContainer";
import { QuestionSlice } from "../../../redux/questionSlice";

interface AccordionItemsInterface{
    name: string;
    questions: QuestionSlice[]
}

const AccordionItems = ({ name, questions }: AccordionItemsInterface) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleToggle = () => {
      if(!isOpen && questions.length === 0)     //don't open if no questions are there
        return;
      setIsOpen(!isOpen);
    };
  
    return (
        <div className="bg-white border rounded-lg shadow-lg p-4 mb-4 mt-4">
            <div className="flex justify-between items-center cursor-pointer" onClick={handleToggle}>
            <p className="font-semibold text-gray-800">{name?.toLocaleUpperCase()}</p>
            <p className="text-xl text-gray-600">{isOpen ? "−" : "+"}</p>
            </div>
            {isOpen && (
            <div className="mt-4">
                {questions.map((question, index: number) => (
                <QuestionContainer key={question?._id} number={index + 1} question={question} />
                ))}
            </div>
            )}
        </div>
    );
}

export default AccordionItems;