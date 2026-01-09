import axios from "axios";

export const workoutApi = axios.create({
  baseURL: "https://backend-training-weight-deploy.onrender.com",
});
