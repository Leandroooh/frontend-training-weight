import Cookies from "js-cookie";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { workoutApi } from "@/services/api";
import { normalizeWorkoutDate } from "@/utils/normalizeWorkout";

type WorkoutFilters = {
  fromDate?: string;
  toDate?: string;
};

type Pagination = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

type PaginatedResponse<T> = {
  data: T[];
  pagination: Pagination;
};

type ExerciseEntry = {
  id: string;
  exercise: string;
  series: number;
  weight: number;
  createdAt?: string;
};

type Workout = {
  id: string;
  name: string;
  date: string;
  userId: string;
  notes?: string | null;
  exercises?: ExerciseEntry[];
};

type CreateWorkoutData = {
  name: string;
  notes?: string;
  date: string;
};

export function useWorkouts() {
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [workoutList, setWorkoutList] = useState<Workout[]>([]);

  const token = Cookies.get("token");

  const fetchWorkouts = useCallback(
    async (params?: WorkoutFilters & { page?: number }) => {
      setLoading(true);
      try {
        const response = await workoutApi.get<PaginatedResponse<Workout>>(
          "/workouts",
          {
            params: {
              from: params?.fromDate,
              to: params?.toDate,
              page: params?.page ?? 1,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setWorkoutList(response.data.data.map(normalizeWorkoutDate));
        setPagination(response.data.pagination);
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
    async (payload: CreateWorkoutData) => {
      try {
        const response = await workoutApi.post<Workout>("/workout", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setWorkoutList((current) => [
          normalizeWorkoutDate(response.data),
          ...current,
        ]);

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

  const deleteWorkout = useCallback(
    async (id: string) => {
      try {
        await workoutApi.delete(`/workout/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setWorkoutList((current) =>
          current.filter((workout) => workout.id !== id)
        );

        toast.success("Treino excluído com sucesso!");
      } catch (err) {
        toast.error("Erro ao excluir treino");
        console.error(err);
      }
    },
    [token]
  );

  const fetchWorkoutsByDateRange = useCallback(
    async (params: WorkoutFilters) => {
      const response = await workoutApi.get<PaginatedResponse<Workout>>(
        "/workouts",
        {
          params: {
            from: params.fromDate,
            to: params.toDate,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return {
        pagination: response.data.pagination,
        data: response.data.data.map(normalizeWorkoutDate),
      };
    },
    [token]
  );

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  return {
    workoutList,
    pagination,
    loading,
    fetchWorkouts,
    createWorkout,
    deleteWorkout,
    fetchWorkoutsByDateRange,
  };
}
export type { Workout, ExerciseEntry, WorkoutFilters, CreateWorkoutData };
