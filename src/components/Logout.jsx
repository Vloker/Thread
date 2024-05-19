import React from 'react'
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        navigate('/login');
    }

    return (
        <button
            className='bg-red-500 hover:bg-red-700 rounded-md text-white text-sm py-1 px-3' 
            onClick={handleLogout}>Logout</button>
    )
}

export default Logout
