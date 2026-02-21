import { useLocation, Link } from "react-router-dom";
import { LayoutDashboard, Users, BarChart3, Cpu, ChevronLeft, ChevronRight, Menu, GraduationCap } from "lucide-react";
import { SchoolLogo } from "./SchoolLogo";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useAuth, type UserRole } from "@/contexts/AuthContext";

interface NavItem {
  title: string;
  path: string;
  icon: React.ElementType;
  roles: UserRole[];
}

const allNavItems: NavItem[] = [
  { title: "Dashboard", path: "/", icon: LayoutDashboard, roles: ["ADMIN", "PREFEITO", "DIRETOR", "PROFESSOR"] },
  { title: "Turmas & Alunos", path: "/turmas", icon: Users, roles: ["ADMIN", "DIRETOR", "PROFESSOR"] },
  { title: "Relatórios", path: "/relatorios", icon: BarChart3, roles: ["ADMIN", "PREFEITO", "DIRETOR"] },
  { title: "Terminais IoT", path: "/terminais", icon: Cpu, roles: ["ADMIN"] },
  { title: "Área da Família", path: "/area-familia", icon: GraduationCap, roles: ["RESPONSAVEL"] },
];

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const location = useLocation();
  const { user } = useAuth();
  const navItems = allNavItems.filter((item) => user && item.roles.includes(user.role));

  return (
    <nav className="flex-1 space-y-1 px-3">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
              isActive
                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
            )}
          >
            <item.icon className="h-5 w-5 shrink-0" />
            <span>{item.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function MobileSidebarTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card hover:bg-muted transition-colors md:hidden"
      aria-label="Abrir menu"
    >
      <Menu className="h-5 w-5 text-foreground" />
    </button>
  );
}

export function AppSidebar({ mobileOpen, setMobileOpen }: { mobileOpen: boolean; setMobileOpen: (v: boolean) => void }) {
  const isMobile = useIsMobile();
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useAuth();
  const navItems = allNavItems.filter((item) => user && item.roles.includes(user.role));

  if (isMobile) {
    return (
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="gradient-ocean p-0 w-[280px] border-r border-sidebar-border">
          <SheetTitle className="sr-only">Menu de navegação</SheetTitle>
          <div className="flex items-center justify-between p-4">
            <SchoolLogo collapsed={false} />
          </div>
          <div className="mx-3 mb-4 h-px bg-sidebar-border/50" />
          <SidebarNav onNavigate={() => setMobileOpen(false)} />
          {user && (
            <div className="p-4 border-t border-sidebar-border/30">
              <div className="rounded-lg bg-sidebar-accent/30 p-3">
                <p className="text-xs text-sidebar-foreground font-medium truncate">{user.name}</p>
                <p className="text-[10px] text-sidebar-muted capitalize">{user.role.toLowerCase()}</p>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className="gradient-ocean flex flex-col border-r border-sidebar-border min-h-screen relative hidden md:flex"
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

      {user && (
        <div className="p-4">
          <div className="rounded-lg bg-sidebar-accent/30 p-3">
            {!collapsed ? (
              <>
                <p className="text-xs text-sidebar-foreground font-medium truncate">{user.name}</p>
                <p className="text-[10px] text-sidebar-muted capitalize">{user.role.toLowerCase()}</p>
              </>
            ) : null}
          </div>
        </div>
      )}
    </motion.aside>
  );
}
