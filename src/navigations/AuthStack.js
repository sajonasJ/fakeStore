// AuthStack.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../screens/SignIn";
import SignUp from "../screens/SignUp";
import { selectAuth } from "../reducers/authSlice";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

export default function AuthStack() {
  const { isAuthenticated } = useSelector(selectAuth);

  return (
    <Stack.Navigator>
      {!isAuthenticated ? (
        <>
          <Stack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
        </>
      ) : null}
    </Stack.Navigator>
  );
}
