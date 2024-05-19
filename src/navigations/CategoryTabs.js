// CategoryTabs.js
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShoppingCart from "../screens/ShoppingCart";
import Ionicons from "react-native-vector-icons/Ionicons";
import ProductStackScreen from './ProductStack'; // import the ProductStackScreen component
import TabIcon from "../components/TabIcon";
import Profile from "../screens/Profile";

const Tabs = createBottomTabNavigator();

export default function CategoryTabs() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Products"
        component={ProductStackScreen}
        options={{
          headerShown: false,
            tabBarIcon: () => <TabIcon name="menu" color="#4cc9f0"/>,
          tabBarLabel: () => (
            <Text
              style={{
                color: "#4cc9f0",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Products
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Shopping Cart"
        component={ShoppingCart}
        options={{
          headerShown: false,
          tabBarIcon: () => <TabIcon name="cart" color="green"/>,
          tabBarLabel: () => (
            <Text
              style={{
                color: "green",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Shopping Cart
            </Text>
          ),
        }}
      />
       <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: () => <TabIcon name="person-circle" color="blue"/>,
          tabBarLabel: () => (
            <Text
              style={{
                color: "blue",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Profile
            </Text>
          ),
        }}
      />
    </Tabs.Navigator>
  );
}