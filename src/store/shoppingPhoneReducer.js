import { createSlice } from "@reduxjs/toolkit";
import data from "./../shopping-phone-redux/data.json";

const initialState = {
  listProduct: data,
  productDetail: data[0],
  carts: [],
};

const shoppingPhoneSlice = createSlice({
  name: "shoppingPhoneSlice",
  initialState,
  reducers: {
    setDetailProduct: (state, action) => {
      state.productDetail = action.payload;
    },

    addToCart: (state, action) => {
      const phone = action.payload;
      const newCarts = [...state.carts];

      // Kiểm tra sp đã tồn tại trong carts hay chưa
      const index = newCarts.findIndex((item) => item.maSP === phone.maSP);

      if (index === -1) {
        newCarts.push({ ...phone, soLuong: 1 });
      } else {
        newCarts[index].soLuong += 1;
      }

      // Set carts với giá trị new carts
      state.carts = newCarts;
    },

    updateQuantity: (state, action) => {
      const { maSP, quantity } = action.payload;
      const newCarts = state.carts.map((item) => {
        if (item.maSP !== maSP) return item;
        return {
          ...item,
          soLuong: item.soLuong + quantity,
        };
      });
      // update state
      state.carts = newCarts;
    },

    deleteCart: (state, action) => {
      const maSP = action.payload;
      state.carts = state.carts.filter((item) => item.maSP !== maSP);
    },
  },
});

export const { setDetailProduct, addToCart, updateQuantity, deleteCart } =
  shoppingPhoneSlice.actions;

export const shoppingPhoneReducer = shoppingPhoneSlice.reducer;
