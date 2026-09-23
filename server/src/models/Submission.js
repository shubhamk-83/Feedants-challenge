const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema(
  {
    competitionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Competition",
      required: true,
    },
    userId: {
      type: String,
      required: true,
      trim: true,
      maxlength: 120,
    },
    submissionUrl: {
      type: String,
      default: "",
      maxlength: 2048,
    },
    status: {
      type: String,
      enum: ["submitted"],
      default: "submitted",
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

submissionSchema.index(
  { competitionId: 1, userId: 1 },
  { unique: true }
);

module.exports = mongoose.model("Submission", submissionSchema);
