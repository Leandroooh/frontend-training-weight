import axios from "axios";

export const workoutApi = axios.create({
  baseURL: "http://localhost:3030",
});
