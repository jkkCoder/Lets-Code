import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../redux/storeHook'
import { capitalizeFirstLetter } from '../../../utils/constants'
import Testcase from './Testcase'
import QuestionDetailSkeleton from './QuestionDescriptionSkeleton'
import {BsFillBookmarkFill, BsBookmark} from "react-icons/bs"
import { APIH } from '../../../utils/API'
import { useParams } from 'react-router-dom'


const QuestionDescription = () => {
  const question = useAppSelector(state => state.questions)
  const params = useParams();
  const user = useAppSelector(state => state.user)
  const {currentQuestion , currentQuestionLoading} = question
  const {title="", description="", Category="", testCases=[], difficulty=""} = currentQuestion
  const [isBookmark, setIsBookmark] = useState(false)
  const [bookmarkLoading, setBookmarkLoading] = useState(false)
  const isLoggedIn = user?._id?.length > 0

  useEffect(() => {
    const fetchBookmarkApi = async() => {
      if(isLoggedIn){
        try{
           const response = await APIH.get(`/question/${params.id}/bookmarkedByUser`)
           setIsBookmark(response?.data?.isBookmarked)
        }catch(err){

        }
     }
    }
    fetchBookmarkApi()
  },[isLoggedIn,params ])


  const bookmarkCta = async () => {
    setBookmarkLoading(true)
    setIsBookmark(!isBookmark)
    if(!bookmarkLoading){
      try{
        const response = await APIH.post('/question/bookmarkQuestion',{
          questionId: params.id,
          type: isBookmark ? 'pull' : 'push'
        })
      }catch(err){

      }finally{
        setBookmarkLoading(false)
      }
    }
    
  }

  if(currentQuestionLoading) return <QuestionDetailSkeleton />
  return (
    <div className='flex flex-col pr-5 w-full'>
        <p className='font-bold text-2xl'>{capitalizeFirstLetter(title)}</p>
        <div className='flex items-centers mt-2'>
            <p className={`self-center ${difficulty === 'easy' ? `text-[#28B5B0]` : difficulty === 'medium'? `text-[#FFC218]`: `text-[#FF2D55]`}`}>
                {capitalizeFirstLetter(difficulty)}
            </p>
            {!!Category && <p className='ml-5 bg-orange-400 rounded-2xl px-2 py-1 text-white'>{Category}</p>}
            <div onClick={() => bookmarkCta()} className='flex items-center cursor-pointer ml-auto mr-5'>
              {isLoggedIn && (isBookmark ? <BsFillBookmarkFill /> : <BsBookmark /> )}
            </div>
        </div>

        <p className='mt-2'>{description}</p>
        {testCases.map((testCase, index) => (
            <Testcase key={testCase?.input} testCase={testCase} number={index+1}/>
        ))}        
    </div>
  )
}

export default QuestionDescription