// layouts/DashboardLayoutApp.tsx
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
  const { workoutList, pagination, createWorkout, setCurrentPage } =
    useWorkouts();

  const [createOpen, setCreateOpen] = useState(false);
  const [selected, setSelected] = useState<Workout | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleFilter = (_filters: WorkoutFilters) => {
    setCurrentPage(1);
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

        <Outlet context={{ setSelected }} />
      </div>

      <CreateWorkoutDialog
        onCreate={createWorkout}
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
