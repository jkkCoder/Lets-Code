import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Line } from 'rc-progress';
import UserStatisticsSkeleton from './UserStatisticsSkeleton';

ChartJS.register(ArcElement, Tooltip, Legend);

interface UserStatisticsProps {
  solvedStatistics:{
    easySolved : number  
    hardSolved : number
    mediumSolved : number
    totalEasy : number
    totalHard : number
    totalMedium : number
    unSolved: number
  }
  isLoading: boolean
}

const UserStatistics = ({isLoading, solvedStatistics}:UserStatisticsProps) => {

  if(isLoading) return <UserStatisticsSkeleton />

  const {easySolved, mediumSolved, hardSolved, totalEasy, totalHard, totalMedium, unSolved} = solvedStatistics || {}

  const data = {
    datasets: [
      {
        labels: ['Easy : ' + easySolved, 'Medium : ' + mediumSolved, 'Hard : ' + hardSolved, 'Unsolved : ' + unSolved],
        data: [easySolved, mediumSolved, hardSolved, unSolved],
        backgroundColor: [
          '#28B5B0',
          '#FFC218',
          '#FF2D55',
          '#DFDFDF',
        ],
        borderWidth: 2
      },
                                                  
    ],
  };
  return (
    <div className='  h-80 w-[80%] mx-auto border-solid border-gray-300 border rounded shadow-lg'>
      <div className='flex flex-col mt-14'>
        <p className='ml-2 text-gray-500'>Solved Questions</p>
        <div className='flex flex-row justify-center items-center'>
          <div className='w-1/4'>
            <Doughnut data={data} />
          </div>
          <div className='m-2 ml-5 w-3/4'>
            <div className='mb-2'>
              <div className='flex flex-row'>
                <p className='w-1/4 text-gray-500'>Easy</p>
                <p className=''>{easySolved}/{totalEasy}</p>
              </div>
              <Line percent={easySolved/totalEasy * 100} trailWidth={4} strokeWidth={4} strokeColor="#28B5B0" trailColor='#E0F4E7'/>
            </div>

            <div className='mb-2'>
              <div className='flex flex-row'>
                <p className='w-1/4 text-gray-500'>Medium</p>
                <p className=''>{easySolved}/{totalEasy}</p>
              </div>
              <Line percent={mediumSolved/totalMedium * 100} trailWidth={4} strokeWidth={4} strokeColor="#FFC218" trailColor='#FFF4D9'/>
            </div>

            <div>
              <div className='flex flex-row'>
                <p className='w-1/4 text-gray-500'>Hard</p>
                <p className=''>{hardSolved}/{totalHard}</p>
              </div>
              <Line percent={hardSolved/totalHard * 100} trailWidth={4} strokeWidth={4} strokeColor="#FF2D55" trailColor='#FDE4E3'/>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserStatistics