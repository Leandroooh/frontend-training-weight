// components/dashboard/Sidebar.tsx
/** biome-ignore-all lint/nursery/noLeakedRender: weak */
import { Dumbbell, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import type { WorkoutFilters } from "@/hooks/useWorkouts";

const ISO_DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

type SidebarProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: () => void;
  onFilter: (filters: WorkoutFilters) => void;
  totalWorkouts: number;
  showFilters?: boolean; // 👈 novo
};

function isValidISODate(value: string) {
  return ISO_DATE_REGEX.test(value);
}

function SidebarContent({
  onCreate,
  onFilter,
  totalWorkouts,
  onOpenChange,
  showFilters = true,
}: Omit<SidebarProps, "open">) {
  const [filters, setFilters] = useState<WorkoutFilters>({});

  useEffect(() => {
    onFilter(filters);
  }, [filters, onFilter]);

  return (
    <aside className="flex h-full w-72 flex-col gap-4 bg-neutral-950 px-4 py-8">
      <div>
        <h3 className="font-bold text-lg text-white">Dravyx</h3>
        <p className="text-muted-foreground text-sm">
          Acompanhando suas Cargas!
        </p>
      </div>

      {showFilters && (
        <div className="mt-4">
          <h4 className="mb-2 font-semibold text-sm text-white">Filtros</h4>

          <div className="flex flex-col gap-2">
            <label htmlFor="fromDate">De</label>
            <Input
              id="fromDate"
              onChange={(e) => {
                const value = e.target.value;
                setFilters((prev) => ({
                  ...prev,
                  fromDate: value && isValidISODate(value) ? value : undefined,
                }));
              }}
              type="date"
            />

            <label htmlFor="toDate">Até</label>
            <Input
              id="toDate"
              onChange={(e) => {
                const value = e.target.value;
                setFilters((prev) => ({
                  ...prev,
                  toDate: value && isValidISODate(value) ? value : undefined,
                }));
              }}
              type="date"
            />
          </div>
        </div>
      )}

      <div className="mt-6 flex items-center justify-center rounded-md bg-neutral-800 py-3">
        <Dumbbell className="mr-2 text-green-400" size={18} />
        <span className="font-semibold text-sm text-white">
          Treinos: {totalWorkouts}
        </span>
      </div>

      <Button
        className="h-12 w-full bg-neutral-800 text-white hover:bg-neutral-700"
        onClick={() => {
          onCreate();
          onOpenChange(false);
        }}
      >
        <PlusCircle className="mr-2 text-green-400" />
        Novo Treino
      </Button>
    </aside>
  );
}

export function Sidebar(props: SidebarProps) {
  return (
    <>
      <div className="hidden lg:block">
        <SidebarContent {...props} />
      </div>

      <Sheet onOpenChange={props.onOpenChange} open={props.open}>
        <SheetContent className="p-0" side="left">
          <SidebarContent {...props} />
        </SheetContent>
      </Sheet>
    </>
  );
}
