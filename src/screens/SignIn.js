import React, { useState } from "react";
import { View, StyleSheet, Text, Button, TextInput } from "react-native";
import Header from "../components/Header";
import SubTitle from "../components/SubTitle";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colours as c } from "../constants/constants";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import CsBtn from "../components/CsBtn";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);

  const validateFields = () => {
    let errors = [];

    !email || !password ? errors.push("All fields are required.") : null;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    !emailRegex.test(email)
      ? errors.push("Email must contain '@' and '.com'.")
      : null;

    setErrorMessages(errors);

    return errors.length === 0;
  };

  const handleSignIn = () => {
    if (validateFields()) {
      console.log("Sign In pressed");
      // Handle sign in logic
    }
  };

  const handleClear = () => {
    setEmail("");
    setPassword("");
    setErrorMessages([]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header title="Sign In" />
        <SubTitle title="Sign in with your email and password"></SubTitle>
        <View style={styles.formContainer}>
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
          <View style={styles.erBx}>
            {errorMessages.length > 0 && (
              <View style={styles.errorContainer}>
                {errorMessages.map((error, index) => (
                  <Text key={index} style={styles.errorText}>
                    {error}
                  </Text>
                ))}
              </View>
            )}
          </View>
          <View style={styles.optionBx}>
            <CsBtn onPress={handleSignIn} color={c.cartBtn} title="Confirm" />
            <CsBtn onPress={handleClear} color={c.backBtn} title="Clear" />
          </View>
          <View style={styles.optionBx2}>
            <Text style={styles.switch}>Switch to:</Text>
            <Button
              title="Sign Up"
              onPress={() => {
                handleClear();
                navigation.navigate("SignUp");
              }}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  erBx: {
    width: "100%",
    minHeight: 70,
  },
  switch: {
    fontSize: 18,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: c.bkgcol,
    width: "100%",
    marginTop: 55,
  },
  formContainer: {
    width: "80%",
    alignItems: "center",
    marginTop: 10,
  },
  input: {
    width: "100%",
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
    marginTop: 15,
    width: "100%",
    gap: "100%",
    justifyContent: "center",
    flexDirection: "row",
  },
  optionBx2: {
    marginTop: 15,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  errorContainer: {
    alignItems: "flex-start",
  },
  errorText: {
    color: "red",
  },
});
