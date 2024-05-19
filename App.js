import { Provider } from "react-redux";
import store from "./src/service/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "./src/screens/Splash";
import Toast from "react-native-toast-message";
import { colours as c } from "./src/constants/constants";
import CategoryTabs from "./src/navigations/CategoryTabs";
import SignUp from "./src/screens/SignUp";
const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="SignUp"
            screenOptions={{
              headerStyle: {
                backgroundColor: c.bkgcol,
              },
            }}
          >
            <Stack.Screen
              name="Splash"
              component={Splash}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Category"
              component={CategoryTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </Provider>
    </>
  );
}
