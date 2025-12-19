import type { Workout, WorkoutDetails } from "@/hooks/useWorkouts";

export function normalizeWorkoutDate(workout: Workout): Workout {
  return {
    ...workout,
    date: workout.date.includes("T")
      ? workout.date.split("T")[0]
      : workout.date,
  };
}

export function normalizeWorkoutDateById(
  workout: WorkoutDetails
): WorkoutDetails {
  return {
    ...workout,
    date: workout.date.includes("T")
      ? workout.date.split("T")[0]
      : workout.date,
  };
}
