import { createStackNavigator } from "@react-navigation/stack";
import Category from "../screens/Category";
import ProductList from "../screens/ProductList";
import ProductDetail from "../screens/ProductDetail";

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
    </ProductStack.Navigator>
  );
}
