import { Lock, Mail, User2 } from "lucide-react";
import { redirect } from "next/navigation";
import { Api } from "../../services/apiConnect";
import { Button } from "../_components/button";
import { Input } from "../_components/input";

export default function Register() {
  async function handleRegister(formData: FormData) {
    "use server";

    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    await Api.post("/auth/register", {
      name,
      email,
      password,
    });

    redirect("/login");
  }

  return (
    <main className="flex flex-row">
      <section className="flex h-screen w-2/3 flex-col justify-center bg-linear-to-r from-[#043A8A] via-[#1C4ACF] to-[#0575E6]">
        <div className="mx-36">
          <h1 className="mb-3 font-extrabold text-5xl">Finance Dashboard</h1>
          <p className="font-medium text-lg">
            The best web service for manage your balance!
          </p>

          <button
            className="mt-4 cursor-pointer rounded-xl bg-[#0575E6] px-6 py-3 transition-colors duration-500 hover:bg-[#41a0ff]"
            type="button"
          >
            Read More
          </button>
        </div>
      </section>

      <section className="flex h-screen w-1/2 flex-col items-start justify-center bg-white px-30">
        <h1 className="font-bold text-3xl text-gray-800">Hello!</h1>
        <h3 className="mb-6 text-gray-600 text-lg">Sign Up to Get Started</h3>

        <form
          action={handleRegister}
          className="flex flex-col items-center gap-4"
        >
          <Input
            icon={<User2 />}
            name="name"
            placeholder="Nome de Usuario"
            type="text"
          />

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

          <Button name="Register" type="submit" />
        </form>
      </section>
    </main>
  );
}
