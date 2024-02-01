import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../redux/slices/basketSlice';

export default function ProductDetail({ id, name,description, image, brand, price }) {
  const dispatch = useDispatch();

  const handleAddToBasket = () => {
    dispatch(addToBasket({ id, name, price }));
  };

  return (
    <div className="flex flex-col lg:flex-row p-2 bg-white mx-2 my-4 shadow-xl">
    <div className='lg:w-1/2 flex-1'> {/* Bu satır eklendi */}
      <Link to={`/detail/${id}`} key={id}>
        <img className="w-full h-full object-cover mb-4" src={image} alt={name} />
      </Link>
    </div>
    <div className="lg:w-1/2 mb-2 p-8">
      <div className="text-md font-semibold mb-2">{name}</div>
      <div className="text-sm text-blue-700 mb-6 font-semibold">{price}</div>
      <span className="block text-sm mb-4">
        {description}
      </span>
      <button className='w-full bg-blue-700 hover:bg-blue-600 text-white text-sm p-1 rounded' onClick={handleAddToBasket}>
        Add to Cart
      </button>
    </div>
  </div>
  
  );
}
