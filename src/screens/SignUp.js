import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import SubTitle from "../components/SubTitle";
import CsBtn from "../components/CsBtn";
import { colours as c } from "../constants/constants";
import { userSignUp, selectAuth } from "../reducers/authSlice";

export default function SignUp({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(selectAuth);

  useEffect(() => {
    validatePasswords();
  }, [password, confirmPassword]);

  const validatePasswords = () => {
    setPasswordError(
      password && confirmPassword && password !== confirmPassword
        ? "Passwords do not match."
        : ""
    );
  };

  const validateFields = () => {
    let errors = [];

    if (!name || !email || !password || !confirmPassword) {
      errors.push("All fields are required.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      errors.push("Email must contain '@' and '.com'.");
    }

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name)) {
      errors.push("Name cannot contain numbers or special characters.");
    }

    if (password.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/;
    if (!passwordRegex.test(password)) {
      errors.push("Password must contain at least one uppercase letter, one lowercase letter, and one digit.");
    }

    if (passwordError) {
      errors.push(passwordError);
    }

    setErrorMessages(errors);

    return errors.length === 0;
  };

  const handleSignUp = () => {
    if (validateFields()) {
      const userData = {
        name,
        email,
        password,
      };
      dispatch(userSignUp(userData));
    }
  };

  useEffect(() => {
    if (user && !error) {
      handleClear();
      navigation.navigate("Profile"); // Adjust this as needed
    }
  }, [user, error, navigation]);

  const handleClear = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setErrorMessages([]);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Header title="Sign Up" />
        <SubTitle title="Sign Up a new user" />

        <View style={styles.formContainer}>
          <View style={styles.heading}>
            <Text style={styles.headingTxt}>Name</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <View style={styles.heading}>
            <Text style={styles.headingTxt}>Email</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Enter your email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            keyboardType="email-address"
          />
          <View style={styles.heading}>
            <Text style={styles.headingTxt}>Password</Text>
          </View>
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
          <View style={styles.heading}>
            <Text style={styles.headingTxt}>Confirm Password</Text>
          </View>
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
          <View style={styles.erBx}>
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
            {loading && <ActivityIndicator size="large" color={c.primary} />}
            {error && <Text style={styles.errorText}>Error: {error}</Text>}
          </View>
          <View style={styles.optionBx}>
            <CsBtn onPress={handleSignUp} color={c.cartBtn} title="Confirm" />
            <CsBtn onPress={handleClear} color={c.backBtn} title="Cancel" />
          </View>
          <View style={styles.optionBx2}>
            <Text style={styles.switch}>Switch to:</Text>
            <Button
              title="Sign In"
              onPress={() => {
                handleClear();
                navigation.navigate("SignIn");
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
    minHeight: 90,
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
    marginTop: 5,
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
