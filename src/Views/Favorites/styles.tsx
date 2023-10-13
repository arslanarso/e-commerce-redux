import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  Header: { borderBottomWidth: 1, borderColor: "grey" },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 5,
    borderRadius: 20,
    backgroundColor: "white",
  },
  productImageStyle: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  button: {
    flexDirection: "row",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "blue",
    borderRadius: 5,
    width: 120,
  },
});

export default styles;
