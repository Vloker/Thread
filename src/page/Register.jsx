import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/features/User';
import { selectUserError } from '../redux/features/User';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(selectUserError);

  const [state, setState] = useState({
    email: '',
    password: '',
    name: '',
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = state;
    const resultAction = await dispatch(register({ name, email, password }));
    
    if (register.fulfilled.match(resultAction)) {
      alert('Register Berhasil');
      setState({
        name: '',
        email: '',
        password: '',
      });
      navigate('/login');
    } else {
      if (resultAction.payload.message === "Email sudah terdaftar") {
        alert("Email sudah terdaftar. Silakan gunakan email lain.");
      } else {
        alert("Registration failed. Please try again.");
      }
    }
  };

  return (
    <div className='xl:container xl:mx-auto'>
      <div className='flex items-center justify-center min-h-screen'>
        <form className="max-w-sm mx-auto w-full" onSubmit={handleSubmit}>
          <h2 className='text-2xl font-bold my-3'>Register</h2>
          <div className="mb-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your name</label>
            <input 
              type="text" 
              name="name"
              value={state.name}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
              placeholder="username"
              required 
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input 
              type="email" 
              name="email"
              value={state.email}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
              placeholder="your email"
              required 
            />
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your password</label>
            <input 
              type="password" 
              name="password"
              value={state.password}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
              placeholder="your password"
              required 
            />
          </div>
          <button 
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
          >
            Register
          </button>
          <div className="flex items-start my-5">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-300">Sudah punya akun? <Link to="/Login" className="text-blue-600 hover:underline dark:text-blue-500">Sign in</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
