import React from "react";
import { Pressable, Text, View } from "react-native";

const CompetitionTabs = ({ competition, activeTab, setActiveTab }) => {
  const tabs = [
    ["about", "About"],
    ["judging", "Judging"],
    ["rules", "Rules"],
  ];

  const judgingParameters = competition?.judgingParameters || [];
  const rules = competition?.rules || [];
  const eligibility = competition?.eligibility || [];

  return (
    <View className="mx-3 mt-3 overflow-hidden rounded-2xl bg-white">
      {/* Tabs */}
      <View className="flex-row border-b border-slate-200">
        {tabs.map(([key, label]) => {
          const active = activeTab === key;

          return (
            <Pressable
              key={key}
              onPress={() => setActiveTab(key)}
              className="relative flex-1 items-center py-4">
              <Text
                className={`text-[11px] font-extrabold ${
                  active ? "text-[#087F8C]" : "text-slate-500"
                }`}>
                {label}
              </Text>

              {active ? (
                <View className="absolute bottom-0 h-[2px] w-16 rounded-full bg-[#087F8C]" />
              ) : null}
            </Pressable>
          );
        })}
      </View>

      {/* Content */}
      <View className="p-4">
        {activeTab === "about" ? (
          <View>
            <Text className="text-sm leading-6 text-slate-600">
              {competition?.about ||
                "Competition details will be announced soon."}
            </Text>
          </View>
        ) : null}

        {activeTab === "judging" ? (
          <View>
            {judgingParameters.length > 0 ? (
              judgingParameters.map((item, index) => (
                <View
                  key={`${item}-${index}`}
                  className={`flex-row ${
                    index !== judgingParameters.length - 1 ? "mb-4" : ""
                  }`}>
                  <View className="mr-3 h-7 w-7 items-center justify-center rounded-full bg-[#E8F8FA]">
                    <Text className="text-xs font-extrabold text-[#087F8C]">
                      {index + 1}
                    </Text>
                  </View>

                  <Text className="flex-1 pt-1 text-sm leading-5 text-slate-600">
                    {item}
                  </Text>
                </View>
              ))
            ) : (
              <Text className="text-sm text-slate-500">
                Judging parameters will be announced soon.
              </Text>
            )}
          </View>
        ) : null}

        {activeTab === "rules" ? (
          <View>
            {rules.map((item, index) => (
              <RuleItem key={`rule-${index}`} text={item} />
            ))}

            {eligibility.map((item, index) => (
              <RuleItem key={`eligibility-${index}`} text={item} />
            ))}

            {rules.length === 0 && eligibility.length === 0 ? (
              <Text className="text-sm text-slate-500">
                Rules and eligibility details will be announced soon.
              </Text>
            ) : null}
          </View>
        ) : null}
      </View>
    </View>
  );
};

const RuleItem = ({ text }) => {
  return (
    <View className="mb-3 flex-row">
      <View className="mr-3 mt-0.5 h-5 w-5 items-center justify-center rounded-full bg-[#E8F8FA]">
        <Text className="text-[10px] font-extrabold text-[#087F8C]">✓</Text>
      </View>

      <Text className="flex-1 text-sm leading-5 text-slate-600">{text}</Text>
    </View>
  );
};

export default CompetitionTabs;
