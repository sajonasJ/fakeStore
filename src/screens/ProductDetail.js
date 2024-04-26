import React from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Toast from "react-native-toast-message";
import { Rating } from "react-native-ratings";

export default function ProductDetail({ route, navigation }) {
  const windowHeight = Dimensions.get("window").height;
  const { title, rating, price, description, image } = route.params;
  const handleCart = () => {
    Toast.show({
      type: "success",
      position: "bottom",
      text1: "Added to Cart!",
      text1Style: {
        textAlign: "center",
        fontSize: 20,
      },
      swipeable: true,
      bottomOffset: windowHeight / 3,
      visibilityTime: 1000,
    });
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
          <View style={styles.prodStatsName}>
            <Text style={styles.prodStars}>Rating: {rating.rate}</Text>
            <Rating
              type="star"
              ratingCount={5}
              imageSize={15}
              startingValue={rating.rate}
            />
          </View>
          <View style={styles.prodStatsName}>
            <Text>{`Sold: ${rating.count}`}</Text>
          </View>
          <View style={styles.prodStatsName}>
            <Text>{`Price: $${price}`}</Text>
          </View>
        </View>
        <View style={styles.detailBtnBx}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.detailBtn}
          >
            <Ionicons name="backspace" size={30} color="#000" />
            <Text style={styles.btnTxt}>Back</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleCart} style={styles.detailBtn}>
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
    marginTop: 55,
  },
  //header
  header: {
    borderWidth: 1,
    width: "100%",
    alignItems: "center",
  },
  headerBox: {
    borderWidth: 1,
    width: "100%",
    alignItems: "center",
    backgroundColor: "black",
    padding: 17,
  },
  headerTxt: {
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  //category list
  prodList: {
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
    borderWidth:3,
    borderColor:'lightgray',
    borderRadius: 25,
  },
  prodBxName: {
    // borderWidth: 1,
    padding: 5,
  },
  prodName: {
    // borderWidth: 1,
    fontWeight: "bold",
    fontSize: 20,
  },
  prodStars:{
    paddingRight:5,
  },
  prodStatsBx: {
    // borderWidth: 1,
    flexDirection: "row",
    padding: 3,
    gap: 5,
    alignItems: "center",
    justifyContent: "space-around",
  },
  prodStatsName: {
    flexDirection:'row',
    borderRadius: 5,
    padding: 10,
  },
  detailBtnBx: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  detailBtn: {
    flexDirection: "row",
    backgroundColor:'lightgreen',
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "40%",
    borderRadius: 10,
    padding: 5,
    margin: 5,
    shadowColor: "rgba(60, 64, 67, 1)",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.4,
  shadowRadius: 1,
  elevation: 3,
  
  },
  //Description
  descBx: {
    flex: 1,
  },
  descNameBx: {
    padding: 5,
  },
  descDetBx: {
    borderWidth: 1,
    flex: 1,
    padding: 5,
  },
  descNameTxt: {
    fontWeight: "bold",
    fontSize: 16,
  },
  descDetTxt: {
    fontSize: 14,
    flex: 1,
  },
});
