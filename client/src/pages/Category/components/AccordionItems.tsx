import React, {useState} from "react"
import QuestionContainer from "../../Home/components/QuestionContainer";
import { QuestionSlice } from "../../../redux/questionSlice";
import {MdOutlineEdit} from "react-icons/md"
import { Link } from "react-router-dom";

interface AccordionItemsInterface{
    name: string;
    id:string
    questions: QuestionSlice[];
    showEdit?: boolean;
    editCta?: (id:string, name:string, questions: QuestionSlice[]) => void;
    index:number;
}

const AccordionItems = ({ name, questions, id, showEdit, editCta,index }: AccordionItemsInterface) => {
    const [isOpen, setIsOpen] = useState(false);
  
    const handleToggle = () => {
      if(!isOpen && questions.length === 0)     //don't open if no questions are there
        return;
      setIsOpen(!isOpen);
    };
  
    return (
        <div className="flex">
            <div className="border rounded-lg shadow-lg p-4 mb-4 mt-4 w-[100%]">
                <div id={`accordion-${index}`} className="flex justify-between items-center cursor-pointer" onClick={handleToggle}>
                <p className="font-semibold text-gray-800">{name?.toLocaleUpperCase()}</p>
                <p className="text-xl text-gray-600">{isOpen ? "−" : "+"}</p>
                </div>
                {isOpen && (
                <div className="mt-4">
                    {questions?.map((question, index: number) => (
                        <Link key={question?._id} to={`/solve/${question?._id}`}>
                            <QuestionContainer number={index + 1} question={question} />
                        </Link>
                    ))}
                </div>
                )}
            </div>
            {
                showEdit &&  <div className=" items-center justify-center inline-flex">
                    <div onClick={() => editCta(id,name,questions )} className="cursor-pointer bg-orange-200 p-4">
                        <MdOutlineEdit />
                    </div>
                    
                </div>
            }
        </div>
    );
}

export default AccordionItems;