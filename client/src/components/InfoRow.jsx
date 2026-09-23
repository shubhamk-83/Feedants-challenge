import React from "react";
import { Text, View } from "react-native";

const InfoRow = ({ icon, label, value, last = false }) => {
  return (
    <View className={`flex-row py-4 ${last ? "" : "border-b border-line"}`}>
      <View className="mr-4 h-10 w-10 items-center justify-center rounded-xl bg-surface">
        <Text>{icon}</Text>
      </View>

      <View className="flex-1">
        <Text className="text-[11px] font-medium uppercase tracking-wide text-muted">
          {label}
        </Text>

        <Text className="mt-1 text-sm font-bold leading-5 text-ink">
          {value}
        </Text>
      </View>
    </View>
  );
};

export default InfoRow;
