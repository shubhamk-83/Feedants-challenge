import React from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const PreviousWinners = ({ winners = [] }) => {
  const getWinnerLabel = (rank) => {
    if (rank === 1) return "1st Winner";
    if (rank === 2) return "2nd Winner";
    if (rank === 3) return "3rd Winner";
    return `${rank}th Winner`;
  };

  const getWinnerImage = (winner) => {
    if (winner?.imageUrl) {
      return winner.imageUrl;
    }

    if (winner?.rank === 1) {
      return "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80";
    }

    if (winner?.rank === 2) {
      return "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80";
    }

    return "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=300&q=80";
  };

  return (
    <View className="mx-3 mt-3 rounded-2xl bg-white py-4">
      <Text className="mb-3 px-4 text-base font-extrabold text-[#14213D]">
        Previous Winners
      </Text>

      {winners.length > 0 ? (
        <ScrollView
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: 12,
            paddingRight: 24,
          }}>
          {winners.map((winner) => (
            <View
              key={`${winner.rank}-${winner.name}`}
              className="mr-3 w-[170px] overflow-hidden rounded-xl border border-slate-100 bg-[#F8FAFC]">
              <View className="relative h-[92px] w-full">
                <Image
                  source={{ uri: getWinnerImage(winner) }}
                  className="h-full w-full"
                  resizeMode="cover"
                />

                <View className="absolute bottom-2 left-2 flex-row items-center rounded-full bg-white px-2 py-1">
                  <Ionicons name="trophy" size={11} color="#087F8C" />

                  <Text className="ml-1 text-[9px] font-extrabold text-[#087F8C]">
                    {getWinnerLabel(winner.rank)}
                  </Text>
                </View>
              </View>

              <View className="p-3">
                <Text
                  numberOfLines={1}
                  className="text-xs font-extrabold text-[#14213D]">
                  {winner.name}
                </Text>

                <Text
                  numberOfLines={1}
                  className="mt-1 text-[10px] font-semibold text-slate-500">
                  {winner.reward}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : (
        <View className="mx-4 rounded-xl bg-slate-50 p-4">
          <Text className="text-center text-xs text-slate-500">
            Previous winners will be announced soon.
          </Text>
        </View>
      )}
    </View>
  );
};

export default PreviousWinners;
