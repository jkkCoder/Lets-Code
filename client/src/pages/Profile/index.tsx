import React, {useEffect, useState} from 'react'
import { API, ProfileDataInterface } from '../../utils/API'
import { useAppSelector } from '../../redux/storeHook'
import UserData from './components/UserData'
import UserStatistics from './components/UserStatistics'
import SolvedQuestions from './components/SolvedQuestions'
import { capitalizeFirstLetter } from '../../utils/constants'
import ProfileSkeleton from './components/ProfileSkeleton'

const Profile = () => {

  const user = useAppSelector(state => state.user)

  const [userData, setUserData] = useState<ProfileDataInterface>(undefined);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(!user?._id){
      return
    }
    const fetchProfile = async () => {
      setIsLoading(true);
      const res = await API.get("/user/profile/"+user._id)
      setUserData(res?.data);
      setIsLoading(false);
    }
    fetchProfile();
  },[user])

  console.log('user data is',userData);

  if(!userData) return <ProfileSkeleton />

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
          <SolvedQuestions solvedQuestions={userData?.solved}/>
      </div>
    </div>
  )
}

export default Profile