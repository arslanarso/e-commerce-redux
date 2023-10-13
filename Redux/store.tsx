import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./CartReducer";
import FavouriteReducer from "./FavouriteReducer";
import itemReducer from "./itemReducer";
import UserReducer from "./UserReducer";
import authReducer from "./authReducer";

// Configure the Redux store with reducers for different slices of state.
const store = configureStore({
  reducer: {
    items: itemReducer, // Items slice of state
    cart: cartReducer, // Cart slice of state
    favourite: FavouriteReducer, // Favorite slice of state
    user: UserReducer, // User slice of state
    auth: authReducer, // Authentication slice of state
  },
});

// Define types for RootState and AppDispatch based on the store configuration.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
