import { useState } from "react";
import { Header } from "@/components/dashboard/Header";
import { CreateWorkoutDialog } from "@/components/dashboard/modals/CreateWorkoutDialog";
import { WorkoutModal } from "@/components/dashboard/modals/WorkoutModal";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { WorkoutCard } from "@/components/dashboard/WorkoutCard";
import {
  useWorkouts,
  type Workout,
  type WorkoutFilters,
} from "@/hooks/useWorkouts";

export default function DashboardPage() {
  const {
    workoutList,
    pagination,
    loading,
    fetchWorkouts,
    createWorkout,
    deleteWorkout,
  } = useWorkouts();

  const [createOpen, setCreateOpen] = useState(false);
  const [selected, setSelected] = useState<Workout | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState<WorkoutFilters>({});

  const handleFilter = (newFilters: WorkoutFilters) => {
    setFilters(newFilters);
    setPage(1);
    fetchWorkouts({ ...newFilters, page: 1 });
  };

  const handleNextPage = () => {
    if (!pagination) {
      return;
    }
    if (page >= pagination.totalPages) {
      return;
    }

    const next = page + 1;
    setPage(next);
    fetchWorkouts({ ...filters, page: next });
  };

  const handlePrevPage = () => {
    if (page <= 1) {
      return;
    }

    const prev = page - 1;
    setPage(prev);
    fetchWorkouts({ ...filters, page: prev });
  };

  const deleteCard = (id: string) => {
    deleteWorkout(id);
  };

  return (
    <div className="flex h-screen">
      <Sidebar
        onCreate={() => setCreateOpen(true)}
        onFilter={handleFilter}
        onOpenChange={setSidebarOpen}
        open={sidebarOpen}
        totalWorkouts={pagination?.totalItems ?? workoutList.length}
      />

      <div className="flex flex-1 flex-col bg-muted/30">
        <Header onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="p-6">
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="flex flex-col gap-6 lg:col-span-2">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h2 className="font-semibold text-xl">Seus Treinos</h2>

                {/** biome-ignore lint/nursery/noLeakedRender: <#> */}
                {pagination && (
                  <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-4">
                    <span className="text-muted-foreground text-sm">
                      Página {pagination.page} de {pagination.totalPages}
                    </span>

                    <div className="flex items-center gap-2">
                      <button
                        className="text-sm disabled:opacity-50"
                        disabled={page === 1 || loading}
                        onClick={handlePrevPage}
                        type="button"
                      >
                        Anterior
                      </button>

                      <button
                        className="text-sm disabled:opacity-50"
                        disabled={page === pagination.totalPages || loading}
                        onClick={handleNextPage}
                        type="button"
                      >
                        Próxima
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/** biome-ignore lint/nursery/noLeakedRender: <#> */}
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
                      onDelete={deleteCard}
                      onOpen={(wk) => setSelected(wk)}
                      workout={w}
                    />
                  ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      <CreateWorkoutDialog
        onCreate={async (data) => {
          await createWorkout(data);
          // força reload da página atual para manter consistência
          fetchWorkouts({ ...filters, page });
        }}
        onOpenChange={setCreateOpen}
        open={createOpen}
      />

      <WorkoutModal
        onClose={() => setSelected(null)}
        open={!!selected}
        workout={selected}
      />
    </div>
  );
}
