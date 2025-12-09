import { Header } from "../_components/header/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-[#ECEFF2]">
      <Header />
      {children}
    </div>
  );
}
