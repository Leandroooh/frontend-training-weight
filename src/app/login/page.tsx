import { Lock, Mail } from "lucide-react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Api } from "../../services/apiConnect";
import { Button } from "../_components/button";
import { Input } from "../_components/input";

export default function Login() {
  async function handleLogin(formData: FormData) {
    "use server";

    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const response = await Api.post("/auth/login", { email, password });
      const { token } = response.data;

      // biome-ignore lint/style/noMagicNumbers: Token Expire Time
      const expireTime = 60 * 60 * 24 * 30 * 1000;
      const cookieStorage = await cookies();

      cookieStorage.set("session", token, {
        maxAge: expireTime,
        path: "/",
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
      });
    } catch (_err) {
      return;
    }
    redirect("/dashboard");
  }

  return (
    <main className="flex flex-row">
      <section className="flex h-screen w-2/3 flex-col justify-center bg-linear-to-r from-[#0575E6] via-[#1C4ACF] to-[#043A8A]">
        <div className="mx-36">
          <h1 className="mb-3 font-extrabold text-5xl">Finance Dashboard</h1>
          <p className="font-medium text-lg">
            The best web service for manage your balance!
          </p>

          <button
            className="mt-4 cursor-pointer rounded-xl border border-gray-400 bg-[#0575E6] px-6 py-3 transition-colors duration-500 hover:bg-[#1C4ACF]"
            type="button"
          >
            Read More
          </button>
        </div>
      </section>

      <section className="flex h-screen w-1/2 flex-col items-start justify-center bg-white px-30">
        <h1 className="font-bold text-3xl text-gray-800">Hello Again!</h1>
        <h3 className="mb-6 text-gray-600 text-lg">Welcome Back</h3>

        <form action={handleLogin} className="flex flex-col items-center gap-4">
          <Input
            icon={<Mail />}
            name="email"
            placeholder="Digite seu E-mail"
            type="email"
          />

          <Input
            icon={<Lock />}
            name="password"
            placeholder="Digite sua senha"
            type="password"
          />

          <Button name="Login" type="submit" />
        </form>
      </section>
    </main>
  );
}
