import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { workoutApi } from "@/services/api";

type WorkoutFilters = {
  fromDate?: string;
  toDate?: string;
  query?: string;
};

type workout = {
  id: string;
  name: string;
  date: string;
  userId: string;

  notes?: string | null;
  exercises?: exerciseEntry[];
};

type exerciseEntry = {
  id: string;
  exercise: string;
  series: number;
  weight: number;
  createdAt?: string;
};

type createWorkoutData = {
  name: string;
  notes?: string;
  date: string;
};

export function useWorkout() {
  const [workoutList, setWorkoutList] = useState<workout[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchWorkouts = useCallback(async (params?: WorkoutFilters) => {
    setLoading(true);
    try {
      const response = await workoutApi.get<workout[]>("/workouts", {
        params,
      });

      console.debug(response.data); // debug
      setWorkoutList(response.data);
    } catch (err) {
      toast.error("Falha ao carregar treinos.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const createWorkout = useCallback(async (payload: createWorkoutData) => {
    try {
      const response = await workoutApi.post<workout>("/workouts", payload);
      setWorkoutList((currentData) => [response.data, ...currentData]);
      toast.success("Treino criado com sucesso!");
      return response.data;
    } catch (err) {
      toast.error("Erro ao criar treino");
      console.error(err);
      throw err;
    }
  }, []);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  return { workoutList, loading, fetchWorkouts, createWorkout };
}
