import {
  ArrowRight,
  Check,
  Dumbbell,
  LineChart,
  LogIn,
  NotebookPen,
  User,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export function Landing() {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-primary" />
            <span className="font-bold text-xl">Dravyx</span>
          </div>

          <div className="flex gap-3">
            <Button onClick={() => navigate("/login")} variant="ghost">
              <LogIn className="h-4 w-4" />
              Login
            </Button>
            <Button onClick={() => navigate("/register")} variant="outline">
              <User className="h-4 w-4" />
              Registrar
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-6 py-20 md:grid-cols-2">
        <div className="flex flex-col gap-6">
          <Badge className="w-fit" variant="secondary">
            Treino orientado por dados
          </Badge>

          <h1 className="font-bold text-4xl leading-tight tracking-tight md:text-5xl">
            Treino sem dados
            <br />
            <span className="text-primary">é achismo.</span>
          </h1>

          <p className="max-w-xl text-muted-foreground">
            Registre cargas, séries e repetições. Visualize a progressão e tome
            decisões com base em histórico real — não em memória.
          </p>

          <div className="flex flex-wrap gap-3">
            <Button onClick={() => navigate("/register")} size="lg">
              Começar gratuitamente
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={() => navigate("/login")}
              size="lg"
              variant="outline"
            >
              Entrar
            </Button>
          </div>

          <div className="flex gap-4 text-muted-foreground text-xs">
            <span>Registro rápido</span>
            <span>•</span>
            <span>Histórico confiável</span>
            <span>•</span>
            <span>Progressão clara</span>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl">
          <img
            alt="Treino de força"
            className="h-full w-full border-hidden object-cover"
            height={400}
            src="https://static.vecteezy.com/system/resources/previews/026/469/034/non_2x/3d-sportsman-character-building-upper-body-strength-with-overhead-bench-press-workout-free-png.png"
            width={400}
          />
        </div>
      </section>

      <Separator />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-10 text-center font-bold text-3xl tracking-tight">
          O problema não é treinar.
          <br />
          <span className="text-muted-foreground">
            É não saber se você está evoluindo.
          </span>
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-destructive/40 bg-destructive/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-destructive">
                <X className="h-4 w-4" />
                Treino sem registro
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground text-sm">
              <p>Dependência da memória</p>
              <p>Progressão feita no feeling</p>
              <p>Repetição de cargas sem critério</p>
              <p>Estagnação sem diagnóstico</p>
            </CardContent>
          </Card>

          <Card className="border-primary/40 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-primary">
                <Check className="h-4 w-4" />
                Treino com Dravyx
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground text-sm">
              <p>Histórico claro por exercício</p>
              <p>Progressão baseada em dados</p>
              <p>Decisão consciente de carga</p>
              <p>Evolução consistente</p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-10 text-center font-bold text-3xl tracking-tight">
          Menos distração.
          <br />
          Mais progresso.
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center gap-3">
              <NotebookPen className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">
                Nunca esqueça sua última carga
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Cada série registrada vira referência real para a próxima sessão.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-3">
              <Dumbbell className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">
                Treinos organizados e claros
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Exercícios, séries e cargas sempre no mesmo lugar.
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-3">
              <LineChart className="h-5 w-5 text-primary" />
              <CardTitle className="text-base">
                Visualize sua evolução
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Enxergue progressões reais ao longo das semanas.
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-10 text-center font-bold text-3xl tracking-tight">
          Em menos de 1 minuto por treino
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <Badge variant="secondary">Passo 1</Badge>
              <CardTitle className="mt-2 text-base">Crie o treino</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Comece do zero em poucos toques: crie seu treino do dia e adicione
              os exerícios. Sem fricção, só o essencial para você treinar rápido
              e com clareza.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Badge variant="secondary">Passo 2</Badge>
              <CardTitle className="mt-2 text-base">
                Registre as séries
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Durante o treino, anote carga e repetições em segundos. Cada
              registro vira um marco no seu histórico, mostrando exatamente onde
              você está.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <Badge variant="secondary">Passo 3</Badge>
              <CardTitle className="mt-2 text-base">
                Evolua com referência
              </CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground text-sm">
              Na próxima sessão, você já sabe qual foi sua última carga e como
              evoluiu. Use o histórico como guia para aumentar com segurança e
              consistência. Assim, cada treino é um passo claro rumo ao
              progresso.
            </CardContent>
          </Card>
        </div>
      </section>

      <Separator />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="rounded-2xl bg-primary/10 p-10 text-center">
          <h2 className="mb-3 font-bold text-3xl tracking-tight">
            Se você leva treino a sério,
            <br />
            seus dados também precisam ser levados.
          </h2>

          <p className="mb-6 text-muted-foreground">
            Comece hoje. O histórico começa agora.
          </p>

          <div className="flex justify-center gap-4">
            <Button onClick={() => navigate("/register")} size="lg">
              Criar conta gratuita
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              onClick={() => navigate("/login")}
              size="lg"
              variant="outline"
            >
              Entrar
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t py-6">
        <div className="flex flex-col items-center justify-center gap-3 px-6 text-muted-foreground text-sm sm:flex-row">
          <span>
            © {new Date().getFullYear()} Dravyx. Todos os direitos reservados.
          </span>
        </div>
      </footer>
    </main>
  );
}
