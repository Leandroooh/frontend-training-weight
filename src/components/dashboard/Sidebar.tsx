import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  onCreate: () => void;
  onFilter: (filters: { q?: string; from?: string; to?: string }) => void;
};

export function Sidebar({ onCreate, onFilter }: Props) {
  return (
    <aside className="flex h-screen w-64 flex-col gap-4 border-r p-4">
      <div className="mb-4">
        <h3 className="font-semibold text-lg">Treinos</h3>
        <p className="text-muted-foreground text-sm">Gerencie seus treinos</p>
      </div>

      <div>
        <Button onClick={onCreate}>+ Treino</Button>
      </div>

      <div className="mt-6">
        <label className="text-sm" htmlFor="search-input">
          Buscar
        </label>
        <Input
          id="search-input"
          onChange={(e) => onFilter({ q: e.target.value })}
          placeholder="Nome do treino"
        />
      </div>

      <div className="mt-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="text-sm" htmlFor="from-date">
              De
            </label>
            <Input
              id="from-date"
              onChange={(e) => onFilter({ from: e.target.value })}
              type="date"
            />
          </div>
          <div className="flex-1">
            <label className="text-sm" htmlFor="to-date">
              Até
            </label>
            <Input
              id="to-date"
              onChange={(e) => onFilter({ to: e.target.value })}
              type="date"
            />
          </div>
        </div>
      </div>

      <div className="mt-auto text-muted-foreground text-xs">
        <p>Usuário • Perfil</p>
        <p className="mt-2">v0.1 MVP</p>
      </div>
    </aside>
  );
}
