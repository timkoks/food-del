import React, { useContext, useState, useRef, useEffect } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const LoginPopup = ({ setShowLogin }) => {
  const { setToken, url, loadCartData } = useContext(StoreContext);
  const [currState, setCurrState] = useState('Sign Up');
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const modalRef = useRef(null);

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    const new_url = `${url}/api/user/${
      currState === 'Login' ? 'login' : 'register'
    }`;
    try {
      const response = await axios.post(new_url, data);
      if (response.data.success) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
        loadCartData({ token: response.data.token });
        setShowLogin(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('An error occurred. Please try again.');
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowLogin(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowLogin]);

  return (
    <div className='fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center'>
      <div
        ref={modalRef}
        className='bg-white border border-gray-200 rounded-xl shadow-sm w-full max-w-md mx-4'
      >
        <div className='p-4 sm:p-7'>
          <div className='text-center'>
            <h3 className='text-2xl font-bold text-gray-800 mb-2'>
              {currState}
            </h3>
            {currState === 'Login' ? (
              <p className='text-sm text-gray-600'>
                Don't have an account yet?{' '}
                <button
                  onClick={() => setCurrState('Sign Up')}
                  className='text-accent hover:underline font-medium'
                >
                  Sign up here
                </button>
              </p>
            ) : (
              <p className='text-sm text-gray-600'>
                Already have an account?{' '}
                <button
                  onClick={() => setCurrState('Login')}
                  className='text-accent hover:underline font-medium'
                >
                  Login here
                </button>
              </p>
            )}
          </div>

          <form onSubmit={onLogin} className='mt-5 space-y-4'>
            {currState === 'Sign Up' && (
              <div>
                <label
                  htmlFor='name'
                  className='mb-2 block text-sm font-medium text-gray-900'
                >
                  Name
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  className='py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-accentHover focus:ring-accentHover disabled:opacity-50 disabled:pointer-events-none'
                  required
                  placeholder='Your name'
                  onChange={onChangeHandler}
                  value={data.name}
                />
              </div>
            )}
            <div>
              <label
                htmlFor='email'
                className='mb-2 block text-sm font-medium text-gray-900'
              >
                Email address
              </label>
              <input
                type='email'
                id='email'
                name='email'
                className='py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-accentHover focus:ring-accentHover disabled:opacity-50 disabled:pointer-events-none'
                required
                placeholder='Your email'
                onChange={onChangeHandler}
                value={data.email}
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='mb-2 block text-sm font-medium text-gray-900'
              >
                Password
              </label>
              <input
                type='password'
                id='password'
                name='password'
                className='py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-accentHover focus:ring-accentHover disabled:opacity-50 disabled:pointer-events-none'
                required
                placeholder='Password'
                onChange={onChangeHandler}
                value={data.password}
              />
            </div>
            <div className='flex items-center'>
              <input
                id='remember-me'
                name='remember-me'
                type='checkbox'
                className='h-4 w-4 text-accent focus:ring-accent border-gray-300 rounded'
                required
              />
              <label
                htmlFor='remember-me'
                className='ml-2 block text-sm text-gray-700'
              >
                I accept the{' '}
                <span className='text-accent hover:underline font-medium cursor-pointer'>
                  Terms and Conditions
                </span>
              </label>
            </div>
            <button type='submit' className='w-full btn btn-sm btn-accent'>
              {currState === 'Login' ? 'Login' : 'Create account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPopup;
