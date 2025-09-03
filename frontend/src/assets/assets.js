import { FaPhone, FaEnvelope } from 'react-icons/fa';
import logo from './logo.svg';
import header_img from './bg.avif';

import selector_icon from './selector_icon.png';
import checked from './checked.png';
import un_checked from './un_checked.png';

export const header = {
  logo: header_img,
};

export const assets = {
  logo,
  header_img,
  selector_icon,
  checked,
  un_checked,
};

export const menu_list = [
  {
    menu_name: 'Burgers',
  },
  {
    menu_name: 'Pizza',
  },
  {
    menu_name: 'Sushi & Rolls',
  },
  {
    menu_name: 'Hot Dogs',
  },
  {
    menu_name: 'Fries & Snacks',
  },
  {
    menu_name: 'Desserts',
  },
  {
    menu_name: 'Drinks',
  },
];

export const footer = {
  logo: logo,
  contacts: [
    { type: 'Phone', value: '+1 800 555 1234', icon: FaPhone },
    { type: 'Email', value: 'support@fwg.com', icon: FaEnvelope },
  ],
  appDownload: {
    googlePlay: {
      url: 'https://play.google.com/store/apps/details?id=foodwagon.app',

      description: 'Get it on Google Play',
    },
    appStore: {
      url: 'https://apps.apple.com/app/id987654321',

      description: 'Download on the App Store',
    },
  },
  newsletter: {
    title: 'Newsletter',
    subtitle: 'Subscribe to our newsletter',
  },
  form: {
    placeholder: 'Enter your email',
    btnText: 'Subscribe',
    smallText: "We respect your privacy and won't spam you.",
  },
};
