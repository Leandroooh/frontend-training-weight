/** biome-ignore-all lint/style/useFilenamingConvention: # */
import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { CreateWorkoutDialog } from "@/components/dashboard/modals/CreateWorkoutDialog";
import { WorkoutModal } from "@/components/dashboard/modals/WorkoutModal";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { WorkoutCard } from "@/components/dashboard/WorkoutCard";
import { useWorkouts, type WorkoutFilters } from "@/hooks/useWorkouts";

export default function DashboardPage() {
  const { workoutList, loading, fetchWorkouts } = useWorkouts();
  const [createOpen, setCreateOpen] = useState(false);
  // biome-ignore lint/suspicious/noExplicitAny: #
  const [selected, setSelected] = useState<any | null>(null);

  const handleFilter = (filters: WorkoutFilters) => {
    fetchWorkouts(filters);
  };

  return (
    <div className="flex h-screen">
      <Sidebar onCreate={() => setCreateOpen(true)} onFilter={handleFilter} />

      <div className="flex flex-1 flex-col bg-muted/30">
        <Header userName="Leandro" />

        <main className="p-6">
          <section className="grid grid-cols-3 gap-6">
            {/* ÁREA PRINCIPAL */}
            <div className="col-span-2 flex flex-col gap-6">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-xl">Seus Treinos</h2>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/** biome-ignore lint/nursery/noLeakedRender: # */}
                {loading && (
                  <div className="text-muted-foreground text-sm">
                    Carregando treinos…
                  </div>
                )}

                {!loading && workoutList.length === 0 && (
                  <div className="text-muted-foreground text-sm">
                    Nenhum treino encontrado.
                  </div>
                )}

                {!loading &&
                  workoutList.map((w) => (
                    <WorkoutCard
                      key={w.id}
                      onOpen={(wk) => setSelected(wk)}
                      workout={w}
                    />
                  ))}
              </div>
            </div>

            {/* PAINEL DIREITO – Reformulado */}
            <aside className="col-span-1">
              <div className="grid grid-cols-2 gap-4">
                {/* CARD: RESUMO */}
                <div className="flex flex-col items-center rounded-xl border p-5 shadow-sm">
                  <h4 className="font-semibold text-lg">Resumo</h4>

                  <p className="mt-3 text-center text-muted-foreground text-sm">
                    Total de treinos:
                    <br />
                    <span className="font-bold text-primary text-xl">
                      {workoutList.length}
                    </span>
                  </p>

                  <p className="mt-2 text-center text-muted-foreground text-xs">
                    Última atualização:
                    <br />
                    {workoutList[0]
                      ? new Date(workoutList[0].date).toLocaleDateString()
                      : "—"}
                  </p>
                </div>

                {/* CARD: AÇÕES */}
                <div className="flex flex-col items-center justify-center rounded-xl border p-5 shadow-sm">
                  <h4 className="text-center font-semibold text-lg">Ações</h4>

                  <button
                    className="btn mt-4 w-full"
                    onClick={() => setCreateOpen(true)}
                    type="button"
                  >
                    + Novo treino
                  </button>
                </div>
              </div>
            </aside>
          </section>
        </main>
      </div>

      <CreateWorkoutDialog onOpenChange={setCreateOpen} open={createOpen} />

      <WorkoutModal
        onClose={() => setSelected(null)}
        open={!!selected}
        workout={selected}
      />
    </div>
  );
}
