import React, { useState, useEffect } from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import fetchProducts from "../service/fakeStoreAPI";
import Header from "../components/Header";
import { fontSize as f, colours as c } from '../constants/constants';

export default function Category({ navigation }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // capitalise first letter of strings
  function capFirstLetter(string) {
    return string
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  //get data grom api
  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      //make new array with capitalised letters
      const uniqueCategories = [
        ...new Set(data.map((item) => capFirstLetter(item.category))),
      ];
      setCategories(uniqueCategories);
      setIsLoading(false);
    });
  }, []);
  // push category and products to next page
  const handlePress = (category) => {
    navigation.navigate("ProductList", { category, products });
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} barStyle="auto" />
      {/* Header */}
      <Header title="Categories" />
      {/* Product Categories */}
      <View style={styles.catList}>
        {isLoading ? (
          <ActivityIndicator
            size="large"
            color={c.aiCol}
            style={styles.activityIndicator}
          />
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
    </View>
  );
}

const styles = StyleSheet.create({
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
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
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
