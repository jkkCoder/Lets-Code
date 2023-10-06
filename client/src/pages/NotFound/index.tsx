import React from 'react'
import {Link} from "react-router-dom"

const NotFound = () => {
  return (
    <div>
        <h1 className='text-9xl font-bold'>404</h1>
        <h2 className='text-5xl font-bold'>Page Not found</h2>
        <p className='mt-5'>Go to <span className='bg-orange-400 p-1 rounded-sm'><Link to="/">Home Page</Link></span></p>
    </div>
  )
}

export default NotFound