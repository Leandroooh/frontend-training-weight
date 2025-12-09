import { TrendingDown, TrendingUp } from "lucide-react";

type actionButtonProps = {
  title: string;
  balance: string;
  variation: string;
  type: "EXPENSE" | "INCOME";
};

export function ActionButton({
  title,
  balance,
  variation,
  type,
}: actionButtonProps) {
  const Icon = type === "EXPENSE" ? TrendingDown : TrendingUp;
  const iconColor = type === "EXPENSE" ? "text-red-500" : "text-green-500";

  return (
    <button
      className="relative flex h-32 w-96 flex-row items-center justify-between rounded-lg border border-[#ECEFF2] bg-white px-12 py-10 text-black shadow-2xl shadow-[#1018280D]"
      type="button"
    >
      <div className="flex flex-col items-start">
        <h3 className="text-[#516778] text-lg">{title}</h3>
        <h1 className="font-extrabold text-2xl text-[#155EEF]">{balance}</h1>
      </div>
      <div className="absolute right-10 bottom-7 flex items-center gap-1 border border-[#D5DDE2] px-2 py-1">
        <Icon className={`h-4 w-4 text-[#22292F] ${iconColor}`} />
        <p className="text-[#22292F] text-sm">{variation}</p>
      </div>
    </button>
  );
}
