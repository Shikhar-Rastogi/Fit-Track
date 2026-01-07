import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default API;

// ---------- Auth ----------
export const UserSignUp = (data) =>
  API.post("/api/user/signup", data);

export const UserSignIn = (data) =>
  API.post("/api/user/signin", data);

// ---------- Dashboard ----------
export const getDashboardDetails = (token) =>
  API.get("/api/user/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

// ---------- Workouts ----------
export const getWorkouts = (token, date = "") =>
  API.get(
    `/api/user/workout${date ? `?date=${date}` : ""}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const addWorkout = (token, data) =>
  API.post("/api/user/workout", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
