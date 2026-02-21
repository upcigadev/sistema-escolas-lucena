import { useAuth } from "@/contexts/AuthContext";
import { getStudentsByResponsavel, getLogsByAluno, mockClassRooms, mockStudents, type FrequencyLog, type Student } from "@/data/mockData";
import { motion } from "framer-motion";
import { User, GraduationCap, LogIn, LogOut, Clock, AlertTriangle } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const statusConfig: Record<string, { label: string; icon: React.ElementType; color: string; bg: string; emoji: string }> = {
  entrada: { label: "Entrada", icon: LogIn, color: "text-success", bg: "bg-success/10 border-success/20", emoji: "🟢" },
  saida: { label: "Saída", icon: LogOut, color: "text-muted-foreground", bg: "bg-muted/50 border-border", emoji: "🔵" },
  atraso: { label: "Atraso", icon: Clock, color: "text-warning", bg: "bg-warning/10 border-warning/20", emoji: "🟡" },
  evadido: { label: "Alerta de Evasão", icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10 border-destructive/20", emoji: "🔴" },
};

function AttendanceCircle({ percentage }: { percentage: number }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;
  const color = percentage >= 75 ? "hsl(155, 60%, 40%)" : "hsl(12, 80%, 55%)";

  return (
    <div className="relative h-28 w-28 shrink-0">
      <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={radius} fill="none" stroke="hsl(200, 20%, 88%)" strokeWidth="8" />
        <circle cx="50" cy="50" r={radius} fill="none" stroke={color} strokeWidth="8" strokeDasharray={circumference} strokeDashoffset={offset} strokeLinecap="round" className="transition-all duration-700" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold text-foreground">{percentage}%</span>
        <span className="text-[10px] text-muted-foreground">Frequência</span>
      </div>
    </div>
  );
}

function StudentTab({ studentId }: { studentId: string }) {
  const allStudents = Object.values(mockStudents).flat() as Student[];
  const student = allStudents.find((s) => s.id === studentId);
  const turma = student ? mockClassRooms.find((c) => c.id === student.turma_id) : null;
  const logs = getLogsByAluno(studentId);

  if (!student) return <p className="text-muted-foreground p-4">Aluno não encontrado.</p>;

  // Calculate attendance from logs
  const uniqueDays = [...new Set(logs.map((l) => l.data))];
  const daysWithEntry = uniqueDays.filter((d) => logs.some((l) => l.data === d && (l.tipo === "entrada" || l.tipo === "atraso")));
  const pct = uniqueDays.length > 0 ? Math.round((daysWithEntry.length / uniqueDays.length) * 100) : 100;

  // Group logs by date for timeline
  const groupedLogs: Record<string, FrequencyLog[]> = {};
  logs.forEach((l) => {
    if (!groupedLogs[l.data]) groupedLogs[l.data] = [];
    groupedLogs[l.data].push(l);
  });

  return (
    <div className="space-y-5">
      {/* Student card */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border bg-card p-5 shadow-card flex flex-col sm:flex-row items-center gap-5">
        <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary border-2 border-primary/20 overflow-hidden">
          {student.foto_base64 ? (
            <img src={student.foto_base64} alt="" className="h-full w-full object-cover" />
          ) : (
            <User className="h-8 w-8" />
          )}
        </div>
        <div className="text-center sm:text-left flex-1 space-y-1">
          <h2 className="text-lg font-bold text-foreground">{student.name}</h2>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><GraduationCap className="h-4 w-4" /> {turma?.name} — {turma?.grade}</span>
          </div>
          <p className="text-xs text-muted-foreground">Matrícula: {student.matricula}</p>
        </div>
        <AttendanceCircle percentage={pct} />
      </motion.div>

      {/* Timeline / Feed */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border bg-card shadow-card">
        <div className="border-b px-5 py-4">
          <h3 className="font-bold text-foreground">Histórico de Eventos</h3>
        </div>
        <div className="divide-y divide-border">
          {Object.entries(groupedLogs).map(([date, dayLogs]) => {
            const dateObj = new Date(date + "T12:00:00");
            const formatted = dateObj.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short", year: "numeric" });
            return (
              <div key={date} className="px-5 py-3 space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide capitalize">{formatted}</p>
                <div className="space-y-1.5">
                  {dayLogs.sort((a, b) => a.horario.localeCompare(b.horario)).map((log) => {
                    const cfg = statusConfig[log.tipo];
                    const Icon = cfg.icon;
                    return (
                      <div key={log.id} className={`flex items-center gap-3 rounded-lg border px-3 py-2 ${cfg.bg}`}>
                        <span className="text-base">{cfg.emoji}</span>
                        <Icon className={`h-4 w-4 shrink-0 ${cfg.color}`} />
                        <span className="text-sm font-medium text-foreground flex-1">
                          <span className={cfg.color}>{cfg.label}</span> registrada às {log.horario}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          {logs.length === 0 && (
            <p className="px-5 py-8 text-center text-sm text-muted-foreground">Nenhum registro de frequência encontrado.</p>
          )}
        </div>
      </motion.div>
    </div>
  );
}

const AreaFamilia = () => {
  const { user } = useAuth();
  const children = user ? getStudentsByResponsavel(user.id) : [];
  const [activeTab, setActiveTab] = useState(children[0]?.id || "");

  if (children.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Nenhum aluno vinculado encontrado.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-xl md:text-2xl font-bold text-foreground">Área da Família</h1>
        <p className="text-sm text-muted-foreground">Acompanhe a frequência dos seus filhos</p>
      </motion.div>

      {children.length === 1 ? (
        <StudentTab studentId={children[0].id} />
      ) : (
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full justify-start">
            {children.map((child) => (
              <TabsTrigger key={child.id} value={child.id} className="gap-1.5">
                <User className="h-3.5 w-3.5" /> {child.name.split(" ")[0]}
              </TabsTrigger>
            ))}
          </TabsList>
          {children.map((child) => (
            <TabsContent key={child.id} value={child.id}>
              <StudentTab studentId={child.id} />
            </TabsContent>
          ))}
        </Tabs>
      )}
    </div>
  );
};

export default AreaFamilia;
