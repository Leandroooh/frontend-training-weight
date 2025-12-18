// layouts/DashboardLayout.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "@/components/dashboard/Header";
import { CreateWorkoutDialog } from "@/components/dashboard/modals/CreateWorkoutDialog";
import { WorkoutModal } from "@/components/dashboard/modals/WorkoutModal";
import { Sidebar } from "@/components/dashboard/Sidebar";
import {
  useWorkouts,
  type Workout,
  type WorkoutFilters,
} from "@/hooks/useWorkouts";

export function DashboardLayoutApp() {
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

        <Outlet
          context={{
            workoutList,
            pagination,
            loading,
            page,
            filters,
            handleNextPage,
            handlePrevPage,
            deleteCard,
            setSelected,
          }}
        />
      </div>

      <CreateWorkoutDialog
        onCreate={async (data) => {
          await createWorkout(data);
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
