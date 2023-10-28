import React, { useEffect, useState } from "react";
import { APIH, BookMarkDataInterface } from "../../../utils/API";
import BookMarkSkeleton from "./BookMarkSkeleton";
import { Link } from "react-router-dom";
import { deleteToastMessage } from "../../../utils/constants";

const BookMarks = () => {

  const [bookMarks, setBookMArks] = useState<BookMarkDataInterface>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(()=>{
    const fetchBookMarks = async () => {
      try{
        setIsLoading(true);
        const res = await APIH.get("/user/getBookmarks")
        console.log("BookMarks : ",res);
        setBookMArks(res?.data)
      }catch(err){
        deleteToastMessage(err?.response?.data?.message || 'SERVER ERROR')
      }finally{
        setIsLoading(false)
      }
    }
    fetchBookMarks();
  },[])
  
  if(isLoading) return <BookMarkSkeleton/>

  return (
  <div className=' border border-gray-100 rounded-md shadow-lg h-[90%] px-4 py-2'>
    <h1 className="text-xl font-semibold mb-2">Bookmarked Questions</h1>
    <div className="grid grid-cols-2 gap-0.5 overflow-y-scroll h-[90%]">
    {bookMarks?.bookmarks?.map((bookmark) => (
      <Link key={bookmark?._id} to={'/solve/' + bookmark?._id}>
        <div  className="mb-4">
          <h2 className="text-base font-semibold mb-2 cursor-pointer">
            <span className="text-black-500 text-base pr-2">&#8226;</span>
            <span className='hover:underline'>{bookmark?.title}</span>
          </h2>
        </div>
      </Link>
    ))}
  </div>
    </div>
  );
};

export default BookMarks;
