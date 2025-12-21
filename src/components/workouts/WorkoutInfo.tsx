/** biome-ignore-all lint/nursery/noLeakedRender: <#> */
import { Separator } from "@radix-ui/react-separator";
import { ArrowLeft, Edit, Plus, Trash } from "lucide-react";
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
  const { exercisesList, fetchExercises, addExercise, loading } =
    useExercises();

  const toggleExpand = (exerciseId: string) => {
    setExpandedCards((prev) => ({
      ...prev,
      [exerciseId]: !prev[exerciseId],
    }));
  };

  useEffect(() => {
    if (id) {
      fetchExercises(id);
    }
  }, [id, fetchExercises]);

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
          {notes && notes.trim() !== "" ? (
            <p className="text-sm leading-relaxed">{notes}</p>
          ) : (
            <p className="text-muted-foreground text-sm">
              Nenhuma observação adicionada.
            </p>
          )}
        </section>

        <Separator />

        {/* Exercícios */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl tracking-tight">Exercícios</h2>
            <Button
              aria-label="Adicionar exercício"
              className="flex items-center gap-1"
              onClick={() => {
                if (id) {
                  addExercise(id, { exercise: "Novo Exercício" });
                }
              }}
              size="sm"
              variant="outline"
            >
              <Plus className="h-4 w-4" />
              <span className="text-sm">Novo</span>
            </Button>
          </div>

          {/* 🔹 Estados separados sem ternário aninhado */}
          {loading && (
            <p className="text-muted-foreground text-sm">
              Carregando exercícios...
            </p>
          )}

          {!loading && exercisesList.length === 0 && (
            <p className="text-muted-foreground text-sm">
              Nenhum exercício cadastrado ainda. Clique em <strong>Novo</strong>{" "}
              para adicionar.
            </p>
          )}

          {!loading && exercisesList.length > 0 && (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
              {exercisesList.map((exercise: ExerciseEntry) => {
                const isExpanded = expandedCards[exercise.id];
                const seriesToShow = isExpanded
                  ? exercise.series
                  : exercise.series.slice(0, 3);

                return (
                  <Card className="flex flex-col" key={exercise.id}>
                    <CardHeader className="pb-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">
                          {exercise.exercise}
                        </CardTitle>
                        <Badge variant="secondary">
                          {exercise.series.length} séries
                        </Badge>
                      </div>

                      <div className="mt-1 flex gap-1">
                        <Button
                          aria-label="Adicionar série"
                          className="h-6 w-6 p-0"
                          onClick={() =>
                            console.log("Adicionar série", exercise.id)
                          }
                          variant="ghost"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          aria-label="Editar exercício"
                          className="h-6 w-6 p-0"
                          onClick={() =>
                            console.log("Editar exercício", exercise.id)
                          }
                          variant="ghost"
                        >
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button
                          aria-label="Deletar exercício"
                          className="h-6 w-6 p-0 text-red-500 hover:text-red-600"
                          onClick={() =>
                            console.log("Deletar exercício", exercise.id)
                          }
                          variant="ghost"
                        >
                          <Trash className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardHeader>

                    <CardContent className="space-y-1 pt-1">
                      {seriesToShow.map((set: ExerciseSeries) => (
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

                      {exercise.series.length > 3 && (
                        <div className="pt-1">
                          <Button
                            className="px-0 text-xs"
                            onClick={() => toggleExpand(exercise.id)}
                            size="sm"
                            variant="link"
                          >
                            {isExpanded ? "Ver menos" : "Ver mais"}
                          </Button>
                        </div>
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
    </main>
  );
}
