// Home.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, updateBasket } from '../redux/slices/basketSlice';
import { fetchProducts } from '../redux/slices/productSlice';
import Product from '../components/Product';
import AlignProduct from '../components/AlignProduct';
import ModelProduct from '../components/ModelProduct';
import Basket from '../components/Basket';
import TotalPrice from '../components/TotalPrice';
import Navbar from '../components/Navbar';
import { setSearchTerm } from '../redux/slices/productSlice';
import BrandProduct from '../components/BrandProduct';

export default function Home() {
 
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingOption, setSortingOption] = useState('default');
  const dispatch = useDispatch();

  const storedBasket = JSON.parse(localStorage.getItem('basket')) || [];
  const [basket, setBasket] = useState(storedBasket);

  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket));
  }, [basket]);

  const { data: products, searchTerm,selectedFilters,selectedBrandFilters } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  const handleAddToBasket = (productId, productName, productPrice) => {
    const existingItem = basket.find((item) => item.id === productId);

    if (existingItem) {
      dispatch(updateBasket({ id: productId, actionType: 'increase' }));
    } else {
      dispatch(addToBasket({ id: productId, name: productName, price: productPrice }));
    }
  };

  const handleSortingChange = (option) => {
    setSortingOption(option);
  };

  const sortedProducts = () => {
    const sorted = [...displayedProducts];
    switch (sortingOption) {
      case 'oldToNew':
        return sorted.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'newToOld':
        return sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'priceHighToLow':
        return sorted.sort((a, b) => b.price - a.price);
      case 'priceLowToHigh':
        return sorted.sort((a, b) => a.price - b.price);
      default:
        return sorted;
    }
  };
const filteredProducts = () => {
  let filtered = sortedProducts().filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Seçili marka filtreleri ile ürünleri filtrele
  if (selectedFilters.length > 0) {
    filtered = filtered.filter((product) =>
    selectedFilters.map((item) => item.toLowerCase()).some((item) =>
      product.name.toLowerCase().includes(item)
    )
  );
  }

  if (selectedBrandFilters.length > 0) {
    filtered = filtered.filter((product) =>
    selectedBrandFilters.map((item) => item.toLowerCase()).some((item) =>
      product.brand.toLowerCase().includes(item)
    )
  );
  }

  

  return filtered;
};
  
  return (
    <div className='bg-slate-200 min-h-screen flex flex-col overflow-hidden'>
      
      <Navbar setSearchTerm={(term) => dispatch(setSearchTerm(term))}/>
      
      <div className="flex flex-col lg:flex-row px-0 lg:px-20 flex-1 overflow-y-auto mt-4">
        <div className=" bg-slate-200">
          <AlignProduct onSortingChange={handleSortingChange} />
          <BrandProduct />
          <ModelProduct />
        </div>
        
       
        <div className="lg:w-4/5 bg-slate-200 pb-8 ">
          <div className='flex flex-wrap justify-center'>

          {filteredProducts().map((product) => (
            <Product
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.image}
              brand={product.brand}
              price={product.price}
              addToBasket={handleAddToBasket}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
            />
          ))}
          </div>
          <div className="flex justify-center items-center mt-4 ">
        <button
          className="bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
          -
        </button>
        <span className="mx-4 text-lg">{currentPage}</span>
        <button
          className="bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
        >
          +
        </button>
      </div>
        </div>
         
        <div className=" bg-slate-200">
          <Basket basketItems={basket} updateBasket={setBasket} />
          <TotalPrice />
        </div>
      </div>
     
    </div>
  );
}
