import React from 'react';
import { useSelector } from 'react-redux';

export default function TotalPrice() {
  // Redux store'dan toplam fiyatı alın
  const basketItems = useSelector(state => state.basket);
  const totalPrice = basketItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className='w-full flex flex-col items-center bg-white shadow-lg mt-4 py-4'>
      <div>
        <span className='text-sm'>Total Price:</span>
        <span className='font-bold text-blue-600'>{totalPrice}₺</span>
      </div>
      <button className='text-sm w-full bg-blue-700 hover:bg-blue-600 text-white p-2 my-2'>Checkout</button>

    </div>
  );
}
