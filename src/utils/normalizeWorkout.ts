import type { Workout } from "@/hooks/useWorkouts";

export function normalizeWorkoutDate(workout: Workout): Workout {
  return {
    ...workout,
    date: workout.date.includes("T")
      ? workout.date.split("T")[0]
      : workout.date,
  };
}
