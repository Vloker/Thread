import React from 'react'
import { Link } from 'react-router-dom'

export default function NavbarComponent() {

  const handleClick = () => {
    localStorage.removeItem('accessToken');
    window.location.href = '/';
  }

  return (
    <nav className='bg-blue-200 p-4 w-full h-auto 2xl fixed top-0 left-0 z-10'>
      <div className='flex justify-between items-center'>
        <Link to='/' className='font-bold text-2xl'>Thread</Link>
          <button 
            className='bg-red-500 hover:bg-red-700 rounded-md text-white text-sm py-1 px-3'
            onClick={handleClick}>Logout</button>
      </div>
    </nav>
  );
}
