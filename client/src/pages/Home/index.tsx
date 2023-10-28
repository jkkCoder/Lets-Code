import React, { useEffect, useState } from "react";
import FilterContainer from "./components/FilterContainer";
import { useAppSelector } from "../../redux/storeHook";
import QuestionContainer from "./components/QuestionContainer";
import QuestionContainerSkeleton from "./components/QuestionSkeleton";
import CategoryName from "./components/CategoryName";
import { Link } from "react-router-dom";
import CategorySkeleton from "./components/CategorySkeleton";
import { questionsPerPage } from "../../utils/constants";
import ResponsivePagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import { ToastContainer } from 'react-toastify';

const Home = () => {
  const questions = useAppSelector((state) => state.questions.questions);
  const category = useAppSelector((state) => state.categories);
  const { categories, categoryLoading } = category;
  const questionsLoading = useAppSelector(
    (state) => state.questions.questionsLoading
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(1);


  return (
    <div className="flex flex-row mt-4">
      <div style={{ height: "calc(100vh - 7rem)" }} className=" ml-5 w-9/12 min-h-[12rem]">
        {/* api calls to fetch question and categories made inside filterContainer component */}
        <FilterContainer currentPage={currentPage} setTotalQuestions={setTotalQuestions} setCurrentPage={setCurrentPage}/>
        <div
          style={{ height: "calc(100vh - 15rem)" }}
        >
          {questionsLoading && <QuestionContainerSkeleton />}
          {!questionsLoading &&
            questions?.map((question, index) => (
              <Link key={question?._id} to={`/solve/${question?._id}`}>
                <QuestionContainer number={index + 1} question={question} />
              </Link>
            ))}
        </div>
        <div className="relative bottom-0">
          <ResponsivePagination
            current={currentPage}
            total={Math.ceil(totalQuestions/questionsPerPage)}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      <div className=" w-3/12 m-2">
        <p className="font-bold text-3xl mb-5">Categories</p>
        <div className="flex my-2 flex-wrap">
          {categoryLoading && <CategorySkeleton />}
          {!categoryLoading && categories?.map(category => (
            <Link key={category?._id} to={`/category?name=${category?.name}`}>
                <CategoryName name={category?.name}/>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
