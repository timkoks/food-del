import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, url, currency } from '../../assets/assets';
import { LuPackage } from 'react-icons/lu';

const Order = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    const response = await axios.get(`${url}/api/order/list`);
    if (response.data.success) {
      setOrders(response.data.data.reverse());
    } else {
      toast.error('Error fetching orders');
    }
  };

  const statusHandler = async (event, orderId) => {
    const response = await axios.post(`${url}/api/order/status`, {
      orderId,
      status: event.target.value,
    });
    if (response.data.success) {
      fetchAllOrders();
    } else {
      toast.error('Error updating status');
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='mx-auto'>
      <h2 className='text-4xl font-bold mb-6'>Order Management</h2>
      <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {orders.map((order, index) => (
          <div
            key={index}
            className='bg-white p-4 rounded-lg border border-t-[10px] border-accent flex flex-col justify-between h-full'
          >
            <div>
              <div className='flex items-center mb-4'>
                <LuPackage className='text-3xl text-accent mr-4' />
                <div>
                  <h3 className='text-xl font-semibold text-gray-800'>
                    {order.address.firstName} {order.address.lastName}
                  </h3>
                  <p className='text-gray-600 text-sm'>
                    {order.address.street}
                  </p>
                  <p className='text-gray-600 text-sm'>
                    {order.address.city}, {order.address.state},{' '}
                    {order.address.zipcode}
                  </p>
                  <p className='text-gray-600 text-sm'>
                    Phone: {order.address.phone}
                  </p>
                </div>
              </div>
              <div className='mb-4'>
                <table className='w-full text-left table-fixed'>
                  <thead>
                    <tr>
                      <th className='w-3/4 px-2 py-2 text-gray-600 text-sm'>
                        Product
                      </th>
                      <th className='w-1/4 px-2 py-2 text-gray-600 text-sm'>
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.items.map((item, idx) => (
                      <tr key={idx} className='border-t'>
                        <td className='px-2 py-2 text-gray-700 text-sm'>
                          {item.name}
                        </td>
                        <td className='px-2 py-2 text-gray-700 text-sm text-center'>
                          {item.quantity}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className='mt-auto'>
              <div className='flex justify-between items-center mb-4'>
                <p className='text-lg font-semibold text-gray-800'>
                  Total: {currency}
                  {order.amount}
                </p>
                <div className='relative'>
                  <select
                    onChange={(e) => statusHandler(e, order._id)}
                    value={order.status}
                    className='block appearance-none w-full bg-white border border-gray-300 text-gray-700 py-2 px-2 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-accent text-sm'
                  >
                    <option value='Food Processing'>Food Processing</option>
                    <option value='Out for delivery'>Out for delivery</option>
                    <option value='Delivered'>Delivered</option>
                  </select>
                  <div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
                    <LuPackage className='w-4 h-4' />
                  </div>
                </div>
              </div>
              <div className='text-sm text-right text-gray-500'>
                Order placed on: {new Date(order.date).toLocaleDateString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
