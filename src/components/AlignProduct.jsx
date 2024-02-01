import React from 'react';

const AlignProduct = ({ onSortingChange }) => {
  const handleSortingChange = (option) => {
    onSortingChange(option);
  };

  return (
    <div className='w-full lg:w-full flex lg:flex-col justify-center p-4 lg:p-2 lg:mr-24 lg:py-2 bg-slate-50 shadow-lg'>
      <div className="flex items-center">

  
        <input
          id="oldToNew"
          type="radio"
          value="oldToNew"
          name="sortingOption"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          onChange={() => handleSortingChange('oldToNew')}
        />
        <label htmlFor="oldToNew" className="ms-2 mr-4 text-sm font-medium">Old to New</label>
      </div>
      <div className="flex items-center">
        <input
          id="newToOld"
          type="radio"
          value="newToOld"
          name="sortingOption"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          onChange={() => handleSortingChange('newToOld')}
        />
        <label htmlFor="newToOld" className="ms-2 mr-4 text-sm font-medium">New to Old</label>
      </div>
      <div className="flex items-center">
        <input
          id="priceHighToLow"
          type="radio"
          value="priceHighToLow"
          name="sortingOption"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          onChange={() => handleSortingChange('priceHighToLow')}
        />
        <label htmlFor="priceHighToLow" className="ms-2 mr-4 text-sm font-medium">Price High to Low</label>
      </div>
      <div className="flex items-center">
        <input
          id="priceLowToHigh"
          type="radio"
          value="priceLowToHigh"
          name="sortingOption"
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
          onChange={() => handleSortingChange('priceLowToHigh')}
        />
        <label htmlFor="priceLowToHigh" className="ms-2 text-sm font-medium">Price Low to High</label>
      </div>
    </div>
  );
};

export default AlignProduct;
