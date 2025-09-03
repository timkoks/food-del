import React, { useState, useEffect } from 'react';
import { url, currency } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { LuTrash2 } from 'react-icons/lu';

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error('Error fetching list');
    }
  };

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList();
    if (response.data.success) {
      toast.success('Item removed successfully');
    } else {
      toast.error('Error removing item');
    }
  };

  const [expandedRows, setExpandedRows] = useState([]);

  const toggleExpandRow = (id) => {
    if (expandedRows.includes(id)) {
      setExpandedRows(expandedRows.filter((rowId) => rowId !== id));
    } else {
      setExpandedRows([...expandedRows, id]);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const categories = Array.from(new Set(list.map((item) => item.category)));

  return (
    <div className='mx-auto'>
      <h2 className='text-4xl font-bold mb-6'>Items Management</h2>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8'>
        {categories.map((category, categoryIndex) => (
          <div key={categoryIndex} className='mb-8'>
            <h2 className='text-2xl font-bold text-gray-800 mb-4'>
              {category}
            </h2>
            <div className='overflow-hidden rounded-lg border border-accent'>
              <table className='min-w-full bg-white'>
                <thead className='bg-accent text-white'>
                  <tr>
                    <th className='px-4 py-2 w-1/2 text-left'>Food Item</th>
                    <th className='px-4 py-2 w-1/4 text-left'>Price</th>
                  </tr>
                </thead>
                <tbody>
                  {list
                    .filter((item) => item.category === category)
                    .map((item) => (
                      <React.Fragment key={item._id}>
                        <tr
                          className='border-t border-accent cursor-pointer'
                          onClick={() => toggleExpandRow(item._id)}
                        >
                          <td className='px-4 py-2 flex items-center'>
                            <img
                              src={`${url}/images/${item.image}`}
                              alt={item.name}
                              className='w-12 h-12 object-cover rounded-lg mr-4'
                            />
                            <span>{item.name}</span>
                          </td>
                          <td className='px-4 py-2'>
                            {currency}
                            {item.price}
                          </td>
                        </tr>
                        {expandedRows.includes(item._id) && (
                          <tr className='border-t border-accent bg-gray-100'>
                            <td colSpan='2' className='px-4 py-2'>
                              <div className='flex flex-col'>
                                <p className='text-sm text-gray-700 mb-2'>
                                  <strong>Description:</strong>{' '}
                                  {item.description}
                                </p>
                                <button
                                  onClick={() => removeFood(item._id)}
                                  className='text-red-500 hover:text-red-700 flex items-center'
                                >
                                  <LuTrash2 className='mr-1' /> Remove
                                </button>
                              </div>
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
