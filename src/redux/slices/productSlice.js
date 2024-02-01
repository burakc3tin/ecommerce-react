// productSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    try {
        const response = await axios.get('https://5fc9346b2af77700165ae514.mockapi.io/products');
        return response.data;
    } catch (error) {
        throw error;
    }
});

const productSlice = createSlice({
    name: 'products',
    initialState: {
        data: [],
        status: 'idle',
        error: null,
        searchTerm: '',
        selectedFilters: [],
        selectedBrandFilters: []
    },
    reducers: {
        setProducts: (state, action) => {
            state.data = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        setSelectedFilters: (state, action) => {
            state.selectedFilters = action.payload;
        },
        setBrandSelectedFilters: (state, action) => {
            state.selectedBrandFilters = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload.filter((product) =>
                    product.name.toLowerCase().includes(state.searchTerm.toLowerCase())
                );
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});

export default productSlice.reducer;

export const { setProducts, setSearchTerm, setSelectedFilters, setBrandSelectedFilters } = productSlice.actions;
