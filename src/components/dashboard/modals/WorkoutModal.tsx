/** biome-ignore-all lint/nursery/noLeakedRender: # */
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useExercises } from "@/hooks/useExercises";
import type { Workout } from "@/hooks/useWorkouts";

export function WorkoutModal({
  open,
  onClose,
  workout,
}: {
  open: boolean;
  onClose: () => void;
  workout?: Workout | null;
}) {
  const { exercisesList, fetchExercises, loading } = useExercises();

  useEffect(() => {
    if (open && workout?.id) {
      fetchExercises(workout.id);
    }
  }, [open, workout?.id, fetchExercises]);

  if (!(open && workout)) {
    return null;
  }

  const formattedDate = new Date(workout.date).toLocaleDateString();

  return (
    <Dialog onOpenChange={(v) => !v && onClose()} open={open}>
      <DialogContent aria-describedby="fake">
        <DialogHeader>
          <DialogTitle>{workout.name}</DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          <p className="text-muted-foreground text-sm">Data: {formattedDate}</p>
          {workout.notes && <p className="mt-2 text-sm">{workout.notes}</p>}
        </div>

        <div className="mt-4">
          <h4 className="font-medium">Exercícios</h4>
          <div className="mt-2 space-y-2">
            {loading && (
              <div className="text-muted-foreground text-sm">
                Carregando exercícios…
              </div>
            )}

            {!loading && exercisesList.length === 0 && (
              <div className="text-muted-foreground text-sm">
                Nenhum exercício ainda.
              </div>
            )}

            {!loading &&
              exercisesList.map((exercise) => {
                const created = exercise.createdAt
                  ? new Date(exercise.createdAt).toLocaleDateString()
                  : "";

                return (
                  <div
                    className="flex items-center justify-between rounded border p-2"
                    key={exercise.id}
                  >
                    <div>
                      <div className="font-medium">{exercise.exercise}</div>
                      <div className="text-muted-foreground text-xs">
                        {exercise.set} séries • {exercise.weight} kg
                      </div>
                    </div>

                    <div className="text-muted-foreground text-xs">
                      {created}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button onClick={onClose} variant="outline">
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
