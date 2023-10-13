/**
 * ProductsListScreen displays a list of products, allows sorting by price, and handles data loading and storage.
 * @module Screens/ProductsListScreen
 */

import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  View,
  Pressable,
  Text,
} from "react-native";
import Products from "../../components/Home/Products";
import { setItems } from "../../../Redux/itemReducer";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../components/Loading/Loading";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";

/**
 * Represents a single product item.
 */
interface Item {
  id: number;
  price: number;
  name: string;
  imageUrl: string;
  description: string;
  shippingMethod: string;
}

/**
 * ProductsListScreen component responsible for displaying a list of products and managing sorting and data loading.
 * @component
 */
const ProductsListScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [ascending, setAscending] = useState<boolean>(true);
  const items = useSelector((state: any) => state.items.items);

  /**
   * Sorts the items based on the selected sorting order.
   * @param {Item[]} items - The list of items to be sorted.
   * @param {boolean} ascending - True for ascending order, false for descending.
   * @returns {Item[]} - The sorted list of items.
   */
  const sortItems = (items: Item[], ascending: boolean): Item[] => {
    if (ascending) {
      return items.slice().sort((a, b) => a.price - b.price);
    } else {
      return items.slice().sort((a, b) => b.price - a.price);
    }
  };

  useEffect(() => {
    /**
     * Loads items from AsyncStorage if available.
     */
    const loadItems = async () => {
      try {
        const storedItems = await AsyncStorage.getItem("items");
        if (storedItems) {
          const parsedItems: Item[] = JSON.parse(storedItems);
          dispatch(setItems(parsedItems));
        }
      } catch (error) {
        console.error("AsyncStorage Error:", error);
      }
    };

    if (items.length > 0) {
      setIsLoading(false);
      return;
    }

    /**
     * Fetches items from the server and stores them in Redux and AsyncStorage.
     */
    const fetchData = async () => {
      try {
        const response = await axios.get<Item[]>(
          "https://honey-badgers-ecommerce.glitch.me/products"
        );
        const data = response.data;
        dispatch(setItems(data));
        setIsLoading(false);

        await AsyncStorage.setItem("items", JSON.stringify(data));
      } catch (error) {
        console.error("Fetch Error:", error);
        setIsLoading(false);
      }
    };

    loadItems();
    fetchData();
  }, [dispatch, items]);

  const sortedItems = sortItems(items, ascending);

  return (
    <SafeAreaView style={styles.page}>
      <View>
        {isLoading ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
              height: Dimensions.get("screen").height,
            }}
          >
            <Loading />
          </View>
        ) : (
          <View style={{ height: "100%" }}>
            <Pressable
              onPress={() => {
                setSortBy("price");
                setAscending(ascending ? false : true);
              }}
              style={{
                height: "7%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontWeight: "bold" }}>
                {ascending ? "Fiyata Göre Artan" : "Fiyata Göre Azalan"}
              </Text>
            </Pressable>
            <View style={{ height: "93%" }}>
              <FlatList
                data={sortedItems}
                renderItem={({ item }) => <Products item={item} />}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.id.toString()}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ProductsListScreen;
