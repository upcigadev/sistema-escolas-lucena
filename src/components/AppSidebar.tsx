import { useLocation, Link } from "react-router-dom";
import { LayoutDashboard, Users, BarChart3, Settings, ChevronLeft, ChevronRight } from "lucide-react";
import { SchoolLogo } from "./SchoolLogo";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const navItems = [
  { title: "Dashboard", path: "/", icon: LayoutDashboard },
  { title: "Turmas & Alunos", path: "/turmas", icon: Users },
  { title: "Relatórios", path: "/relatorios", icon: BarChart3 },
  { title: "Configurações iDFace", path: "/configuracoes", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="gradient-ocean flex flex-col border-r border-sidebar-border min-h-screen relative"
    >
      <div className="flex items-center justify-between p-4">
        <SchoolLogo collapsed={collapsed} />
      </div>

      <div className="mx-3 mb-4 h-px bg-sidebar-border/50" />

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
              )}
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full bg-card border border-border shadow-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
      </button>

      <div className="p-4">
        <div className="rounded-lg bg-sidebar-accent/30 p-3">
          {!collapsed && (
            <p className="text-xs text-sidebar-muted">
              Sistema de Frequência v1.0
            </p>
          )}
        </div>
      </div>
    </motion.aside>
  );
}
