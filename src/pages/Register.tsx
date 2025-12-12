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
import { extractApiError } from "@/utils/extractApiError";

export function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.length < 5) {
      toast.error("A senha deve ter pelo menos 5 caracteres.");
      return;
    }

    try {
      setLoading(true);

      const response = await workoutApi.post("/auth/register", {
        email,
        password,
      });

      console.log("Usuário criado:", response.data);

      toast.success("Conta criada com sucesso!");

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
          <CardTitle>Cadastro</CardTitle>
          <CardDescription>Cadastre-se para obter acesso!</CardDescription>
        </CardHeader>

        <CardContent className="flex h-full flex-col gap-6">
          <form
            className="flex flex-1 flex-col gap-6"
            onSubmit={handleRegister}
          >
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
                placeholder="•••••"
                required
                type="password"
              />
              <Link
                className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                to="/login"
              >
                Já tem conta?
              </Link>
            </div>

            <div className="flex w-full justify-center">
              <Button disabled={loading} type="submit">
                {loading ? "Carregando..." : "Cadastrar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}
