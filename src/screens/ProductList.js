import React from "react";
import {
  StatusBar,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function ProductList() {
  categories = ["Electronics", "Jewelry", "Men's Clothing", "Women's Clothing"];
  handlePress = (category) => {
    console.log(`Category pressed: ${category}`);
  };
  handleBack = () =>{
    console.log('back button pressed')
  };
  return (
    <View style={styles.container}>
      <StatusBar hidden={false} barStyle="auto" />
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerBox}>
          <Text style={styles.headerTxt}>Product List Temp</Text>
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
              <View style={styles.itemBox}>
                <View style={styles.imageBox}>

                </View>
                <Text style={styles.catListText}>{item}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <View style={styles.bottom}>
          <TouchableOpacity
          onPress={() => handlePress(item)}
              style={styles.backButton}>
                
                <Text>Back</Text>
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
    // marginTop: "2%",
  },
  catListBox: {
    borderWidth: 1,
    width: "100%",
    backgroundColor: "lightgreen",
    padding: 15,
    marginVertical: 8,
  },
  catListText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  // item
  itemBox:{
    borderWidth:1,
    flexDirection:'row',
    padding:5,
    gap:10,
  },
  imageBox:{
    borderWidth:1,
    width:'25%',
    aspectRatio:1,
  },
  // bottom
  bottom:{
    width:'100%',
  }
});
