import React, { useContext, useState } from 'react';
import { LuShoppingBasket, LuPlus, LuMinus } from 'react-icons/lu';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../Context/StoreContext';

const FoodItem = ({ image, name, price, desc, id }) => {
  const [itemCount, setItemCount] = useState(0);
  const { cartItems, addToCart, removeFromCart, url, currency } =
    useContext(StoreContext);

  return (
    <div className='flex flex-col rounded-xl border border-accent/50 bg-white h-full'>
      <img
        className='h-48 w-full rounded-t-xl object-cover'
        src={url + '/images/' + image}
        alt=''
      />
      <div className='flex flex-col p-4 md:p-5 h-full'>
        <h2 className='text-lg font-bold text-black'>{name}</h2>
        <p className='mt-1 text-gray-500 text-sm flex-grow'>{desc}</p>
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4'>
          <h2 className='text-lg font-bold text-accent mb-2 sm:mb-0'>
            {currency}
            {price}
          </h2>
          {!cartItems[id] ? (
            <button
              onClick={() => addToCart(id)}
              className='rounded-full flex font-bold justify-center items-center h-[42px] px-[12px] btn-outline text-sm w-full sm:w-auto transition-all duration-300 ease-in-out hover:bg-accent hover:text-white active:bg-accent/80 cursor-pointer'
            >
              <LuShoppingBasket className='text-lg mr-2' />
              Add to Cart
            </button>
          ) : (
            <div className='group flex items-center justify-between w-full sm:w-auto border border-accent hover:border-accentHover rounded-full overflow-hidden h-[42px]'>
              <button
                onClick={() => removeFromCart(id)}
                className='px-3 py-2 text-accent group-hover:text-accentHover transition-colors'
              >
                <LuMinus className='text-lg' />
              </button>
              <span className='mx-2 font-bold text-accent group-hover:text-accentHover transition-colors'>
                {cartItems[id]}
              </span>
              <button
                onClick={() => addToCart(id)}
                className='px-3 py-2 text-accent group-hover:text-accentHover transition-colors'
              >
                <LuPlus className='text-lg' />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
