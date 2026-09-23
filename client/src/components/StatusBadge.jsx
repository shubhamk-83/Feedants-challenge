import React from "react";
import { Text, View } from "react-native";
import { formatStatus } from "../utils/formatters";

const StatusBadge = ({ status }) => {
  const isOpen = status === "REGISTRATION_OPEN";
  const isFull = status === "FULL";

  const containerClass = isOpen
    ? "bg-successSoft"
    : isFull
      ? "bg-warningSoft"
      : "bg-slate-100";

  const textClass = isOpen
    ? "text-success"
    : isFull
      ? "text-warning"
      : "text-slate-600";

  return (
    <View className={`self-start rounded-full px-3 py-1.5 ${containerClass}`}>
      <Text className={`text-[10px] font-extrabold uppercase tracking-wider ${textClass}`}>
        {formatStatus(status)}
      </Text>
    </View>
  );
};

export default StatusBadge;
