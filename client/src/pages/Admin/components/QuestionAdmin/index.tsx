import React, { useState } from 'react'
import FilterContainer from '../../../Home/components/FilterContainer'
import QuestionContainerSkeleton from '../../../Home/components/QuestionSkeleton'
import QuestionContainer from '../../../Home/components/QuestionContainer'
import Modal from '../../../../components/Modal'
import { ToastContainer } from 'react-toastify';
import QuestionFormModal from '../QuestionFormModal'
import useQuestionAdmin from './useQuestionAdmin'
import { useAppSelector } from '../../../../redux/storeHook'
import Pagination from "react-js-pagination";
import { questionsPerPage } from '../../../../utils/constants'


const QuestionAdmin = () => {
  
  const {
        setEditModal, 
        handleDeleteCta, 
        handleEditCta, 
        deleteModal, 
        deleteModalClose,
        selectedTitle,
        deleteQuestion,
        createOrEditQuestion,
        editModalClose,
        editModal
        } = useQuestionAdmin()

  const questions = useAppSelector(state => state.questions.questions)
  const questionsLoading = useAppSelector(state => state.questions.questionsLoading)

  const [currentPage, setCurrentPage] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(1);
  
  const handlePageNumber = (pageNumber : number ) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
        <button onClick={() => setEditModal(true)} className='text-white p-2 bg-black my-2 rounded-sm'>Create Question</button>
        <div>
            <FilterContainer currentPage={currentPage} setTotalQuestions={setTotalQuestions}/>
            <div style={{ maxHeight: 'calc(100vh - 9rem)' }} className='min-h-[12rem] overflow-y-scroll'>
            { questionsLoading && <QuestionContainerSkeleton /> }
            {
                !questionsLoading && questions.map((question,index) => <QuestionContainer
                    key={question?._id}
                    number={index+1} 
                    question={question} 
                    showEdit
                    handleEditCta={() => handleEditCta(question)}
                    handleDeleteCta={() => handleDeleteCta(question)}
                />
                )
            }
            </div>
            <div>
          <Pagination
            activePage={currentPage}
            itemsCountPerPage={questionsPerPage}
            totalItemsCount={totalQuestions}
            pageRangeDisplayed={3}
            onChange={(number : number) => handlePageNumber(number)}
          />
        </div>
        </div>

        <Modal 
            onClose={deleteModalClose}
            showModal={deleteModal} 
            primaryBtnName="Yes"
            secondaryBtnName="No"
            title={'Are you sure you want to delete "' + selectedTitle?.title + '"'}
            primaryCta={deleteQuestion}
            secondaryCta={deleteModalClose}

        />
        <ToastContainer />
        {
            editModal && (
                <QuestionFormModal
                    selectedQuestion={selectedTitle}
                    onClose={editModalClose}
                    onSubmit={createOrEditQuestion}
                    />
            )
        }
        
    </div>
  )
}

export default QuestionAdmin