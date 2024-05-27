import React, { useState, useEffect } from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { Rating } from "react-native-ratings";
import CsBtn from "../components/CsBtn";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { increment, selectCart,updateCart } from "../reducers/counterSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fontSize as f, colours as c } from "../constants/constants";
import CustomAlert from "../components/CustomAlert";
import { selectAuth } from "../reducers/authSlice";

export default function ProductDetail({ route, navigation }) {
  const dispatch = useDispatch();
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const routeItem = route.params?.item;
  const [item, setItem] = useState(routeItem || {});
  const { id, title, rating, price, description, image } = item;
  const { user } = useSelector(selectAuth);
  const cart = useSelector(selectCart);
  const [isLoading, setIsLoading] = useState(true);
  const [isCacheWorking, setIsCacheWorking] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (routeItem) {
        setItem(routeItem);
        await AsyncStorage.setItem(`product_${routeItem.id}`, JSON.stringify(routeItem));
      } else if (id) {
        const cachedData = await AsyncStorage.getItem(`product_${id}`);
        if (cachedData) {
          setItem(JSON.parse(cachedData));
        } else {
          setItem({});
        }
      }
    };
    fetchData();
  }, [routeItem, id]);


//! Temporary function to check for caching
  // useEffect(() => {
  //   const checkCache = async () => {
  //     try {
  //       const cachedData = await AsyncStorage.getItem(`product_${id}`);
  //       if (cachedData) {
  //         console.log("Cache is working. Retrieved data:", JSON.parse(cachedData));
  //         setIsCacheWorking(true);
  //       } else {
  //         console.log("Cache is not working. No data found in cache.");
  //         setIsCacheWorking(false);
  //       }
  //     } catch (error) {
  //       console.error("Failed to check cache:", error);
  //     }
  //   };
  //   checkCache();
  // }, [id]);

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleCart = () => {
    const product = { id, title, rating, price, description, image };
    dispatch(increment(product));

    // Update backend cart
    const updatedCart = [
      ...cart.filter(item => item.id !== product.id),
      { ...product, count: (cart.find(item => item.id === product.id)?.count || 0) + 1 }
    ];

    dispatch(updateCart({ token: user.token, items: updatedCart }));

    setAlertMessage("Added to Cart!");
    setAlertVisible(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} barStyle="auto" />
      <Header title="Product Details" />

      <View style={styles.prodList}>
        {isLoading && (
          <View style={styles.aiBox}>
            <ActivityIndicator size="large" color={c.aiCol} />
          </View>
        )}
        <Image
          source={{ uri: image }}
          style={styles.prodImg}
          onLoadEnd={handleImageLoad}
        />
        {!isLoading && (
          <>
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
              <CsBtn
                onPress={() => navigation.goBack()}
                iconName="backspace"
                color="#4cc9f0"
                justifyContent="space-evenly"
                title="Back"
              />
              <CsBtn
                onPress={handleCart}
                iconName="cart"
                justifyContent="space-evenly"
                color={c.cartBtn}
                title="Add to Cart"
              />
            </View>
            <View style={styles.descBx}>
              <View style={styles.descNameBx}>
                <Text style={styles.descNameTxt}>Description:</Text>
              </View>
              <View style={styles.descDetBx}>
                <ScrollView>
                  <Text style={styles.descDetTxt}>{description}</Text>
                </ScrollView>
              </View>
            </View>
          </>
        )}
      </View>
      <CustomAlert
        visible={alertVisible}
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
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
    // borderWidth: 1,
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
  aiBox: {
    ...StyleSheet.absoluteFill,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  //product
  prodImg: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 25,
  },
  prodBxName: {
    padding: 5,
  },
  prodName: {
    fontWeight: "bold",
    fontSize: 20,
  },
  prodStars: {
    paddingRight: 5,
  },
  prodStatsBx: {
    flexDirection: "row",
    padding: 3,
    gap: 5,
    alignItems: "center",
    justifyContent: "space-around",
  },
  prodStatsName: {
    flexDirection: "row",
    borderRadius: 5,
    padding: 10,
  },
  detailBtnBx: {
    flexDirection: "row",
    justifyContent: "space-around",
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
