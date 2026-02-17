import { useState } from "react";
import { useAuth, mockUsers, type UserRole } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SchoolLogo } from "@/components/SchoolLogo";
import { Shield, Crown, GraduationCap, BookOpen, Heart, LogIn } from "lucide-react";

const roleConfig: Record<UserRole, { label: string; icon: React.ElementType; color: string }> = {
  ADMIN: { label: "Admin", icon: Shield, color: "bg-destructive/10 text-destructive hover:bg-destructive/20" },
  PREFEITO: { label: "Prefeito", icon: Crown, color: "bg-warning/10 text-warning hover:bg-warning/20" },
  DIRETOR: { label: "Diretor(a)", icon: GraduationCap, color: "bg-primary/10 text-primary hover:bg-primary/20" },
  PROFESSOR: { label: "Professor(a)", icon: BookOpen, color: "bg-success/10 text-success hover:bg-success/20" },
  RESPONSAVEL: { label: "Pai/Mãe", icon: Heart, color: "bg-accent/20 text-accent-foreground hover:bg-accent/30" },
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleQuickLogin = (role: UserRole) => {
    const user = mockUsers.find((u) => u.role === role);
    if (user) {
      login(user);
      navigate(role === "RESPONSAVEL" ? "/area-do-aluno" : "/");
    }
  };

  const handleFormLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const user = mockUsers.find((u) => u.email === email);
    if (user) {
      login(user);
      navigate(user.role === "RESPONSAVEL" ? "/area-do-aluno" : "/");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md space-y-6"
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="gradient-ocean rounded-2xl p-4">
            <SchoolLogo collapsed={false} />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Sistema de Frequência</h1>
            <p className="text-sm text-muted-foreground">Escola Municipal de Lucena</p>
          </div>
        </div>

        {/* Login form */}
        <div className="rounded-xl border bg-card p-6 shadow-card space-y-5">
          <form onSubmit={handleFormLogin} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground">E-mail</label>
              <Input
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">Senha</label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1"
              />
            </div>
            <Button type="submit" className="w-full gap-2">
              <LogIn className="h-4 w-4" /> Entrar
            </Button>
          </form>
        </div>

        {/* Quick access */}
        <div className="rounded-xl border border-dashed border-warning/40 bg-warning/5 p-5 space-y-3">
          <p className="text-xs font-semibold text-warning text-center uppercase tracking-wide">
            ⚡ Acesso Rápido (Ambiente de Teste)
          </p>
          <div className="grid grid-cols-2 gap-2">
            {(Object.keys(roleConfig) as UserRole[]).map((role) => {
              const { label, icon: Icon, color } = roleConfig[role];
              return (
                <button
                  key={role}
                  onClick={() => handleQuickLogin(role)}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm font-medium transition-colors ${color}`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>Logar como {label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
