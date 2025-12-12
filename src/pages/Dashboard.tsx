/** biome-ignore-all lint/style/useFilenamingConvention: # */
import { useMemo, useState } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CreateWorkoutDialog } from "@/components/dashboard/CreateWorkoutDialog";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { WorkoutCard } from "@/components/dashboard/WorkoutCard";
import { WorkoutModal } from "@/components/dashboard/WorkoutModal";
import { useWorkouts } from "@/hooks/useWorkouts";

export default function DashboardPage() {
  const { workouts, loading, fetchWorkouts } = useWorkouts();
  const [createOpen, setCreateOpen] = useState(false);
  // biome-ignore lint/suspicious/noExplicitAny: ##
  const [selected, setSelected] = useState<any | null>(null);

  // Data para gráfico: soma de cargas por dia (exemplo simples)
  const chartData = useMemo(() => {
    // transforma workouts em pontos por data com soma de cargas (se houver)
    const map: Record<string, number> = {};
    for (const w of workouts) {
      const day = new Date(w.date).toLocaleDateString();
      const sum = (w.exercises ?? []).reduce(
        (acc, ex) => acc + ex.weight * (ex.reps ?? 0) * (ex.series ?? 1),
        0
      );
      map[day] = (map[day] || 0) + sum;
    }
    return Object.entries(map).map(([date, value]) => ({ date, value }));
  }, [workouts]);

  const handleFilter = (filters: {
    q?: string;
    from?: string;
    to?: string;
  }) => {
    fetchWorkouts(filters);
  };

  return (
    <div className="flex h-screen">
      <Sidebar onCreate={() => setCreateOpen(true)} onFilter={handleFilter} />
      <div className="flex flex-1 flex-col">
        <Header userName="Leandro" />
        <main className="p-6">
          <section className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="rounded border bg-white p-4 shadow-sm">
                <h3 className="font-semibold">Evolução</h3>
                <div className="mt-4" style={{ height: 220 }}>
                  <ResponsiveContainer height="100%" width="100%">
                    <LineChart data={chartData}>
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        dataKey="value"
                        stroke="#4f46e5"
                        strokeWidth={2}
                        type="monotone"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {/** biome-ignore lint/nursery/noLeakedRender: # */}
                {loading && <div>Carregando...</div>}
                {!loading && workouts.length === 0 && (
                  <div className="text-muted-foreground">
                    Nenhum treino ainda.
                  </div>
                )}
                {!loading &&
                  workouts.map((w: (typeof workouts)[number]) => (
                    <WorkoutCard
                      key={w.id}
                      onOpen={(wk: (typeof workouts)[number]) =>
                        setSelected(wk)
                      }
                      workout={w}
                    />
                  ))}
              </div>
            </div>

            <aside className="col-span-1">
              <div className="rounded border p-4">
                <h4 className="font-semibold">Resumo</h4>
                <p className="mt-2 text-muted-foreground text-sm">
                  Total de treinos: {workouts.length}
                </p>
                <p className="mt-1 text-muted-foreground text-sm">
                  Última atualização:{" "}
                  {workouts[0]
                    ? new Date(workouts[0].date).toLocaleDateString()
                    : "—"}
                </p>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold">Ações rápidas</h4>
                <div className="mt-2 flex flex-col gap-2">
                  <button
                    className="btn"
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
