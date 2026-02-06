import { ConnectionStatus } from "./ConnectionStatus";
import { useAppContext } from "@/contexts/AppContext";
import { RefreshCw, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AppHeader() {
  const { connectionStatus, setConnectionStatus } = useAppContext();

  return (
    <header className="flex h-16 items-center justify-between border-b border-border bg-card px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold text-foreground">
          Sistema de Frequência Escolar
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <ConnectionStatus />

        <button
          onClick={() =>
            setConnectionStatus(connectionStatus === "online" ? "offline" : "online")
          }
          className="rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground hover:bg-muted transition-colors"
        >
          Simular {connectionStatus === "online" ? "Offline" : "Online"}
        </button>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-destructive text-[10px] text-destructive-foreground">
            3
          </span>
        </Button>
      </div>
    </header>
  );
}
