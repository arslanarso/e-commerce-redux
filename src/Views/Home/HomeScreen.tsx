import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import Modal from "react-native-modal";
import styles from "./styles";

/**
 * The HomeScreen component for displaying a map with the user's current location.
 */
const HomeScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [initialRegion, setInitialRegion] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  /**
   * Get the user's current location and set it as the initial region.
   */
  useEffect(() => {
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      setInitialRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });
    };

    getLocation();
  }, []);

  /**
   * Toggle the visibility of the location modal.
   */
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={toggleModal}>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Konumumu Göster
        </Text>
      </TouchableOpacity>

      <Modal
        onBackdropPress={toggleModal}
        isVisible={isModalVisible}
        swipeDirection="down"
        onSwipeComplete={toggleModal}
        style={styles.modal}
      >
        <View style={styles.modalContainer}>
          {initialRegion && (
            <View style={styles.center}>
              <View style={styles.dot}></View>
              <MapView style={styles.map} initialRegion={initialRegion}>
                {currentLocation && (
                  <Marker
                    coordinate={{
                      latitude: currentLocation.latitude,
                      longitude: currentLocation.longitude,
                    }}
                    title="Your Location"
                  />
                )}
              </MapView>
            </View>
          )}
        </View>
      </Modal>
    </View>
  );
};

export default HomeScreen;
