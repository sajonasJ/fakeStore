import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
import { fontSize as f, colours as c } from '../constants/constants';

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
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: c.bkgcol,
    width: "100%",
    marginTop: 55,
}});
