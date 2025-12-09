import { Settings } from "lucide-react";
import Image from "next/image";

export function Header() {
  return (
    <nav className="flex h-20 w-full flex-row items-center justify-between border-[#ECEFF2] border-b bg-white px-30 text-black">
      <div>
        <h1 className="font-extrabold text-xl">FinanceDash</h1>
      </div>

      <ul className="flex gap-6">
        <li>Overview</li>
        <li>Transactions</li>
        <li>Analytics</li>
        <li>Accounts</li>
        <li>Wallet</li>
      </ul>

      <div className="flex items-center gap-4">
        <button type="button">
          <Settings />
        </button>

        <button type="button">
          <Image
            alt="User Logo"
            className="h-7 w-7 cursor-pointer rounded-full bg-cover"
            height={32}
            src={
              "https://images.unsplash.com/photo-1610438235354-a6ae5528385c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687"
            }
            width={32}
          />
        </button>
      </div>
    </nav>
  );
}
