import { createContext, useContext, useState, ReactNode } from "react";

export type UserRole = "ADMIN" | "PREFEITO" | "DIRETOR" | "PROFESSOR" | "RESPONSAVEL";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  /** IDs das turmas vinculadas (PROFESSOR) */
  turmaIds?: string[];
  /** IDs dos alunos vinculados (RESPONSAVEL) */
  alunoIds?: string[];
}

export const mockUsers: AppUser[] = [
  { id: "u1", name: "Carlos Admin", email: "admin@lucena.edu.br", role: "ADMIN" },
  { id: "u2", name: "João Prefeito", email: "prefeito@lucena.gov.br", role: "PREFEITO" },
  { id: "u3", name: "Maria Diretora", email: "diretora@lucena.edu.br", role: "DIRETOR" },
  { id: "u4", name: "Prof. Ana Lima", email: "prof.ana@lucena.edu.br", role: "PROFESSOR", turmaIds: ["101", "201"] },
  { id: "u5", name: "José da Silva (Pai)", email: "jose.pai@email.com", role: "RESPONSAVEL", alunoIds: ["1"] },
];

interface AuthContextType {
  user: AppUser | null;
  login: (user: AppUser) => void;
  logout: () => void;
  hasPermission: (requiredRoles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
  hasPermission: () => false,
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);

  const login = (u: AppUser) => setUser(u);
  const logout = () => setUser(null);
  const hasPermission = (roles: UserRole[]) => !!user && roles.includes(user.role);

  return (
    <AuthContext.Provider value={{ user, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  );
}
