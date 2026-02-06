import { BookOpen, Waves } from "lucide-react";

export function SchoolLogo({ collapsed = false }: { collapsed?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-sidebar-primary">
        <BookOpen className="h-5 w-5 text-sidebar-primary-foreground" />
        <Waves className="absolute -bottom-0.5 -right-0.5 h-3 w-3 text-sidebar-primary-foreground/80" />
      </div>
      {!collapsed && (
        <div className="flex flex-col">
          <span className="text-sm font-bold leading-tight text-sidebar-foreground">
            Escola Municipal
          </span>
          <span className="text-xs text-sidebar-muted leading-tight">
            de Lucena
          </span>
        </div>
      )}
    </div>
  );
}
