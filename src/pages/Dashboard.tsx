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

  // 🔑 CONTROLE CENTRAL
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleFilter = (filters: WorkoutFilters) => {
    fetchWorkouts(filters);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* SIDEBAR */}
      <Sidebar
        onCreate={() => setCreateOpen(true)}
        onFilter={handleFilter}
        onOpenChange={setSidebarOpen}
        open={sidebarOpen}
        totalWorkouts={workoutList.length}
      />

      {/* CONTEÚDO */}
      <div className="flex flex-1 flex-col bg-muted/30">
        <Header onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="p-6">
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="flex flex-col gap-6 lg:col-span-2">
              <h2 className="font-semibold text-xl">Seus Treinos</h2>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/** biome-ignore lint/nursery/noLeakedRender: # */}
                {loading && (
                  <span className="text-muted-foreground text-sm">
                    Carregando treinos…
                  </span>
                )}

                {!loading && workoutList.length === 0 && (
                  <span className="text-muted-foreground text-sm">
                    Nenhum treino encontrado.
                  </span>
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
