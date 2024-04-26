import React, {useState, useEffect} from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import  fetchProducts  from "../service/fakeStoreAPI";
import Header from "../components/Header";

export default function Category({navigation}) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  function capFirstLetter(string) {
    return string.split(' ')
    .map(word => word.charAt(0)
    .toUpperCase() + word.slice(1)).join(' ');
  }

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data);
      const uniqueCategories = [...new Set(data.map(item => capFirstLetter(item.category)))];      
      setCategories(uniqueCategories);
    });
  }, []);

  const handlePress = (category) => {
    navigation.navigate('ProductList', { category, products });
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={false} barStyle="auto" />
      {/* Header */}
      <Header title='Categories'/>
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
    height: "85%",
  },
  catListBox: {
    width: "100%",
    backgroundColor: "white",
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
    fontSize: 18,
    textAlign: "center",
  },
});
