import React, { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import { LuPlus, LuMinus } from 'react-icons/lu';

const Cart = ({ showCart, setShowCart }) => {
  const {
    cartItems,
    food_list,
    removeFromCart,
    addToCart,
    getTotalCartAmount,
    url,
    currency,
    deliveryCharge,
  } = useContext(StoreContext);

  const navigate = useNavigate();
  return (
    <>
      {showCart && (
        <div
          className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ease-in-out duration-500'
          onClick={() => setShowCart(false)}
        />
      )}
      <div
        className={`fixed inset-y-0 right-0 transform transition ease-in-out duration-500 sm:duration-700 ${
          showCart ? 'translate-x-0' : 'translate-x-full'
        } pointer-events-auto w-screen max-w-md`}
      >
        <div className='flex h-full flex-col  bg-white shadow-xl'>
          <div className='flex-1 overflow-y-auto px-4 py-6 sm:px-6'>
            <div className='flex items-start justify-between'>
              <h2
                className='text-lg font-medium text-gray-900'
                id='slide-over-title'
              >
                Shopping cart
              </h2>
              <div className='ml-3 flex h-7 items-center'>
                <button
                  type='button'
                  className='relative -m-2 p-2 text-gray-400 hover:text-gray-500'
                  onClick={() => setShowCart(false)}
                >
                  <span className='sr-only'>Close panel</span>
                  <svg
                    className='h-6 w-6'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'
                    aria-hidden='true'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M6 18L18 6M6 6l12 12'
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div className='mt-8'>
              <div className='flow-root'>
                <ul role='list' className='-my-6 divide-y divide-gray-200'>
                  {food_list.map((item, index) => {
                    if (cartItems[item._id] > 0) {
                      return (
                        <li key={index} className='flex py-6'>
                          <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                            <img
                              src={url + '/images/' + item.image}
                              className='h-full w-full object-cover object-center'
                            />
                          </div>

                          <div className='ml-4 flex flex-1 flex-col'>
                            <div>
                              <div className='flex justify-between text-base font-medium text-gray-900'>
                                <h3>
                                  <a href='#'>{item.name}</a>
                                </h3>
                                <p className='ml-4'>
                                  {currency}
                                  {item.price * cartItems[item._id]}
                                </p>
                              </div>
                              <p className='mt-1 text-sm text-gray-500'>
                                Price: {currency}
                                {item.price}
                              </p>
                            </div>
                            <div className='flex flex-1 items-end justify-end text-sm'>
                              <div className='flex items-center justify-between sm:w-auto border border-accent rounded-full overflow-hidden h-[42px]'>
                                <button
                                  onClick={() => removeFromCart(item._id)}
                                  className='px-3 py-2 text-accent'
                                >
                                  <LuMinus className='text-lg' />
                                </button>
                                <span className='mx-2 font-bold text-accent'>
                                  {cartItems[item._id]}
                                </span>
                                <button
                                  onClick={() => addToCart(item._id)}
                                  className='px-3 py-2 text-accent'
                                >
                                  <LuPlus className='text-lg' />
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className='border-t border-gray-200 px-4 py-6 sm:px-6'>
            <div className='flex justify-between text-base font-medium text-gray-900'>
              <p>Subtotal</p>
              <p>
                {currency}
                {getTotalCartAmount()}
              </p>
            </div>
            <p className='mt-0.5 text-sm text-gray-500'>
              Shipping and taxes calculated at checkout.
            </p>
            <div className='mt-6'>
              <a
                onClick={() => {
                  setShowCart(false);
                  setTimeout(() => {
                    navigate('/order');
                  }, 300);
                }}
                className='flex items-center justify-center rounded-md border border-transparent bg-accent px-6 py-3 text-base font-medium text-white cursor-pointer shadow-sm hover:bg-accentHover'
              >
                Checkout
              </a>
            </div>
            <div className='mt-6 flex justify-center text-center text-sm text-gray-500'>
              <p>
                or{' '}
                <button
                  type='button'
                  className='font-medium text-accent hover:text-accentHover'
                  onClick={() => setShowCart(false)}
                >
                  Continue Shopping<span aria-hidden='true'> &rarr;</span>
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
