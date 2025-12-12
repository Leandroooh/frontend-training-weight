import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { workoutApi } from "@/services/api";

// Representa cada entrada de exercício dentro de um treino.
// É apenas um tipo usado para manter o formato dos dados vindo da API.
export type ExerciseEntry = {
  id: string;
  exercise: string; // nome do exercício
  series: number; // quantidade de séries
  weight: number; // peso usado
  reps: number; // repetições
  createdAt?: string;
};

// Tipo que representa um treino completo.
export type Workout = {
  id: string;
  name: string; // nome do treino
  notes?: string | null;
  date: string; // data do treino
  userId?: string;
  exercises?: ExerciseEntry[];
};

// Custom hook responsável por gerenciar o estado e operações de "treinos"
export function useWorkouts() {
  // Lista completa de treinos armazenada em estado local.
  const [workouts, setWorkouts] = useState<Workout[]>([]);

  // Indica quando está carregando dados da API.
  const [loading, setLoading] = useState(false);

  // Busca treinos da API (com filtros opcionais) e atualiza o estado.
  const fetchWorkouts = useCallback(
    async (params?: { from?: string; to?: string; q?: string }) => {
      setLoading(true); // indica que está buscando
      try {
        // GET na API, podendo enviar parâmetros de busca
        const res = await workoutApi.get<Workout[]>("/workouts", { params });
        // Atualiza o estado com os treinos retornados
        setWorkouts(res.data);
      } catch (err) {
        toast.error("Falha ao carregar treinos.");
        console.error(err);
      } finally {
        setLoading(false); // encerra o estado de loading
      }
    },
    [] // sem dependências → função estável durante todo o ciclo
  );

  // Cria um novo treino na API e adiciona-o ao estado local
  const createWorkout = useCallback(
    async (payload: { name: string; notes?: string; date: string }) => {
      try {
        // POST para criar um novo treino
        const res = await workoutApi.post<Workout>("/workout", payload);

        // Atualiza o estado adicionando o novo treino no topo da lista
        setWorkouts((s) => [res.data, ...s]);

        toast.success("Treino criado");
        return res.data;
      } catch (err) {
        toast.error("Erro ao criar treino");
        console.error(err);
        throw err;
      }
    },
    []
  );

  // Remove um treino usando o ID e atualiza o estado local
  const removeWorkout = useCallback(async (id: string) => {
    try {
      // DELETE na API para remover
      await workoutApi.delete(`/workout/${id}`);

      // Remove o treino da lista local
      setWorkouts((s) => s.filter((w) => w.id !== id));

      toast.success("Treino removido");
    } catch (err) {
      toast.error("Erro ao remover treino");
      console.error(err);
    }
  }, []);

  // Assim que o hook for usado, ele carrega os treinos automaticamente
  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]); // usa a função estável criada pelo useCallback

  // Retorna tudo o que o componente precisa para manipular treinos
  return {
    workouts,
    loading,
    fetchWorkouts,
    createWorkout,
    removeWorkout,
    setWorkouts,
  };
}
