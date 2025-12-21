// contexts/WorkoutsContext.tsx

import Cookies from "js-cookie";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";
import { workoutApi } from "@/services/api";
import {
  normalizeWorkoutDate,
  normalizeWorkoutDateById,
} from "@/utils/normalizeWorkout";
import type { ExerciseEntry } from "./useExercises";

export type WorkoutFilters = {
  fromDate?: string;
  toDate?: string;
};

export type Pagination = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
};

export type Workout = {
  id: string;
  name: string;
  date: string;
  userId: string;
  notes?: string | null;
};

export type CreateWorkoutData = {
  name: string;
  notes?: string;
  date: string;
};

export type WorkoutDetails = {
  id: string;
  name: string;
  date: string | null;
  exercises: ExerciseEntry[];
  notes?: string | null;
};

type WorkoutsContextValue = {
  workoutList: Workout[];
  pagination: Pagination | null;
  loading: boolean;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  createWorkout: (data: CreateWorkoutData) => Promise<void>;
  deleteWorkout: (id: string) => Promise<void>;
  fetchWorkoutById: (id: string) => Promise<WorkoutDetails | null>;
};

const WorkoutsContext = createContext<WorkoutsContextValue | null>(null);

export function WorkoutsProvider({ children }: { children: React.ReactNode }) {
  const token = Cookies.get("token");

  const [workoutList, setWorkoutList] = useState<Workout[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchWorkouts = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const response = await workoutApi.get("/workouts", {
          params: { page },
          headers: { Authorization: `Bearer ${token}` },
        });

        setWorkoutList(response.data.data.map(normalizeWorkoutDate));
        setPagination(response.data.pagination);
      } catch {
        toast.error("Falha ao carregar treinos");
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const createWorkout = useCallback(
    async (data: CreateWorkoutData) => {
      await workoutApi.post("/workout", data, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchWorkouts(1);
      setCurrentPage(1);
    },
    [token, fetchWorkouts]
  );

  const deleteWorkout = useCallback(
    async (id: string) => {
      await workoutApi.delete(`/workout/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchWorkouts(currentPage);
    },
    [token, fetchWorkouts, currentPage]
  );

  const fetchWorkoutById = useCallback(
    async (id: string): Promise<WorkoutDetails | null> => {
      try {
        const response = await workoutApi.get(`/workout/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        return normalizeWorkoutDateById(response.data);
      } catch {
        toast.error("Falha ao carregar treino");
        return null;
      }
    },
    [token]
  );

  useEffect(() => {
    fetchWorkouts(currentPage);
  }, [fetchWorkouts, currentPage]);

  return (
    <WorkoutsContext.Provider
      value={{
        deleteWorkout,
        workoutList,
        pagination,
        loading,
        currentPage,
        setCurrentPage,
        createWorkout,
        fetchWorkoutById,
      }}
    >
      {children}
    </WorkoutsContext.Provider>
  );
}

export function useWorkouts() {
  const ctx = useContext(WorkoutsContext);
  if (!ctx) {
    throw new Error("useWorkouts must be used within a WorkoutsProvider");
  }
  return ctx;
}
