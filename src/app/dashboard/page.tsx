import { ActionButton } from "../_components/ActionButton";
import { OptionButton } from "../_components/OptionButton";
import { TransactionsTable } from "../_components/TransactionsTable";

export default function DashBoard() {
  return (
    <main className="m-auto max-w-7xl">
      <h1 className="mt-4 mb-4 font-bold text-2xl text-black">
        Hello, LsOliveira!
      </h1>

      <section className="flex flex-row justify-between">
        <ActionButton
          balance="R$ 1.350,00"
          title="Balance"
          type="EXPENSE"
          variation="12%"
        />
        <ActionButton
          balance="R$ 350,00"
          title="Expense"
          type="INCOME"
          variation="17%"
        />
        <ActionButton
          balance="R$ 750,00"
          title="Incomes"
          type="INCOME"
          variation="32%"
        />
      </section>

      <section className="mt-6 flex flex-row justify-between">
        <OptionButton />
        <OptionButton />
        <OptionButton />
      </section>

      <section className="mt-8 flex items-center">
        <TransactionsTable />
      </section>

      <footer className="mt-8 flex items-center justify-center text-gray-400">
        <p>&copy; 2025 Controle de Finanças. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}
