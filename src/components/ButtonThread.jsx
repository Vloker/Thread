import React from 'react'
import { Navigate } from 'react-router-dom'

function ButtonThread() {

  const handleClick = () => {
    Navigate('/thread')
  }

  return (
    <button 
        className='bg-blue-800 hover:bg-blue-700 rounded-full text-white text-2xl w-16 h-16 z-20 fixed bottom-0 right-0'
        onClick={handleClick}>+</button>
  )
}

export default ButtonThread