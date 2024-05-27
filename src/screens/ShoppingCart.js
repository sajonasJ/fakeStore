import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCart,
  selectCount,
  increment,
  decrement,
  resetCart,
} from "../reducers/counterSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Header from "../components/Header";
import { fontSize as f, colours as c } from "../constants/constants";
import CsBtn from "../components/CsBtn";
import {
  createNewOrder,
  selectAuth,
  fetchAllOrders,
} from "../reducers/authSlice";
import CustomAlert from "../components/CustomAlert";

export default function ShoppingCart({ navigation }) {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const itemCount = useSelector(selectCount);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [uniqueCart, setUniqueCart] = useState([]);
  const { user } = useSelector(selectAuth);
  const windowHeight = Dimensions.get("window").height;
  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.count,
    0
  );

  useEffect(() => {
    const updatedUniqueCart = cart.reduce((acc, current) => {
      if (current.count > 0) {
        const existingItemIndex = acc.findIndex(
          (item) => item.id === current.id
        );
        if (existingItemIndex !== -1) {
          acc[existingItemIndex].count = current.count;
        } else {
          acc.push({ ...current });
        }
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

  const handleCart = () => {
    if (uniqueCart.length > 0 && user) {
      const orderData = {
        token: user.token, // Assuming the token is stored in the user object
        items: uniqueCart.map((item) => ({
          prodID: item.id,
          price: item.price,
          quantity: item.count,
        })),
      };

      dispatch(createNewOrder(orderData))
        .unwrap()
        .then((response) => {
          console.log("Order response:", response);
          if (response.status === "OK") {
            dispatch(fetchAllOrders(user.token));
            dispatch(resetCart());
            setAlertMessage("Added a New Order!");
            setAlertVisible(true);
          } else {
            alert(response.message);
          }
        })
        .catch((error) => {
          // Handle error
          console.error("Order creation error:", error);
          alert(error.message);
        });
    } else {
      alert("Your cart is empty or you are not logged in.");
    }
  };

  return (
    <View style={styles.container}>
      <Header title="Shopping Cart" />
      {uniqueCart.length === 0 ? (
        <Text style={styles.emptyCartText}>Shopping Cart is empty</Text>
      ) : (
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
                    <Image
                      source={{ uri: item.image }}
                      style={styles.imageBx}
                    />
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
      )}

      {uniqueCart.length > 0 && (
        <>
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
          <View style={styles.bottom}>
            <CsBtn onPress={handleCart} color={c.backBtn} title="Check Out" />
          </View>
        </>
      )}
            <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
    </View>
    
  );
}

const styles = StyleSheet.create({
  bottom: {
    width: "100%",
    backgroundColor: "#fff",
    shadowColor: "#000",
    borderWidth: 1,
    marginBottom: 40,
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  emptyCartText: {
    fontSize: f.large,
    textAlign: "center",
    marginTop: 80,
  },
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
    height: "76%",
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
