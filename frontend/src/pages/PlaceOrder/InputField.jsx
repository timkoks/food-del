import React from 'react';

const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = true,
}) => (
  <div>
    <label className='mb-2 block text-sm font-medium text-gray-900'>
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className='py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-accentHover focus:ring-accentHover disabled:opacity-50 disabled:pointer-events-none'
    />
  </div>
);

export default InputField;
