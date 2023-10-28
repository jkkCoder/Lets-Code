import React, {useEffect, useState} from 'react'
import { API, ProfileDataInterface } from '../../utils/API'
import { useAppSelector } from '../../redux/storeHook'
import UserData from './components/UserData'
import UserStatistics from './components/UserStatistics'
import SolvedQuestions from './components/SolvedQuestions'
import { capitalizeFirstLetter, deleteToastMessage } from '../../utils/constants'
import ProfileSkeleton from './components/ProfileSkeleton'
import { useParams } from 'react-router-dom'
import BookMarks from './components/BookMark'
import { ToastContainer } from 'react-toastify';

const Profile = () => {

  const params = useParams();
  const user = useAppSelector(state=>state.user)

  <ToastContainer />  

  const [userData, setUserData] = useState<ProfileDataInterface>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(!params?.id){
      return
    }
    const fetchProfile = async () => {
      setIsLoading(true);
      try{
        const res = await API.get("/user/profile/"+params?.id)
        setUserData(res?.data);
      }catch(err){
        deleteToastMessage(err?.response?.data?.message || 'SERVER ERROR')
      }finally{
        setIsLoading(false);
      }
    }
    fetchProfile();
  },[params])

  // console.log('user data is',userData);

  if(isLoading) return <ProfileSkeleton />

  return (
    <div  style={{ height: "calc(100vh - 7rem)" }} className=' mt-10 flex h-screen'>
      <div className='w-1/2'>
        <div className=' mx-20 h-1/2'>
          <p className='font-bold text-lg'>{capitalizeFirstLetter(userData?.userData?.fullName)} Details</p>
          <UserData userName={userData?.userData?.userName} fullName={userData?.userData?.fullName} emailId={userData?.userData?.email} />
        </div>
        <div>
          <UserStatistics solvedStatistics={userData?.solvedStatistics}/>
        </div>
      </div>
      <div className='w-1/2'>
        <div className='h-1/2'>
            <SolvedQuestions solvedQuestions={userData?.solved}/>
        </div>
        {
        params.id === user._id && 
        <div className='h-1/2'>
          <BookMarks />
        </div>
        }
      </div>
    </div>
  )
}

export default Profile