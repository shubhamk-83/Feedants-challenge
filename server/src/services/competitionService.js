const Competition = require("../models/Competition");
const Registration = require("../models/Registration");
const Submission = require("../models/Submission");
const getCompetitionStatus = require("../utils/competitionStatus");

const toCompetitionResponse = (competition) => {
  const status = getCompetitionStatus(competition);

  return {
    ...competition,
    status,
    remainingSpots: Math.max(
      competition.maxParticipants - competition.participantsCount,
      0
    ),
  };
};

const getFeaturedCompetition = async (userId) => {
  const competition = await Competition.findOne()
    .sort({ createdAt: -1 })
    .lean();

  if (!competition) {
    return null;
  }

  const [registration, submission] = await Promise.all([
    Registration.findOne({
      competitionId: competition._id,
      userId,
      status: "registered",
    }).lean(),
    Submission.findOne({
      competitionId: competition._id,
      userId,
    }).lean(),
  ]);

  return {
    competition: toCompetitionResponse(competition),
    userState: {
      isRegistered: Boolean(registration),
      hasSubmitted: Boolean(submission),
      registrationId: registration?._id || null,
      submission: submission || null,
    },
    serverTime: new Date().toISOString(),
  };
};

const getCompetitionById = async (competitionId, userId) => {
  const competition = await Competition.findById(competitionId).lean();

  if (!competition) {
    return null;
  }

  const [registration, submission] = await Promise.all([
    Registration.findOne({
      competitionId,
      userId,
      status: "registered",
    }).lean(),
    Submission.findOne({
      competitionId,
      userId,
    }).lean(),
  ]);

  return {
    competition: toCompetitionResponse(competition),
    userState: {
      isRegistered: Boolean(registration),
      hasSubmitted: Boolean(submission),
      registrationId: registration?._id || null,
      submission: submission || null,
    },
    serverTime: new Date().toISOString(),
  };
};

module.exports = {
  getFeaturedCompetition,
  getCompetitionById,
};
