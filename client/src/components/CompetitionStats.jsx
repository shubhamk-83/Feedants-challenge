import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const CompetitionStats = ({ competition }) => {
  const maxParticipants = Math.max(
    0,
    Number(competition?.maxParticipants ?? 0),
  );

  const remainingSpots = Math.max(0, Number(competition?.remainingSpots ?? 0));

  const booked = Math.max(0, maxParticipants - remainingSpots);

  const progress =
    maxParticipants > 0 ? Math.min(100, (booked / maxParticipants) * 100) : 0;

  const prizePool = Number(competition?.prizePool ?? 0);
  const entryFee = Number(competition?.entryFee ?? 0);

  return (
    <View className="mt-1">
      <View className="flex-row">
        {/* Prize Pool */}
        <View className="flex-1 pr-3">
          <Text className="text-[10px] font-medium text-slate-500">
            Prize Pool
          </Text>

          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            className="mt-1 text-[23px] font-extrabold text-[#087F8C]">
            ₹{prizePool.toLocaleString("en-IN")}
          </Text>
        </View>

        {/* Entry Fee */}
        <View className="flex-1 border-l border-slate-100 px-3">
          <Text className="text-[10px] font-medium text-slate-500">
            Entry Fee
          </Text>

          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            className="mt-1 text-[23px] font-extrabold text-[#14213D]">
            ₹{entryFee.toLocaleString("en-IN")}
          </Text>
        </View>

        {/* Participants */}
        <View className="flex-[1.45] border-l border-slate-100 pl-3">
          <View className="flex-row items-center">
            <Ionicons name="people-outline" size={16} color="#087F8C" />

            <Text
              numberOfLines={1}
              className="ml-1 flex-1 text-[10px] font-extrabold text-[#087F8C]">
              {remainingSpots} spots left
            </Text>
          </View>

          {/* Progress */}
          <View className="mt-2 h-1.5 overflow-hidden rounded-full bg-[#DDEDEF]">
            <View
              className="h-full rounded-full bg-[#087F8C]"
              style={{
                width: `${Math.max(progress, booked > 0 ? 5 : 0)}%`,
              }}
            />
          </View>

          <Text className="mt-1 text-[9px] font-medium text-slate-500">
            {booked}/{maxParticipants} Booked
          </Text>
        </View>
      </View>
    </View>
  );
};

export default CompetitionStats;
