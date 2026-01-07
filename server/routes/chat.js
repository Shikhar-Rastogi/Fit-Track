const express = require("express");
const router = express.Router();
const Workout = require("../models/Workout");
const { generateResponse } = require("../services/ai");

router.post("/", async (req, res) => {
  const { message, user } = req.body;

  if (!user?._id) {
    return res.json({
      reply: "Please login to get personalized fitness advice 💪",
    });
  }

  // RAG: fetch recent workouts
  const workouts = await Workout.find({ user: user._id })
    .sort({ date: -1 })
    .limit(7);

  const context = workouts
    .map(
      (w) =>
        `• ${w.workoutName} (${w.category}) - ${w.caloriesBurned || 0} kcal`
    )
    .join("\n");

  const prompt = `
User recent workouts:
${context || "No workouts logged yet"}

User question:
"${message}"

Give a clear, motivating fitness recommendation.
`;

  const reply = await generateResponse(prompt);
  res.json({ reply });
});

module.exports = router;
