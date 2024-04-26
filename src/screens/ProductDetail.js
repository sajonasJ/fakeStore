import React from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Alert } from "react-native";

export default function ProductDetail({ route, navigation }) {
  const { title, rating, price, description, image } = route.params;
  handlePress = () => {
    console.log("Pressed");
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden={false} barStyle="auto" />
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerBox}>
          <Text style={styles.headerTxt}>Product Details</Text>
        </View>
      </View>
      {/* Product Details */}
      <View style={styles.prodList}>
      <Image source={{ uri: image }} style={styles.prodImg} />
        <View style={styles.prodBxName}>
          <Text style={styles.prodName}>{title}</Text>
        </View>
        <View style={styles.prodStatsBx}>
          <Text style={styles.prodStatsName}>{`Rating: ${rating.rate}`}</Text>
          <Text style={styles.prodStatsName}>{`Sold: ${rating.count}`}</Text>
          <Text style={styles.prodStatsName}>{`Price: $${price}`}</Text>
        </View>
        <View style={styles.detailBtnBx}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.detailBtn}
          >
            <Ionicons name="backspace" size={30} color="#000" />
            <Text style={styles.btnTxt}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.detailBtn}
          >
            <Ionicons name="cart" size={30} color="#000" />
            <Text style={styles.btnTxt}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.descBx}>
          <View style={styles.descNameBx}>
            <Text style={styles.descNameTxt}>Description:</Text>
          </View>
          <View style={styles.descDetBx}>
            <Text style={styles.descDetTxt}>{description}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //page
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    width: "100%",
    borderWidth: 1,
    marginTop: 70,
  },
  //header
  header: {
    borderWidth: 1,
    width: "100%",
    alignItems: "center",
  },
  headerBox: {
    borderWidth: 1,
    width: "90%",
    alignItems: "center",
    backgroundColor: "maroon",
    padding: 17,
  },
  headerTxt: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  //category list
  prodList: {
    borderWidth: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    width: "90%",
    height: "85%",
    marginTop: "2%",
  },
  catListBox: {
    borderWidth: 1,
    width: "100%",
    backgroundColor: "lightgreen",
    padding: 15,
    marginVertical: 8,
  },
  btnTxt: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  //product
  prodImg: {
    width: "100%",
    aspectRatio: 1,
    borderWidth: 1,
    borderRadius: 25,
  },
  prodBxName: {
    borderWidth: 1,
    padding: 5,
  },
  prodName: {
    borderWidth: 1,
    fontWeight: "bold",
    fontSize: 20,
  },
  prodStatsBx: {
    borderWidth: 1,
    flexDirection: "row",
    padding: 3,
    gap: 5,
    alignItems: "center",
    justifyContent: "space-around",
  },
  prodStatsName: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
  },
  detailBtnBx: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  detailBtn: {
    borderWidth: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "40%",
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  //Description
  descBx: {
    borderWidth: 1,
    flex: 1,
  },
  descNameBx: {
    borderWidth: 1,
    padding: 5,
  },
  descDetBx: {
    borderWidth: 1,
    flex: 1,
    padding: 5,
  },
  descNameTxt: {
    borderWidth: 1,
    fontWeight: "bold",
    fontSize: 16,
  },
  descDetTxt: {
    borderWidth: 1,
    fontSize: 14,
    flex: 1,
  },
});
