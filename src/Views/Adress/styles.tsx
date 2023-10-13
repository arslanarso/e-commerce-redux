import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  textInputStyle: {
    height: 100,
    backgroundColor: "white",
    margin: 5,
    padding: 10,
    borderRadius: 10,
  },
});

export default styles;
