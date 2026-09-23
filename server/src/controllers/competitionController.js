const Competition = require("../models/Competition");
const Registration = require("../models/Registration");
const Submission = require("../models/Submission");
const getCompetitionStatus = require("../utils/competitionStatus");
const {
  getFeaturedCompetition,
  getCompetitionById,
} = require("../services/competitionService");

const getUserId = (req) => req.header("x-user-id") || "demo-user-001";

const getFeatured = async (req, res, next) => {
  try {
    const data = await getFeaturedCompetition(getUserId(req));

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No competition found",
      });
    }

    return res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const data = await getCompetitionById(req.params.id, getUserId(req));

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Competition not found",
      });
    }

    return res.json({ success: true, data });
  } catch (error) {
    next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const { id: competitionId } = req.params;
    const now = new Date();

    const competition = await Competition.findById(competitionId);

    if (!competition) {
      return res.status(404).json({
        success: false,
        message: "Competition not found",
      });
    }

    const status = getCompetitionStatus(competition, now);

    if (status !== "REGISTRATION_OPEN") {
      return res.status(409).json({
        success: false,
        message: `Registration is not available while the competition is ${status
          .toLowerCase()
          .replaceAll("_", " ")}`,
      });
    }

    const existingRegistration = await Registration.findOne({
      competitionId,
      userId,
      status: "registered",
    });

    if (existingRegistration) {
      return res.status(409).json({
        success: false,
        message: "You are already registered for this competition",
      });
    }

    // Critical concurrency guard:
    // only a document whose participant count is below capacity can be updated.
    const reservedCompetition = await Competition.findOneAndUpdate(
      {
        _id: competitionId,
        participantsCount: { $lt: competition.maxParticipants },
        registrationStart: { $lte: now },
        registrationEnd: { $gte: now },
      },
      { $inc: { participantsCount: 1 } },
      { new: true }
    );

    if (!reservedCompetition) {
      return res.status(409).json({
        success: false,
        message: "No participation spots are available",
      });
    }

    try {
      const registration = await Registration.create({
        competitionId,
        userId,
      });

      return res.status(201).json({
        success: true,
        message: "Registration successful",
        data: {
          registration,
          remainingSpots: Math.max(
            reservedCompetition.maxParticipants -
              reservedCompetition.participantsCount,
            0
          ),
        },
      });
    } catch (registrationError) {
      // Keep the capacity counter consistent if registration creation fails.
      await Competition.updateOne(
        {
          _id: competitionId,
          participantsCount: { $gt: 0 },
        },
        { $inc: { participantsCount: -1 } }
      );

      if (registrationError.code === 11000) {
        return res.status(409).json({
          success: false,
          message: "You are already registered for this competition",
        });
      }

      throw registrationError;
    }
  } catch (error) {
    next(error);
  }
};

const submit = async (req, res, next) => {
  try {
    const userId = getUserId(req);
    const { id: competitionId } = req.params;
    const submissionUrl =
      typeof req.body?.submissionUrl === "string"
        ? req.body.submissionUrl.trim()
        : "";

    const competition = await Competition.findById(competitionId);

    if (!competition) {
      return res.status(404).json({
        success: false,
        message: "Competition not found",
      });
    }

    const status = getCompetitionStatus(competition);

    if (status !== "SUBMISSION_OPEN") {
      return res.status(409).json({
        success: false,
        message: "Submission is not currently open",
      });
    }

    const registration = await Registration.findOne({
      competitionId,
      userId,
      status: "registered",
    });

    if (!registration) {
      return res.status(403).json({
        success: false,
        message: "You must register before submitting",
      });
    }

    const submission = await Submission.findOneAndUpdate(
      { competitionId, userId },
      {
        competitionId,
        userId,
        submissionUrl,
        status: "submitted",
        submittedAt: new Date(),
      },
      {
        upsert: true,
        new: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.json({
      success: true,
      message: "Submission saved successfully",
      data: submission,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getFeatured,
  getById,
  register,
  submit,
};
