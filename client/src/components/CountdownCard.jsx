import React from "react";
import { Text, View } from "react-native";
import useCountdown from "../hooks/useCountdown";

const TimeBox = ({ value, label }) => {
  return (
    <View className="flex-1 rounded-2xl bg-white/10 px-2 py-3">
      <Text className="text-center text-xl font-extrabold text-white">
        {value}
      </Text>

      <Text className="mt-1 text-center text-[9px] font-semibold uppercase tracking-wider text-white/55">
        {label}
      </Text>
    </View>
  );
};

const CountdownCard = ({ target, label }) => {
  const { days, hours, minutes, seconds } = useCountdown(target);

  return (
    <View className="rounded-3xl bg-navy p-5">
      <View className="mb-4 flex-row items-center justify-between">
        <Text className="text-xs font-bold uppercase tracking-[1.8px] text-white/60">
          {label}
        </Text>

        <Text className="text-lg">⏱</Text>
      </View>

      <View className="flex-row gap-2">
        <TimeBox value={days} label="Days" />
        <TimeBox value={hours} label="Hours" />
        <TimeBox value={minutes} label="Min" />
        <TimeBox value={seconds} label="Sec" />
      </View>
    </View>
  );
};

export default CountdownCard;
