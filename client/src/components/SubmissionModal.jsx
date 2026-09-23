import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SubmissionModal = ({ visible, onClose, onSubmit, loading = false }) => {
  const [submissionUrl, setSubmissionUrl] = useState("");

  const handleSubmit = () => {
    onSubmit(submissionUrl.trim());
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}>
      <KeyboardAvoidingView
        className="flex-1 justify-end bg-black/40"
        behavior={Platform.OS === "ios" ? "padding" : undefined}>
        <Pressable className="flex-1" onPress={onClose} />

        <View className="rounded-t-3xl bg-white px-5 pb-7 pt-3">
          <View className="mb-5 items-center">
            <View className="h-1.5 w-12 rounded-full bg-slate-200" />
          </View>

          <View className="flex-row items-start justify-between">
            <View className="flex-1 pr-4">
              <Text className="text-xl font-extrabold text-[#14213D]">
                Submit Your Entry
              </Text>

              <Text className="mt-1 text-xs leading-5 text-slate-500">
                Add your submission link to participate in the competition.
              </Text>
            </View>

            <Pressable
              onPress={onClose}
              className="h-9 w-9 items-center justify-center rounded-full bg-slate-100"
              hitSlop={8}>
              <Ionicons name="close" size={20} color="#475569" />
            </Pressable>
          </View>

          <View className="mt-5">
            <Text className="mb-2 text-xs font-extrabold text-[#14213D]">
              Submission URL
            </Text>

            <View className="flex-row items-center rounded-xl border border-slate-200 bg-[#F8FAFC] px-3">
              <Ionicons name="link-outline" size={19} color="#087F8C" />

              <TextInput
                value={submissionUrl}
                onChangeText={setSubmissionUrl}
                placeholder="https://..."
                placeholderTextColor="#94A3B8"
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="url"
                className="ml-2 flex-1 py-3.5 text-sm text-[#14213D]"
              />
            </View>
          </View>

          <View className="mt-3 flex-row rounded-xl bg-[#E8F8FA] p-3">
            <Ionicons
              name="information-circle-outline"
              size={17}
              color="#087F8C"
            />

            <Text className="ml-2 flex-1 text-[10px] leading-4 text-[#087F8C]">
              Make sure your submission link is accessible to the competition
              team before submitting.
            </Text>
          </View>

          <View className="mt-5 flex-row">
            <Pressable
              onPress={onClose}
              disabled={loading}
              className="mr-2 flex-1 items-center justify-center rounded-xl border border-slate-200 py-3.5">
              <Text className="text-sm font-extrabold text-slate-600">
                Cancel
              </Text>
            </Pressable>

            <Pressable
              onPress={handleSubmit}
              disabled={loading}
              className={`ml-2 flex-1 items-center justify-center rounded-xl py-3.5 ${
                loading ? "bg-slate-300" : "bg-[#087F8C]"
              }`}>
              {loading ? (
                <Text className="text-sm font-extrabold text-white">
                  Submitting...
                </Text>
              ) : (
                <View className="flex-row items-center">
                  <Ionicons
                    name="paper-plane-outline"
                    size={16}
                    color="#FFFFFF"
                  />

                  <Text className="ml-2 text-sm font-extrabold text-white">
                    Submit Entry
                  </Text>
                </View>
              )}
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default SubmissionModal;
