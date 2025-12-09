import { PlusCircle } from "lucide-react";

export function OptionButton() {
  return (
    <button
      className="flex h-28 w-98 flex-row items-center gap-8 rounded-lg border border-[#ECEFF2] bg-white px-12 py-10 text-black shadow-2xl shadow-[#1018280D]"
      type="button"
    >
      <section className="rounded-lg bg-[#DCFAE6] p-3 transition-transform duration-700 hover:scale-105">
        <PlusCircle color="#0B9055" />
      </section>

      <section className="flex w-full flex-col text-left">
        <h1 className="font-bold text-[#333E47] text-lg">Add Income</h1>
        <h3 className="text-gray-600 text-sm">Create a Income manually</h3>
      </section>
    </button>
  );
}
