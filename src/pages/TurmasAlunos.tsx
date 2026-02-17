import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { mockClassRooms, mockStudents } from "@/data/mockData";
import { motion } from "framer-motion";
import { Users, Search, ChevronDown, ChevronUp, User, Clock, Pencil, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { StudentFormModal } from "@/components/StudentFormModal";
import type { Student } from "@/data/mockData";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";

const TurmasAlunos = () => {
  const [search, setSearch] = useState("");
  const [expandedClass, setExpandedClass] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [modalTurmaId, setModalTurmaId] = useState<string | undefined>();
  const [biometryStatus, setBiometryStatus] = useState<"pending" | "success">("pending");

  const filtered = mockClassRooms.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.grade.toLowerCase().includes(search.toLowerCase())
  );

  const openAddModal = (turmaId?: string) => {
    setEditingStudent(null);
    setModalTurmaId(turmaId);
    setBiometryStatus("pending");
    setModalOpen(true);
  };

  const openEditModal = (student: Student) => {
    setEditingStudent(student);
    setModalTurmaId(student.turma_id);
    setBiometryStatus(student.foto_base64 ? "success" : "pending");
    setModalOpen(true);
  };

  const handleCaptureBiometry = async (matricula: string) => {
    if ((window as any).ipcRenderer) {
      try {
        await (window as any).ipcRenderer.invoke('capturar-facial', matricula);
        toast({ title: "Comando enviado!", description: "Peça para o aluno olhar para o terminal..." });
        setBiometryStatus("success");
      } catch (err: any) {
        toast({ title: "Erro ao capturar biometria", description: err?.message || "Falha na comunicação com o terminal.", variant: "destructive" });
      }
    } else {
      toast({ title: "Modo desenvolvimento", description: "IPC não disponível. Simulando captura..." });
      setBiometryStatus("success");
    }
  };

  const handleSave = async (data: any) => {
    const alunoPayload = {
      nome: data.name,
      matricula: data.matricula,
      turma_id: data.turma_id,
      telefone_responsavel: data.telefone_responsavel,
      sync_control_id: data.sendToTerminal,
    };

    if ((window as any).ipcRenderer) {
      try {
        if (editingStudent) {
          await (window as any).ipcRenderer.invoke('editar-aluno', { id: editingStudent.id, ...alunoPayload });
        } else {
          await (window as any).ipcRenderer.invoke('criar-aluno', alunoPayload);
        }
        toast({ title: editingStudent ? "Aluno atualizado!" : "Aluno cadastrado!", description: "Dados salvos com sucesso." });
      } catch (err: any) {
        toast({ title: "Erro ao salvar", description: err?.message || "Falha na comunicação.", variant: "destructive" });
      }
    } else {
      console.log("Mock save (no IPC):", { editing: !!editingStudent, ...alunoPayload });
      toast({ title: editingStudent ? "Aluno atualizado (mock)" : "Aluno cadastrado (mock)", description: "IPC indisponível — dados logados no console." });
    }
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Turmas & Alunos</h1>
          <p className="text-muted-foreground mt-1 text-sm">Gerencie turmas e visualize a lista de alunos</p>
        </div>
        <Button onClick={() => openAddModal()} size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" /> Adicionar Aluno
        </Button>
      </motion.div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input placeholder="Buscar turma ou série..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
      </div>

      {/* Desktop table */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border bg-card shadow-card overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12" />
                <TableHead>Turma</TableHead>
                <TableHead>Série</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">Presentes</TableHead>
                <TableHead className="text-center">Ausentes</TableHead>
                <TableHead className="text-center">Frequência</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((classroom) => {
                const pct = Math.round((classroom.presentCount / classroom.totalStudents) * 100);
                const isExpanded = expandedClass === classroom.id;
                const students = mockStudents[classroom.id] || [];

                return (
                  <>
                    <TableRow key={classroom.id} className="cursor-pointer" onClick={() => setExpandedClass(isExpanded ? null : classroom.id)}>
                      <TableCell>
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Users className="h-4 w-4" />
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold text-foreground">{classroom.name}</TableCell>
                      <TableCell className="text-muted-foreground text-sm">{classroom.grade}</TableCell>
                      <TableCell className="text-center font-medium">{classroom.totalStudents}</TableCell>
                      <TableCell className="text-center font-medium text-success">{classroom.presentCount}</TableCell>
                      <TableCell className="text-center font-medium text-destructive">{classroom.absentCount}</TableCell>
                      <TableCell className="text-center">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${pct >= 90 ? "bg-success/10 text-success" : pct >= 75 ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"}`}>
                          {pct}%
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                          <Link to={`/turma/${classroom.id}`} onClick={(e) => e.stopPropagation()} className="text-xs text-primary hover:underline">Detalhes</Link>
                        </div>
                      </TableCell>
                    </TableRow>

                    {isExpanded && students.length > 0 && (
                      <TableRow key={`${classroom.id}-expand`}>
                        <TableCell colSpan={8} className="bg-muted/30 p-0">
                          <div className="p-4 space-y-3">
                            <div className="flex justify-end">
                              <Button size="sm" variant="outline" className="gap-1.5" onClick={() => openAddModal(classroom.id)}>
                                <Plus className="h-3.5 w-3.5" /> Adicionar à {classroom.name}
                              </Button>
                            </div>
                            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                              {students.map((s) => (
                                <div key={s.id} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${s.present ? "border-success/20 bg-success/5" : "border-destructive/20 bg-destructive/5"}`}>
                                  <User className={`h-3.5 w-3.5 shrink-0 ${s.present ? "text-success" : "text-destructive"}`} />
                                  <div className="flex-1 min-w-0">
                                    <span className="truncate text-foreground font-medium text-xs block">{s.name}</span>
                                    <span className="text-[10px] text-muted-foreground">Mat: {s.matricula}</span>
                                  </div>
                                  {s.arrivalTime && (
                                    <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                                      <Clock className="h-2.5 w-2.5" />{s.arrivalTime}
                                    </span>
                                  )}
                                  <button onClick={(e) => { e.stopPropagation(); openEditModal(s); }} className="shrink-0 rounded p-1 hover:bg-muted transition-colors" title="Editar aluno">
                                    <Pencil className="h-3 w-3 text-muted-foreground hover:text-primary" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </TableCell>
                      </TableRow>
                    )}

                    {isExpanded && students.length === 0 && (
                      <TableRow key={`${classroom.id}-empty`}>
                        <TableCell colSpan={8} className="bg-muted/30 text-center text-sm text-muted-foreground py-6">
                          Dados de alunos não disponíveis para esta turma.
                        </TableCell>
                      </TableRow>
                    )}
                  </>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </motion.div>

      {/* Mobile cards */}
      <div className="space-y-3 md:hidden">
        {filtered.map((classroom) => {
          const pct = Math.round((classroom.presentCount / classroom.totalStudents) * 100);
          const isExpanded = expandedClass === classroom.id;
          const students = mockStudents[classroom.id] || [];

          return (
            <motion.div key={classroom.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border bg-card shadow-card overflow-hidden">
              <button className="flex w-full items-center gap-3 p-4 text-left" onClick={() => setExpandedClass(isExpanded ? null : classroom.id)}>
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm">{classroom.name}</p>
                  <p className="text-xs text-muted-foreground">{classroom.grade}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${pct >= 90 ? "bg-success/10 text-success" : pct >= 75 ? "bg-warning/10 text-warning" : "bg-destructive/10 text-destructive"}`}>
                    {pct}%
                  </span>
                  {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                </div>
              </button>

              <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs">
                <span className="text-success font-medium">{classroom.presentCount} Presentes</span>
                <span className="text-destructive font-medium">{classroom.absentCount} Ausentes</span>
                <Link to={`/turma/${classroom.id}`} className="text-primary hover:underline font-medium">Detalhes →</Link>
              </div>

              {isExpanded && students.length > 0 && (
                <div className="border-t border-border bg-muted/30 p-3 space-y-2">
                  <Button size="sm" variant="outline" className="w-full gap-1.5" onClick={() => openAddModal(classroom.id)}>
                    <Plus className="h-3.5 w-3.5" /> Adicionar Aluno
                  </Button>
                  <div className="grid grid-cols-1 gap-2">
                    {students.map((s) => (
                      <div key={s.id} className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${s.present ? "border-success/20 bg-success/5" : "border-destructive/20 bg-destructive/5"}`}>
                        <User className={`h-3.5 w-3.5 shrink-0 ${s.present ? "text-success" : "text-destructive"}`} />
                        <div className="flex-1 min-w-0">
                          <span className="truncate text-foreground font-medium text-xs block">{s.name}</span>
                          <span className="text-[10px] text-muted-foreground">Mat: {s.matricula}</span>
                        </div>
                        {s.arrivalTime && (
                          <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                            <Clock className="h-2.5 w-2.5" />{s.arrivalTime}
                          </span>
                        )}
                        <button onClick={() => openEditModal(s)} className="shrink-0 rounded p-1 hover:bg-muted transition-colors">
                          <Pencil className="h-3 w-3 text-muted-foreground" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <StudentFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        student={editingStudent}
        defaultTurmaId={modalTurmaId}
        onSave={handleSave}
        onCaptureBiometry={handleCaptureBiometry}
        biometryStatus={biometryStatus}
      />
    </div>
  );
};

export default TurmasAlunos;
