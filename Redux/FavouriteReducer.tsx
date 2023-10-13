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
 * Represents a favorite item, which is a product with a quantity.
 * @interface
 */
interface FavItem extends Product {
  quantity: number;
}

/**
 * Represents the state of the favorites in the Redux store.
 * @interface
 */
interface FavouriteState {
  favourite: FavItem[];
}

/**
 * Initial state for the favorite slice of the Redux store.
 * @type {FavouriteState}
 */
const initialState: FavouriteState = {
  favourite: [],
};

/**
 * Function to save the favorite data to AsyncStorage.
 * @param {FavItem[]} favourite - The favorite data to be saved.
 */
const saveFavToAsyncStorage = async (favourite: FavItem[]) => {
  try {
    await AsyncStorage.setItem("favourite", JSON.stringify(favourite));
  } catch (error) {
    console.error("AsyncStorage Error:", error);
  }
};

/**
 * Redux slice for managing the favorite state.
 */
const favouriteSlice = createSlice({
  name: "favourite",
  initialState,
  reducers: {
    /**
     * Redux action to add a product to the favorites.
     * @param {FavouriteState} state - The current favorite state.
     * @param {PayloadAction<Product>} action - The action object containing the product to be added.
     */
    addToFav: (state, action: PayloadAction<Product>) => {
      state.favourite.push({ ...action.payload, quantity: 1 });
      saveFavToAsyncStorage(state.favourite);
    },
    /**
     * Redux action to remove a product from the favorites.
     * @param {FavouriteState} state - The current favorite state.
     * @param {PayloadAction<Product>} action - The action object containing the product to be removed.
     */
    removeFromFav: (state, action: PayloadAction<Product>) => {
      const removeFromFav = state.favourite.filter(
        (item) => item.id !== action.payload.id
      );
      state.favourite = removeFromFav;
      saveFavToAsyncStorage(state.favourite);
    },
    /**
     * Redux action to set the entire favorites to a new set of items.
     * @param {FavouriteState} state - The current favorite state.
     * @param {PayloadAction<FavItem[]>} action - The action object containing the new favorite items.
     */
    setFav: (state, action: PayloadAction<FavItem[]>) => {
      state.favourite = action.payload;
      saveFavToAsyncStorage(action.payload);
    },
    /**
     * Redux action to reset the favorites to an empty state.
     * @param {FavouriteState} state - The current favorite state.
     */
    resetFav: (state) => {
      state.favourite = [];
      saveFavToAsyncStorage(state.favourite);
    },
  },
});

export const { addToFav, removeFromFav, setFav, resetFav } =
  favouriteSlice.actions;

export default favouriteSlice.reducer;
