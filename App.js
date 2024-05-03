import { StyleSheet, Text } from "react-native";
import { Provider } from "react-redux";
import store from "./src/service/store";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Splash from "./src/screens/Splash";
import Category from "./src/screens/Catergory";
import ProductList from "./src/screens/ProductList";
import ProductDetail from "./src/screens/ProductDetail";
import ShoppingCart from "./src/screens/ShoppingCart";
import Toast from "react-native-toast-message";
import { colours as c } from "./src/constants/constants";
import Ionicons from "react-native-vector-icons/Ionicons";

const Stack = createStackNavigator();
const Tabs = createBottomTabNavigator();

function CategoryTabs() {
  return (
    <Provider store={store}>

    <Tabs.Navigator>
      <Tabs.Screen
        name="Products"
        component={Category}
        options={{ headerShown: false,
          tabBarIcon: ({}) => (
            <Ionicons name="menu" color='#4cc9f0' size={40} />
          ),
          tabBarLabel: () => (
            <Text style={{ color: '#4cc9f0', fontSize: 14, fontWeight:'bold' }}>Products</Text>
          ), }}
      />
      <Tabs.Screen
        name="Shopping Cart"
        component={ShoppingCart}
        options={{ headerShown: false,
          tabBarIcon: ({}) => (
            <Ionicons name="cart" color='green' size={40} />
          ),
          tabBarLabel: () => (
            <Text style={{ color: 'green', fontSize: 14, fontWeight:'bold' }}>Shopping Cart</Text>
          ), }}
      />
    </Tabs.Navigator>
    </Provider>
  );
}

export default function App() {
  return (
    <>
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
          <Stack.Screen
            name="ProductList"
            component={ProductList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductDetail"
            component={ProductDetail}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: c.bkgcol,
    alignItems: "center",
    justifyContent: "center",
  },
});
