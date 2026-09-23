import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

const ImportantDates = ({ competition, formatDate }) => {
  return (
    <View className="mx-3 mt-3 rounded-2xl bg-white p-4">
      <Text className="text-base font-extrabold text-[#14213D]">
        Important Dates
      </Text>

      <View className="mt-3 overflow-hidden rounded-xl border border-slate-200">
        <View className="flex-row">
          <DateBox
            icon="calendar-outline"
            label="Register Before"
            value={formatDate(competition?.registrationEnd)}
            right
          />

          <DateBox
            icon="paper-plane-outline"
            label="Submission Starts"
            value={formatDate(competition?.submissionStart)}
          />
        </View>

        <View className="border-t border-slate-200" />

        <View className="flex-row">
          <DateBox
            icon="cloud-upload-outline"
            label="Submission Ends"
            value={formatDate(competition?.submissionEnd)}
            right
          />

          <DateBox
            icon="trophy-outline"
            label="Result Date"
            value={formatDate(competition?.resultDate)}
          />
        </View>
      </View>
    </View>
  );
};

const DateBox = ({ icon, label, value, right }) => {
  return (
    <View
      className={`min-h-[76px] flex-1 justify-center p-3 ${
        right ? "border-r border-slate-200" : ""
      }`}>
      <View className="flex-row items-start">
        <View className="h-8 w-8 items-center justify-center rounded-full bg-[#E8F8FA]">
          <Ionicons name={icon} size={17} color="#087F8C" />
        </View>

        <View className="ml-2 flex-1">
          <Text className="text-[9px] font-medium text-slate-500">{label}</Text>

          <Text
            numberOfLines={2}
            className="mt-1 text-[11px] font-extrabold leading-4 text-[#087F8C]">
            {value}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ImportantDates;
