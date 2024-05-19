import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "../components/Header";
import { colours as c } from "../constants/constants";

export default function SignInScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title="Sign Up" />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: c.bkgcol,
        width: "100%",
        marginTop: 55,
      },
});