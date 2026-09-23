import React from "react";
import { SafeAreaView } from "react-native";
import { StatusBar } from "expo-status-bar";
import Toast from "react-native-toast-message";

import "./global.css";
import CompetitionDetails from "./src/screens/CompetitionDetails";

const App = () => {
  return (
    <SafeAreaView className="flex-1 bg-surface">
      <StatusBar style="light" backgroundColor="#101828" />

      <CompetitionDetails />

      <Toast />
    </SafeAreaView>
  );
};

export default App;
