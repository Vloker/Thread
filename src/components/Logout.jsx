import React from 'react'

function Logout() {

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
    }

    return (
        <button
            className='bg-red-500 hover:bg-red-700 rounded-md text-white text-sm py-1 px-3' 
            onClick={handleLogout}>Logout
        </button>
    )
}

export default Logout
