import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/ui/theme-provider";

export function FloatingThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    // Positioned higher (bottom-24) to avoid overlapping WhatsApp button
    <div className="fixed bottom-24 right-6 z-50"> 
      <Button
        variant="outline"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        // Updated styling:
        // Light Mode: White bg, Black border
        // Dark Mode: Green bg, Black icon (High Contrast)
        className="h-12 w-12 rounded-full shadow-2xl transition-all hover:scale-110 
                   bg-white border-2 border-black text-black
                   dark:bg-[hsl(142,70%,50%)] dark:border-white dark:text-black"
        aria-label="Toggle theme"
      >
        <Sun className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-[1.5rem] w-[1.5rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    </div>
  );
}