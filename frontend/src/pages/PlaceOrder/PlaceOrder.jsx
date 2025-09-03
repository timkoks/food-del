import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import InputField from './InputField';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';

const PlaceOrder = () => {
  const [payment, setPayment] = useState('cod');
  const [data, setData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const {
    getTotalCartAmount,
    token,
    food_list,
    cartItems,
    url,
    setCartItems,
    currency,
    deliveryCharge,
  } = useContext(StoreContext);

  const navigate = useNavigate();

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const calculateTotalAmount = () => {
    const subtotal = parseFloat(getTotalCartAmount());
    const deliveryFee = parseFloat(deliveryCharge);
    return parseFloat((subtotal + deliveryFee).toFixed(2));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    let orderItems = [];

    food_list.forEach((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    });

    let orderData = {
      address: data,
      items: orderItems,
      amount: calculateTotalAmount(),
    };

    try {
      let response;
      if (payment === 'stripe') {
        response = await axios.post(url + '/api/order/place', orderData, {
          headers: { token },
        });
        if (response.data.success) {
          const { session_url } = response.data;
          window.location.replace(session_url);
        } else {
          throw new Error('Payment failed');
        }
      } else {
        response = await axios.post(url + '/api/order/placecod', orderData, {
          headers: { token },
        });
        if (response.data.success) {
          navigate('/myorders');
          toast.success(response.data.message);
          setCartItems({});
        } else {
          throw new Error('Order placement failed');
        }
      }
    } catch (error) {
      toast.error('Something went wrong: ' + error.message);
    }
  };

  useEffect(() => {
    if (!token) {
      toast.error('To place an order, sign in first');
      navigate('/');
    } else if (getTotalCartAmount() === 0) {
      navigate('/');
    }
  }, [token]);

  return (
    <form onSubmit={placeOrder} className='py-6 container mx-auto'>
      <div className='grid grid-cols-1 gap-12 lg:grid-cols-2'>
        <div className='space-y-4'>
          <h2 className='text-2xl font-semibold text-gray-900'>
            Delivery Information
          </h2>
          <div className='grid grid-cols-2 gap-4'>
            <InputField
              label='First name'
              name='firstName'
              value={data.firstName}
              onChange={onChangeHandler}
              placeholder='First name'
            />
            <InputField
              label='Last name'
              name='lastName'
              value={data.lastName}
              onChange={onChangeHandler}
              placeholder='Last name'
            />
          </div>
          <InputField
            label='Email address'
            type='email'
            name='email'
            value={data.email}
            onChange={onChangeHandler}
            placeholder='Email address'
          />
          <InputField
            label='Street'
            name='street'
            value={data.street}
            onChange={onChangeHandler}
            placeholder='Street'
          />
          <div className='grid grid-cols-2 gap-4'>
            <InputField
              label='City'
              name='city'
              value={data.city}
              onChange={onChangeHandler}
              placeholder='City'
            />
            <InputField
              label='State'
              name='state'
              value={data.state}
              onChange={onChangeHandler}
              placeholder='State'
            />
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <InputField
              label='Zip code'
              name='zipcode'
              value={data.zipcode}
              onChange={onChangeHandler}
              placeholder='Zip code'
            />
            <InputField
              label='Country'
              name='country'
              value={data.country}
              onChange={onChangeHandler}
              placeholder='Country'
            />
          </div>
          <InputField
            label='Phone'
            name='phone'
            value={data.phone}
            onChange={onChangeHandler}
            placeholder='Phone'
          />
        </div>
        <div className='space-y-4'>
          <div className='space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-6'>
            <h2 className='text-xl font-semibold text-gray-900'>Cart Totals</h2>
            <dl className='flex justify-between text-base text-gray-900'>
              <dt>Subtotal</dt>
              <dd>
                {currency}
                {parseFloat(getTotalCartAmount()).toFixed(2)}
              </dd>
            </dl>
            <dl className='flex justify-between text-base text-gray-900'>
              <dt>Delivery Fee</dt>
              <dd>
                {currency}
                {getTotalCartAmount() === 0
                  ? '0.00'
                  : deliveryCharge.toFixed(2)}
              </dd>
            </dl>
            <dl className='flex justify-between text-xl font-bold text-gray-900'>
              <dt>Total</dt>
              <dd>
                {currency}
                {calculateTotalAmount()}
              </dd>
            </dl>
          </div>
          <div className='space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-6'>
            <h2 className='text-xl font-semibold text-gray-900'>
              Payment Method
            </h2>
            <div
              onClick={() => setPayment('cod')}
              className='flex items-center gap-2 cursor-pointer'
            >
              <img
                src={payment === 'cod' ? assets.checked : assets.un_checked}
                alt=''
              />
              <p className='text-base text-gray-900'>
                COD ( Cash on delivery )
              </p>
            </div>
            <div
              onClick={() => setPayment('stripe')}
              className='flex items-center gap-2 cursor-pointer'
            >
              <img
                src={payment === 'stripe' ? assets.checked : assets.un_checked}
                alt=''
              />
              <p className='text-base text-gray-900'>
                Stripe ( Credit / Debit )
              </p>
            </div>
          </div>
          <button
            className='btn btn-sm btn-accent flex justify-center items-center w-full'
            type='submit'
          >
            {payment === 'cod' ? 'Place Order' : 'Proceed To Payment'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
