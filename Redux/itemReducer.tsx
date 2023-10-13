import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Initial state for the items slice of the Redux store.
 * @type {{ items: any[] }}
 */
const initialState = {
  items: [],
};

/**
 * Redux slice for managing items state.
 */
const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    /**
     * Redux action to set items in the state and save them to AsyncStorage.
     * @param {Object} state - The current items state.
     * @param {Object} action - The action object containing the new items.
     */
    setItems: (state, action) => {
      state.items = action.payload;

      // Save items to AsyncStorage as a JSON string.
      AsyncStorage.setItem("items", JSON.stringify(action.payload));
    },
    /**
     * Redux action to load items from AsyncStorage and update the state.
     * @param {Object} state - The current items state.
     * @param {Object} action - The action object.
     */
    loadItemsFromStorage: (state, action) => {
      const storedItems = AsyncStorage.getItem("items");
      if (storedItems) {
        state.items = JSON.parse(storedItems);
      }
    },
  },
});

export const { setItems, loadItemsFromStorage } = itemSlice.actions;

export default itemSlice.reducer;
