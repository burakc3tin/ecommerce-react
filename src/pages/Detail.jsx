// Home.jsx

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, updateBasket } from '../redux/slices/basketSlice';
import { fetchProducts } from '../redux/slices/productSlice';
import Product from '../components/Product';
import AlignProduct from '../components/AlignProduct';
import ModelProduct from '../components/ModelProduct';
import Basket from '../components/Basket';
import TotalPrice from '../components/TotalPrice';
import Navbar from '../components/Navbar';
import ProductDetail from '../components/ProductDetail';

export default function Detail() {
  const { id,description } = useParams();
 
  const [currentPage, setCurrentPage] = useState(1);
  const [sortingOption, setSortingOption] = useState('default');
  const dispatch = useDispatch();

  const storedBasket = JSON.parse(localStorage.getItem('basket')) || [];
  const [basket, setBasket] = useState(storedBasket);
 
  useEffect(() => {
    localStorage.setItem('basket', JSON.stringify(basket));
  }, [basket]);

  const { data: products } = useSelector((state) => state.products);

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
    const filteredById = sorted.filter((product) => product.id === id);

    switch (sortingOption) {
      case 'oldToNew':
        return filteredById.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
      case 'newToOld':
        return filteredById.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      case 'priceHighToLow':
        return filteredById.sort((a, b) => b.price - a.price);
      case 'priceLowToHigh':
        return filteredById.sort((a, b) => a.price - b.price);
      default:
        return filteredById;
    }
  };
 
  return (
    <div className='bg-slate-200 min-h-screen flex flex-col'>
      <Navbar />
      <div className="flex flex-col lg:flex-row px-0 lg:px-20 flex-1 overflow-y-auto">
       
        <div className='lg:hidden'>
          
          {description}
        </div>
       
        <div className=" w-auto bg-slate-200 pb-4  ">
          <div className='flex flex-wrap justify-center'>
    
          {sortedProducts().map((product) => (
            <ProductDetail
              key={product.id}
              id={product.id}
              name={product.name}
              description={product.description}
              image={product.image}
              brand={product.brand}
              price={product.price}
              addToBasket={handleAddToBasket}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
            />
          ))}
          </div>
     
        </div>
         
        <div className=" bg-slate-200 mt-4">
          <Basket basketItems={basket} updateBasket={setBasket} />
          <TotalPrice />
        </div>
      </div>
     
    </div>
  );
}
