import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

const CompetitionBottomSection = ({
  competition,
  onRefer,
  onUsers,
}) => {
  const rewardRows = [
    ["1st Winner", "₹ 550", "trophy"],
    ["2nd Winner", "₹ 300", "medal"],
    ["3rd Winner", "₹ 240", "medal-outline"],
    ["4th Winner", "₹ 200", "star-outline"],
    ["5th Winner", "₹ 130", "star-outline"],
    ["6th Winner", "₹ 80", "star-outline"],
  ];

  return (
    <>
      {/* Rewards */}
      <View className="mx-3 mt-3 overflow-hidden rounded-2xl bg-white">
        <View className="flex-row items-center justify-between px-4 pb-1 pt-3">
          <View className="flex-row items-center">
            <Text className="text-sm font-extrabold text-[#14213D]">
              Rewards
            </Text>
            <Text className="ml-2 text-[9px] text-slate-400">
              (All Positions)
            </Text>
          </View>
        </View>

        <View className="px-4 pb-2">
          {rewardRows.map(([label, amount, icon], index) => (
            <View
              key={label}
              className={`flex-row items-center py-[5px] ${
                index !== rewardRows.length - 1
                  ? "border-b border-slate-100"
                  : ""
              }`}
            >
              <View className="w-7">
                <Ionicons
                  name={icon}
                  size={14}
                  color={index < 3 ? "#087F8C" : "#5A9EA4"}
                />
              </View>

              <Text className="flex-1 text-[10px] font-extrabold text-[#14213D]">
                {label}
              </Text>

              <Text className="text-[10px] font-extrabold text-[#087F8C]">
                {amount}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Disclaimer */}
      <View className="mx-3 mt-1 flex-row items-center rounded-lg bg-[#E8F8FA] px-3 py-2">
        <Ionicons
          name="information-circle-outline"
          size={14}
          color="#087F8C"
        />

        <Text className="ml-2 flex-1 text-[8px] leading-3 text-[#475569]">
          Disclaimer: Only contributions from paid participants will be
          considered for judging.
        </Text>
      </View>

      {/* Payment / Prize Money */}
      <View className="mx-3 mt-2 overflow-hidden rounded-xl bg-white">
        <View className="flex-row items-center px-3 py-2.5">
          <View className="h-9 w-9 items-center justify-center rounded-full bg-[#E8F8FA]">
            <Ionicons
              name="play-circle"
              size={23}
              color="#087F8C"
            />
          </View>

          <View className="ml-2 flex-1">
            <Text className="text-[9px] font-extrabold text-[#14213D]">
              How will you receive
            </Text>

            <Text className="text-[9px] font-extrabold text-[#14213D]">
              prize money?
            </Text>

            <Text className="mt-0.5 text-[7px] text-slate-400">
              Watch video to know more
            </Text>
          </View>

          <View className="ml-2 border-l border-slate-200 pl-3">
            <View className="flex-row items-center">
              <Ionicons
                name="shield-checkmark-outline"
                size={14}
                color="#14213D"
              />
              <Text className="ml-1 text-[7px] text-slate-600">
                Refund policy
              </Text>
            </View>

            <View className="mt-2 flex-row items-center">
              <Ionicons
                name="shield-checkmark-outline"
                size={14}
                color="#14213D"
              />
              <Text className="ml-1 text-[7px] text-slate-600">
                Secure payments powered by
              </Text>
              <Text className="ml-1 text-[8px] font-extrabold text-[#14213D]">
                Razorpay
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Refer & Earn */}
      <View className="mx-3 mt-2 rounded-xl bg-[#DDF7EA] px-3 py-2.5">
        <View className="flex-row items-center">
          <Ionicons
            name="megaphone-outline"
            size={25}
            color="#087F8C"
          />

          <View className="ml-2 flex-1">
            <Text className="text-[10px] font-extrabold text-[#14213D]">
              Refer & Earn more discount
            </Text>

            <View className="mt-1 flex-row items-center">
              <View className="flex-1 rounded border border-slate-200 bg-white px-2 py-1">
                <Text
                  numberOfLines={1}
                  className="text-[7px] text-slate-500"
                >
                  https://feedants.com/ref/...
                </Text>
              </View>

              <Pressable className="ml-1 rounded border border-slate-200 bg-white px-2 py-1">
                <Text className="text-[7px] font-bold text-slate-600">
                  Copy Link
                </Text>
              </Pressable>
            </View>
          </View>

          <Pressable
            onPress={onRefer}
            className="ml-2 min-w-[70px] items-center rounded-md bg-[#087F8C] px-2 py-2"
          >
            <Text className="text-[8px] font-extrabold text-white">
              Refer Now
            </Text>
          </Pressable>
        </View>

        <Text className="mt-1 text-center text-[7px] text-[#087F8C]">
          You earn ₹10 for every signup
        </Text>
      </View>

      {/* Hear From Our Users */}
      <Pressable
        onPress={onUsers}
        className="mx-3 mt-2 flex-row items-center rounded-xl bg-white px-3 py-2.5"
      >
        <View className="h-7 w-7 items-center justify-center rounded-full bg-[#E8F8FA]">
          <Ionicons
            name="chatbubble-ellipses-outline"
            size={14}
            color="#087F8C"
          />
        </View>

        <View className="ml-2 flex-1">
          <Text className="text-[9px] font-extrabold text-[#14213D]">
            Hear From Our Users
          </Text>

          <Text className="mt-0.5 text-[7px] text-slate-400">
            See what participants say about Feedants.
          </Text>
        </View>

        <Ionicons
          name="chevron-forward"
          size={16}
          color="#14213D"
        />
      </Pressable>

      {/* Ad */}
      <View className="mx-3 mt-2 h-7 items-center justify-center rounded-lg border border-dashed border-slate-300 bg-white">
        <Text className="text-[8px] font-bold text-slate-400">
          Ad Here
        </Text>
      </View>
    </>
  );
};

export default CompetitionBottomSection;