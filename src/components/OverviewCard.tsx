import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

interface OverviewCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  variant: "primary" | "success" | "destructive";
}

const variantStyles = {
  primary: "bg-primary/10 text-primary border-primary/20",
  success: "bg-success/10 text-success border-success/20",
  destructive: "bg-destructive/10 text-destructive border-destructive/20",
};

const iconStyles = {
  primary: "bg-primary/15 text-primary",
  success: "bg-success/15 text-success",
  destructive: "bg-destructive/15 text-destructive",
};

export function OverviewCard({ title, value, icon: Icon, variant }: OverviewCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border bg-card p-6 shadow-card"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl md:text-4xl font-bold text-foreground">{value}</p>
        </div>
        <div className={`flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-xl ${iconStyles[variant]}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </motion.div>
  );
}
