import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShoppingCart from "../screens/ShoppingCart";
import ProductStackScreen from "./ProductStack";
import TabIcon from "../components/TabIcon";
import Profile from "../screens/Profile";
import Orders from "../screens/Orders";
import { useSelector } from "react-redux";
import { selectCount } from "../reducers/counterSlice";

const Tabs = createBottomTabNavigator();

export default function CategoryTabs() {
  const count = useSelector(selectCount); // Get the count value from the Redux store

  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Products"
        component={ProductStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <TabIcon name="menu" color="#4cc9f0" showBadge={false} />,
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
          tabBarIcon: () => <TabIcon name="cart" color="green" showBadge={true} count={count} />,
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
        name="My Orders"
        component={Orders}
        options={{
          headerShown: false,
          tabBarIcon: () => <TabIcon name="bag" color="red" showBadge={false} />,
          tabBarLabel: () => (
            <Text
              style={{
                color: "red",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              My Orders
            </Text>
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarIcon: () => <TabIcon name="person-circle" color="blue" showBadge={false} />,
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
