import React, { useState, useEffect } from "react";
import {
  StatusBar,
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { fetchProducts } from "../service/fakeStoreAPI";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function ProductList({ route }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    fetchProducts().then((data) => {
      setProducts(data);
      const { category } = route.params;
      setCategory(category);
      const lowercaseCategory = category.toLowerCase();
      const filtered = data.filter(
        (product) => product.category.toLowerCase() === lowercaseCategory
      );
      setFilteredProducts(filtered);
    });
  }, []);

  useEffect(() => {
    console.log(filteredProducts);
  }, [filteredProducts]);

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} barStyle="auto" />
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerBox}>
          <Text style={styles.headerTxt}>{category}</Text>
        </View>
      </View>
      {/* Product Categories */}
      <View style={styles.catList}>
        <FlatList
          data={filteredProducts} // use filteredProducts instead of products
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
            onPress={() => navigation.navigate('ProductDetail', item)}
              style={styles.catListBox}
            >
              <View style={styles.itemBox}>
                <Image source={{ uri: item.image }} style={styles.imageBox} />
                <View style={styles.catListTextBx}>
                  <Text style={styles.catListText}>{item.title}</Text>
                  <Text
                    style={styles.catListPrice}
                  >{`Price: $${item.price}`}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="backspace" size={30} color="#000" />
          <Text style={styles.backBtnTxt}>Back</Text>
        </TouchableOpacity>
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
  catList: {
    borderWidth: 1,
    backgroundColor: "white",
    justifyContent: "flex-start",
    width: "95%",
    height: "78%",
  },
  catListBox: {
    borderWidth: 1,
    width: "100%",
    backgroundColor: "lightgreen",
    padding: 5,
    marginVertical: 8,
  },
  catListText: {
    fontSize: 18,
    borderWidth: 1,
    flex: 1,
  },
  catListTextBx: {
    justifyContent: "space-between",
    flex:1,
  },
  catListPrice: {
    fontWeight: "bold",
    fontSize: 16,
  },
  // item
  itemBox: {
    borderWidth: 1,
    flexDirection: "row",
    padding: 5,
    gap: 10,
  },
  imageBox: {
    borderWidth: 1,
    width: "25%",
    aspectRatio: 1,
  },
  // bottom
  bottom: {
    borderWidth: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    margin: 5,
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    width: "50%",
    backgroundColor: "red",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  backBtnTxt: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
