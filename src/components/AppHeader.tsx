import { ConnectionStatus } from "./ConnectionStatus";
import { useAppContext } from "@/contexts/AppContext";
import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MobileSidebarTrigger } from "./AppSidebar";

interface AppHeaderProps {
  onMobileMenuOpen: () => void;
}

export function AppHeader({ onMobileMenuOpen }: AppHeaderProps) {
  const { connectionStatus, setConnectionStatus } = useAppContext();

  return (
    <header className="flex h-14 md:h-16 items-center justify-between border-b border-border bg-card px-4 md:px-6">
      <div className="flex items-center gap-3">
        <MobileSidebarTrigger onClick={onMobileMenuOpen} />
        <h2 className="text-sm md:text-lg font-semibold text-foreground hidden sm:block">
          Sistema de Frequência Escolar
        </h2>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        <ConnectionStatus />

        <button
          onClick={() =>
            setConnectionStatus(connectionStatus === "online" ? "offline" : "online")
          }
          className="hidden sm:inline-flex rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted transition-colors"
        >
          Simular {connectionStatus === "online" ? "Offline" : "Online"}
        </button>

        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
            3
          </span>
        </Button>
      </div>
    </header>
  );
}
