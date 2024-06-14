import React from 'react'
import { Link } from 'react-router-dom'
import Logout from './Logout'

export default function NavbarComponent() {

  return (
    <nav className='bg-blue-200 p-4 w-full h-auto 2xl fixed top-0 left-0 z-10'>
      <div className='flex justify-between items-center'>
        <Link to='/' className='font-bold text-2xl'>Thread</Link>
        <Logout />
      </div>
    </nav>
  );
}
