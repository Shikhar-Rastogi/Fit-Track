const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const { createError } = require("../error.js");
const User = require("../models/User.js");
const Workout = require("../models/Workout.js");

dotenv.config();

/* =========================
   AUTH CONTROLLERS
========================= */

const UserRegister = async (req, res, next) => {
  try {
    const { email, password, name, img } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(409, "Email is already in use"));
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      img,
    });

    const createdUser = await user.save();

    const token = jwt.sign(
      { id: createdUser._id },
      process.env.JWT,
      { expiresIn: "3650d" }
    );

    res.status(200).json({ token, user: createdUser });
  } catch (error) {
    next(error);
  }
};

const UserLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return next(createError(404, "User not found"));

    const isPasswordCorrect = bcrypt.compareSync(password, user.password);
    if (!isPasswordCorrect)
      return next(createError(403, "Incorrect password"));

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT,
      { expiresIn: "3650d" }
    );

    res.status(200).json({ token, user });
  } catch (error) {
    next(error);
  }
};

/* =========================
   DASHBOARD CONTROLLER
========================= */

const getUserDashboard = async (req, res, next) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.user.id);

    /* ---------- DATE RANGES ---------- */
    const startToday = new Date();
    startToday.setHours(0, 0, 0, 0);

    const endToday = new Date();
    endToday.setHours(23, 59, 59, 999);

    const startYesterday = new Date(startToday);
    startYesterday.setDate(startYesterday.getDate() - 1);

    const endYesterday = new Date(endToday);
    endYesterday.setDate(endYesterday.getDate() - 1);

    /* ---------- TODAY CALORIES ---------- */
    const todayCaloriesAgg = await Workout.aggregate([
      {
        $match: {
          user: userObjectId,
          createdAt: { $gte: startToday, $lte: endToday },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: { $ifNull: ["$caloriesBurned", 0] } },
        },
      },
    ]);

    const totalCaloriesBurnt = todayCaloriesAgg[0]?.total || 0;

    /* ---------- YESTERDAY CALORIES ---------- */
    const yesterdayCaloriesAgg = await Workout.aggregate([
      {
        $match: {
          user: userObjectId,
          createdAt: { $gte: startYesterday, $lte: endYesterday },
        },
      },
      {
        $group: {
          _id: null,
          total: { $sum: { $ifNull: ["$caloriesBurned", 0] } },
        },
      },
    ]);

    const yesterdayCalories = yesterdayCaloriesAgg[0]?.total || 0;

    /* ---------- WORKOUT COUNTS ---------- */
    const totalWorkouts = await Workout.countDocuments({
      user: userObjectId,
      createdAt: { $gte: startToday, $lte: endToday },
    });

    const yesterdayWorkouts = await Workout.countDocuments({
      user: userObjectId,
      createdAt: { $gte: startYesterday, $lte: endYesterday },
    });

    /* ---------- AVERAGES ---------- */
    const avgCaloriesBurntPerWorkout =
      totalWorkouts > 0 ? totalCaloriesBurnt / totalWorkouts : 0;

    const yesterdayAvgCalories =
      yesterdayWorkouts > 0
        ? yesterdayCalories / yesterdayWorkouts
        : 0;

    /* ---------- PERCENTAGE CHANGES ---------- */
    const caloriesChange =
      yesterdayCalories === 0
        ? totalCaloriesBurnt > 0
          ? 100
          : 0
        : ((totalCaloriesBurnt - yesterdayCalories) /
            yesterdayCalories) *
          100;

    const workoutsChange =
      yesterdayWorkouts === 0
        ? totalWorkouts > 0
          ? 100
          : 0
        : ((totalWorkouts - yesterdayWorkouts) / yesterdayWorkouts) *
          100;

    const avgCaloriesChange =
      yesterdayAvgCalories === 0
        ? avgCaloriesBurntPerWorkout > 0
          ? 100
          : 0
        : ((avgCaloriesBurntPerWorkout - yesterdayAvgCalories) /
            yesterdayAvgCalories) *
          100;

    /* ---------- CATEGORY PIE CHART ---------- */
    const categoryData = await Workout.aggregate([
      { $match: { user: userObjectId } },
      { $group: { _id: "$category", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);

    const pieChartData = categoryData.map((item, index) => ({
      id: index,
      label: item._id,
      value: item.count,
    }));

    res.status(200).json({
      totalCaloriesBurnt,
      totalWorkouts,
      avgCaloriesBurntPerWorkout,
      caloriesChange,
      workoutsChange,
      avgCaloriesChange,
      pieChartData,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   WORKOUT CONTROLLERS
========================= */

const getWorkoutsByDate = async (req, res, next) => {
  try {
    const userObjectId = new mongoose.Types.ObjectId(req.user.id);
    const date = req.query.date ? new Date(req.query.date) : new Date();

    const startOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate() + 1
    );

    const todaysWorkouts = await Workout.find({
      user: userObjectId,
      createdAt: { $gte: startOfDay, $lt: endOfDay },
    }).sort({ createdAt: -1 });

    const totalCaloriesBurnt = todaysWorkouts.reduce(
      (sum, w) => sum + (w.caloriesBurned || 0),
      0
    );

    res.status(200).json({
      todaysWorkouts,
      totalCaloriesBurnt,
    });
  } catch (error) {
    next(error);
  }
};

const addWorkout = async (req, res, next) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const workout = new Workout({
      user: new mongoose.Types.ObjectId(userId),
      ...req.body,
    });

    await workout.save();

    res.status(201).json({
      success: true,
      workout,
    });
  } catch (error) {
    next(error);
  }
};

/* =========================
   EXPORTS
========================= */

module.exports = {
  UserRegister,
  UserLogin,
  getUserDashboard,
  getWorkoutsByDate,
  addWorkout,
};
