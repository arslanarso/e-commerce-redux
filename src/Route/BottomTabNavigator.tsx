import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect } from "react";
import { Image, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import TotalQuantity from "../helper/TotalQuantity";
import CartStack from "./CartStack";
import FavoriteStack from "./FavoriteStack";
import HomeStack from "./HomeStack";
import ProductsListStack from "./ProductsListStack";
import { setCart } from "../../Redux/CartReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setFav } from "../../Redux/FavouriteReducer";
import ProfileStack from "./ProfileStack";

const { Screen, Navigator } = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const cart = useSelector((state: any) => state.cart.cart);
  const favourite = useSelector((state: any) => state.favourite.favourite);

  const dispatch = useDispatch();
  /**
   * Loads cart and favorite data from AsyncStorage.
   */
  const loadDataFromAsyncStorage = async () => {
    try {
      const cartData = await AsyncStorage.getItem("cart");
      const favData = await AsyncStorage.getItem("favourite");
      if (cartData !== null && favData !== null) {
        dispatch(setCart(JSON.parse(cartData)));
        dispatch(setFav(JSON.parse(favData)));
      }
    } catch (error) {
      console.error("AsyncStorage Error:", error);
    }
  };
  // Load data from AsyncStorage when the component mounts.

  useEffect(() => {
    loadDataFromAsyncStorage();
  }, []);

  return (
    <Navigator screenOptions={screenOptions}>
      <Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Image
              style={{
                tintColor: focused ? "#1323F1" : "#E5E5E5",
                height: 24,
                width: 24,
              }}
              source={require("../assets/icons/home.png")}
            />
          ),
        }}
      />
      <Screen
        name="Products List"
        component={ProductsListStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Image
              style={{
                tintColor: focused ? "#1323F1" : "#E5E5E5",
                height: 24,
                width: 24,
              }}
              source={require("../assets/icons/ic_list.png")}
            />
          ),
        }}
      />

      <Screen
        name="Cart"
        component={CartStack}
        options={{
          tabBarBadge: TotalQuantity(cart) || null,
          tabBarIcon: ({ focused, color }) => (
            <Image
              style={{
                tintColor: focused ? "#1323F1" : "#E5E5E5",
                height: 30,
                width: 30,
              }}
              source={require("../assets/icons/ic_cart_gray.png")}
            />
          ),
        }}
      />
      <Screen
        name="Favourites"
        component={FavoriteStack}
        options={{
          tabBarBadge: TotalQuantity(favourite) || null,
          tabBarIcon: ({ focused, color }) => (
            <Image
              style={{
                tintColor: focused ? "#1323F1" : "#E5E5E5",
                height: 40,
                width: 40,
              }}
              source={require("../assets/icons/emptyStar.png")}
            />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused, color }) => (
            <Image
              style={{
                tintColor: focused ? "#1323F1" : "#E5E5E5",
                height: 24,
                width: 24,
              }}
              source={require("../assets/icons/profile.png")}
            />
          ),
        }}
      />
    </Navigator>
  );
};

const styles = {
  customButton: {
    backgroundColor: "#1323F1",
    height: 65,
    width: 65,
    borderRadius: 80,
    justifyContent: "center",
    alignItems: "center",
    bottom: 30,
    borderWidth: 3,
    borderColor: "white",
  },
};

const screenOptions = {
  headerShown: false,
  tabBarShowLabel: true,
  tabBarInactiveTintColor: "#E5E5E5",
  tabBarActiveTintColor: "#1323F1",

  tabBarStyle: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: "white",
  },
};

export default BottomTabNavigator;
