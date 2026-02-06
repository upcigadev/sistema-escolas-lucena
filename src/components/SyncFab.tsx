import { RefreshCw } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

export function SyncFab() {
  const { connectionStatus } = useAppContext();
  const [syncing, setSyncing] = useState(false);

  const handleSync = () => {
    setSyncing(true);
    setTimeout(() => {
      setSyncing(false);
      if (connectionStatus === "online") {
        toast.success("Sincronização concluída com sucesso!");
      } else {
        toast.error("Sem conexão. Tentativa de sincronização falhou.");
      }
    }, 2000);
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleSync}
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full gradient-ocean text-ocean-foreground shadow-lg hover:shadow-xl transition-shadow"
      title="Forçar Sincronização Manual"
    >
      <RefreshCw className={`h-6 w-6 ${syncing ? "animate-spin" : ""}`} />
    </motion.button>
  );
}
