const Competition = require("../models/Competition");

const seedCompetition = async () => {
  const existing = await Competition.findOne();

  if (existing) {
    console.log(`Demo competition already exists: ${existing._id}`);
    return existing;
  }

  const now = Date.now();

  const competition = await Competition.create({
    title: "Feedants Classical Dance",
    subtitle: "Show your creativity. Compete. Win.",
    category: "CLASSICAL DANCE",
    imageUrl:
      "https://images.unsplash.com/photo-1504609813442-a8924e83f76e?auto=format&fit=crop&w=1200&q=85",

    prizePool: 50000,
    entryFee: 99,

    maxParticipants: 100,
    participantsCount: 37,

    registrationStart: new Date(now - 24 * 60 * 60 * 1000),
    registrationEnd: new Date(now + 3 * 24 * 60 * 60 * 1000),
    submissionStart: new Date(now + 3 * 24 * 60 * 60 * 1000),
    submissionEnd: new Date(now + 10 * 24 * 60 * 60 * 1000),
    resultDate: new Date(now + 14 * 24 * 60 * 60 * 1000),

    judge: {
      name: "Ananya Sharma",
      role: "Professional Choreographer",
      imageUrl:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
    },

    previousWinners: [
      { rank: 1, name: "Priya S.", reward: "₹20,000" },
      { rank: 2, name: "Rahul M.", reward: "₹12,000" },
      { rank: 3, name: "Neha K.", reward: "₹8,000" },
    ],

    about:
      "A creative classical dance competition for performers who want to showcase technique, expression and originality.",

    judgingParameters: [
      "Technique and precision",
      "Expression and storytelling",
      "Creativity and originality",
      "Stage presence",
    ],

    rules: [
      "Submit an original performance.",
      "Keep the submission within the specified duration.",
      "Follow the competition theme.",
      "Only one active registration is allowed per user.",
    ],

    eligibility: [
      "Open to eligible participants.",
      "Participants must complete registration before the deadline.",
    ],

    rewards: [
      "Cash prizes for top performers",
      "Digital certificate",
      "Featured winner profile",
    ],
  });

  console.log(`Demo competition created: ${competition._id}`);
  return competition;
};

module.exports = seedCompetition;
