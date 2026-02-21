import type { FrequencyStatus } from "@/data/mockData";
import { LogIn, LogOut, Clock, AlertTriangle } from "lucide-react";

const config: Record<FrequencyStatus, { label: string; icon: React.ElementType; classes: string }> = {
  entrada: { label: "Entrada", icon: LogIn, classes: "bg-success/10 text-success border-success/20" },
  saida: { label: "Saída", icon: LogOut, classes: "bg-muted/60 text-muted-foreground border-border" },
  atraso: { label: "Atraso", icon: Clock, classes: "bg-warning/10 text-warning border-warning/20" },
  evadido: { label: "Evadido", icon: AlertTriangle, classes: "bg-destructive/10 text-destructive border-destructive/20" },
};

export function FrequencyBadge({ status }: { status: FrequencyStatus }) {
  const { label, icon: Icon, classes } = config[status];
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${classes}`}>
      <Icon className="h-3 w-3" /> {label}
    </span>
  );
}
