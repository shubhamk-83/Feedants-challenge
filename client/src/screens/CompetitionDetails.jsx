import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Linking,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";

import CompetitionHero from "../components/CompetitionHero";
import CompetitionStats from "../components/CompetitionStats";
import JudgeCard from "../components/JudgeCard";
import ImportantDates from "../components/ImportantDates";
import PreviousWinners from "../components/PreviousWinners";
import CompetitionTabs from "../components/CompetitionTabs";
import Rewards from "../components/Rewards";
import CompetitionBottomSection from "../components/CompetitionBottomSection";
import SubmissionModal from "../components/SubmissionModal";
import BottomNav from "../components/BottomNav";

import {
  getFeaturedCompetition,
  registerForCompetition,
  submitCompetition,
} from "../services/api";

import { useCountdown } from "../hooks/useCountdown";

const CompetitionDetails = () => {
  const [competition, setCompetition] = useState(null);
  const [userState, setUserState] = useState(null);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [activeTab, setActiveTab] = useState("about");
  const [activeNav, setActiveNav] = useState("competitions");

  const [submissionModalVisible, setSubmissionModalVisible] = useState(false);
  const [submissionUrl, setSubmissionUrl] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [registering, setRegistering] = useState(false);

  const loadCompetition = async (showLoader = true) => {
    try {
      if (showLoader) {
        setLoading(true);
      }

      const payload = await getFeaturedCompetition();

      // API returns { success: true, data: { competition, userState } }
      // Keep this compatible with either wrapped or unwrapped responses.
      const responseData = payload?.data || payload;

      setCompetition(responseData?.competition || null);
      setUserState(responseData?.userState || null);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Unable to load competition",
        text2: error.message || "Please try again.",
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadCompetition();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadCompetition(false);
  };

  const formatDate = (date) => {
    if (!date) return "Not announced";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) return "Not announced";

    return new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const action = useMemo(() => {
    if (!competition) {
      return {
        type: "none",
        title: "Loading...",
        disabled: true,
      };
    }

    if (userState?.isRegistered) {
      if (competition.status === "SUBMISSION_OPEN") {
        return {
          type: "submission",
          title: userState?.hasSubmitted
            ? "Submission Uploaded"
            : "Upload Submission",
          disabled: Boolean(userState?.hasSubmitted),
        };
      }

      return {
        type: "registered",
        title: "Registered",
        disabled: false,
      };
    }

    if (competition.status === "REGISTRATION_OPEN") {
      return {
        type: "register",
        title: "Register Now",
        disabled: false,
      };
    }

    return {
      type: "closed",
      title: "Registration Closed",
      disabled: true,
    };
  }, [competition, userState]);

  const countdownTarget = useMemo(() => {
    if (!competition) return null;

    if (competition.status === "UPCOMING") {
      return competition.registrationStart;
    }

    if (competition.status === "REGISTRATION_OPEN") {
      return competition.registrationEnd;
    }

    if (competition.status === "SUBMISSION_OPEN") {
      return competition.submissionEnd;
    }

    if (competition.status === "JUDGING") {
      return competition.resultDate;
    }

    return null;
  }, [competition]);

  const countdown = useCountdown(countdownTarget);

  const handleRegister = async () => {
    if (!competition || registering) return;

    try {
      setRegistering(true);

      await registerForCompetition(competition._id);

      Toast.show({
        type: "success",
        text1: "Registration successful",
        text2: "You are now registered for the competition.",
      });

      await loadCompetition(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Registration failed",
        text2: error.message || "Please try again.",
      });
    } finally {
      setRegistering(false);
    }
  };

  const handleAction = () => {
    if (!competition || registering || submitting) return;

    if (action.type === "register") {
      handleRegister();
      return;
    }

    if (action.type === "submission") {
      setSubmissionUrl("");
      setSubmissionModalVisible(true);
      return;
    }

    if (action.type === "registered") {
      Toast.show({
        type: "info",
        text1: "Already registered",
        text2:
          competition.status === "REGISTRATION_OPEN"
            ? "You are already registered for this competition."
            : "Submission will open during the submission phase.",
      });

      return;
    }

    Toast.show({
      type: "info",
      text1: "Registration unavailable",
      text2: "Registration is currently closed.",
    });
  };

  const handleSubmission = async () => {
    const trimmedUrl = submissionUrl.trim();

    if (!trimmedUrl) {
      Toast.show({
        type: "error",
        text1: "Submission link required",
        text2: "Please enter your project URL.",
      });

      return;
    }

    try {
      new URL(trimmedUrl);
    } catch {
      Toast.show({
        type: "error",
        text1: "Invalid URL",
        text2: "Please enter a valid project URL.",
      });

      return;
    }

    try {
      setSubmitting(true);

      await submitCompetition(competition._id, trimmedUrl);

      setSubmissionModalVisible(false);
      setSubmissionUrl("");

      Toast.show({
        type: "success",
        text1: "Submission uploaded",
        text2: "Your project has been submitted successfully.",
      });

      await loadCompetition(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Submission failed",
        text2: error.message || "Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleJudgeVideo = async () => {
    if (!competition?.judge?.videoUrl) {
      Toast.show({
        type: "info",
        text1: "Video unavailable",
        text2: "Judge introduction video is not available.",
      });

      return;
    }

    try {
      await Linking.openURL(competition.judge.videoUrl);
    } catch {
      Toast.show({
        type: "error",
        text1: "Unable to open video",
        text2: "Please try again.",
      });
    }
  };

  const handleBack = () => {
    Alert.alert(
      "Feedants Competition",
      "You are viewing the competition details."
    );
  };

  const handleRefer = () => {
    Toast.show({
      type: "info",
      text1: "Refer & Earn",
      text2: "Referral sharing can be connected here.",
    });
  };

  const handleUsers = () => {
    Toast.show({
      type: "info",
      text1: "Hear From Our Users",
      text2: "User stories can be connected here.",
    });
  };

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F4F7F9]">
        <ActivityIndicator size="large" color="#087F8C" />

        <Text className="mt-3 text-sm font-semibold text-slate-500">
          Loading competition...
        </Text>
      </View>
    );
  }

  if (!competition) {
    return (
      <View className="flex-1 items-center justify-center bg-[#F4F7F9] px-6">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-[#E8F8FA]">
          <Ionicons
            name="alert-circle-outline"
            size={32}
            color="#087F8C"
          />
        </View>

        <Text className="mt-4 text-lg font-extrabold text-[#14213D]">
          Competition unavailable
        </Text>

        <Text className="mt-2 text-center text-sm leading-5 text-slate-500">
          We couldn't load the competition details right now.
        </Text>

        <Pressable
          onPress={() => loadCompetition()}
          className="mt-5 rounded-xl bg-[#087F8C] px-6 py-3"
        >
          <Text className="font-extrabold text-white">Try Again</Text>
        </Pressable>
      </View>
    );
  }

  const spotsLeft = Math.max(
    0,
    Number(competition.remainingSpots ?? 0)
  );

  const isFull =
    competition.status === "FULL" || spotsLeft <= 0;

  return (
    <View className="flex-1 bg-[#F4F7F9]">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor="#087F8C"
          />
        }
        contentContainerStyle={{
          paddingBottom: 145,
        }}
      >
        <CompetitionHero
          competition={competition}
          userState={userState}
          onBack={handleBack}
        />

        <View className="mx-3 rounded-b-2xl bg-white px-4 pb-4">
          <CompetitionStats competition={competition} />
        </View>

        {/* Countdown strip */}
        <View className="mx-3 mt-2 flex-row items-center rounded-xl bg-[#E8F8FA] px-3 py-2">
          <Ionicons
            name="hourglass-outline"
            size={15}
            color="#087F8C"
          />

          <Text className="ml-2 flex-1 text-[9px] font-extrabold text-[#14213D]">
            {competition.status === "REGISTRATION_OPEN"
              ? "Registration closes in"
              : competition.status === "SUBMISSION_OPEN"
              ? "Submission closes in"
              : "Next milestone"}
          </Text>

          <Text className="text-[10px] font-extrabold text-[#087F8C]">
            {countdownTarget
              ? countdown.formatted
              : "Schedule unavailable"}
          </Text>

          <Ionicons
            name="alarm-outline"
            size={15}
            color="#087F8C"
            style={{ marginLeft: 7 }}
          />

          <Text className="ml-1 text-[8px] font-bold text-[#087F8C]">
            Hurry up!
          </Text>
        </View>

        <ImportantDates
          competition={competition}
          formatDate={formatDate}
        />

        <JudgeCard
          judge={competition.judge}
          onVideoPress={handleJudgeVideo}
        />

        <PreviousWinners
          winners={competition.previousWinners || []}
        />

        <CompetitionTabs
          competition={competition}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <Rewards
          rewards={competition.rewards || []}
          previousWinners={competition.previousWinners || []}
        />

        <CompetitionBottomSection
          competition={competition}
          onRefer={handleRefer}
          onUsers={handleUsers}
        />

        <View className="h-2" />
      </ScrollView>

      {/* Upload Submission / Register sticky bar */}
      <View className="absolute bottom-[64px] left-0 right-0 border-t border-slate-200 bg-white px-3 py-2">
        <View className="flex-row items-center">
          <View className="flex-1">
            <Text className="text-[8px] text-slate-500">
              Entry Fee
            </Text>

            <Text className="mt-0.5 text-base font-extrabold text-[#14213D]">
              ₹
              {Number(
                competition.entryFee || 0
              ).toLocaleString("en-IN")}
            </Text>
          </View>

          <Pressable
            onPress={handleAction}
            disabled={
              action.disabled ||
              registering ||
              submitting ||
              (action.type === "register" && isFull)
            }
            className={`min-w-[185px] rounded-lg px-4 py-2.5 ${
              action.disabled ||
              registering ||
              submitting ||
              (action.type === "register" && isFull)
                ? "bg-slate-300"
                : "bg-[#087F8C]"
            }`}
          >
            {registering ? (
              <View className="items-center">
                <ActivityIndicator
                  size="small"
                  color="#FFFFFF"
                />

                <Text className="mt-0.5 text-[7px] text-white">
                  Registering...
                </Text>
              </View>
            ) : (
              <>
                <Text className="text-center text-xs font-extrabold text-white">
                  {isFull && action.type === "register"
                    ? "Competition Full"
                    : action.type === "registered"
                    ? "Upload Submission"
                    : action.title}
                </Text>

                {action.type === "registered" ? (
                  <Text className="mt-0.5 text-center text-[7px] text-white">
                    Registered
                  </Text>
                ) : null}
              </>
            )}
          </Pressable>
        </View>
      </View>

      {/* Bottom navigation */}
      <BottomNav
        activeTab={activeNav}
        onChange={setActiveNav}
      />

      <SubmissionModal
        visible={submissionModalVisible}
        submissionUrl={submissionUrl}
        setSubmissionUrl={setSubmissionUrl}
        onClose={() => {
          if (!submitting) {
            setSubmissionModalVisible(false);
          }
        }}
        onSubmit={handleSubmission}
        submitting={submitting}
      />
    </View>
  );
};

export default CompetitionDetails;