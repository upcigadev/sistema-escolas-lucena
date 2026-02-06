import { useParams, Link } from "react-router-dom";
import { mockClassRooms, mockStudents } from "@/data/mockData";
import { useAppContext } from "@/contexts/AppContext";
import { ArrowLeft, Clock, MessageCircle, CheckCircle2, AlertCircle, User } from "lucide-react";
import { motion } from "framer-motion";

const ClassDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { connectionStatus } = useAppContext();
  const classroom = mockClassRooms.find((c) => c.id === id);

  if (!classroom) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Turma não encontrada</p>
      </div>
    );
  }

  const students = mockStudents[id!] || [];
  const presentStudents = students.filter((s) => s.present);
  const absentStudents = students.filter((s) => !s.present);

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-4">
        <Link
          to="/"
          className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card hover:bg-muted transition-colors"
        >
          <ArrowLeft className="h-5 w-5 text-muted-foreground" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-foreground">{classroom.name}</h1>
          <p className="text-muted-foreground">{classroom.grade}</p>
        </div>
      </motion.div>

      {/* Two columns */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        {/* Present */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border border-success/20 bg-card shadow-card"
        >
          <div className="border-b border-success/10 px-6 py-4">
            <h2 className="text-lg font-bold text-success flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Alunos Presentes na Aula ({presentStudents.length})
            </h2>
          </div>
          <div className="divide-y divide-border">
            {presentStudents.map((student, i) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.02 }}
                className="flex items-center gap-3 px-6 py-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-success/10 text-success">
                  <User className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{student.name}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  {student.arrivalTime}h
                </div>
              </motion.div>
            ))}
            {presentStudents.length === 0 && (
              <p className="px-6 py-8 text-center text-sm text-muted-foreground">
                Nenhum aluno presente registrado ainda.
              </p>
            )}
          </div>
        </motion.div>

        {/* Absent */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-destructive/20 bg-card shadow-card"
        >
          <div className="border-b border-destructive/10 px-6 py-4">
            <h2 className="text-lg font-bold text-destructive flex items-center gap-2">
              <AlertCircle className="h-5 w-5" />
              Alunos Ausentes ({absentStudents.length})
            </h2>
          </div>
          <div className="divide-y divide-border">
            {absentStudents.map((student, i) => (
              <motion.div
                key={student.id}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + i * 0.02 }}
                className="flex items-center gap-3 px-6 py-3"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                  <User className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{student.name}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="h-3.5 w-3.5 text-success" />
                  <span className="text-xs">
                    {connectionStatus === "online" && student.notificationStatus === "sent" ? (
                      <span className="text-success">Notificação enviada</span>
                    ) : (
                      <span className="text-warning">Na fila de envio</span>
                    )}
                  </span>
                </div>
              </motion.div>
            ))}
            {absentStudents.length === 0 && (
              <p className="px-6 py-8 text-center text-sm text-muted-foreground">
                Todos os alunos estão presentes! 🎉
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClassDetail;
