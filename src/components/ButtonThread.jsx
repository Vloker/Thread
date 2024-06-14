import React from 'react'
import { useNavigate } from 'react-router-dom'

function ButtonThread() {

  const navigate = useNavigate()

  return (
    <button 
        className='bg-blue-800 hover:bg-blue-700 rounded-full text-white text-2xl w-16 h-16 z-20 fixed bottom-0 right-0'
        onClick={() => navigate('/thread')}>+</button>
  )
}

export default ButtonThread