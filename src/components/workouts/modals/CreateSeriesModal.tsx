/** biome-ignore-all lint/nursery/noLeakedRender: biome ignore */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CreateSeriesPayload = {
  set: number;
  reps: number;
  seriesWeight: number;
};

type CreateSeriesModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (data: CreateSeriesPayload) => Promise<void>;
};

export function CreateSeriesModal({
  open,
  onOpenChange,
  onCreate,
}: CreateSeriesModalProps) {
  const [set, setSet] = useState<number>(1);
  const [reps, setReps] = useState<number>(0);
  const [seriesWeight, setSeriesWeight] = useState<number>(0);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!set || reps <= 0) {
      return;
    }

    try {
      setLoading(true);
      await onCreate({ set, reps, seriesWeight });
      onOpenChange(false);
      setSet(1);
      setReps(0);
      setSeriesWeight(0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent className="sm:max-w-[420px]">
        <DialogHeader>
          <DialogTitle>Adicionar série</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="set">Série</Label>
            <Input
              id="set"
              min={1}
              onChange={(e) => setSet(Number(e.target.value))}
              type="number"
              value={set}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="reps">Repetições</Label>
            <Input
              id="reps"
              min={1}
              onChange={(e) => setReps(Number(e.target.value))}
              type="number"
              value={reps}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="weight">Carga (kg)</Label>
            <Input
              id="weight"
              min={0}
              onChange={(e) => setSeriesWeight(Number(e.target.value))}
              step="0.5"
              type="number"
              value={seriesWeight === 0 ? "" : seriesWeight}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            disabled={loading}
            onClick={() => onOpenChange(false)}
            variant="outline"
          >
            Cancelar
          </Button>
          <Button disabled={loading} onClick={handleSubmit}>
            {loading ? "Salvando..." : "Adicionar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
