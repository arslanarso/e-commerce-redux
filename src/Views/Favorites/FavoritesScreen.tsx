import React, { useEffect } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useDispatch, useSelector } from "react-redux";
import { removeFromFav, setFav } from "../../../Redux/FavouriteReducer";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";

/**
 * Component for displaying the user's favorite items.
 */
const FavoritesScreen: React.FC = () => {
  const favourite = useSelector((state: any) => state.favourite.favourite);
  const dispatch = useDispatch();

  /**
   * Load favorite data from AsyncStorage when the component mounts.
   */
  const loadFavouriteDataFromAsyncStorage = async () => {
    try {
      const favData = await AsyncStorage.getItem("favourite");
      if (favData !== null) {
        dispatch(setFav(JSON.parse(favData)));
      }
    } catch (error) {
      console.error("AsyncStorage Error:", error);
    }
  };

  useEffect(() => {
    loadFavouriteDataFromAsyncStorage();
  }, []);

  /**
   * Remove an item from the user's favorite list.
   * @param {Object} item - The item to be removed from favorites.
   */
  const removeItemFromFav = (item: Item) => {
    dispatch(removeFromFav(item));
  };

  return (
    <SafeAreaView>
      <View style={styles.Header}>
        <View style={{ margin: 15 }}>
          <Text style={{ fontWeight: "bold", fontSize: 22 }}>Favoriler</Text>
        </View>
      </View>
      <ScrollView>
        {favourite.map((item: any, index: number) => (
          <View style={styles.cardContainer} key={index}>
            <View
              style={{
                flexDirection: "row",
                width: 300,
              }}
            >
              <View
                style={{
                  minWidth: "30%",
                  height: 100,
                }}
              >
                <Image
                  style={styles.productImageStyle}
                  source={{ uri: item.imageUrl }}
                />
              </View>

              <View
                style={{
                  minWidth: "50%",
                  height: 100,
                }}
              >
                <View
                  style={{ justifyContent: "center", marginHorizontal: 10 }}
                >
                  <Text style={{ fontSize: 18, fontWeight: "bold" }}>
                    {item.name}
                  </Text>
                  <View style={{ marginVertical: 10 }}>
                    <Text>{item.price}₺</Text>
                  </View>
                  <Pressable
                    onPress={() => {
                      removeItemFromFav(item);
                    }}
                  >
                    <AntDesign name="heart" color={"red"} size={30} />
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

export default FavoritesScreen;
