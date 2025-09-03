import React, { useRef, useState, useEffect } from 'react';
import { LuUser2, LuPackage, LuLogOut } from 'react-icons/lu';

const ProfileMenu = ({ token, logout, navigate }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileMenuRef.current &&
        !profileMenuRef.current.contains(event.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='relative' ref={profileMenuRef}>
      <button
        onClick={() => setShowProfileMenu(!showProfileMenu)}
        className='rounded-full btn btn-sm btn-outline p-2 w-12 h-12 flex items-center justify-center'
      >
        <LuUser2 className='text-2xl' />
      </button>
      {showProfileMenu && (
        <div className='absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50'>
          <ul className='py-2 text-sm text-gray-700'>
            <li
              onClick={() => {
                navigate('/myorders');
                setShowProfileMenu(false);
              }}
              className='flex items-center gap-x-2 px-4 py-2 cursor-pointer hover:bg-gray-100'
            >
              <LuPackage className='text-xl' />
              <span>Orders</span>
            </li>
            <hr />
            <li
              onClick={logout}
              className='flex items-center gap-x-2 px-4 py-2 cursor-pointer hover:bg-gray-100'
            >
              <LuLogOut className='text-xl' />
              <span>Logout</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
