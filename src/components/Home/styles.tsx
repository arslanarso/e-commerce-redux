import { StyleSheet, Dimensions } from "react-native";
const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "white",
    marginVertical: 6,
    paddingRight: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    width: windowWidth,
    elevation: 5,
    justifyContent: "space-between",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    borderRadius: 8,
    marginTop: 5,
  },
  removeButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    borderRadius: 8,
    marginTop: 5,
  },

  image: {
    height: 130,
    width: windowWidth / 2,
    resizeMode: "cover",
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },

  title: { marginVertical: 5, fontSize: 17, fontWeight: "bold" },

  price: {
    fontSize: 15,
    marginTop: 5,
    color: "green",
    fontWeight: "600",
  },
  imageContainer: {
    alignItems: "center",
    height: 130,
    width: windowWidth / 2,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
  },
  modalContainer: {
    height: 450,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 4,

    alignItems: "center",
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: "bold",
    marginVertical: 10,
  },
  modalPrice: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
    color: "green",
  },
  modalImage: {
    width: 375,
    height: 200,
    resizeMode: "cover",
  },
  modalDescription: {
    fontSize: 15,
    margin: 10,
  },
  modalShipping: {
    fontSize: 15,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  dot: {
    margin: 10,
    borderRadius: 20,
    width: 70,
    height: 5,
    backgroundColor: "grey",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  productInfoContainer: {
    justifyContent: "center",
    margin: 5,
    width: windowWidth / 4,
  },
  icon: {
    height: 35,
    width: 35,
  },
});

export default styles;
