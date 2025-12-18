import { Dumbbell, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import type { WorkoutFilters } from "@/hooks/useWorkouts";

type SidebarProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: () => void;
  onFilter: (filters: WorkoutFilters) => void;
  totalWorkouts: number;
};

function SidebarContent({
  onCreate,
  onFilter,
  totalWorkouts,
  onOpenChange,
}: Omit<SidebarProps, "open">) {
  return (
    <aside className="flex h-full w-72 flex-col gap-4 bg-neutral-950 px-4 py-8">
      <div>
        <h3 className="font-bold text-lg text-white">Dravyx</h3>
        <p className="text-muted-foreground text-sm">
          Acompanhando suas Cargas!
        </p>
      </div>

      <div className="mt-4">
        <h4 className="mb-2 font-semibold text-sm text-white">Filtros</h4>
        <div className="flex flex-col gap-2">
          <label htmlFor="fromDate">De</label>
          <Input
            id="fromDate"
            onChange={(e) => onFilter({ fromDate: e.target.value })}
            type="date"
          />
          <label htmlFor="toDate">Até</label>
          <Input
            id="toDate"
            onChange={(e) => onFilter({ toDate: e.target.value })}
            type="date"
          />
        </div>
      </div>

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

      <div className="mt-auto flex items-center justify-center text-muted-foreground text-xs">
        <p className="mt-2">© {new Date().getFullYear()} Dravyx • v0.1 MVP</p>
      </div>
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
