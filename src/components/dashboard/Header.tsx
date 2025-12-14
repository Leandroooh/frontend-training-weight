import Cookies from "js-cookie";
import { LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { workoutApi } from "@/services/api";

export function Header() {
  const [username, setUsername] = useState("");
  const token = Cookies.get("token");

  const navigate = useNavigate();

  const logout = () => {
    Cookies.remove("token");
    navigate("/login", { replace: true });
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await workoutApi.get("/auth/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsername(response.data.username);
        console.log(response);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchUserData();
  }, [token]);

  return (
    <header className="flex items-center justify-between border-b px-6 py-4">
      <div>
        <h1 className="font-bold text-2xl">{username},</h1>
        <p className="text-muted-foreground text-sm">Seja bem-Vindo(a)</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <button className="font-medium" onClick={logout} type="button">
            <LogOut color="#C3C3C3" />
          </button>
        </div>
      </div>
    </header>
  );
}
