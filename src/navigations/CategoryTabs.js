import React from "react";
import { Alert, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from "react-redux";
import ShoppingCart from "../screens/ShoppingCart";
import ProductStackScreen from "./ProductStack";
import TabIcon from "../components/TabIcon";
import Orders from "../screens/Orders";
import AuthStack from "./AuthStack";
import Profile from "../screens/Profile";
import { selectCount } from "../reducers/counterSlice";
import { selectAuth } from "../reducers/authSlice";

const Tabs = createBottomTabNavigator();

export default function CategoryTabs() {
  const count = useSelector(selectCount);
  const { isAuthenticated } = useSelector(selectAuth);

  const handleTabPress = (navigation, screenName) => {
    if (!isAuthenticated) {
      Alert.alert(
        "Access Restricted",
        "You need to sign in or sign up to access this screen.",
        [
          { text: "Okay" },,
        ]
      );
    } else {
      navigation.navigate(screenName);
    }
  };

  return (
    <Tabs.Navigator initialRouteName="Profile">
      <Tabs.Screen
        name="Products"
        component={ProductStackScreen}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            handleTabPress(navigation, "Products");
          },
        })}
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
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            handleTabPress(navigation, "Shopping Cart");
          },
        })}
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
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            handleTabPress(navigation, "My Orders");
          },
        })}
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
