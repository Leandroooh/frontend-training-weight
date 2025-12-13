import cookies from "js-cookie";
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

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 5) {
      toast.error("A senha deve ter pelo menos 5 caracteres.");
      return;
    }

    try {
      setLoading(true);

      const response = await workoutApi.post("/auth/login", {
        email,
        password,
      });

      cookies.set("token", response.data, { expires: 1 });
      toast.success("Login realizado com sucesso!");
      navigate("/dashboard");

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
        <h1 className="font-bold text-5xl text-white tracking-tight">Dravyx</h1>

        <p className="mt-4 max-w-md text-lg text-neutral-400">
          Treinos registrados, progresso mensurado e decisões melhores a cada
          sessão.
        </p>
      </section>

      <section className="flex items-center justify-center bg-neutral-900 px-6">
        <Card className="w-full max-w-xs py-8 sm:max-w-sm md:max-w-md">
          <CardHeader>
            <CardTitle className="text-xl">Login</CardTitle>
            <CardDescription className="text-sm">
              Entre para continuar sua evolução
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="flex flex-col gap-6" onSubmit={handleLogin}>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  disabled={loading}
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@teste.com"
                  required
                  type="email"
                  value={email}
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
                  value={password}
                />
                <Link
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                  to="/"
                >
                  Não possui conta?
                </Link>
              </div>

              <Button className="w-full" disabled={loading} type="submit">
                {loading ? "Carregando..." : "Entrar"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
