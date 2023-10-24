import React from 'react'

interface UserStatisticsProps {
    easySolved : number  
    hardSolved : number
    mediumSolved : number
    totalEasy : number
    totalHard : number
    totalMedium : number
}

const UserStatistics = ({easySolved, hardSolved, mediumSolved, totalEasy, totalHard, totalMedium}:UserStatisticsProps) => {
  return (
    <div>
        <h1>User Stats</h1>
        <h2>Solved Questions</h2>
            <ul>
                <li>Easy : {easySolved} / {totalEasy}</li>
                <li>Medium : {mediumSolved} / {totalMedium}</li>
                <li>Hard : {hardSolved} / {totalHard}</li>
                
            </ul>
    </div>
  )
}

export default UserStatistics