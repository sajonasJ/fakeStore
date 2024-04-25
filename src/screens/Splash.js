import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { ImageBackground } from "react-native";

const windowHeight = Dimensions.get("window").height;
const splashImage = require("../public/splash.png");

export default function Splash({navigation}) {
  const handlePress = () => {
    navigation.navigate("Category");
  };
  return (
    <>
      <StatusBar hidden={true} />
      <ImageBackground source={splashImage} style={styles.container}>
        <View style={styles.innerContainer}>
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={styles.buttonText}>Enter</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    width: "50%",
    marginTop: windowHeight * 0.5,
  },
  button: {
    backgroundColor: "maroon",
    padding: 10,
    borderRadius: 35,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
});
