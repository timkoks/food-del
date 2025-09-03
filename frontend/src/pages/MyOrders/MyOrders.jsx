import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { StoreContext } from '../../Context/StoreContext';
import { LuChevronDown } from 'react-icons/lu';

const MyOrders = () => {
  const [data, setData] = useState([]);
  const { url, token, currency } = useContext(StoreContext);
  const [filter, setFilter] = useState('all');

  const fetchOrders = async () => {
    const response = await axios.post(
      url + '/api/order/userorders',
      {},
      { headers: { token } }
    );
    setData(response.data.data);
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);

  const filterOrders = (orders) => {
    const now = new Date();
    return orders.filter((order) => {
      const orderDate = new Date(order.date);
      if (filter === 'today') {
        return (
          orderDate.getDate() === now.getDate() &&
          orderDate.getMonth() === now.getMonth() &&
          orderDate.getFullYear() === now.getFullYear()
        );
      } else if (filter === 'week') {
        return now - orderDate <= 7 * 24 * 60 * 60 * 1000;
      } else if (filter === 'month') {
        return now - orderDate <= 30 * 24 * 60 * 60 * 1000;
      } else if (filter === 'year') {
        return now - orderDate <= 365 * 24 * 60 * 60 * 1000;
      }
      return true;
    });
  };

  const filteredData = filterOrders(data);

  const columns = [[], [], []];
  filteredData.forEach((order, index) => {
    columns[index % 3].push(order);
  });

  return (
    <div className='container mx-auto py-6' id='food-display'>
      <h2 className='text-4xl lg:text-5xl font-bold mb-4'>My Orders</h2>
      <p className='text-xl font-normal text-gray-600 mb-4 lg:mb-8'>
        Here you can view all your orders and their status.
      </p>
      <div className='mb-4 flex items-center'>
        <label className='mr-4 text-lg font-medium text-gray-700'>
          Filter by:
        </label>
        <div className='relative'>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className='block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-accent'
          >
            <option value='all'>All</option>
            <option value='today'>Today</option>
            <option value='week'>Last Week</option>
            <option value='month'>Last Month</option>
            <option value='year'>Last Year</option>
          </select>
          <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
            <LuChevronDown className='w-4 h-4' />
          </div>
        </div>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 xl:gap-6'>
        {columns.map((column, colIndex) => (
          <div key={colIndex} className='space-y-4'>
            {column.map((order, index) => {
              const totalAmount = order.items.reduce(
                (sum, item) => sum + item.price * item.quantity,
                0
              );

              return (
                <ul
                  key={index}
                  className='flex flex-col border p-4 rounded-lg border-t-[10px] border-accent'
                >
                  <li className='text-sm text-gray-500 mb-2'>
                    Order Date:{' '}
                    {new Date(order.date).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </li>
                  {order.items.map((item, idx) => (
                    <li
                      key={idx}
                      className={`flex ${
                        idx > 0 ? 'border-t border-gray-200 pt-4 mt-4' : ''
                      }`}
                    >
                      <div className='h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200'>
                        <img
                          src={url + '/images/' + item.image}
                          className='h-full w-full object-cover object-center'
                          alt={item.name}
                        />
                      </div>

                      <div className='ml-4 flex flex-1 flex-col'>
                        <div>
                          <div className='flex justify-between text-base font-medium text-gray-900'>
                            <h3>
                              <a href='#'>{item.name}</a>
                            </h3>
                            <p className='ml-4'>
                              {currency}
                              {item.price * item.quantity}
                            </p>
                          </div>
                          <p className='mt-1 text-sm text-gray-500'>
                            Price: {currency}
                            {item.price}
                          </p>
                        </div>
                        <div className='flex flex-1 items-end justify-between text-sm'>
                          <p className='text-gray-500'>
                            Quantity: {item.quantity}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                  <li className='pt-4 mt-4 border-t border-gray-200'>
                    <div className='flex justify-between items-center text-lg font-semibold text-gray-900'>
                      <h2 className='text-lg font-bold text-accent'>
                        {currency}
                        {totalAmount}
                      </h2>
                      <div className='px-4 py-2 text-right text-sm font-bold rounded-full bg-accent/10 text-accent'>
                        {order.status}
                      </div>
                    </div>
                  </li>
                </ul>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyOrders;
