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
import { useNavigation } from "@react-navigation/native";
import CsBtn from "../components/CsBtn";
import Header from "../components/Header";

export default function ProductList({ route }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const { category, products } = route.params;
    setCategory(category);
    const lcCategory = category.toLowerCase();
    const filtered = products.filter(
      (product) => product.category.toLowerCase() === lcCategory
    );
    setFilteredProducts(filtered);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} barStyle="auto" />
      {/* Header */}
      <Header title={category}/>
      {/* Product Categories */}
      <View style={styles.catList}>
        <FlatList
          data={filteredProducts} // use filteredProducts instead of products
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("ProductDetail", item)}
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
        <CsBtn
          onPress={() => navigation.goBack()}
          iconName="backspace"
          color="#4cc9f0"
        >
          Back
        </CsBtn>
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
    marginTop: 55,
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
    flex: 1,
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
    borderColor: "lightgray",
    width: "25%",
    aspectRatio: 1,
  },
  // bottom
  bottom: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
});
