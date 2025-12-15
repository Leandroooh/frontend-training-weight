import { type SetStateAction, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type CreateWorkoutPayload = {
  name: string;
  notes?: string;
  date: string;
};

export function CreateWorkoutDialog({
  open,
  onOpenChange,
  onCreate,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  onCreate: (data: CreateWorkoutPayload) => Promise<void>;
}) {
  const [name, setName] = useState("");
  const [notes, setNotes] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!name) {
      return;
    }

    try {
      setLoading(true);

      await onCreate({ name, notes, date });

      setName("");
      setNotes("");
      onOpenChange(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Novo treino</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3">
          <label className="text-sm" htmlFor="name">
            Nome
          </label>
          <Input
            id="name"
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: Pernas - Força"
            value={name}
          />

          <label className="text-sm" htmlFor="date">
            Data
          </label>
          <Input
            id="date"
            onChange={(e) => setDate(e.target.value)}
            type="date"
            value={date}
          />

          <label className="text-sm" htmlFor="notes">
            Notas
          </label>
          <Textarea
            id="notes"
            onChange={(e: { target: { value: SetStateAction<string> } }) =>
              setNotes(e.target.value)
            }
            placeholder="Observações…"
            value={notes}
          />
        </div>

        <DialogFooter className="mt-4">
          <Button onClick={() => onOpenChange(false)} variant="outline">
            Cancelar
          </Button>
          <Button disabled={loading} onClick={handleCreate}>
            {loading ? "Criando…" : "Criar treino"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
