import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Category from "../screens/Category";
import ShoppingCart from "../screens/ShoppingCart";
import ProductList from "../screens/ProductList";
import ProductDetail from "../screens/ProductDetail";
import Ionicons from "react-native-vector-icons/Ionicons";
import { createStackNavigator } from "@react-navigation/stack";

import TabIcon from "../components/TabIcon";

const Tabs = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function CategoryTabs() {
  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Products"
        component={Category}
        options={{
          headerShown: false,
          tabBarIcon: ({}) => (
            <Ionicons name="menu" color="#4cc9f0" size={40} />
          ),
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
          tabBarIcon: () => <TabIcon />,
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
    </Tabs.Navigator>
    
  );
}
