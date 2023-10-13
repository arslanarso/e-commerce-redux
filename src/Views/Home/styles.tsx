import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 20,
  },
  modalContainer: {
    height: 400,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 4,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  map: {
    width: "100%",
    height: 300,
  },
  dot: {
    margin: 10,
    borderRadius: 20,
    width: 70,
    height: 5,
    backgroundColor: "grey",
  },
});

export default styles;
