// Navbar.jsx

import React, { useState } from 'react';
import { FaShoppingBag, FaUser, FaSearch } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
 
export default function Navbar({ setSearchTerm }) {
  const dispatch = useDispatch();

  const [searchTermLocal, setSearchTermLocal] = useState('');

  // Redux store'dan toplam fiyatı alın
  const basketItems = useSelector((state) => state.basket);
  const totalPrice = basketItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTermLocal(term);
    dispatch(setSearchTerm(term)); // Redux store'da arama terimini güncellemek için setSearchTerm action'ını tetikle
  };
  return (
    <div>
      <nav className="font-serif text-white flex flex-col md:flex-col lg:flex-row text-center sm:text-left sm:justify-between py-4  px-20 bg-blue-700 shadow w-full">
        <div className='flex flex-col lg:flex-row md:flex-col md:text-center sm:flex-col sm:text-center'>
          <div className="pb-2">
          
              <a href="/" className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">
                Eteration
              </a>
           
          </div>
          <div className="flex justify-center items-center space-x-2 mb-4 lg:mb-0 ">
            <div className="relative  text-gray-300 lg:ml-24">
              <input
                type="text"
                placeholder="Search"
                className="py-2 text-sm pl-8 pr-4  focus:outline-none focus:ring focus:border-blue-300"
            
                value={searchTermLocal}
                onChange={handleSearch}
              />
              <div className="absolute inset-y-0 left-0 flex items-center pl-2">
                <FaSearch />
              </div>
            </div>
          </div>
        </div>
        <div className='flex justify-center '>
          <button className="flex items-center space-x-2 bg-transparent text-white px-4  rounded-md">
            <FaShoppingBag />
            <span>{totalPrice}₺</span>
          </button>
          <button className="flex items-center space-x-2 bg-transparent text-white pl-16  rounded-md">
            <FaUser />
            <span>Burak</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
