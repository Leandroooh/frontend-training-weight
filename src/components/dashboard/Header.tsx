export function Header({ userName }: { userName?: string }) {
  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <div>
        <h1 className="font-bold text-2xl">Workout Journal</h1>
        <p className="text-muted-foreground text-sm">
          Anote suas cargas com simplicidade
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <div className="font-medium">{userName || "Usuário"}</div>
          <div className="text-muted-foreground text-xs">Ver perfil</div>
        </div>
      </div>
    </header>
  );
}
