import React, {useEffect, useState} from 'react'
import { API, ProfileDataInterface } from '../../utils/API'
import { useAppSelector } from '../../redux/storeHook'
import UserData from './components/UserData'
import UserStatistics from './components/UserStatistics'

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
    <div className='flex h-screen bg-red-200'>
      <div className='bg-yellow-200 w-1/2'>
        <div className='bg-orange-200 h-1/2'>
          <UserData userName={userData?.userData?.userName} fullName={userData?.userData?.fullName} emailId={userData?.userData?.email} />
        </div>
        <div className='bg-blue-200 h-1/2'>
          <UserStatistics 
            easySolved={userData?.solvedStatistics?.easySolved} 
            hardSolved={userData?.solvedStatistics?.hardSolved} 
            mediumSolved={userData?.solvedStatistics?.mediumSolved} 
            totalEasy={userData?.solvedStatistics?.totalEasy} 
            totalHard={userData?.solvedStatistics?.totalHard} 
            totalMedium={userData?.solvedStatistics?.totalMedium} 
          />
        </div>
      </div>
      <div className='bg-gray-200 w-1/2'>
          solvedQuestions
      </div>
    </div>
  )
}

export default Profile