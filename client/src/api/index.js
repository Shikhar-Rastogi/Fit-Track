import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // only if using cookies
});

export default API;

// ---------- Auth ----------
export const UserSignUp = (data) =>
  API.post("/user/signup", data);

export const UserSignIn = (data) =>
  API.post("/user/signin", data);

// ---------- Dashboard ----------
export const getDashboardDetails = (token) =>
  API.get("/user/dashboard", {
    headers: { Authorization: `Bearer ${token}` },
  });

// ---------- Workouts ----------
export const getWorkouts = (token, date = "") =>
  API.get(
    `/user/workout${date ? `?date=${date}` : ""}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );

export const addWorkout = (token, data) =>
  API.post("/user/workout", data, {
    headers: { Authorization: `Bearer ${token}` },
  });
