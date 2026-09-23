const mongoose = require("mongoose");

const winnerSchema = new mongoose.Schema(
  {
    rank: { type: Number, required: true, min: 1 },
    name: { type: String, required: true, trim: true },
    reward: { type: String, required: true, trim: true },
  },
  { _id: false },
);

const judgeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    imageUrl: { type: String, default: "" },
  },
  { _id: false },
);

const competitionSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 120 },
    subtitle: { type: String, default: "", maxlength: 240 },
    category: { type: String, required: true, trim: true, maxlength: 80 },
    imageUrl: { type: String, default: "" },

    prizePool: { type: Number, required: true, min: 0 },
    entryFee: { type: Number, required: true, min: 0 },

    maxParticipants: { type: Number, required: true, min: 1 },
    participantsCount: { type: Number, default: 0, min: 0 },

    registrationStart: { type: Date, required: true },
    registrationEnd: { type: Date, required: true },
    submissionStart: { type: Date, required: true },
    submissionEnd: { type: Date, required: true },
    resultDate: { type: Date, required: true },

    judge: { type: judgeSchema, required: true },
    previousWinners: { type: [winnerSchema], default: [] },

    about: { type: String, default: "" },
    judgingParameters: { type: [String], default: [] },
    rules: { type: [String], default: [] },
    eligibility: { type: [String], default: [] },
    rewards: { type: [String], default: [] },
  },
  { timestamps: true },
);

competitionSchema.index({
  registrationStart: 1,
  registrationEnd: 1,
});

module.exports = mongoose.model("Competition", competitionSchema);
