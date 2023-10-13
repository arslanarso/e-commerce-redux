import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Represents a product.
 * @interface
 */
interface Product {
  id: string;
  name: string;
}

/**
 * Represents a cart item, which is a product with a quantity.
 * @interface
 */
interface CartItem extends Product {
  quantity: number;
}

/**
 * Represents the state of the cart in the Redux store.
 * @interface
 */
interface CartState {
  cart: CartItem[];
}

/**
 * Initial state for the cart slice of the Redux store.
 * @type {CartState}
 */
const initialState: CartState = {
  cart: [],
};

/**
 * Function to save the cart data to AsyncStorage.
 * @param {CartItem[]} cart - The cart data to be saved.
 */
const saveCartToAsyncStorage = async (cart: CartItem[]) => {
  try {
    await AsyncStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("AsyncStorage Error:", error);
  }
};

/**
 * Redux slice for managing the cart state.
 */
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    /**
     * Redux action to add a product to the cart.
     * @param {CartState} state - The current cart state.
     * @param {PayloadAction<Product>} action - The action object containing the product to be added.
     */
    addToCart: (state, action: PayloadAction<Product>) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );

      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.cart.push({ ...action.payload, quantity: 1 });
      }

      saveCartToAsyncStorage(state.cart);
    },
    /**
     * Redux action to remove a product from the cart.
     * @param {CartState} state - The current cart state.
     * @param {PayloadAction<Product>} action - The action object containing the product to be removed.
     */
    removeFromCart: (state, action: PayloadAction<Product>) => {
      const removeFromCart = state.cart.filter(
        (item) => item.id !== action.payload.id
      );
      state.cart = removeFromCart;

      saveCartToAsyncStorage(state.cart);
    },
    /**
     * Redux action to increment the quantity of a product in the cart.
     * @param {CartState} state - The current cart state.
     * @param {PayloadAction<Product>} action - The action object containing the product.
     */
    incrementQuantity: (state, action: PayloadAction<Product>) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        itemInCart.quantity++;
      }

      saveCartToAsyncStorage(state.cart);
    },
    /**
     * Redux action to decrement the quantity of a product in the cart.
     * @param {CartState} state - The current cart state.
     * @param {PayloadAction<Product>} action - The action object containing the product.
     */
    decrementQuantity: (state, action: PayloadAction<Product>) => {
      const itemInCart = state.cart.find(
        (item) => item.id === action.payload.id
      );
      if (itemInCart) {
        if (itemInCart.quantity === 1) {
          const removeFromCart = state.cart.filter(
            (item) => item.id !== action.payload.id
          );
          state.cart = removeFromCart;
        } else {
          itemInCart.quantity--;
        }
      }

      saveCartToAsyncStorage(state.cart);
    },
    /**
     * Redux action to set the entire cart to a new set of items.
     * @param {CartState} state - The current cart state.
     * @param {PayloadAction<CartItem[]>} action - The action object containing the new cart items.
     */
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      state.cart = action.payload;

      saveCartToAsyncStorage(action.payload);
    },
    /**
     * Redux action to reset the cart to an empty state.
     * @param {CartState} state - The current cart state.
     */
    resetCart: (state) => {
      state.cart = [];
      saveCartToAsyncStorage(state.cart);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
  setCart,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
