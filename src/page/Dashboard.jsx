import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getThreads, selectAllThreads } from '../redux/features/User';
import NavbarComponent from '../components/Navbar';
import ButtonThread from '../components/ButtonThread';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const dispatch = useDispatch();
    const usersData = useSelector(selectAllThreads);
    const [isLoading, setIsLoading] = useState(true);
    const [processedUsersData, setProcessedUsersData] = useState([]);

    useEffect(() => {
        dispatch(getThreads());
    }, [dispatch]);

    useEffect(() => {
        if (usersData) {
            const processedData = usersData.map(user => {
                const div = document.createElement('div');
                div.innerHTML = user.body;
                const text = div.textContent || div.innerText || '';
                return { ...user, body: text };
            });
            setProcessedUsersData(processedData);
            setIsLoading(false);
        }
    }, [usersData]);

    return (
        <div className='xl:container xl:mx-auto flex flex-col justify-center items-center p-3 absolute' id='dashboard'>
            <div className='loading-bar loading'></div>
            <NavbarComponent />
            <ButtonThread />
            {isLoading ? (
                    <p className='fixed top-1/2 left-1/2'>Loading...</p>
                ) : (
            <main className='flex flex-col w-7/12 border border-black p-5 rounded-lg bg-slate-50 gap-2 min-h-screen mt-20 relative' id='user'>
                        <div className='flex flex-col gap-2 ps-5 mb-3' id='kategori'>
                            <p className='font-semibold text-xl'>Kategori</p>
                            <div className='flex gap-2 break-after-column'>
                                {processedUsersData.slice(0, 7).map((user) => (
                                    <div key={user.id} className='border border-black p-1 text-xs rounded-md text-blue-500'>
                                        #{user.category}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 ps-5'>
                            <p className='font-semibold text-xl'>Discussion</p>
                            {processedUsersData.slice(0, 10).map((user) => (
                                <div key={user.id}>
                                    <div className='flex flex-col gap-2' id='thread'>
                                        <div>
                                            <Link to={`/details/${user.id}`}>
                                                <p className='font-semibold break-words'>{user.title}</p>
                                            </Link>
                                            <p className='text-sm break-words'>{user.body}</p>
                                        </div>
                                        <p className='text-xs'>{user.createdAt}</p>
                                        <div className='flex gap-2 items-center'>
                                            <p className='text-sm text-blue-600'>Comment <span className='text-xs text-red-600'>{user.totalComments}</span></p>
                                        </div>
                                    </div>
                                    <hr className='my-2 border-t-2 border-gray-300'></hr>
                                </div>
                            ))}
                        </div>
            </main>
                )}
        </div>
    );
};

export default Dashboard;
