import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToBasket } from '../redux/slices/basketSlice';

export default function Product({ id, name, image, brand, price }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const handleAddToBasket = () => {
    dispatch(addToBasket({ id, name, price }));
  };

  // Simüle edilmiş bir yükleme süresi
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Örneğin, 1 saniye süren bir yükleme süresi
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="p-2 bg-white mx-2 mb-4 shadow-lg">
      {loading ? (
        <div className="flex items-center justify-center h-48">
          <span className="animate-spin rounded-full h-16 w-16 border-t-2 border-blue-700"></span>
        </div>
      ) : (
        <>
          <Link to={`/detail/${id}`} key={id}>
            <img className="w-full h-48 object-cover mb-4" src={image} alt={name} />
          </Link>
          <span className="block text-blue-700 text-sm font-semibold mb-2">
            ${price}
          </span>
          <div className="mb-2">
            <div className="font-bold text-sm">{name}</div>
          </div>
          <div className="mb-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              {brand}
            </span>
          </div>
          <button className='w-full bg-blue-700 text-white text-sm p-1 rounded' onClick={handleAddToBasket}>
            Add to Cart
          </button>
        </>
      )}
    </div>
  );
}
