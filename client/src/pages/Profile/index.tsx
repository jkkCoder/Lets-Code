import React, {useEffect, useState} from 'react'
import { API, ProfileDataInterface } from '../../utils/API'
import { useAppSelector } from '../../redux/storeHook'
import UserData from './components/UserData'
import UserStatistics from './components/UserStatistics'
import SolvedQuestions from './components/SolvedQuestions'

const Profile = () => {

  const user = useAppSelector(state => state.user)

  const [userData, setUserData] = useState<ProfileDataInterface>({} as ProfileDataInterface);
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

  return (
    <div className='flex h-screen'>
      <div className='w-1/2'>
        <div className='mt-20 mx-20 h-1/2'>
          <UserData userName={userData?.userData?.userName} fullName={userData?.userData?.fullName} emailId={userData?.userData?.email} />
        </div>
        <div className='mt-5'>
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