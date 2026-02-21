import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Plus, CheckCircle2, AlertCircle, Pencil, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockTerminals, mockClassRooms, type Terminal } from "@/data/mockData";
import { toast } from "@/hooks/use-toast";

const funcaoLabels: Record<string, string> = {
  entrada: "Somente Entrada",
  saida: "Somente Saída",
  entrada_saida: "Entrada e Saída (Automático)",
};

const Terminais = () => {
  const [terminals, setTerminals] = useState<Terminal[]>(mockTerminals);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Terminal | null>(null);

  // Form state
  const [formName, setFormName] = useState("");
  const [formIp, setFormIp] = useState("");
  const [formLocalizacao, setFormLocalizacao] = useState<"portaria" | "sala">("portaria");
  const [formTurmaId, setFormTurmaId] = useState("");
  const [formFuncao, setFormFuncao] = useState<"entrada" | "saida" | "entrada_saida">("entrada_saida");

  const openAdd = () => {
    setEditing(null);
    setFormName("");
    setFormIp("");
    setFormLocalizacao("portaria");
    setFormTurmaId("");
    setFormFuncao("entrada_saida");
    setModalOpen(true);
  };

  const openEdit = (t: Terminal) => {
    setEditing(t);
    setFormName(t.name);
    setFormIp(t.ip);
    setFormLocalizacao(t.localizacao);
    setFormTurmaId(t.turma_id || "");
    setFormFuncao(t.funcao);
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!formName.trim() || !formIp.trim()) {
      toast({ title: "Preencha todos os campos obrigatórios", variant: "destructive" });
      return;
    }
    if (formLocalizacao === "sala" && !formTurmaId) {
      toast({ title: "Selecione a turma para terminal de sala", variant: "destructive" });
      return;
    }

    const payload: Terminal = {
      id: editing?.id || `t${Date.now()}`,
      name: formName,
      ip: formIp,
      status: editing?.status || "offline",
      localizacao: formLocalizacao,
      turma_id: formLocalizacao === "sala" ? formTurmaId : undefined,
      funcao: formFuncao,
    };

    if (editing) {
      setTerminals((prev) => prev.map((t) => (t.id === editing.id ? payload : t)));
      toast({ title: "Terminal atualizado!" });
    } else {
      setTerminals((prev) => [...prev, payload]);
      toast({ title: "Terminal cadastrado!" });
    }
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-foreground">Terminais IoT</h1>
          <p className="text-muted-foreground mt-1 text-sm">Gerencie os terminais de reconhecimento facial</p>
        </div>
        <Button onClick={openAdd} size="sm" className="gap-1.5">
          <Plus className="h-4 w-4" /> Cadastrar Terminal
        </Button>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        <div className="rounded-xl border bg-card p-4 shadow-card text-center">
          <Cpu className="h-5 w-5 text-primary mx-auto mb-1" />
          <p className="text-2xl font-bold text-foreground">{terminals.length}</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </div>
        <div className="rounded-xl border border-success/20 bg-success/5 p-4 text-center">
          <Wifi className="h-5 w-5 text-success mx-auto mb-1" />
          <p className="text-2xl font-bold text-success">{terminals.filter((t) => t.status === "online").length}</p>
          <p className="text-xs text-muted-foreground">Online</p>
        </div>
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 p-4 text-center">
          <AlertCircle className="h-5 w-5 text-destructive mx-auto mb-1" />
          <p className="text-2xl font-bold text-destructive">{terminals.filter((t) => t.status === "offline").length}</p>
          <p className="text-xs text-muted-foreground">Offline</p>
        </div>
      </div>

      {/* Table */}
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-xl border bg-card shadow-card overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>IP</TableHead>
              <TableHead>Localização</TableHead>
              <TableHead>Função</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {terminals.map((t) => {
              const turma = t.turma_id ? mockClassRooms.find((c) => c.id === t.turma_id) : null;
              return (
                <TableRow key={t.id}>
                  <TableCell className="font-medium text-foreground">{t.name}</TableCell>
                  <TableCell className="text-muted-foreground font-mono text-sm">{t.ip}</TableCell>
                  <TableCell className="text-sm">
                    {t.localizacao === "portaria" ? "Portaria (Escola Inteira)" : `Sala — ${turma?.name || t.turma_id}`}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{funcaoLabels[t.funcao]}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant={t.status === "online" ? "default" : "destructive"} className={t.status === "online" ? "bg-success text-success-foreground" : ""}>
                      {t.status === "online" ? <CheckCircle2 className="h-3 w-3 mr-1" /> : <AlertCircle className="h-3 w-3 mr-1" />}
                      {t.status === "online" ? "Online" : "Offline"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <button onClick={() => openEdit(t)} className="rounded p-1.5 hover:bg-muted transition-colors" title="Editar">
                      <Pencil className="h-4 w-4 text-muted-foreground hover:text-primary" />
                    </button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </motion.div>

      {/* Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{editing ? "Editar Terminal" : "Cadastrar Terminal"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <Label>Nome do Terminal</Label>
              <Input className="mt-1" placeholder='Ex: "Catraca Principal"' value={formName} onChange={(e) => setFormName(e.target.value)} />
            </div>
            <div>
              <Label>Endereço IP</Label>
              <Input className="mt-1" placeholder="192.168.0.150" value={formIp} onChange={(e) => setFormIp(e.target.value)} />
            </div>
            <div>
              <Label>Localização</Label>
              <Select value={formLocalizacao} onValueChange={(v) => { setFormLocalizacao(v as any); if (v === "portaria") setFormTurmaId(""); }}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="portaria">Portaria (Escola Inteira)</SelectItem>
                  <SelectItem value="sala">Sala de Aula (Por Disciplina)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {formLocalizacao === "sala" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                <Label>Turma Vinculada *</Label>
                <Select value={formTurmaId} onValueChange={setFormTurmaId}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Selecione a turma" /></SelectTrigger>
                  <SelectContent>
                    {mockClassRooms.map((c) => (
                      <SelectItem key={c.id} value={c.id}>{c.name} — {c.grade}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </motion.div>
            )}
            <div>
              <Label>Função de Leitura</Label>
              <Select value={formFuncao} onValueChange={(v) => setFormFuncao(v as any)}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="entrada">Somente Entrada</SelectItem>
                  <SelectItem value="saida">Somente Saída</SelectItem>
                  <SelectItem value="entrada_saida">Entrada e Saída (Automático)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setModalOpen(false)}>Cancelar</Button>
              <Button onClick={handleSave}>{editing ? "Salvar" : "Cadastrar"}</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Terminais;
