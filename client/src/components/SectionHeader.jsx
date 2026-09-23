import React from "react";
import { Text, View } from "react-native";

const SectionHeader = ({ title, action }) => {
  return (
    <View className="mb-3 flex-row items-center justify-between">
      <Text className="text-lg font-bold text-ink">{title}</Text>

      {action ? (
        <Text className="text-sm font-semibold text-primary">{action}</Text>
      ) : null}
    </View>
  );
};

export default SectionHeader;
