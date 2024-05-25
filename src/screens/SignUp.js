import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Header from "../components/Header";
import { colours as c } from "../constants/constants";

export default function SignUp({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    validatePasswords();
  }, [password, confirmPassword]);

  const validatePasswords = () => {
    if (password && confirmPassword && password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  };

  const validateFields = () => {
    let errors = [];

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      errors.push("All fields are required.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Email must contain '@' and '.com'.");
    }

    const nameRegex = /^[a-zA-Z]+$/;
    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      errors.push("Names cannot contain numbers or special characters.");
    }

    if (passwordError) {
      errors.push(passwordError);
    }

    setErrorMessages(errors);
  };

  const handleSignIn = () => {
    validateFields();
    if (errorMessages.length === 0) {
      console.log("Sign In pressed");
      handleClear();
      navigation.navigate("SignIn");
    }
  };

  const handleClear = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrorMessages([]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header title="Sign Up" />
        <View style={styles.formContainer}>
          <Text>First Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your first name"
            value={firstName}
            onChangeText={(text) => setFirstName(text)}
          />
          <Text>Last Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your last name"
            value={lastName}
            onChangeText={(text) => setLastName(text)}
          />
          <Text>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
          <Text>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              validatePasswords();
            }}
            secureTextEntry={!showPassword}
          />
          <Text>Confirm Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              validatePasswords();
            }}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Text style={styles.showPasswordText}>
              {showPassword ? "Hide Password" : "Show Password"}
            </Text>
          </TouchableOpacity>
          {passwordError ? (
            <Text style={styles.errorText}>{passwordError}</Text>
          ) : null}
          {errorMessages.length > 0 && (
            <View style={styles.errorContainer}>
              {errorMessages.map((error, index) => (
                <Text key={index} style={styles.errorText}>
                  {error}
                </Text>
              ))}
            </View>
          )}
          <View style={styles.optionBx}>
            <TouchableOpacity style={styles.button} onPress={handleSignIn}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleClear}>
              <Text style={styles.buttonText}>Clear</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.optionBx2}>
            <Text style={styles.switch}>Switch to:</Text>
            <Button
              title="Sign In"
              onPress={() => {handleClear(), navigation.navigate("SignIn")}}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 55,
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
    gap: "100%",
    width: "100%",
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
    marginBottom: 15,
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
