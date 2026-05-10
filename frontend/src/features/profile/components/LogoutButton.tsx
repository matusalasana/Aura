import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLogout } from "../../auth/hooks/useLogout";

const LogoutButton = () => {
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useLogout();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isPending}
      aria-label="Logout"
      className="
        flex items-center gap-2 rounded-xl border border-red-200
        bg-red-50 px-4 py-2 text-sm font-medium text-red-500
        transition-all duration-200
        hover:bg-red-100 hover:text-red-600
        active:scale-95
        disabled:cursor-not-allowed disabled:opacity-50
        dark:border-red-900/40 dark:bg-red-950/30
        dark:text-red-400 dark:hover:bg-red-900/40
      "
    >
      <LogOut size={18} />
      <span>{isPending ? "Logging out..." : "Logout"}</span>
    </button>
  );
};

export default LogoutButton;