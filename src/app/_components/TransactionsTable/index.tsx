"use client";

import { MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { GetCookieClient } from "@/lib/cookies/GetCookieClient";
import { Api } from "@/services/apiConnect";

type TransactionsProps = {
  title: string;
  amount: number;
  description: string;
  category: string;
  origin: string;
  method: string;
  type: string;
  date: string;
  transactionId: string;
};
export function TransactionsTable() {
  const [transactions, setTransactions] = useState<TransactionsProps[]>([]);

  useEffect(() => {
    const token = GetCookieClient();

    async function fetchTransactions() {
      try {
        const response = await Api.get("/transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = response.data?.data?.userTransactions || [];
        setTransactions(data);
      } catch (error) {
        console.error("Erro ao buscar transações:", error);
      }
    }

    fetchTransactions();
  }, []);

  return (
    <div className="w-full overflow-x-auto bg-white text-black text-sm">
      <table className="w-full table-fixed">
        <thead className="bg-gray-100">
          <tr className="text-center">
            <th className="w-[15%] px-4 py-3 align-middle">Descrição</th>
            <th className="w-[15%] px-4 py-3 align-middle">Categoria</th>
            <th className="w-[15%] px-4 py-3 align-middle">Método</th>
            <th className="w-[15%] px-4 py-3 align-middle">Data</th>
            <th className="w-[15%] px-4 py-3 align-middle">Tipo</th>
            <th className="w-[15%] px-4 py-3 align-middle">Valor</th>
            <th className="w-[10%] px-1 py-3 align-middle" />
          </tr>
        </thead>
        <tbody>
          {transactions.map((item) => (
            <tr
              className="border-gray-200 border-b text-center hover:bg-gray-50"
              key={`${item.transactionId}`}
            >
              <td className="px-4 py-3 align-middle">{item.title}</td>
              <td className="px-4 py-3 align-middle">{item.category}</td>
              <td className="px-4 py-3 align-middle">{item.method}</td>
              <td className="px-4 py-3 align-middle">{item.date}</td>
              <td className="px-4 py-3 align-middle">{item.type}</td>
              <td
                className={`px-4 py-3 align-middle font-medium ${
                  item.type === "INCOME" ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.amount.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </td>
              <td className="w-[10%] px-1 py-3 align-middle">
                <div className="flex justify-center">
                  <button
                    className="ml-1 p-2"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log("Opções para:", item.title);
                    }}
                    type="button"
                  >
                    <MoreVertical className="text-gray-500" size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
