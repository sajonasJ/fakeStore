import React, { useState, useEffect } from "react";
import {
  StatusBar,
  View,
  Image,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CsBtn from "../components/CsBtn";
import Header from "../components/Header";
import { fontSize as f, colours as c } from '../constants/constants';

export default function ProductList({ route }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [category, setCategory] = useState("");
  const navigation = useNavigation();
  const [imageStatus, setImageStatus] = useState({});


  useEffect(() => {
    const { category, products } = route.params;
    setCategory(category);
    setFilteredProducts(products);
  }, []);

//make sure activity indicator is on when image starts loading
  const handleImageLoadStart = (id) => {
    setImageStatus((prevStatus) => ({ ...prevStatus, [id]: "loading" }));
  };
//make sure activity indicator is off when image stops loading
  const handleImageLoadEnd = (id) => {
    setImageStatus((prevStatus) => ({ ...prevStatus, [id]: "loaded" }));
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden={false} barStyle="auto" />
      <Header title={category} />
      <View style={styles.catList}>
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
            onPress={() => navigation.navigate("ProductDetail", { item })}
              style={styles.catListBox}
            >
              <View style={styles.itemBox}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{ uri: item.image }}
                    style={styles.imageBx}
                    onLoadStart={() => handleImageLoadStart(item.id)}
                    onLoadEnd={() => handleImageLoadEnd(item.id)}
                  />
                  {imageStatus[item.id] === "loading" && (
                    <ActivityIndicator
                      size="small"
                      color={c.aiCol}
                      style={styles.imageLoader}
                    />
                  )}
                </View>
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
          color={c.backBtn}
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
    // borderWidth: 1,
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
    fontSize:f.med,
  },
  // item
  itemBox: {
    flexDirection: "row",
    gap: 10,
  },
  imageBx: {
    borderColor: c.bxCol,
    aspectRatio: 1,
    borderWidth: 1,
  },
  imageContainer: {
    borderWidth: 1,
    aspectRatio: 1,
    width: "25%",
  },
// bottom
bottom: {
  width: "100%",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: '#fff',
  shadowColor: "#000",
  flex:1,
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
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
