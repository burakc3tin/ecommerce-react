import { configureStore } from '@reduxjs/toolkit';
import productReducer from './slices/productSlice';
import basketReducer from './slices/basketSlice';

const store = configureStore({
    reducer: {
        products: productReducer,
        basket: basketReducer,
    },
});

export default store;
