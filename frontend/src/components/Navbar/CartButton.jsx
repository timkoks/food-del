import React from 'react';
import { LuShoppingBasket } from 'react-icons/lu';

const CartButton = ({ getTotalCartItems, setShowCart }) => {
  const totalItems = getTotalCartItems();

  return (
    <button
      onClick={() => setShowCart(true)}
      className='relative rounded-full btn btn-sm btn-outline p-2 w-12 h-12 flex items-center justify-center'
    >
      <LuShoppingBasket className='text-2xl' />
      {totalItems > 0 && (
        <div className='absolute top-[-4px] right-[-4px] bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center'>
          {totalItems}
        </div>
      )}
    </button>
  );
};

export default CartButton;
