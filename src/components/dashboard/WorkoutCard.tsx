import type { Workout } from "@/hooks/useWorkouts";

export function WorkoutCard({
  workout,
  onOpen,
}: {
  workout: Workout;
  onOpen: (w: Workout) => void;
}) {
  const count = workout.exercises?.length ?? 0;
  const date = new Date(workout.date).toLocaleDateString();

  return (
    <button
      className="cursor-pointer rounded border p-4 shadow-sm transition hover:shadow-md"
      onClick={() => onOpen(workout)}
      type="button"
    >
      <div className="flex items-start justify-between">
        <h3 className="font-semibold text-lg">{workout.name}</h3>
        <div className="text-muted-foreground text-xs">{date}</div>
      </div>

      <p className="mt-2 text-muted-foreground text-sm">
        {workout.notes ?? "—"}
      </p>

      <div className="mt-4 flex items-center justify-between text-sm">
        <div>
          {count} exercício{count !== 1 ? "s" : ""}
        </div>
        <div className="text-muted-foreground text-xs">
          ID: {workout.id.slice(0, 6)}
        </div>
      </div>
    </button>
  );
}
