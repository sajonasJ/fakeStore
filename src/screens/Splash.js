import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Image,
} from "react-native";
import { ImageBackground } from "react-native";
import { fontSize as f, colours as c } from "../constants/constants";

const windowHeight = Dimensions.get("window").height;
const splashImage = require("../public/splash.png");

export default function Splash({ navigation }) {
  const [isLoading, setIsLoading] = useState(true);

  // Navigate to the Category screen after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Category");
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  // Set isLoading to false when image is loaded
  const handleImageLoad = () => {
    setIsLoading(false);
  };

  return (
    <>
      <StatusBar hidden={true} />
      {isLoading && (
        <ActivityIndicator
          size="large"
          color={c.aiCol}
          style={{ ...StyleSheet.absoluteFill, justifyContent: "center" }}
        />
      )}
      <Image
        source={splashImage}
        onLoad={handleImageLoad}
        style={{ position: "absolute", width: 0, height: 0 }}
      />
      <ImageBackground
        source={splashImage}
        style={styles.container}
      />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "50%",
    marginTop: windowHeight * 0.5,
  },
  button: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 35,
  },
  buttonText: {
    color: c.eBtxt,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: f.xl,
  },
});
