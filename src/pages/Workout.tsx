import { useParams } from "react-router-dom";

export function WorkoutPage() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-semibold text-xl">Treino</h2>
      <p className="text-muted-foreground">ID: {id}</p>

      {/* fetch e detalhes do treino entram aqui */}
    </div>
  );
}
