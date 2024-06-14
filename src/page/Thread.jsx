import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postThread } from '../redux/features/User';


export default function Thread() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const threadData = { title, body, category };

    try {
      await dispatch(postThread(threadData));
      alert('Thread Berhasil');
      window.location.href = '/Home';
    } catch (error) {
      console.error('Error creating thread:', error);
    }
  };

  return (
    <div className='xl:container xl:mx-auto flex justify-center h-screen'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-2 w-4/5 my-10'>
        <input 
          type="text" 
          id="judul" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
          placeholder="judul"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required 
        />
        <input 
          type="text" 
          id="kategori" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" 
          placeholder="kategori" 
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <textarea 
          id="body" 
          name="body" 
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows="4" 
          className="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 resize-none" 
          placeholder="body"
          required
        />
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded'
        >
          Submit
        </button>
      </form>
    </div>
  );
}
