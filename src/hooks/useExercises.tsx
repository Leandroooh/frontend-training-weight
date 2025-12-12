import { useState } from "react";
import { toast } from "sonner";
import { workoutApi } from "@/services/api";
import type { ExerciseEntry } from "./useWorkouts";

export function useExercises(_workoutId?: string) {
  const [exercises, setExercises] = useState<ExerciseEntry[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchExercises = async (id: string) => {
    setLoading(true);
    try {
      const res = await workoutApi.get<ExerciseEntry[]>(
        `/workouts/${id}/exercises`
      );
      setExercises(res.data);
    } catch (err) {
      toast.error("Falha ao carregar exercícios");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addExercise = async (
    id: string,
    payload: { exercise: string; series: number; weight: number; reps: number }
  ) => {
    try {
      const res = await workoutApi.post<ExerciseEntry>(
        `/workouts/${id}/exercises`,
        payload
      );
      setExercises((s) => [res.data, ...s]);
      toast.success("Exercício adicionado");
      return res.data;
    } catch (err) {
      toast.error("Erro ao adicionar exercício");
      console.error(err);
      throw err;
    }
  };

  return { exercises, setExercises, loading, fetchExercises, addExercise };
}
