import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loadProductData, selectProduct } from "../reducers/productSlice";
import Header from "../components/Header";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { fontSize as f, colours as c } from "../constants/constants";

export default function Category({ navigation }) {
  const dispatch = useDispatch();
  const { productData, loading, error } = useSelector(selectProduct);
  const [categories, setCategories] = useState([]);

  // capitalise first letter of strings
  function capFirstLetter(string) {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  useEffect(() => {
    dispatch(loadProductData());
  }, [dispatch]);

  useEffect(() => {
    if (productData) {
      const cat = productData.map((item) => item.category);
      const uniqueCategories = [
        ...new Set(productData.map((item) => capFirstLetter(item.category))),
      ];
      setCategories(uniqueCategories);
    }
  }, [productData]);

  const handlePress = (category) => {
    const productsInCategory = productData.filter(
      (product) => product.category.toLowerCase() === category.toLowerCase()
    );
    navigation.navigate("ProductList", {
      category,
      products: productsInCategory,
    });
  };

    // TEMPORARY useEffect to check persisted state
    // useEffect(() => {
    //   console.log("Checking persisted state...");
    //   // Assuming you have configured redux-persist correctly
    //   AsyncStorage.getItem('persist:root')
    //     .then((state) => {
    //       if (state) {
    //         const persistedState = JSON.parse(state);
    //         console.log("Persisted state:", persistedState);
    //       } else {
    //         console.log("No persisted state found.");
    //       }
    //     })
    //     .catch((error) => {
    //       console.error("Error fetching persisted state:", error);
    //     });
    // }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} barStyle="auto" />
      <Header title="Product Categories" />
      <View style={styles.catList}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color={c.aiCol}
            style={styles.activityIndicator}
          />
        ) : error ? (
          <Text>Error: {error}</Text>
        ) : (
          <FlatList
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handlePress(item)}
                style={styles.catListBox}
              >
                <Text style={styles.catListText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
      <View style={styles.footer}>
        <Text>jonas.sajonas@griffithuni.edu.au</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: { borderWidth: 1,
    width:'100%',
    justifyContent:'center',
    alignItems:'center',
    padding:10,
    borderColor:'lightgray'
   },
  //page
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: c.bkgcol,
    width: "100%",
    marginTop: 55,
  },
  activityIndicator: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  //header
  header: {
    width: "100%",
    alignItems: "center",
  },
  headerBox: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "black",
    padding: 17,
  },
  headerTxt: {
    fontSize: f.xxl,
    fontWeight: "bold",
    color: "white",
  },
  //category list
  catList: {
    backgroundColor: c.bkgcol,
    justifyContent: "flex-start",
    width: "100%",
    height: "85%",
  },
  catListBox: {
    width: "100%",
    backgroundColor: c.bkgcol,
    padding: 35,
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
    fontWeight: "bold",
    fontSize: f.medL,
    textAlign: "center",
  },
});
