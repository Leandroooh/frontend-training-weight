/** biome-ignore-all lint/nursery/noLeakedRender: <#> */
import { Separator } from "@radix-ui/react-separator";
import { ArrowLeft, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type ExerciseEntry,
  type ExerciseSeries,
  useExercises,
} from "@/hooks/useExercises";
import { CreateSeriesModal } from "./modals/CreateSeriesModal";

type WorkoutProps = {
  id: string | null;
  title: string;
  createdAt?: string;
  notes?: string;
};

export function WorkoutInfo({ id, title, createdAt, notes }: WorkoutProps) {
  const navigate = useNavigate();

  const [expandedCards, setExpandedCards] = useState<Record<string, boolean>>(
    {}
  );
  const [exerciseName, setExerciseName] = useState("");

  const {
    exercisesList,
    fetchExercises,
    addExercise,
    deleteExercise,
    addSeries,
    loading,
  } = useExercises();

  useEffect(() => {
    if (id) {
      fetchExercises(id);
    }
  }, [id, fetchExercises]);

  const toggleExpand = (exerciseId: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [exerciseId]: !prev[exerciseId],
    }));
  };

  const [seriesModalOpen, setSeriesModalOpen] = useState(false);
  const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null);

  return (
    <main className="w-full max-w-6xl">
      <section className="space-y-6 p-6">
        {/* Header */}
        <header className="flex items-start gap-3">
          <Button
            aria-label="Voltar ao dashboard"
            className="mt-1"
            onClick={() => navigate("/dashboard")}
            size="icon"
            variant="ghost"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>

          <div className="space-y-1">
            <h1 className="font-bold text-3xl tracking-tight">{title}</h1>
            {createdAt && (
              <span className="text-muted-foreground text-sm">
                Criado em {createdAt}
              </span>
            )}
          </div>
        </header>

        <Separator />

        {/* Observações */}
        <section className="space-y-2">
          <h2 className="font-medium text-muted-foreground text-xs uppercase">
            Observações
          </h2>
          {notes?.trim() ? (
            <p className="text-sm leading-relaxed">{notes}</p>
          ) : (
            <p className="text-muted-foreground text-sm">
              Nenhuma observação adicionada.
            </p>
          )}
        </section>

        <Separator />

        <section className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-bold text-xl tracking-tight">Exercícios</h2>

            <div className="flex w-full gap-2 sm:w-auto">
              {" "}
              <input
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring sm:w-56"
                onChange={(e) => setExerciseName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && exerciseName.trim()) {
                    if (!id) {
                      return;
                    }
                    addExercise(id, { exercise: exerciseName.trim() });
                    setExerciseName("");
                  }
                }}
                placeholder="Nome do exercício..."
                value={exerciseName}
              />{" "}
              <Button
                disabled={!exerciseName.trim()}
                onClick={() => {
                  if (!id) {
                    return;
                  }
                  addExercise(id, { exercise: exerciseName.trim() });
                  setExerciseName("");
                }}
                size="sm"
                variant="outline"
              >
                {" "}
                <Plus className="mr-1 h-4 w-4" /> Novo{" "}
              </Button>{" "}
            </div>
          </div>

          {loading && (
            <p className="text-muted-foreground text-sm">
              Carregando exercícios...
            </p>
          )}

          {!loading && exercisesList.length === 0 && (
            <p className="text-muted-foreground text-sm">
              Nenhum exercício cadastrado ainda.
            </p>
          )}

          {!loading && exercisesList.length > 0 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {exercisesList.map((exercise: ExerciseEntry) => {
                const isExpanded = expandedCards[exercise.id];
                const series: ExerciseSeries[] = exercise.series ?? [];
                const seriesToShow = isExpanded ? series : series.slice(0, 3);

                return (
                  <Card className="flex flex-col" key={exercise.id}>
                    <CardHeader className="pb-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">
                          {exercise.exercise}
                        </CardTitle>
                        <Badge variant="secondary">
                          {series.length} séries
                        </Badge>
                      </div>

                      <div className="mt-1 flex gap-1">
                        {/* Botão corrigido para abrir modal */}
                        <Button
                          className="h-6 w-6"
                          onClick={() => {
                            setActiveExerciseId(exercise.id);
                            setSeriesModalOpen(true);
                          }}
                          size="icon"
                          variant="ghost"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                        {/* <Button className="h-6 w-6" size="icon" variant="ghost">
                          <Edit className="h-3.5 w-3.5" />
                        </Button> */}
                        <Button
                          className="h-6 w-6 text-red-500"
                          onClick={async () => {
                            await deleteExercise(exercise.id);
                          }}
                          size="icon"
                          variant="ghost"
                        >
                          <Trash className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-1 pt-1">
                      {seriesToShow.map((set) => (
                        <div
                          className="flex items-center justify-between border-b py-0.5 text-xs last:border-0"
                          key={set.id}
                        >
                          <span className="text-muted-foreground">
                            Série {set.set}
                          </span>
                          <div className="flex gap-1">
                            <Badge
                              className="px-1 text-[11px]"
                              variant="outline"
                            >
                              {set.reps} reps
                            </Badge>
                            <Badge
                              className="px-1 text-[11px]"
                              variant="secondary"
                            >
                              {set.seriesWeight} kg
                            </Badge>
                          </div>
                        </div>
                      ))}

                      {series.length > 3 && (
                        <Button
                          className="px-0 text-xs"
                          onClick={() => toggleExpand(exercise.id)}
                          size="sm"
                          variant="link"
                        >
                          {isExpanded ? "Ver menos" : "Ver mais"}
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>

        <Separator />

        <footer className="text-muted-foreground text-xs">
          ID do treino: {id}
        </footer>
      </section>

      <CreateSeriesModal
        onCreate={async (data) => {
          if (!activeExerciseId) {
            return;
          }
          await addSeries(activeExerciseId, data);
        }}
        onOpenChange={(open) => {
          setSeriesModalOpen(open);
          if (!open) {
            setActiveExerciseId(null);
          }
        }}
        open={seriesModalOpen}
      />
    </main>
  );
}
