import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedFilters } from '../redux/slices/productSlice';

export default function ModelProduct() {
  const [checkedFilters, setCheckedFilters] = useState([]);
  const [modelName, setModelName] = useState('');
  const dispatch = useDispatch();
  const selectedFilters = useSelector((state) => state.products.selectedFilters);

  const handleFilterChange = (filter) => {
    const updatedFilters = checkedFilters.includes(filter)
      ? checkedFilters.filter((f) => f !== filter)
      : [...checkedFilters, filter];

    setCheckedFilters(updatedFilters);
    dispatch(setSelectedFilters(updatedFilters));
  };

  const handleSearchChange = (event) => {
    setModelName(event.target.value.toLowerCase());
  };

  const filteredCheckboxes = ['Ford', 'Nissan', 'Mercedes', 'Porsche'].filter((checkbox) =>
    checkbox.toLowerCase().includes(modelName)
  );

  return (
    <div className='w-full bg-white mt-6 mb-6 p-2 shadow-lg'>
      <div className="relative text-gray-300 mx-2 lg:mx-0">
        <input
          type="text"
          placeholder="model name.."
          value={modelName}
          onChange={handleSearchChange}
          className="text-center w-full text-sm bg-slate-50 focus:outline-none focus:ring pr-4 py-2 my-2 lg:pl-4"
        />
        <div className="absolute inset-y-0 left-0 flex items-center px-2">
          <FaSearch />
        </div>
      </div>
      <div className='flex flex-col items-center h-20 overflow-y-auto lg:items-stretch lg:h-auto'>
        <div>
          {filteredCheckboxes.map((checkbox) => (
            <div key={checkbox}>
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                onChange={() => handleFilterChange(checkbox)}
                checked={selectedFilters.includes(checkbox)}
              />
              <span className="text-sm">{checkbox}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
