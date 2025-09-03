import React from 'react';
import { footer } from '../../assets/assets';
import { FaGooglePlay, FaApple } from 'react-icons/fa';

const Footer = () => {
  const { logo, contacts, appDownload, newsletter, form } = footer;
  return (
    <footer className='bg-white border-t boder-gray-200 py-6 lg:py-4 w-full transition-all'>
      <div className='  container mx-auto'>
        <div className='grid grid-cols-4 md:grid-cols-4 lg:grid-cols-9 gap-6 lg:gap-12'>
          {/* Logo */}
          <div className='col-span-full lg:col-span-2'>
            <img src={logo} alt='logo' />
          </div>

          {/* Contacts */}
          <div className='col-span-2'>
            <h4 className='text-base sm:text-2xl uppercase font-medium'>
              Contacts
            </h4>
            <ul className='flex flex-col gap-y-3 sm:gap-x-3 mt-3 sm:mt-4'>
              {contacts.map((item, index) => {
                const { type, value, icon: Icon } = item;
                return (
                  <li key={index}>
                    <a
                      className='w-full whitespace-nowrap p-3 inline-flex justify-center items-center text-sm  font-medium rounded-lg border border-transparent bg-accent text-white hover:bg-accentHover'
                      href={
                        type === 'Email' ? `mailto:${value}` : `tel:${value}`
                      }
                    >
                      <Icon className='mr-2' />
                      {value}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* App Download */}
          <div className='col-span-2'>
            <h4 className='text-base sm:text-2xl uppercase font-medium'>
              Get App
            </h4>

            <div className='flex flex-col gap-y-3 sm:gap-x-3 mt-3 sm:mt-4'>
              <a
                href={appDownload.googlePlay.url}
                className='w-full whitespace-nowrap p-3 inline-flex justify-center items-center text-sm sm:text-sm font-medium rounded-lg border border-transparent bg-black text-white hover:bg-black/90'
              >
                <FaGooglePlay className='mr-1 sm:mr-2' /> Google Play
              </a>
              <a
                href={appDownload.appStore.url}
                className='w-full whitespace-nowrap p-3 inline-flex justify-center items-center text-sm sm:text-sm font-medium rounded-lg border border-transparent bg-black text-white hover:bg-black/90'
              >
                <FaApple className='mr-1 sm:mr-2' /> App Store
              </a>
            </div>
          </div>

          <div className='col-span-full lg:col-span-3'>
            <h4 className='text-base sm:text-2xl uppercase font-medium'>
              {newsletter.title}
            </h4>

            <form>
              <div className='mt-4 flex flex-col items-center gap-2 sm:flex-row sm:gap-3 bg-white rounded-lg'>
                <div className='w-full'>
                  <label htmlFor='hero-input' className='sr-only'>
                    Subscribe
                  </label>
                  <input
                    type='text'
                    id='hero-input'
                    name='hero-input'
                    className='py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-accentHover focus:ring-accentHover disabled:opacity-50 disabled:pointer-events-none'
                    placeholder={form.placeholder}
                  ></input>
                </div>
                <a
                  className='w-full sm:w-auto whitespace-nowrap p-3 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-accent text-white hover:bg-accentHover focus:outline-none focus:bg-accentHover disabled:opacity-50 disabled:pointer-events-none'
                  href='#'
                >
                  Subscribe
                </a>
              </div>
              <p className='mt-3 text-sm text-gray-400'>{form.smallText}</p>
            </form>
          </div>
        </div>

        <div className='mt-5 sm:mt-12 grid gap-y-2 sm:gap-y-0 sm:flex sm:justify-between sm:items-center'>
          <div className='flex justify-between items-center'>
            <p className='text-sm text-gray-400'>
              CopyRight &copy; 2022 Foodwagon
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
