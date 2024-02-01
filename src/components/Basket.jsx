// Basket.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, updateBasket } from '../redux/slices/basketSlice';

export default function Basket() {
  const dispatch = useDispatch();
  const basketItems = useSelector(state => state.basket);

  useEffect(() => {
    // Her sepet değiştiğinde localStorage'a güncel bilgileri kaydet
    localStorage.setItem('basket', JSON.stringify(basketItems));
  }, [basketItems]);

  const handleDecrease = (itemId) => {
    dispatch(updateBasket({ id: itemId, actionType: 'decrease' }));
  };

  const handleIncrease = (itemId) => {
    dispatch(updateBasket({ id: itemId, actionType: 'increase' }));
  };

  return (
    <div className='w-full flex flex-wrap lg:flex-col justify-center items-center text-center bg-white shadow-lg py-4 pr-4 my-4 lg:my-0 lg:py-0'>
      {basketItems.map(item => (
        <div key={item.id} className='flex flex-col lg:flex-row my-2 justify-center items-center'>
          <div className='flex flex-col lg:px-4'>
            <span className='lg:text-xs w-48 lg:w-32 h-6 lg:h-4'>{item.name}</span>
            <span className='lg:text-xs'>{item.price}₺</span>
          </div>
         
            <div className="flex items-center justify-center">
              <button
                className="px-2 py-2 text-sm bg-gray-200 focus:outline-none"
                onClick={() => handleDecrease(item.id)}
              >
                -
              </button>
              <div className="px-2 py-2 text-sm bg-blue-500 text-white flex items-center justify-center">
                {item.quantity}
              </div>
              <button
                className="px-2 py-2 text-sm bg-gray-200 focus:outline-none"
                onClick={() => handleIncrease(item.id)}
              >
                +
              </button>
            </div>
          </div>
       
      ))}
    </div>
  );
}
