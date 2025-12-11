import cookies from "js-cookie";
import { useState } from "react";
import { Link } from "react-router-dom";
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
import { extractApiError } from "@/utiils/extractApiError";

export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

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

      console.log("Usuário logado:", response.data);
      cookies.set("token", response.data, { expires: 1 });
      toast.success("Login realizado com sucesso!");

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
    <main className="flex h-dvh w-full items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Entre para anotar suas cargas!</CardDescription>
        </CardHeader>

        <CardContent className="flex h-full flex-col gap-6">
          <form className="flex flex-1 flex-col gap-6" onSubmit={handleLogin}>
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
                placeholder="•••••"
                required
                type="password"
                value={password}
              />
              <Link
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                to="/"
              >
                Não possúi conta?
              </Link>
            </div>

            <div className="flex w-full justify-center">
              <Button disabled={loading} type="submit">
                {loading ? "Carregando..." : "Entrar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
