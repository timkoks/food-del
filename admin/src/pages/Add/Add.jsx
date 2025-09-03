import React, { useState } from 'react';
import { url } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Burgers',
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!image) {
      toast.error('Image not selected');
      return null;
    }

    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', Number(data.price));
    formData.append('category', data.category);
    formData.append('image', image);
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      toast.success(response.data.message);
      setData({
        name: '',
        description: '',
        price: '',
        category: data.category,
      });
      setImage(false);
    } else {
      toast.error(response.data.message);
    }
  };

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  return (
    <div className='mx-auto'>
      <form className='space-y-6' onSubmit={onSubmitHandler}>
        <div className='flex items-center justify-center w-full'>
          <label
            htmlFor='image'
            className='flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100'
          >
            <div className='flex flex-col items-center justify-center pt-5 pb-6'>
              <svg
                className='w-8 h-8 mb-4 text-gray-500'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 20 16'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
                />
              </svg>
              <p className='mb-2 text-sm text-gray-500'>
                <span className='font-semibold'>Click to upload</span> or drag
                and drop
              </p>
              <p className='text-xs text-gray-500'>
                SVG, PNG, JPG or GIF (MAX. 800x400px)
              </p>
            </div>
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
                e.target.value = '';
              }}
              type='file'
              accept='image/*'
              id='image'
              className='hidden'
            />
          </label>
        </div>

        <div>
          <label className='block mb-2 text-sm font-medium text-gray-700'>
            Product name
          </label>
          <input
            name='name'
            onChange={onChangeHandler}
            value={data.name}
            type='text'
            placeholder='Type here'
            required
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
          />
        </div>

        <div>
          <label className='block mb-2 text-sm font-medium text-gray-700'>
            Product description
          </label>
          <textarea
            name='description'
            onChange={onChangeHandler}
            value={data.description}
            rows={6}
            placeholder='Write content here'
            required
            className='block w-full text-sm bg-gray-50 border border-gray-300 rounded-lg p-2.5'
          />
        </div>

        <div className='grid gap-6 md:grid-cols-2'>
          <div>
            <label className='block mb-2 text-sm font-medium text-gray-700'>
              Product category
            </label>
            <select
              name='category'
              onChange={onChangeHandler}
              value={data.category}
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
            >
              <option value='Burgers'>Burgers</option>
              <option value='Pizza'>Pizza</option>
              <option value='Sushi & Rolls'>Sushi & Rolls</option>
              <option value='Hot Dogs'>Hot Dogs</option>
              <option value='Fries & Snacks'>Fries & Snacks</option>
              <option value='Desserts'>Desserts</option>
              <option value='Drinks'>Drinks</option>
            </select>
          </div>

          <div>
            <label className='block mb-2 text-sm font-medium text-gray-700'>
              Product Price
            </label>
            <input
              type='number'
              name='price'
              onChange={onChangeHandler}
              value={data.price}
              placeholder='25'
              required
              className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5'
            />
          </div>
        </div>

        <button
          type='submit'
          className='w-full text-white bg-accent hover:bg-accentHover font-medium rounded-lg text-sm px-5 py-2.5 text-center'
        >
          ADD
        </button>
      </form>
    </div>
  );
};

export default Add;
