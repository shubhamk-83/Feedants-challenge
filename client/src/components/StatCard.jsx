import React from "react";
import { Text, View } from "react-native";

const StatCard = ({ icon, label, value }) => {
  return (
    <View className="mr-2 flex-1 rounded-2xl border border-line bg-white p-3">
      <View className="mb-2 h-9 w-9 items-center justify-center rounded-xl bg-primarySoft">
        <Text className="text-base">{icon}</Text>
      </View>

      <Text className="text-[11px] font-medium text-muted">{label}</Text>

      <Text
        numberOfLines={1}
        className="mt-1 text-sm font-extrabold text-ink"
      >
        {value}
      </Text>
    </View>
  );
};

export default StatCard;
