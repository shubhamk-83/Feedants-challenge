import React from "react";
import { ActivityIndicator, Pressable, Text } from "react-native";

const PrimaryButton = ({
  title,
  onPress,
  disabled = false,
  loading = false,
}) => {
  return (
    <Pressable
      disabled={disabled || loading}
      onPress={onPress}
      className={`items-center justify-center rounded-2xl px-5 py-4 ${
        disabled || loading ? "bg-slate-300" : "bg-primary"
      }`}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text className="text-base font-extrabold text-white">{title}</Text>
      )}
    </Pressable>
  );
};

export default PrimaryButton;
