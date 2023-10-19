import React, { useEffect, useState } from "react";
import FilterContainer from "./components/FilterContainer";
import { useAppSelector } from "../../redux/storeHook";
import QuestionContainer from "./components/QuestionContainer";
import QuestionContainerSkeleton from "./components/QuestionSkeleton";
import CategoryName from "./components/CategoryName";
import { Link } from "react-router-dom";
import CategorySkeleton from "./components/CategorySkeleton";
import Pagination from "react-js-pagination";
import { questionsPerPage } from "../../utils/constants";

const Home = () => {
  const questions = useAppSelector((state) => state.questions.questions);
  const category = useAppSelector((state) => state.categories);
  const { categories, categoryLoading } = category;
  const questionsLoading = useAppSelector(
    (state) => state.questions.questionsLoading
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(1);


  const handlePageNumber = (pageNumber : number ) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-row mt-4">
      <div className=" ml-5 w-9/12 min-h-[12rem]">
        {/* api calls to fetch question and categories made inside filterContainer component */}
        <FilterContainer currentPage={currentPage} setTotalQuestions={setTotalQuestions}/>
        <div
          style={{ maxHeight: "calc(100vh - 9rem)" }}
          className="min-h-[12rem] overflow-y-scroll"
        >
          {questionsLoading && <QuestionContainerSkeleton />}
          {!questionsLoading &&
            questions.map((question, index) => (
              <Link key={question?._id} to={`/solve/${question?._id}`}>
                <QuestionContainer number={index + 1} question={question} />
              </Link>
            ))}
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
      <div className=" w-3/12 m-2">
        <p className="font-bold text-3xl mb-5">Categories</p>
        <div className="flex my-2 flex-wrap">
          {categoryLoading && <CategorySkeleton />}
          {!categoryLoading && categories.map(category => (
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
