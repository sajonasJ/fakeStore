import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { fontSize as f, colours as c } from '../constants/constants';

export default function SubTitle({ title }) {
  return (
    <View style={styles.header}>
      <View style={styles.headerBox}>
        <Text style={styles.headerTxt}>{title}</Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
header: {
    width: "100%",
    alignItems: "center",
  },
  headerBox: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 17,
  },
  headerTxt: {
    fontSize: f.xl,
    fontWeight: "bold",
    color: "black",
  },
});