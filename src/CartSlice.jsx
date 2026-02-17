import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) => i.name === item.name
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item.name !== action.payload
      );
    },

    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;

      const item = state.items.find(
        (i) => i.name === name
      );

      if (item) {
        item.quantity += amount;

        if (item.quantity <= 0) {
          state.items = state.items.filter(
            (i) => i.name !== name
          );
        }
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } =
  cartSlice.actions;

export default cartSlice.reducer;
