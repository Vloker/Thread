import React from 'react'

function ButtonThread() {
  return (
    <button 
        className='bg-blue-800 hover:bg-blue-700 rounded-full text-white text-2xl w-16 h-16 z-20 fixed bottom-0 right-0'
        onClick={() => window.location.href = '/thread'}>+</button>
  )
}

export default ButtonThread