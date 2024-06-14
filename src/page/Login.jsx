import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, selectUserError} from '../redux/features/User';

function Login() {
  const dispatch = useDispatch();
  const error = useSelector(selectUserError);

  const [state, setState] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = state;
    try {
      const resultAction = await dispatch(login({ email, password }));
      if (login.fulfilled.match(resultAction)) {
        alert('Login Berhasil');
        window.location.href = '/Home';
      } else {
        alert('Terjadi kesalahan');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Terjadi kesalahan');
    }
  };

  return (
    <div className='xl:container xl:mx-auto'>
      <div className='flex items-center justify-center min-h-screen'>
        <form className="max-w-sm mx-auto w-full" onSubmit={handleSubmit}>
          <h2 className='text-2xl font-bold my-3'>Login</h2>
          {error && <p className="text-red-500">{error}</p>}
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
            <input 
              type="email"
              name="email"
              value={state.email}
              onChange={handleChange}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" 
              placeholder="email" 
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
              placeholder='password' 
              required 
            />
          </div>
          <button 
            type="submit" 
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
          >
            Login
          </button>
          <div className="flex items-start my-5">
            <p className="text-sm font-medium text-gray-900 dark:text-gray-300">
              Belum punya akun? <Link to="/Register" className="text-blue-600 hover:underline dark:text-blue-500">Sign up</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
