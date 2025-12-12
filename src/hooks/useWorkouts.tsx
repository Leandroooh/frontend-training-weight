import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { workoutApi } from "@/services/api";

type WorkoutFilters = {
  fromDate?: string;
  toDate?: string;
  query?: string;
};

type Workout = {
  id: string;
  name: string;
  date: string;
  userId: string;
  notes?: string | null;
  exercises?: ExerciseEntry[];
};

type PaginatedResponse<T> = {
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
  data: T[];
};

type ExerciseEntry = {
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

export function useWorkouts() {
  const [workoutList, setWorkoutList] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(false);

  const token = Cookies.get("token");

  const fetchWorkouts = useCallback(
    async (params?: WorkoutFilters) => {
      setLoading(true);
      try {
        const response = await workoutApi.get<PaginatedResponse<Workout>>(
          "/workouts",
          {
            params,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // 🟢 Destaque: extrai apenas o array de dados do response
        const data = Array.isArray(response.data.data)
          ? response.data.data
          : [];

        setWorkoutList(data);
      } catch (err) {
        toast.error("Falha ao carregar treinos.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const createWorkout = useCallback(
    async (payload: createWorkoutData) => {
      try {
        const response = await workoutApi.post<Workout>("/workout", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // 🟢 Destaque: adiciona o novo treino no início da lista existente
        setWorkoutList((currentData) => [response.data, ...currentData]);

        toast.success("Treino criado com sucesso!");
        return response.data;
      } catch (err) {
        toast.error("Erro ao criar treino");
        console.error(err);
        throw err;
      }
    },
    [token]
  );

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  return { workoutList, loading, fetchWorkouts, createWorkout };
}

export type { WorkoutFilters, Workout, ExerciseEntry, createWorkoutData };
