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
    marginTop:55,
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
    fontSize: 40,
    fontWeight: "bold",
    color: "white",
  },
  //category list
  catList: {
    backgroundColor: "white",
    justifyContent: "flex-start",
    width: "100%",
    height: "80%",
  },
  catListBox: {
    // borderWidth: 1,
    width: "100%",
    backgroundColor: "white",
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
    fontSize: 18,
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
    flexDirection: "row",
    gap: 10,
  },
  imageBox: {
    borderWidth: 0,
    borderColor:'lightgray',
    width: "25%",
    aspectRatio: 1,
  },
  // bottom
  bottom: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  backButton: {
    margin: 5,
    padding: 5,
    borderRadius: 10,
    width: "50%",
    backgroundColor: "#4cc9f0",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    shadowColor: "rgba(60, 64, 67, 1)",
  shadowOffset: {
    width: 0,
    height: 4,
  },
  shadowOpacity: 0.4,
  shadowRadius: 1,
  elevation: 3,
  },
  backBtnTxt: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
