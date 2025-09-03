import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../../assets/assets';

const Logo = () => (
  <Link to='/'>
    <img src={assets.logo} alt='Foodwagon logo' />
  </Link>
);

export default Logo;
