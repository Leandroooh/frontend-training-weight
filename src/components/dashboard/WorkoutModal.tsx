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
  const { exercises, fetchExercises, loading } = useExercises();

  useEffect(() => {
    if (open && workout?.id) {
      fetchExercises(workout.id);
    }
  }, [open, workout, fetchExercises]);

  if (!workout) {
    return null;
  }

  return (
    <Dialog onOpenChange={(v: boolean) => !v && onClose()} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{workout.name}</DialogTitle>
        </DialogHeader>

        <div className="mt-2">
          <p className="text-muted-foreground text-sm">
            Data: {new Date(workout.date).toLocaleDateString()}
          </p>
          <p className="mt-2">{workout.notes}</p>
        </div>

        <div className="mt-4">
          <h4 className="font-medium">Exercícios</h4>
          <div className="mt-2 space-y-2">
            {/** biome-ignore lint/nursery/noLeakedRender: # */}
            {loading && <div>Carregando exercícios…</div>}
            {!loading && exercises.length === 0 && (
              <div className="text-muted-foreground text-sm">
                Nenhum exercício ainda.
              </div>
            )}
            {!loading &&
              exercises.map((ex) => (
                <div
                  className="flex items-center justify-between rounded border p-2"
                  key={ex.id}
                >
                  <div>
                    <div className="font-medium">{ex.exercise}</div>
                    <div className="text-muted-foreground text-xs">
                      {ex.series} séries • {ex.reps} reps • {ex.weight} kg
                    </div>
                  </div>
                  <div className="text-muted-foreground text-xs">
                    {new Date(ex.createdAt || Date.now()).toLocaleDateString()}
                  </div>
                </div>
              ))}
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button onClick={() => onClose()} variant="outline">
            Fechar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
