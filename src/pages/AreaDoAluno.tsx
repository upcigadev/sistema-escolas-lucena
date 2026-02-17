import { useAuth } from "@/contexts/AuthContext";
import { mockStudents, mockClassRooms } from "@/data/mockData";
import { motion } from "framer-motion";
import { User, CalendarCheck, CalendarX, Clock, GraduationCap } from "lucide-react";

// Mock attendance history for the student
const mockAttendance = [
  { date: "2026-02-02", status: "present" as const, time: "07:42" },
  { date: "2026-02-03", status: "present" as const, time: "07:38" },
  { date: "2026-02-04", status: "absent" as const },
  { date: "2026-02-05", status: "present" as const, time: "07:55" },
  { date: "2026-02-06", status: "present" as const, time: "07:41" },
  { date: "2026-02-09", status: "present" as const, time: "07:44" },
  { date: "2026-02-10", status: "late" as const, time: "08:15" },
  { date: "2026-02-11", status: "present" as const, time: "07:39" },
  { date: "2026-02-12", status: "present" as const, time: "07:48" },
  { date: "2026-02-13", status: "absent" as const },
  { date: "2026-02-16", status: "present" as const, time: "07:45" },
  { date: "2026-02-17", status: "present" as const, time: "07:42" },
];

const statusConfig = {
  present: { label: "Presente", icon: CalendarCheck, color: "text-success", bg: "bg-success/10 border-success/20" },
  absent: { label: "Ausente", icon: CalendarX, color: "text-destructive", bg: "bg-destructive/10 border-destructive/20" },
  late: { label: "Atrasado", icon: Clock, color: "text-warning", bg: "bg-warning/10 border-warning/20" },
};

const AreaDoAluno = () => {
  const { user } = useAuth();

  // Find the student linked to this parent
  const alunoId = user?.alunoIds?.[0];
  const allStudents = Object.values(mockStudents).flat();
  const student = allStudents.find((s) => s.id === alunoId);
  const turma = student ? mockClassRooms.find((c) => c.id === student.turma_id) : null;

  if (!student) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Nenhum aluno vinculado encontrado.</p>
      </div>
    );
  }

  const presencas = mockAttendance.filter((a) => a.status === "present").length;
  const faltas = mockAttendance.filter((a) => a.status === "absent").length;
  const atrasos = mockAttendance.filter((a) => a.status === "late").length;
  const pct = Math.round((presencas / mockAttendance.length) * 100);

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-xl md:text-2xl font-bold text-foreground">Área do Aluno</h1>
        <p className="text-sm text-muted-foreground">Acompanhe a frequência do seu filho(a)</p>
      </motion.div>

      {/* Student card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border bg-card p-6 shadow-card flex flex-col sm:flex-row items-center gap-5"
      >
        <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary overflow-hidden border-2 border-primary/20">
          {student.foto_base64 ? (
            <img src={student.foto_base64} alt="" className="h-full w-full object-cover" />
          ) : (
            <User className="h-10 w-10" />
          )}
        </div>
        <div className="text-center sm:text-left flex-1 space-y-1">
          <h2 className="text-xl font-bold text-foreground">{student.name}</h2>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><GraduationCap className="h-4 w-4" /> {turma?.name} — {turma?.grade}</span>
          </div>
          <p className="text-xs text-muted-foreground">Matrícula: {student.matricula}</p>
        </div>
        <div className="text-center">
          <div className={`text-3xl font-bold ${pct >= 75 ? "text-success" : "text-destructive"}`}>{pct}%</div>
          <p className="text-xs text-muted-foreground">Frequência</p>
        </div>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="rounded-xl border border-success/20 bg-success/5 p-4 text-center">
          <CalendarCheck className="h-5 w-5 text-success mx-auto mb-1" />
          <p className="text-2xl font-bold text-success">{presencas}</p>
          <p className="text-xs text-muted-foreground">Presenças</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-center">
          <CalendarX className="h-5 w-5 text-destructive mx-auto mb-1" />
          <p className="text-2xl font-bold text-destructive">{faltas}</p>
          <p className="text-xs text-muted-foreground">Faltas</p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="rounded-xl border border-warning/20 bg-warning/5 p-4 text-center">
          <Clock className="h-5 w-5 text-warning mx-auto mb-1" />
          <p className="text-2xl font-bold text-warning">{atrasos}</p>
          <p className="text-xs text-muted-foreground">Atrasos</p>
        </motion.div>
      </div>

      {/* Attendance history */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="rounded-xl border bg-card shadow-card">
        <div className="border-b px-6 py-4">
          <h3 className="font-bold text-foreground">Histórico de Frequência</h3>
        </div>
        <div className="divide-y divide-border">
          {mockAttendance.slice().reverse().map((entry) => {
            const cfg = statusConfig[entry.status];
            const Icon = cfg.icon;
            const dateObj = new Date(entry.date + "T12:00:00");
            const formatted = dateObj.toLocaleDateString("pt-BR", { weekday: "short", day: "2-digit", month: "short" });

            return (
              <div key={entry.date} className="flex items-center gap-3 px-4 md:px-6 py-3">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${cfg.bg}`}>
                  <Icon className={`h-4 w-4 ${cfg.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground capitalize">{formatted}</p>
                </div>
                <div className="flex items-center gap-2">
                  {entry.time && (
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {entry.time}h
                    </span>
                  )}
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${cfg.bg} ${cfg.color}`}>
                    {cfg.label}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default AreaDoAluno;
