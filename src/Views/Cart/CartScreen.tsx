import React, { useEffect } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  setCart,
} from "../../../Redux/CartReducer";
import TotalAmount from "../../helper/TotalAmount";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";

/**
 * Component for displaying the user's shopping cart.
 */
const CartScreen: React.FC = () => {
  const cart = useSelector((state: any) => state.cart.cart);
  const dispatch = useDispatch();

  /**
   * Load cart data from AsyncStorage when the component mounts.
   */
  const loadCartDataFromAsyncStorage = async () => {
    try {
      const cartData = await AsyncStorage.getItem("cart");
      if (cartData !== null) {
        dispatch(setCart(JSON.parse(cartData)));
      }
    } catch (error) {
      console.error("AsyncStorage Error:", error);
    }
  };

  useEffect(() => {
    loadCartDataFromAsyncStorage();
  }, []);

  /**
   * Increase the quantity of a product in the cart.
   * @param {Object} item - The product to increase the quantity of.
   */
  const increaseQuantity = (item: any) => {
    dispatch(incrementQuantity(item));
  };

  /**
   * Decrease the quantity of a product in the cart or remove it if the quantity is 1.
   * @param {Object} item - The product to decrease the quantity of or remove.
   */
  const decreaseQuantity = (item: any) => {
    if (item.quantity === 1) {
      dispatch(removeFromCart(item));
    } else {
      dispatch(decrementQuantity(item));
    }
  };

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <View style={styles.Header}>
        <View style={{ margin: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 22 }}>Toplam Tutar</Text>
          <Text style={{ fontWeight: "bold", fontSize: 22, color: "blue" }}>
            ₺{TotalAmount(cart)}
          </Text>
        </View>
      </View>
      <ScrollView style={{ height: "85%" }}>
        {cart.map((item: any, index: number) => (
          <View style={styles.cardContainer} key={index}>
            <View style={{ padding: 10, flexDirection: "row" }}>
              <Image
                style={styles.productImageStyle}
                source={{ uri: item.imageUrl }}
              />
              <View style={{ justifyContent: "center", marginHorizontal: 10 }}>
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                  {item.name}
                </Text>
                <View style={{ flexDirection: "row", marginVertical: 10 }}>
                  <Text>{item.price}</Text>
                  <Text> X {item.quantity}</Text>
                </View>
                <Text style={{ marginBottom: 10 }}>{item.shippingMethod}</Text>
                <View style={{ justifyContent: "center", marginRight: "4%" }}>
                  <Pressable style={styles.button}>
                    <Pressable
                      style={{ paddingHorizontal: 25 }}
                      onPress={() => decreaseQuantity(item)}
                    >
                      <Text style={{ fontSize: 25, color: "white" }}>-</Text>
                    </Pressable>
                    <Pressable>
                      <Text
                        style={{
                          fontSize: 20,
                          color: "white",
                          paddingHorizontal: 25,
                        }}
                      >
                        {item.quantity}
                      </Text>
                    </Pressable>
                    <Pressable
                      style={{ paddingHorizontal: 25 }}
                      onPress={() => increaseQuantity(item)}
                    >
                      <Text style={{ fontSize: 20, color: "white" }}>+</Text>
                    </Pressable>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;
