import React from "react";
import { View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Badge } from "react-native-elements";

export default function TabIcon({ name, color, size = 40, showBadge = true, count = 0 }) {
  return (
    <View>
      <Ionicons name={name} color={color} size={size} />
      {showBadge && count > 0 && (
        <Badge
          value={count}
          status="error"
          containerStyle={{ position: "absolute", top: -4, right: -4 }}
        />
      )}
    </View>
  );
}
