import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./contexts/AppContext";
import { AuthProvider } from "./contexts/AuthContext";
import { AppLayout } from "./components/AppLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ClassDetail from "./pages/ClassDetail";
import TurmasAlunos from "./pages/TurmasAlunos";
import Relatorios from "./pages/Relatorios";
import Configuracoes from "./pages/Configuracoes";
import AreaDoAluno from "./pages/AreaDoAluno";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <AppProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<ProtectedRoute allowedRoles={["ADMIN", "PREFEITO", "DIRETOR", "PROFESSOR"]}><AppLayout /></ProtectedRoute>}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/turma/:id" element={<ClassDetail />} />
                <Route path="/turmas" element={<TurmasAlunos />} />
                <Route path="/relatorios" element={<ProtectedRoute allowedRoles={["ADMIN", "PREFEITO", "DIRETOR"]}><Relatorios /></ProtectedRoute>} />
                <Route path="/configuracoes" element={<ProtectedRoute allowedRoles={["ADMIN"]}><Configuracoes /></ProtectedRoute>} />
              </Route>
              <Route path="/area-do-aluno" element={<ProtectedRoute allowedRoles={["RESPONSAVEL"]}><AppLayout /></ProtectedRoute>}>
                <Route index element={<AreaDoAluno />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
