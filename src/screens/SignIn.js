import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, Button, Keyboard, TouchableWithoutFeedback, ActivityIndicator } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import SubTitle from "../components/SubTitle";
import CsBtn from "../components/CsBtn";
import { colours as c } from "../constants/constants";
import { userSignIn, selectAuth,fetchAllOrders } from "../reducers/authSlice";

export default function SignIn({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(selectAuth);

  useEffect(() => {
    if (user && !error) {
      handleClear();
      navigation.navigate("Profile");
    }
  }, [user, error, navigation]);

  const validateFields = () => {
    let errors = [];

    if (!email || !password) errors.push("All fields are required.");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) errors.push("Email must contain '@' and '.com'.");

    setErrorMessages(errors);

    return errors.length === 0;
  };

  const handleSignIn = () => {
    if (validateFields()) {
      dispatch(userSignIn({ email, password }));
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
        <SubTitle title="Sign in with your email and password" />
        <View style={styles.formContainer}>
          <View style={styles.heading}>
            <Text style={styles.headingTxt}>Email</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <View style={styles.heading}>
            <Text style={styles.headingTxt}>Password</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.showPasswordText}>
              {showPassword ? "Hide Password" : "Show Password"}
            </Text>
          </TouchableOpacity>
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
            {loading && <ActivityIndicator size="large" color={c.primary} />}
            {error && <Text style={styles.errorText}>Error: {error}</Text>}
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
  headingTxt: {
    fontWeight: "bold",
    fontSize: 18,
  },
  heading: {
    justifyContent: "flex-start",
    width: "100%",
  },
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
  showPasswordText: {
    textDecorationLine: "underline",
    color: "blue",
    marginBottom: 15,
  },
});
