import React from "react";
import { Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ShoppingCart from "../screens/ShoppingCart";
import ProductStackScreen from "./ProductStack";
import TabIcon from "../components/TabIcon";
import Orders from "../screens/Orders";
import { useSelector } from "react-redux";
import { selectCount } from "../reducers/counterSlice";
import { selectAuth } from "../reducers/authSlice";
import AuthStack from "./AuthStack";
import Profile from "../screens/Profile";

const Tabs = createBottomTabNavigator();

export default function CategoryTabs() {
  const count = useSelector(selectCount); // Get the count value from the Redux store
  const { isAuthenticated } = useSelector(selectAuth);

  return (
    <Tabs.Navigator>
      <Tabs.Screen
        name="Products"
        component={ProductStackScreen}
        options={{
          headerShown: false,
          tabBarIcon: () => <TabIcon name="menu" color="rgba(0, 0, 0, 0.7)" showBadge={false} />,
          tabBarLabel: () => (
            <Text
              style={{
                color: "rgba(0, 0, 0, 0.7)",
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
          tabBarIcon: () => <TabIcon name="cart" color="rgba(0, 128, 0, .7)" showBadge={true} count={count} />,
          tabBarLabel: () => (
            <Text
              style={{
                color: "rgba(0, 128, 0, .7)",
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
          tabBarIcon: () => <TabIcon name="bag" color="rgba(255, 0, 0, 0.7)" showBadge={false} />,
          tabBarLabel: () => (
            <Text
              style={{
                color: "rgba(255, 0, 0, 0.7)",
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              My Orders
            </Text>
          ),
        }}
      />
      {isAuthenticated ? (
        <Tabs.Screen
          name="Profile"
          component={Profile}
          options={{
            headerShown: false,
            tabBarIcon: () => <TabIcon name="person-circle" color="rgba(0, 0, 255, 0.7)" showBadge={false} />,
            tabBarLabel: () => (
              <Text
                style={{
                  color: "rgba(0, 0, 255, 0.7)",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                Profile
              </Text>
            ),
          }}
        />
      ) : (
        <Tabs.Screen
          name="Profile"
          component={AuthStack}
          options={{
            headerShown: false,
            tabBarIcon: () => <TabIcon name="person-circle" color="rgba(0, 0, 255, 0.7)" showBadge={false} />,
            tabBarLabel: () => (
              <Text
                style={{
                  color: "rgba(0, 0, 255, 0.7)",
                  fontSize: 14,
                  fontWeight: "bold",
                }}
              >
                Profile
              </Text>
            ),
          }}
        />
      )}
    </Tabs.Navigator>
  );
}
