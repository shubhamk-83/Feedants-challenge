import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CompetitionHero = ({ competition, userState, onBack }) => {
  const statusLabel =
    competition?.status
      ?.replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase()) || "Competition";

  return (
    <View>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pb-3 pt-4">
        <Pressable
          onPress={onBack}
          className="flex-row items-center"
          hitSlop={8}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color="#14213D"
          />

          <Text className="ml-2 text-sm font-extrabold text-[#14213D]">
            Go back
          </Text>
        </Pressable>

        {/* Language */}
        <View className="flex-row rounded-full border border-slate-200 bg-white p-1">
          <View className="rounded-full bg-[#087F8C] px-3 py-1.5">
            <Text className="text-[10px] font-extrabold text-white">
              ENG
            </Text>
          </View>

          <View className="px-3 py-1.5">
            <Text className="text-[10px] font-bold text-slate-500">
              हिंदी
            </Text>
          </View>
        </View>
      </View>

      {/* Main competition information */}
      <View className="mx-3 overflow-hidden rounded-2xl bg-white">
        <View className="p-4">
          {/* Registered / status */}
          <View className="flex-row items-center justify-between">
            <View className="flex-1 pr-3">
              <Text
                numberOfLines={2}
                className="text-[23px] font-extrabold leading-7 text-[#14213D]"
              >
                {competition.title}
              </Text>

              <Text
                numberOfLines={2}
                className="mt-1 text-xs leading-5 text-slate-500"
              >
                {competition.subtitle}
              </Text>
            </View>

            {userState?.isRegistered ? (
              <View className="flex-row items-center rounded-full border border-[#BDE9ED] bg-[#E8F8FA] px-3 py-2">
                <Ionicons
                  name="checkmark-circle"
                  size={16}
                  color="#087F8C"
                />

                <Text className="ml-1 text-[10px] font-extrabold text-[#087F8C]">
                  Registered
                </Text>
              </View>
            ) : (
              <View className="rounded-full bg-[#E8F8FA] px-3 py-2">
                <Text className="text-[10px] font-extrabold text-[#087F8C]">
                  {statusLabel}
                </Text>
              </View>
            )}
          </View>

          {/* Tags */}
          <View className="mt-3 flex-row flex-wrap items-center">
            <View className="mr-2 rounded-lg bg-[#F2F4F7] px-3 py-1.5">
              <Text className="text-[10px] font-extrabold text-[#14213D]">
                {competition.category}
              </Text>
            </View>

            <View className="mr-2 rounded-lg bg-[#F2F4F7] px-3 py-1.5">
              <Text className="text-[10px] font-extrabold text-[#14213D]">
                Multi-Win
              </Text>
            </View>

            <View className="mt-1 flex-row items-center">
              <Ionicons
                name="trophy-outline"
                size={17}
                color="#087F8C"
              />

              <Text className="ml-1 text-[10px] font-extrabold text-[#087F8C]">
                Winners get certificate
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CompetitionHero;