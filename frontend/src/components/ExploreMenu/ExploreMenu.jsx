import React, { useContext } from 'react';
import { StoreContext } from '../../Context/StoreContext';

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list } = useContext(StoreContext);

  return (
    <div className='container mx-auto py-8'>
      <h2 className='text-4xl lg:text-5xl font-bold mb-4'>Explore our menu!</h2>
      <p className='text-xl font-normal text-gray-600 mb-4 lg:mb-8'>
        Choose from our diverse menu. We aim to satisfy your cravings and
        elevate your dining experience with every meal.
      </p>
      <div className='flex gap-x-4 overflow-auto custom_scrollbar'>
        {menu_list.map((item, index) => {
          const isActive = category === item.menu_name;
          return (
            <div
              onClick={() =>
                setCategory((prev) =>
                  prev === item.menu_name ? 'All' : item.menu_name
                )
              }
              key={index}
              className='flex items-center justify-center gap-8'
            >
              <div
                className={`px-6 py-2 text-center rounded-full whitespace-nowrap transition-all duration-300 ease-in-out cursor-pointer
                  ${
                    isActive
                      ? 'bg-accent text-white'
                      : 'bg-accent/10 text-accent lg:hover:bg-accent/20'
                  }`}
              >
                {item.menu_name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ExploreMenu;
