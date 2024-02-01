import { createSlice } from '@reduxjs/toolkit';

const loadBasketFromLocalStorage = () => {
    const storedBasket = localStorage.getItem('basket');
    return storedBasket ? JSON.parse(storedBasket) : [];
};

const saveBasketToLocalStorage = (basket) => {
    localStorage.setItem('basket', JSON.stringify(basket));
};

const basketSlice = createSlice({
    name: 'basket',
    initialState: loadBasketFromLocalStorage(),
    reducers: {
        addToBasket: (state, action) => {
            const { id, name, price } = action.payload;
            const existingItemIndex = state.findIndex(item => item.id === id);

            if (existingItemIndex !== -1) {
                state[existingItemIndex].quantity += 1;
            } else {
                state.push({ id, name, price, quantity: 1 });
            }

            saveBasketToLocalStorage(state);
        },
        updateBasket: (state, action) => {
            const { id, actionType } = action.payload;
            const itemIndex = state.findIndex(item => item.id === id);

            if (itemIndex !== -1) {
                switch (actionType) {
                    case 'decrease':
                        if (state[itemIndex].quantity > 1) {
                            state[itemIndex].quantity -= 1;
                        } else {
                            state.splice(itemIndex, 1);
                        }
                        break;
                    case 'increase':
                        state[itemIndex].quantity += 1;
                        break;
                    case 'remove':
                        state.splice(itemIndex, 1);
                        break;
                    default:
                        break;
                }
                saveBasketToLocalStorage(state);
            }
        },
    },
});

export const { addToBasket, updateBasket } = basketSlice.actions;

export default basketSlice.reducer;
