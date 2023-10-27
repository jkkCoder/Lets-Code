import React, { useEffect, useState } from "react";
import { APIH, BookMarkDataInterface } from "../../../utils/API";
import BookMarkSkeleton from "./BookMarkSkeleton";

const BookMarks = () => {

  const [bookMarks, setBookMArks] = useState<BookMarkDataInterface>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(()=>{
    const fetchBookMarks = async () => {
      setIsLoading(true);
      const res = await APIH.get("/user/getBookmarks")
      console.log("BookMarks : ",res);
      setBookMArks(res?.data)
      setIsLoading(false);
    }
    fetchBookMarks();
  },[])
  
  if(isLoading) return <BookMarkSkeleton/>

  return (
  <div className=' border border-gray-100 rounded-md shadow-lg h-[90%] px-4 py-2'>
    <h1 className="text-xl font-semibold mb-2">Bookmarked Questions</h1>
    <div className="grid grid-cols-2 gap-0.5 overflow-y-scroll h-[90%]">
    {bookMarks?.bookmarks?.map((bookmark) => (
      <div key={bookmark?._id} className="mb-4">
        <h2 className="text-base font-semibold mb-2 cursor-pointer">
          <span className="text-black-500 text-base pr-2">&#8226;</span>
          <span className='hover:underline'>{bookmark?.title}</span>
        </h2>
      </div>
    ))}
  </div>
    </div>
  );
};

export default BookMarks;
