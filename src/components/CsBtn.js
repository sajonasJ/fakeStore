import React from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { fontSize as f, colours as c } from '../constants/constants';


export default function CsBtn({ onPress, iconName, color, justifyContent = "center", title }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.detailBtn, { backgroundColor: color, justifyContent }]}
    >
      <Ionicons name={iconName} size={30} color={c.aiCol} />
      <Text style={styles.btnTxt}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  detailBtn: {
    flexDirection: "row",
    // justifyContent: "space-evenly",
    alignItems: "center",
    width: "40%",
    borderRadius: 10,
    padding: 5,
    margin: 5,
    borderWidth:1,
    shadowColor: "rgba(60, 64, 67, 1)",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 3,
  },
  btnTxt: {
    fontWeight: "bold",
    borderWidth:1,
    fontSize: f.medL,
    textAlign: "center",
  },
});
