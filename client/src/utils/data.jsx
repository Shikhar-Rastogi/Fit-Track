import {
  FitnessCenterRounded,
  LocalFireDepartmentRounded,
  TimelineRounded,
} from "@mui/icons-material";

export const counts = [
  {
    name: "Calories Burned",
    icon: (
      <LocalFireDepartmentRounded
        sx={{ color: "inherit", fontSize: "26px" }}
      />
    ),
    desc: "Total calories burned today",
    key: "totalCaloriesBurnt",
    changeKey: "caloriesChange", // 🔥 REAL % CHANGE
    unit: "kcal",
    color: "#eb9e34",
    lightColor: "#FDF4EA",
  },
  {
    name: "Workouts",
    icon: (
      <FitnessCenterRounded
        sx={{ color: "inherit", fontSize: "26px" }}
      />
    ),
    desc: "Total number of workouts today",
    key: "totalWorkouts",
    changeKey: "workoutsChange", // 🔥 REAL % CHANGE
    unit: "",
    color: "#41C1A6",
    lightColor: "#E8F6F3",
  },
  {
    name: "Average Calories Burned",
    icon: (
      <TimelineRounded
        sx={{ color: "inherit", fontSize: "26px" }}
      />
    ),
    desc: "Average calories burned per workout",
    key: "avgCaloriesBurntPerWorkout",
    changeKey: "avgCaloriesChange", 
    unit: "kcal",
    color: "#FF9AD5",
    lightColor: "#FEF3F9",
  },
];
