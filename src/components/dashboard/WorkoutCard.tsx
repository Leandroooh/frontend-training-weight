import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ExerciseEntry } from "@/hooks/useExercises";
import type { Workout } from "@/hooks/useWorkouts";

type WorkoutCardProps = {
  workout: Workout;
  exercises?: ExerciseEntry[];
  onDelete: (id: string) => void;
};

export function WorkoutCard({
  workout,
  onDelete,
  exercises,
}: WorkoutCardProps) {
  const navigate = useNavigate();

  const count = exercises?.length ?? 0;
  const date = workout.date ? workout.date.split("-").reverse().join("/") : "";

  const handleOpen = () => {
    navigate(`/dashboard/workout/${workout.id}`);
  };

  return (
    <div className="group relative rounded border bg-background-secondary p-4 shadow-sm transition hover:shadow-md">
      <button
        aria-label="Excluir treino"
        className="absolute top-2 right-2 rounded bg-destructive/10 p-1 text-destructive transition-colors duration-500 hover:text-muted group-hover:opacity-100"
        onClick={() => onDelete(workout.id)}
        type="button"
      >
        <Trash2 size={16} />
      </button>

      <button className="w-full text-left" onClick={handleOpen} type="button">
        <h3 className="font-semibold text-lg leading-tight">{workout.name}</h3>

        <p className="mt-2 line-clamp-2 text-muted-foreground text-sm">
          {workout.notes === "" ? "Sem notas" : (workout.notes ?? "Treino")}
        </p>

        <div className="mt-4 flex items-end justify-between">
          <div className="flex items-center gap-2 rounded-full bg-muted px-3 py-1 font-medium text-sm">
            <span className="text-primary">{count}</span>
            <span className="text-muted-foreground">
              exercício{count !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="flex flex-col items-end text-muted-foreground text-xs">
            <span>{date}</span>
            <span className="opacity-60">ID {workout.id.slice(0, 6)}</span>
          </div>
        </div>
      </button>
    </div>
  );
}
