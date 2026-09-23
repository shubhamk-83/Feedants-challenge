import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const JudgeCard = ({ judge, onVideoPress }) => {
  return (
    <View className="mx-3 mt-3 rounded-2xl bg-white p-4">
      <View className="flex-row items-center">
        {/* Judge image */}
        <View className="h-16 w-16 overflow-hidden rounded-full bg-slate-100">
          {judge?.imageUrl ? (
            <Image
              source={{ uri: judge.imageUrl }}
              className="h-full w-full"
              resizeMode="cover"
            />
          ) : (
            <View className="h-full w-full items-center justify-center">
              <Ionicons name="person" size={28} color="#94A3B8" />
            </View>
          )}
        </View>

        {/* Judge information */}
        <View className="ml-3 flex-1">
          <Text className="text-[9px] font-medium text-slate-500">Judge</Text>

          <Text
            numberOfLines={1}
            className="mt-1 text-base font-extrabold text-[#14213D]">
            {judge?.name || "Professional Judge"}
          </Text>

          <Text
            numberOfLines={2}
            className="mt-1 text-[10px] leading-4 text-slate-500">
            {judge?.role || "Competition Judge"}
          </Text>
        </View>

        {/* Intro video */}
        <Pressable
          onPress={onVideoPress}
          className="ml-2 items-center"
          hitSlop={8}>
          <View className="h-11 w-11 items-center justify-center rounded-full bg-[#E8F8FA]">
            <Ionicons name="play" size={19} color="#087F8C" />
          </View>

          <Text className="mt-1 text-[9px] font-extrabold text-[#087F8C]">
            Intro Video
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default JudgeCard;
