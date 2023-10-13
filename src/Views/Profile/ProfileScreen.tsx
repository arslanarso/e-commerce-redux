/**
 * ProfileScreen displays user profile information and provides options for actions like logout and address display.
 * @module Screens/ProfileScreen
 */

import { Button, SafeAreaView } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Redux/authReducer";
import { resetCart } from "../../../Redux/CartReducer";
import { resetFav } from "../../../Redux/FavouriteReducer";
import { useNavigation } from "@react-navigation/native";

/**
 * Represents the user profile screen.
 * @component
 */
const ProfileScreen: React.FC = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.auth.user);

  /**
   * Handles the user logout action by dispatching the logout action and resetting the cart and favorites.
   */
  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetCart());
    dispatch(resetFav());
  };

  /**
   * Navigates to the address screen.
   */
  const goAddress = () => {
    navigation.navigate("Adres");
  };

  return (
    <SafeAreaView
      style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
    >
      <Button title="Adres Göster" onPress={goAddress} />
      <Button title="Çıkış Yap" onPress={handleLogout} />
    </SafeAreaView>
  );
};

export default ProfileScreen;
