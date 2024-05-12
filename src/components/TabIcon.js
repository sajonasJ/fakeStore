import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Badge } from "react-native-elements";
import { useSelector } from "react-redux";
import { selectCount } from "../reducers/counterSlice";

export default function TabIcon() {
  const count = useSelector(selectCount);
  return (
    <View>
      <Ionicons name="cart" color="green" size={40} />
      {count > 0 && (
        <Badge
          value={count}
          status="error"
          containerStyle={{ position: "absolute", top: -4, right: -4 }}
        />
      )}
    </View>
  );
}