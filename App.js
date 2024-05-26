import { Provider } from "react-redux";
import store from "./src/service/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "./src/screens/Splash";
import Toast from "react-native-toast-message";
import { colours as c } from "./src/constants/constants";
import CategoryTabs from "./src/navigations/CategoryTabs";
import SignUp from "./src/screens/SignUp";
import SignIn from "./src/screens/SignIn";
import Profile from "./src/screens/Profile";
import Orders from "./src/screens/Orders";

const Stack = createStackNavigator();

export default function App() {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Category"
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
            {/* <Stack.Screen
              name="SignUp"
              component={SignUp}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignIn"
              component={SignIn}
              options={{ headerShown: false }}
            />
                   <Stack.Screen
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
                   <Stack.Screen
              name="Orders"
              component={Orders}
              options={{ headerShown: false }}
            /> */}
          </Stack.Navigator>
        </NavigationContainer>
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </Provider>
    </>
  );
}
