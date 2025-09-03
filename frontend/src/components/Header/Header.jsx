import React from 'react';
import { LuArrowDown } from 'react-icons/lu';
import { assets } from '../../assets/assets';

const Header = () => {
  return (
    <section className='py-8'>
      <div className='container mx-auto flex justify-center items-center'>
        <div
          className='w-full bg-cover bg-center rounded-2xl'
          style={{
            backgroundImage: `url(${assets.header_img})`,
          }}
        >
          <div className='flex h-full w-full items-center py-8 lg:py-12 rounded-2xl'>
            <div className='w-full max-w-2xl text-left px-8 lg:px-12'>
              <span className='font-semibold uppercase tracking-widest text-white'>
                foodwagon delivery
              </span>
              <h2 className='mb-6 mt-8 text-5xl font-bold text-white lg:text-8xl'>
                Best food for your taste!
              </h2>
              <p className='mb-10 text-2xl font-normal text-white'>
                Discover delectable cuisine and unforgettable moments in our
                welcoming, culinary haven.
              </p>
              <button className='btn btn-md lg:btn-lg btn-accent flex justify-center items-center gap-x-2'>
                Explore Menu
                <LuArrowDown />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
