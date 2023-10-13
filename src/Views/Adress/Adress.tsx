import React, { useState, useEffect, useRef } from "react";
import {
  View,
  TextInput,
  Button,
  Text,
  Image,
  Pressable,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import axios from "axios";
import * as Location from "expo-location";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import styles from "./styles";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import API_KEY from "../../Constants/GoogleApiKey";

/**
 * Component for displaying a map with location markers and distance calculation.
 */
export default function Adress() {
  const navigation = useNavigation();
  const [address, setAddress] = useState("");
  const [userLocation, setUserLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [destinationLocation, setDestinationLocation] = useState({
    latitude: 0,
    longitude: 0,
  });
  const [distance, setDistance] = useState(null);

  const mapRef = useRef(null);

  useEffect(() => {
    getLocation();
  }, []);

  /**
   * Get the current user's location and set it in the state.
   */
  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        const { latitude, longitude } = location.coords;
        setUserLocation({ latitude, longitude });

        fitMapToLocations(
          { latitude, longitude },
          { latitude: 0, longitude: 0 }
        );
      } else {
        console.error("Konum izni verilmedi.");
      }
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  /**
   * Handle changes in the address input field.
   * @param {string} text - The text entered in the address input field.
   */
  const handleAddressChange = (text) => {
    setAddress(text);
  };

  /**
   * Convert the address to coordinates and calculate the distance.
   */
  const handleGeocodeAddress = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`
      );

      if (response.data.results.length > 0) {
        const result = response.data.results[0];
        const { lat, lng } = result.geometry.location;
        setDestinationLocation({ latitude: lat, longitude: lng });

        const dist = haversine(userLocation, { latitude: lat, longitude: lng });
        setDistance(dist.toFixed(2));

        if (mapRef.current && dist > 0) {
          fitMapToLocations(userLocation, { latitude: lat, longitude: lng });
        }
      }
    } catch (error) {
      console.error("Hata:", error);
    }
  };

  /**
   * Calculate the distance between two sets of coordinates using the Haversine formula.
   * @param {Object} location1 - The first set of coordinates.
   * @param {Object} location2 - The second set of coordinates.
   * @returns {number} The distance between the two coordinates in kilometers.
   */
  const haversine = (location1, location2) => {
    const radius = 6371;
    const dLat = deg2rad(location2.latitude - location1.latitude);
    const dLon = deg2rad(location2.longitude - location1.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(location1.latitude)) *
        Math.cos(deg2rad(location2.latitude)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = radius * c;
    return distance;
  };

  /**
   * Convert degrees to radians.
   * @param {number} deg - The degree value to convert to radians.
   * @returns {number} The radians equivalent of the given degree.
   */
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  /**
   * Navigate back to the previous screen.
   */
  const canGoBack = () => {
    navigation.goBack();
  };

  /**
   * Fit the map to the specified locations.
   * @param {Object} location1 - The first location to include in the map view.
   * @param {Object} location2 - The second location to include in the map view.
   */
  const fitMapToLocations = (location1, location2) => {
    const coordinates = [location1, location2];
    mapRef.current.fitToCoordinates(coordinates, {
      edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
      animated: true,
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <Pressable
        onPress={canGoBack}
        style={{
          position: "absolute",
          zIndex: 1,
          top: 25,
          padding: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AntDesign name="leftcircle" size={30} color={"blue"} />
      </Pressable>
      <MapView
        style={{ flex: 1 }}
        ref={mapRef}
        initialRegion={{
          latitude: userLocation ? userLocation.latitude : 0,
          longitude: userLocation ? userLocation.longitude : 0,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      >
        {userLocation && (
          <Marker coordinate={userLocation} title="Benim Konumum">
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../../assets/icons/homeMarker.png")}
            />
          </Marker>
        )}
        {destinationLocation.latitude !== 0 && (
          <Marker coordinate={destinationLocation} title="Hedef Konum">
            <Image
              style={{ width: 30, height: 30 }}
              source={require("../../assets/icons/destination.png")}
            />
          </Marker>
        )}
        {destinationLocation.latitude !== 0 && (
          <Polyline
            coordinates={[userLocation, destinationLocation]}
            strokeWidth={2}
            strokeColor="green"
          />
        )}
      </MapView>
      <KeyboardAwareScrollView>
        <TextInput
          style={styles.textInputStyle}
          placeholder="Adresi girin"
          value={address}
          onChangeText={handleAddressChange}
          onSubmitEditing={() => {
            Keyboard.dismiss();
          }}
        />
        <Button title="Adresi Dönüştür" onPress={handleGeocodeAddress} />
        {distance && <Text style={{ flex: 1 / 3 }}>Mesafe: {distance} km</Text>}
      </KeyboardAwareScrollView>
    </View>
  );
}
