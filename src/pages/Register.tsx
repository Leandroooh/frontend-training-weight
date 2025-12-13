import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { workoutApi } from "@/services/api";
import { extractApiError } from "@/utils/extractApiError";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 5) {
      toast.error("A senha deve ter pelo menos 5 caracteres.");
      return;
    }

    try {
      setLoading(true);

      await workoutApi.post("/auth/register", {
        email,
        username,
        password,
      });

      toast.success("Conta criada com sucesso!");
      navigate("/login");

      setEmail("");
      setPassword("");
    } catch (error) {
      const message = extractApiError(error);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="grid h-dvh w-full grid-cols-1 md:grid-cols-2">
      <section className="hidden flex-col justify-center bg-neutral-950 px-16 md:flex">
        <h1 className="font-bold text-5xl tracking-tight">Dravyx</h1>

        <p className="mt-4 max-w-md text-lg text-muted-foreground">
          Acompanhe cargas, séries e repetições com precisão. Evolução real
          nasce de dados consistentes.{" "}
        </p>
      </section>

      {/* RIGHT – FORM */}
      <section className="flex items-center justify-center bg-neutral-900 px-6">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Cadastro</CardTitle>
            <CardDescription>
              Crie sua conta e comece a registrar seus treinos
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="flex flex-col gap-6" onSubmit={handleRegister}>
              <div className="grid gap-2">
                <Label htmlFor="username">Nome de usuário</Label>
                <Input
                  disabled={loading}
                  id="username"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enzo"
                  required
                  value={username}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  disabled={loading}
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@teste.com"
                  required
                  type="email"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="password">Senha</Label>
                <Input
                  disabled={loading}
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  type="password"
                />
                <Link
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                  to="/login"
                >
                  Já tem conta?
                </Link>
              </div>

              <Button className="w-full" disabled={loading} type="submit">
                {loading ? "Carregando..." : "Cadastrar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
