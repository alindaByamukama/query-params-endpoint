import express from "express";
import dotenv from "dotenv";

// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());

// GET ROUTE with HELPER FUNCTIONS

app.get("/api", (req, res) => {
  const { slack_name, track } = req.query;
  const currentDate = new Date();

  const getDayOfWeek = (date) => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysOfWeek[date.getUTCDay()];
  };

  const getCurrentUTCTimeWithTolerance = (date) => {
    const toleranceMinutes = 2 * 60000;
    const currentUtcTime = date.toISOString();
    const currentUtcTimeWithTolerance = new Date(
      new Date(currentUtcTime).getTime() + toleranceMinutes
    ).toISOString();

    return currentUtcTimeWithTolerance;
  };

  const currentDayOfWeek = getDayOfWeek(currentDate);
  const currentUtcTime = getCurrentUTCTimeWithTolerance(currentDate);

  const githubRepoUrl =
    "https://github.com/alindaByamukama/query-params-endpoint";
  const githubFileUrl =
    "https://github.com/alindaByamukama/query-params-endpoint/blob/main/index.js";

  const response = {
    slack_name,
    current_day_of_week: currentDayOfWeek,
    current_utc_time: currentUtcTime,
    track,
    github_repo_url: githubRepoUrl,
    github_file_url: githubFileUrl,
    status_code: 200,
  };

  res.json(response);
});

app.get("/", (req, res) => {
  const response = {
    message: "Query with 'api?slack_name=example_name&track=backend'.",
  };

  res.json(response);
});

// EXPRESS SERVER

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
