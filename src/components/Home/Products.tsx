import React, { useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../../Redux/CartReducer";
import { addToFav, removeFromFav } from "../../../Redux/FavouriteReducer";
import Modal from "react-native-modal";
import styles from "./styles";

/**
 * Represents a product.
 * @interface
 */
interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
  shippingMethod: string;
}

/**
 * Represents the props for the Product component.
 * @interface
 */
interface ProductProps {
  item: Product;
}

/**
 * A component to display product information and manage cart and favorite actions.
 * @param {ProductProps} props - The props containing the product information.
 */
const Products: React.FC<ProductProps> = ({ item }) => {
  const cart = useSelector((state: any) => state.cart.cart);
  const user = useSelector((state: any) => state.auth.user);
  const favourite = useSelector((state: any) => state.favourite.favourite);
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const [_item, setItem] = useState<Product | null>(null);

  /**
   * Toggles the visibility of the modal.
   */
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  /**
   * Adds the item to the cart.
   * @param {Product} item - The product to be added to the cart.
   */
  const addItemToCart = (item: Product) => {
    dispatch(addToCart(item));
  };

  /**
   * Removes the item from the cart.
   * @param {Product} item - The product to be removed from the cart.
   */
  const removeItemFromCart = (item: Product) => {
    dispatch(removeFromCart(item));
  };

  /**
   * Adds the item to favorites.
   * @param {Product} item - The product to be added to favorites.
   */
  const addItemToFav = (item: Product) => {
    dispatch(addToFav(item));
  };

  /**
   * Removes the item from favorites.
   * @param {Product} item - The product to be removed from favorites.
   */
  const removeItemFromFav = (item: Product) => {
    dispatch(removeFromFav(item));
  };

  const AddToCartButton: React.FC = () => {
    return (
      <>
        {cart.some((value: any) => value.id === item.id) ? (
          <Pressable
            style={styles.removeButton}
            onPress={() => {
              Alert.alert("Başarılı", "Ürün Başarıyla Sepetten Çıkartıldı", [
                { text: "Tamam", onPress: () => {} },
              ]);
              removeItemFromCart(item);
            }}
          >
            <Image
              style={styles.icon}
              source={require("../../assets/icons/removeFromCart.png")}
            />
          </Pressable>
        ) : (
          <Pressable
            style={styles.button}
            onPress={() => {
              Alert.alert("Başarılı", "Ürün Başarıyla Sepete Eklendi", [
                { text: "Tamam", onPress: () => {} },
              ]);
              addItemToCart(item);
            }}
          >
            <Image
              style={styles.icon}
              source={require("../../assets/icons/addToCart.png")}
            />
          </Pressable>
        )}
      </>
    );
  };
  const AddToFavButton: React.FC = () => {
    return (
      <>
        {favourite.some((value: any) => value.id === item.id) ? (
          <Pressable
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              Alert.alert(
                "Başarılı",
                "Ürün Başarıyla Favorilerden Çıkartıldı",
                [{ text: "Tamam", onPress: () => {} }]
              );
              removeItemFromFav(item);
            }}
          >
            <AntDesign name="heart" color={"red"} size={25} />
          </Pressable>
        ) : (
          <Pressable
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              Alert.alert("Başarılı", "Ürün Başarıyla Favorilere Eklendi", [
                { text: "Tamam", onPress: () => {} },
              ]);
              addItemToFav(item);
            }}
          >
            <AntDesign name="hearto" color={"black"} size={25} />
          </Pressable>
        )}
      </>
    );
  };

  return (
    <TouchableOpacity
      onPress={() => {
        setItem(item);
        toggleModal();
      }}
      style={styles.root}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={styles.imageContainer}>
          <Image
            style={[styles.image]}
            source={{
              uri: item.imageUrl,
            }}
          />
        </View>
        <View style={styles.productInfoContainer}>
          <Text numberOfLines={2} style={styles.title}>
            {item.name}
          </Text>
          <Text style={styles.price}>{item.price} ₺</Text>
        </View>
      </View>

      <View style={{ justifyContent: "space-evenly" }}>
        <AddToCartButton />
        <AddToFavButton />
      </View>

      <Modal
        onBackdropPress={toggleModal}
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.dot}></View>
          <View style={styles.center}>
            <Text style={styles.modalTitle}>{_item?.name}</Text>

            <Image
              style={styles.modalImage}
              source={{ uri: _item?.imageUrl }}
            />
            <Text style={styles.modalDescription}>{_item?.description}</Text>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-evenly",
                alignItems: "center",
              }}
            >
              <Text style={styles.modalShipping}>{_item?.shippingMethod}</Text>
              <Text style={styles.modalPrice}>{_item?.price} ₺</Text>
            </View>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

export default Products;
