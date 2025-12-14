import Cookies from "js-cookie";
import { LogOut, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { workoutApi } from "@/services/api";

type Props = {
  onOpenSidebar: () => void;
};

export function Header({ onOpenSidebar }: Props) {
  const [username, setUsername] = useState("");
  const token = Cookies.get("token");
  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("token");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    async function fetchUserData() {
      const response = await workoutApi.get("/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsername(response.data.username);
    }
    fetchUserData();
  }, [token]);

  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <div className="flex items-center gap-3">
        {/* ☰ MOBILE */}
        <Button
          className="lg:hidden"
          onClick={onOpenSidebar}
          size="icon"
          variant="ghost"
        >
          <Menu />
        </Button>

        <div>
          <h1 className="font-bold text-2xl">{username},</h1>
          <p className="text-muted-foreground text-sm">Seja bem-vindo(a)</p>
        </div>
      </div>

      <button onClick={logout} type="button">
        <LogOut className="text-muted-foreground" />
      </button>
    </header>
  );
}
