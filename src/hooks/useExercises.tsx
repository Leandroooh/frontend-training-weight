import Cookies from "js-cookie";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { workoutApi } from "@/services/api";

type exercisePayload = {
  exercise: string;
};

export type ExerciseEntry = {
  id: string;

  exercise: string;
  series: ExerciseSeries[];

  createdAt: string;
  updatedAt: string;

  workoutId: string;
};

export type ExerciseSeries = {
  id: string;

  set: number;
  reps: number;
  seriesWeight: number;

  createdAt: string;
  updatedAt: string;

  exerciseEntryId: string;
};

export function useExercises() {
  const [loading, setLoading] = useState(false);
  const [exercisesList, setExercisesList] = useState<ExerciseEntry[]>([]);

  const token = Cookies.get("token");

  const fetchExercises = useCallback(
    async (id: string) => {
      setLoading(true);
      try {
        const response = await workoutApi.get<ExerciseEntry[]>(
          `/workout/${id}/exercises`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setExercisesList(response.data);
      } catch (err) {
        console.error(err);
        toast.error("Falha ao carregar exercícios.");
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const addExercise = useCallback(
    async (id: string, payload: exercisePayload) => {
      try {
        const response = await workoutApi.post<ExerciseEntry>(
          `/workout/${id}/exercise`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setExercisesList((currentData) => [response.data, ...currentData]);
        toast.success("Exercício adicionado!");
        return response.data;
      } catch (err) {
        console.error(err);
        toast.error("Erro ao adicionar exercício!");
        throw err;
      }
    },
    [token]
  );

  return {
    exercisesList,
    loading,
    fetchExercises,
    addExercise,
    setExercisesList,
  };
}
