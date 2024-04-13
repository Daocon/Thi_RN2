import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../reduces/sachReducer";

const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});
export default store;