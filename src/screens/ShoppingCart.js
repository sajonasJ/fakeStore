import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";

export default function ShoppingCart({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title="Shopping Cart" />
    </View>
  );
}
const styles = StyleSheet.create({
  //page
  container: {
    justifyContent:'center',
    alignItems:'center',
  },
});
