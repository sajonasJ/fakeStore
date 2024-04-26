import React, {useState, useEffect} from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { fetchProducts } from "../service/fakeStoreAPI";

export default function Category({navigation}) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  function capFirstLetter(string) {
    return string.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  }

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data);
      const uniqueCategories = [...new Set(data.map(item => capFirstLetter(item.category)))];      
      setCategories(uniqueCategories);
    });
  }, []);

  const handlePress = (category) => {
    console.log(`Category pressed: ${category}`);
    navigation.navigate('ProductList', { category });
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} barStyle="auto" />
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerBox}>
          <Text style={styles.headerTxt}>Category Screen</Text>
        </View>
      </View>
      {/* Product Categories */}
      <View style={styles.catList}>
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
    width:'100%',
    borderWidth: 1,
    marginTop:70,
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
    width: "80%",
    height: "85%",
  },
  catListBox: {
    borderWidth: 1,
    width: "100%",
    backgroundColor: "lightgreen",
    padding: 15,
    marginVertical:8,
  },
  catListText: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
