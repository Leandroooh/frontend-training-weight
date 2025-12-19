// components/workouts/WorkoutInfo.tsx
/** biome-ignore-all lint/nursery/noLeakedRender: # */

import { Separator } from "@radix-ui/react-separator";
import type { ExerciseEntry } from "@/hooks/useWorkouts";

type WorkoutProps = {
  id: string | null;
  date?: string;
  notes?: string;
  title: string;
  updatedAt?: string;
  createdAt?: string;

  exercises?: ExerciseEntry[];
};

export function WorkoutInfo({ id, title, createdAt, notes }: WorkoutProps) {
  return (
    <section className="space-y-6 p-6">
      <header className="space-y-1">
        <h1 className="font-bold text-3xl tracking-tight">{title}</h1>

        {createdAt && (
          <span className="text-muted-foreground text-sm">
            Criado em {createdAt}
          </span>
        )}
      </header>

      <Separator />

      <section className="space-y-2">
        <h2 className="font-medium text-muted-foreground text-sm uppercase">
          Observações
        </h2>

        {notes && notes.trim() !== "" ? (
          <p className="text-sm leading-relaxed">{notes}</p>
        ) : (
          <p className="text-muted-foreground text-sm">
            Nenhuma observação adicionada.
          </p>
        )}
      </section>

      <Separator />
      <footer className="text-muted-foreground text-xs">
        ID do treino: {id}
      </footer>
    </section>
  );
}
