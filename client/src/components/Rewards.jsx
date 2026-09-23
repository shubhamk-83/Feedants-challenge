import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const Rewards = ({ rewards = [] }) => {
  return (
    <View className="mx-3 mt-3 rounded-2xl bg-white p-4">
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-base font-extrabold text-[#14213D]">
            Rewards & Recognition
          </Text>

          <Text className="mt-1 text-[10px] text-slate-500">
            What winners receive
          </Text>
        </View>

        <View className="h-10 w-10 items-center justify-center rounded-full bg-[#FFF7DF]">
          <Ionicons name="trophy-outline" size={20} color="#D99A00" />
        </View>
      </View>

      <View className="mt-4">
        {rewards.length > 0 ? (
          rewards.map((reward, index) => (
            <View
              key={`${reward}-${index}`}
              className={`flex-row items-center py-3 ${
                index !== rewards.length - 1 ? "border-b border-slate-100" : ""
              }`}>
              <View className="h-9 w-9 items-center justify-center rounded-full bg-[#E8F8FA]">
                <Ionicons
                  name={index === 0 ? "medal-outline" : "gift-outline"}
                  size={18}
                  color="#087F8C"
                />
              </View>

              <Text className="ml-3 flex-1 text-sm font-semibold text-[#14213D]">
                {reward}
              </Text>
            </View>
          ))
        ) : (
          <View className="rounded-xl bg-slate-50 p-4">
            <Text className="text-center text-xs text-slate-500">
              Rewards details will be announced soon.
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default Rewards;
