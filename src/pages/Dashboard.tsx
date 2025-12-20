/** biome-ignore-all lint/nursery/noLeakedRender: # */
import { WorkoutCard } from "@/components/dashboard/WorkoutCard";
import { useWorkouts, type Workout } from "@/hooks/useWorkouts";

export default function DashboardPage() {
  const {
    workoutList,
    pagination,
    loading,
    deleteWorkout,
    currentPage,
    setCurrentPage,
  } = useWorkouts();

  const handleNextPage = () => {
    if (!pagination) {
      return;
    }
    if (currentPage >= pagination.totalPages) {
      return;
    }

    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage <= 1) {
      return;
    }

    setCurrentPage(currentPage - 1);
  };

  return (
    <main className="p-6">
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="font-semibold text-xl">Seus Treinos</h2>

            {pagination && (
              <div className="flex flex-col items-center gap-1 sm:flex-row sm:gap-4">
                <span className="text-muted-foreground text-sm">
                  Página {pagination.page} de {pagination.totalPages}
                </span>

                <div className="flex items-center gap-2">
                  <button
                    className="text-sm disabled:opacity-50"
                    disabled={currentPage === 1 || loading}
                    onClick={handlePrevPage}
                    type="button"
                  >
                    Anterior
                  </button>

                  <button
                    className="text-sm disabled:opacity-50"
                    disabled={currentPage === pagination.totalPages || loading}
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
              workoutList.map((w: Workout) => (
                <WorkoutCard key={w.id} onDelete={deleteWorkout} workout={w} />
              ))}
          </div>
        </div>
      </section>
    </main>
  );
}
