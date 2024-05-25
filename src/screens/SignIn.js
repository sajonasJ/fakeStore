import React, { useState } from "react";
import { View, StyleSheet, Text, Button, TextInput } from "react-native";
import Header from "../components/Header";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colours as c } from "../constants/constants";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [additionalInput, setAdditionalInput] = useState("");

  const handleSignIn = () => {
    console.log("Sign In pressed");
    // Handle sign in logic
  };

  const handleClear = () => {
    setEmail("");
    setPassword("");
    setAdditionalInput("");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header title="Sign In" />
        <View style={styles.container}>
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <View style={styles.optionBx}>
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleClear}>
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.optionBx2}>
            <Text>Switch to:</Text>
            <Button
              title="Sign Up"
              onPress={() => navigation.navigate("SignUp")}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  input: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  button: {
    borderWidth: 1,
    padding: 5,
    paddingLeft: 25,
    paddingRight: 25,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
  },
  optionBx: {
    marginTop:55,
    // borderWidth: 1,
    width: "100%",
    padding: 15,
    justifyContent: "center",
    gap: "100%",
    flexDirection: "row",
  },
  optionBx2: {
    // borderWidth: 1,
    width: "100%",
    padding: 15,
    alignItems:"center",
    justifyContent: "center",
    // gap: "100%",
    flexDirection: "row",
  },
});
