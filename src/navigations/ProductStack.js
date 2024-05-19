import { createStackNavigator } from "@react-navigation/stack";
import Category from "../screens/Category";
import ProductList from "../screens/ProductList";
import ProductDetail from "../screens/ProductDetail";
import SignUp from "../screens/SignUp";
import SignIn from "../screens/SignIn";
import Orders from "../screens/Orders";
import Profile from "../screens/Profile";

const ProductStack = createStackNavigator();

export default function ProductStackScreen() {
  return (
    <ProductStack.Navigator>
      <ProductStack.Screen
        name="Category"
        component={Category}
        options={{ headerShown: false }}
      />
      <ProductStack.Screen
        name="ProductList"
        component={ProductList}
        options={{ headerShown: false }}
      />
      <ProductStack.Screen
        name="ProductDetail"
        component={ProductDetail}
        options={{ headerShown: false }}
      />
      <ProductStack.Screen
        name="SignUp"
        component={SignUp}
        options={{ headerShown: false }}
      />
      <ProductStack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
           <ProductStack.Screen
        name="Profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <ProductStack.Screen
        name="Orders"
        component={Orders}
        options={{ headerShown: false }}
      />
    </ProductStack.Navigator>
  );
}
