import { CloudOff, Cloud, RefreshCw, Wifi, WifiOff } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { motion, AnimatePresence } from "framer-motion";

export function ConnectionStatus() {
  const { connectionStatus, pendingMessages } = useAppContext();
  const isOnline = connectionStatus === "online";

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isOnline ? "online" : "offline"}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 4 }}
        className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
          isOnline
            ? "bg-success/10 text-success"
            : "bg-destructive/10 text-destructive animate-pulse-soft"
        }`}
      >
        {isOnline ? (
          <>
            <Cloud className="h-4 w-4" />
            <span className="hidden sm:inline">Sistema Online</span>
            <span className="mx-1 hidden sm:inline text-success/50">•</span>
            <span className="hidden md:inline">Sincronizado com WhatsApp</span>
          </>
        ) : (
          <>
            <CloudOff className="h-4 w-4" />
            <span className="hidden sm:inline font-bold">MODO OFFLINE</span>
            <span className="mx-1 hidden sm:inline text-destructive/50">•</span>
            <span className="hidden md:inline">
              Operando Localmente. {pendingMessages} mensagens na fila
            </span>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
