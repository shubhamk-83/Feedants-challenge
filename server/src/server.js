require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const connectDB = require("./config/db");
const seedCompetition = require("./seed/seedCompetition");
const competitionRoutes = require("./routes/competitionRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(helmet());

app.use(
  cors({
    origin:
      process.env.CLIENT_ORIGIN === "*"
        ? true
        : process.env.CLIENT_ORIGIN,
  })
);

app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Feedants Competition API is running",
    serverTime: new Date().toISOString(),
  });
});

app.use("/api/competitions", competitionRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDB();
    await seedCompetition();

    app.listen(PORT, () => {
      console.log(
        `Feedants Competition API running on http://localhost:${PORT}`
      );
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
