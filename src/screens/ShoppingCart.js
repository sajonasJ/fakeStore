import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCart,
  selectCount,
  increment,
  decrement,
} from "../reducers/counterSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Header from "../components/Header";
import { fontSize as f, colours as c } from "../constants/constants";

export default function ShoppingCart({ navigation }) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const itemCount = useSelector(selectCount);
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.count,
    0
  );
 // State to hold unique items with their count
  const [uniqueCart, setUniqueCart] = useState([]);

  useEffect(() => {
     // Update unique items with count whenever cart changes
    const updatedUniqueCart = cart.reduce((acc, current) => {
      const existingItemIndex = acc.findIndex((item) => item.id === current.id);
      if (existingItemIndex !== -1) {
        acc[existingItemIndex].count = current.count;
      } else {
        acc.push({ ...current });
      }
      return acc;
    }, []);

    setUniqueCart(updatedUniqueCart);
  }, [cart]);

  const handleAdd = (product) => {
    dispatch(increment(product));
  };

  const handleRemove = (product) => {
    dispatch(decrement(product));
  };

  return (
    <View style={styles.container}>
      <Header title="Shopping Cart" />
      <View style={styles.catList}>
        <FlatList
          data={uniqueCart.filter((item) => item.count > 0)}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.catListBox}
              onPress={() => {
                navigation.navigate("ProductDetail", { item });
              }}
            >
              <View style={styles.itemBox}>
                <View style={styles.imageContainer}>
                  <Image source={{ uri: item.image }} style={styles.imageBx} />
                </View>
                <View style={styles.catListTextBx}>
                  <Text style={styles.catListText}>{item.title}</Text>

                  <View style={styles.opt}>
                    <View style={styles.textsBx}>
                      <Text
                        style={styles.catListPrice}
                      >{`Price: $${item.price}`}</Text>
                      <Text>Count: {item.count}</Text>
                    </View>
                    <View style={styles.btnIcons}>
                      <Ionicons
                        name="add-circle"
                        size={35}
                        color="green"
                        onPress={() => handleAdd(item)}
                      />
                      <Ionicons
                        name="remove-circle"
                        size={36}
                        color="maroon"
                        onPress={() => handleRemove(item)}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.totals}>
        <View style={styles.totalItems}>
          <View style={styles.totalTitle}>
            <Text style={styles.totalsTitleTxt}>Total Items:</Text>
          </View>
          <View style={styles.totalRes}>
            <Text style={styles.totalsTxt}>{itemCount}</Text>
          </View>
        </View>
        <View style={styles.totalPrice}>
          <View style={styles.totalTitle}>
            <Text style={styles.totalsTitleTxt}>Total Price: </Text>
          </View>
          <View style={styles.totalRes}>
            <Text style={styles.totalsTxt}>${totalPrice.toFixed(2)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnIcons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 15,
    paddingRight: 15,
  },
  opt: {
    flexDirection: "row",
  },
  textsBx: {
    flex: 1,
  },
  //page
  totalRes: {
    alignSelf: "center",
  },

  totalsTitleTxt: {
    fontSize: 23,
    fontWeight: "bold",
  },
  totalsTxt: {
    fontSize: 18,
    fontWeight: "bold",
  },
  totalItems: {
    padding: 5,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: "lightgray",
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 5,
  },
  totalPrice: {
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: "lightgray",
    padding: 5,
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    gap: 5,
  },
  totals: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    flex: 1,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: c.bkgcol,
    width: "100%",
    marginTop: 55,
  },
  //category list
  catList: {
    backgroundColor: c.bkgcol,
    justifyContent: "flex-start",
    width: "100%",
    height: "80%",
  },
  catListBox: {
    width: "100%",
    backgroundColor: c.bkgcol,
    padding: 5,
    marginVertical: 8,
    shadowColor: "rgba(60, 64, 67, 1)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 3,
  },
  catListText: {
    fontSize: f.medL,
    flex: 1,
  },
  catListTextBx: {
    justifyContent: "space-between",
    flex: 1,
  },
  catListPrice: {
    fontWeight: "bold",
    fontSize: f.med,
  },
  // item
  itemBox: {
    flexDirection: "row",
    gap: 10,
  },
  imageBx: {
    // borderColor: c.bxCol,
    aspectRatio: 1,
    // borderWidth: 1,
  },
  imageContainer: {
    // borderWidth: 1,
    aspectRatio: 1,
    width: "25%",
  },
  // bottom
  bottom: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  imageLoader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
