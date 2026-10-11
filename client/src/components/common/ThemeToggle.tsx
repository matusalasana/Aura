import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="
        btn-ghost relative flex-center h-10 w-10 p-0
        rounded-xl border border-border bg-card
        transition-all duration-300
        hover:border-primary/40 hover:bg-primary/5
      "
    >
      <Sun
        className={`absolute h-5 w-5 transition-all duration-300 ${
          theme === "dark"
            ? "scale-0 rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100"
        }`}
      />

      <Moon
        className={`absolute h-5 w-5 transition-all duration-300 ${
          theme === "dark"
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 -rotate-90 opacity-0"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
