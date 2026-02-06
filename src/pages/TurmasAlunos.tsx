import { useState } from "react";
import { mockClassRooms, mockStudents } from "@/data/mockData";
import { motion } from "framer-motion";
import { Users, Search, ChevronDown, ChevronUp, User, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const TurmasAlunos = () => {
  const [search, setSearch] = useState("");
  const [expandedClass, setExpandedClass] = useState<string | null>(null);

  const filtered = mockClassRooms.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.grade.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-foreground">Turmas & Alunos</h1>
        <p className="text-muted-foreground mt-1">
          Gerencie turmas e visualize a lista de alunos
        </p>
      </motion.div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar turma ou série..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-xl border bg-card shadow-card overflow-hidden"
      >
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
              const pct = Math.round(
                (classroom.presentCount / classroom.totalStudents) * 100
              );
              const isExpanded = expandedClass === classroom.id;
              const students = mockStudents[classroom.id] || [];

              return (
                <>
                  <TableRow
                    key={classroom.id}
                    className="cursor-pointer"
                    onClick={() =>
                      setExpandedClass(isExpanded ? null : classroom.id)
                    }
                  >
                    <TableCell>
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Users className="h-4 w-4" />
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">
                      {classroom.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {classroom.grade}
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {classroom.totalStudents}
                    </TableCell>
                    <TableCell className="text-center font-medium text-success">
                      {classroom.presentCount}
                    </TableCell>
                    <TableCell className="text-center font-medium text-destructive">
                      {classroom.absentCount}
                    </TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                          pct >= 90
                            ? "bg-success/10 text-success"
                            : pct >= 75
                            ? "bg-warning/10 text-warning"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {pct}%
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {isExpanded ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground" />
                        )}
                        <Link
                          to={`/turma/${classroom.id}`}
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-primary hover:underline"
                        >
                          Detalhes
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>

                  {isExpanded && students.length > 0 && (
                    <TableRow key={`${classroom.id}-expand`}>
                      <TableCell colSpan={8} className="bg-muted/30 p-0">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 p-4">
                          {students.map((s) => (
                            <div
                              key={s.id}
                              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
                                s.present
                                  ? "border-success/20 bg-success/5"
                                  : "border-destructive/20 bg-destructive/5"
                              }`}
                            >
                              <User className={`h-3.5 w-3.5 shrink-0 ${s.present ? "text-success" : "text-destructive"}`} />
                              <span className="truncate text-foreground font-medium text-xs">
                                {s.name}
                              </span>
                              {s.arrivalTime && (
                                <span className="ml-auto flex items-center gap-0.5 text-[10px] text-muted-foreground">
                                  <Clock className="h-2.5 w-2.5" />
                                  {s.arrivalTime}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  )}

                  {isExpanded && students.length === 0 && (
                    <TableRow key={`${classroom.id}-empty`}>
                      <TableCell
                        colSpan={8}
                        className="bg-muted/30 text-center text-sm text-muted-foreground py-6"
                      >
                        Dados de alunos não disponíveis para esta turma.
                      </TableCell>
                    </TableRow>
                  )}
                </>
              );
            })}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
};

export default TurmasAlunos;
