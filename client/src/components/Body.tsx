import React from 'react'
import Header from './Header'
import {Outlet} from "react-router-dom"

const Body = () => {
  return (
    <div>
        <Header />
        <div className='px-3'>
          <Outlet />
        </div>
    </div>
  )
}

export default Body