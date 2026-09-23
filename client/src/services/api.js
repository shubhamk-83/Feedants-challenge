import { Platform } from "react-native";
import { API_BASE_URL, DEMO_USER_ID } from "../constants/config";

const BASE_URL =
  Platform.OS === "web"
    ? "http://localhost:5000/api"
    : API_BASE_URL;

const request = async (path, options = {}) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "x-user-id": DEMO_USER_ID,
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }

  return data;
};

export const getFeaturedCompetition = () =>
  request("/competitions/featured");

export const registerForCompetition = (competitionId) =>
  request(`/competitions/${competitionId}/register`, {
    method: "POST",
    body: JSON.stringify({}),
  });

export const submitCompetition = (competitionId, submissionUrl = "") =>
  request(`/competitions/${competitionId}/submissions`, {
    method: "POST",
    body: JSON.stringify({ submissionUrl }),
  });