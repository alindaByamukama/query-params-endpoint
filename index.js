import express from "express";
import dotenv from "dotenv";
import moment from "moment";

// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());

// GET ROUTE & HELPER FUNCTIONS

const getCurrentDay = () => {
  return moment().utc().format("dddd");
};

const getCurrentUTCTime = () => {
  const currentUTC = moment().utc();
  const allowedDeviation = 2;
  const currentTime = moment.utc();

  if (Math.abs(currentTime.diff(currentUTC, "minutes")) <= allowedDeviation) {
    return currentUTC.format("YYYY-MM-DDTHH:mm:ss[Z]");
  } else {
    return null;
  }
};

app.get("/api", (req, res) => {
  try {
    const { slack_name, track } = req.query;

    const currentDay = getCurrentDay();
    const utcTime = getCurrentUTCTime();

    const responseData = {
      slack_name,
      current_day: currentDay,
      utc_time: utcTime,
      track,
      github_repo_url:
        "https://github.com/alindaByamukama/query-params-endpoint",
      github_file_url:
        "https://github.com/alindaByamukama/query-params-endpoint/blob/main/index.js",
      status_code: 200,
    };

    res.status(200).json(responseData);
  } catch (error) {
    res
      .status(400)
      .json({ error: "Invalid parameters or time deviation > 2 minutes" });
  }
});

app.get("/", (req, res) => {
  const response = {
    message: "Query with /api?slack_name=example_name&track=backend.",
  };

  res.status(200).json(response);
});

// EXPRESS SERVER

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
