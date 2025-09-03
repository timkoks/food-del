import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, Routes, Route, useLocation } from 'react-router-dom';
import {
  LuMenu,
  LuChevronRight,
  LuPlusCircle,
  LuContainer,
  LuPackage,
} from 'react-icons/lu';
import Add from '../pages/Add/Add';
import List from '../pages/List/List';
import Orders from '../pages/Orders/Orders';

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  // Toggle function for sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  // Close sidebar when clicking outside of it on mobile
  const handleCloseSidebar = () => {
    setSidebarOpen(false);
  };

  // Mapping the current path to breadcrumb names
  const getCurrentPage = () => {
    switch (location.pathname) {
      case '/add':
        return 'Add Items';
      case '/list':
        return 'List Items';
      case '/orders':
        return 'Orders';
      default:
        return 'Dashboard';
    }
  };

  return (
    <>
      {/* Mobile Header */}
      <div className='sticky top-0 inset-x-0 z-20 bg-white border-y px-4 sm:px-6 lg:px-8 lg:hidden'>
        <div className='flex items-center py-2'>
          <button
            type='button'
            className='size-8 flex justify-center items-center gap-x-2 border border-gray-200 text-gray-800 hover:text-gray-500 rounded-lg focus:outline-none focus:text-gray-500 disabled:opacity-50 disabled:pointer-events-none'
            aria-haspopup='dialog'
            aria-expanded={isSidebarOpen}
            aria-controls='hs-application-sidebar'
            aria-label='Toggle navigation'
            onClick={toggleSidebar} // Toggle function
          >
            <span className='sr-only'>Toggle Navigation</span>
            <LuMenu className='shrink-0 size-4' />
          </button>

          <ol className='ms-3 flex items-center whitespace-nowrap'>
            <li className='flex items-center text-sm text-gray-800'>
              Application Layout
              <LuChevronRight className='shrink-0 mx-3 overflow-visible size-4 text-gray-400' />
            </li>
            <li
              className='text-sm font-semibold text-gray-800 truncate'
              aria-current='page'
            >
              {getCurrentPage()}
            </li>
          </ol>
        </div>
      </div>

      {/* Backdrop for mobile when sidebar is open */}
      {isSidebarOpen && (
        <div
          className='fixed inset-0 z-50 bg-gray-900 bg-opacity-50 lg:hidden'
          onClick={handleCloseSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`hs-overlay transform w-[260px] h-full fixed inset-y-0 start-0 z-[60] bg-accent lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 transition-transform duration-300 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className='relative flex flex-col h-full max-h-full'>
          <div className='px-8 pt-4'>
            <a
              className='flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80'
              href='#'
              aria-label='Foodwagon'
            >
              <img src={assets.logo} alt='Foodwagon logo' />
            </a>
          </div>

          <div className='h-full overflow-y-auto'>
            <nav
              className='hs-accordion-group p-3 w-full flex flex-col flex-wrap'
              data-hs-accordion-always-open
            >
              <ul className='flex flex-col space-y-1'>
                <li>
                  <NavLink
                    to='/add'
                    className='w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-lg hover:bg-white/10'
                  >
                    <LuPlusCircle className='text-2xl' />
                    <p>Add Items</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/list'
                    className='w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-lg hover:bg-white/10'
                  >
                    <LuContainer className='text-2xl' />
                    <p>List Items</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to='/orders'
                    className='w-full flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-white rounded-lg hover:bg-white/10'
                  >
                    <LuPackage className='text-2xl' />
                    <p>Orders</p>
                  </NavLink>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className='w-full py-6 lg:py-10 px-4 sm:px-6 md:px-8 lg:ps-72'>
        <Routes>
          <Route path='/add' element={<Add />} />
          <Route path='/list' element={<List />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </div>
    </>
  );
};

export default Sidebar;
