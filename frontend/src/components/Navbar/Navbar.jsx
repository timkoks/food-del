import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import Logo from './Logo';
import CartButton from './CartButton';
import ProfileMenu from './ProfileMenu';
import Cart from './Cart';

const Navbar = ({ setShowLogin }) => {
  const { getTotalCartItems, token, setToken } = useContext(StoreContext);
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    navigate('/');
  };

  return (
    <>
      <header className='bg-white border-b border-gray-200 py-6 lg:py-4 w-full transition-all'>
        <div className='container mx-auto flex justify-between items-center'>
          <Logo />
          <div className='flex items-center gap-x-2 relative'>
            <CartButton
              getTotalCartItems={getTotalCartItems} // Підключення нової функції
              setShowCart={setShowCart}
            />
            {!token ? (
              <button
                onClick={() => setShowLogin(true)}
                className='btn btn-sm btn-outline flex'
              >
                Login
              </button>
            ) : (
              <ProfileMenu token={token} logout={logout} navigate={navigate} />
            )}
          </div>
        </div>
      </header>
      <Cart showCart={showCart} setShowCart={setShowCart} />
    </>
  );
};

export default Navbar;
