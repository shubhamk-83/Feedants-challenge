import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

const BottomNav = ({ activeTab = "competitions", onChange }) => {
  const items = [
    ["home", "Home", "home-outline", "home"],
    ["explore", "Explore", "search-outline", "search"],
    ["add", "", "add", "add"],
    ["competitions", "Competitions", "trophy-outline", "trophy"],
    ["profile", "Profile", "person-outline", "person"],
  ];

  return (
    <View className="absolute bottom-0 left-0 right-0 border-t border-slate-200 bg-white">
      <View className="h-[64px] flex-row items-center justify-around px-2">
        {items.map(([key, label, icon, activeIcon]) => {
          if (key === "add") {
            return (
              <Pressable
                key={key}
                onPress={() => onChange?.(key)}
                className="h-12 w-12 items-center justify-center rounded-full bg-[#087F8C]">
                <Ionicons name="add" size={29} color="#FFFFFF" />
              </Pressable>
            );
          }

          const active = activeTab === key;

          return (
            <Pressable
              key={key}
              onPress={() => onChange?.(key)}
              className="w-[62px] items-center justify-center">
              <Ionicons
                name={active ? activeIcon : icon}
                size={19}
                color={active ? "#087F8C" : "#94A3B8"}
              />

              <Text
                className={`mt-1 text-[8px] font-extrabold ${
                  active ? "text-[#087F8C]" : "text-slate-400"
                }`}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default BottomNav;
