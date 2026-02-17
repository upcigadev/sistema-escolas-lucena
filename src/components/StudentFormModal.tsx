import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { mockClassRooms, Student } from "@/data/mockData";
import { Camera, Upload, User, Cpu } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const phoneRegex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;

const studentSchema = z.object({
  name: z.string().trim().min(3, "Nome deve ter pelo menos 3 caracteres").max(100),
  matricula: z.string().regex(/^\d{4,12}$/, "Matrícula deve conter entre 4 e 12 dígitos numéricos"),
  turma_id: z.string().min(1, "Selecione uma turma"),
  telefone_responsavel: z.string().regex(phoneRegex, "Formato: (XX) XXXXX-XXXX"),
});

type StudentFormValues = z.infer<typeof studentSchema>;

interface StudentFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  student?: Student | null;
  defaultTurmaId?: string;
  onSave: (data: StudentFormValues & { foto_base64?: string; sendToTerminal: boolean }) => void;
}

function applyPhoneMask(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits.length ? `(${digits}` : "";
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function StudentFormModal({ open, onOpenChange, student, defaultTurmaId, onSave }: StudentFormModalProps) {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [sendToTerminal, setSendToTerminal] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const form = useForm<StudentFormValues>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      name: "",
      matricula: "",
      turma_id: defaultTurmaId || "",
      telefone_responsavel: "",
    },
  });

  useEffect(() => {
    if (open) {
      if (student) {
        form.reset({
          name: student.name,
          matricula: student.matricula,
          turma_id: student.turma_id,
          telefone_responsavel: student.telefone_responsavel,
        });
        setPhotoPreview(student.foto_base64 || null);
      } else {
        form.reset({
          name: "",
          matricula: "",
          turma_id: defaultTurmaId || "",
          telefone_responsavel: "",
        });
        setPhotoPreview(null);
      }
      setSendToTerminal(true);
    }
  }, [open, student, defaultTurmaId, form]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "Arquivo muito grande", description: "Máximo 5MB", variant: "destructive" });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  const onSubmit = (values: StudentFormValues) => {
    onSave({ ...values, foto_base64: photoPreview || undefined, sendToTerminal });
    onOpenChange(false);
    toast({
      title: student ? "Aluno atualizado" : "Aluno cadastrado",
      description: sendToTerminal
        ? "Dados enviados para o terminal facial."
        : "Salvo localmente. Envie ao terminal quando desejar.",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold">
            {student ? "Editar Aluno" : "Cadastrar Novo Aluno"}
          </DialogTitle>
        </DialogHeader>

        {/* Photo upload */}
        <div className="flex flex-col items-center gap-3 py-2">
          <div
            className="relative h-24 w-24 rounded-full border-2 border-dashed border-primary/30 bg-muted flex items-center justify-center overflow-hidden cursor-pointer hover:border-primary/60 transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            {photoPreview ? (
              <img src={photoPreview} alt="Foto" className="h-full w-full object-cover" />
            ) : (
              <User className="h-10 w-10 text-muted-foreground" />
            )}
          </div>
          <div className="flex gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
              <Upload className="h-3.5 w-3.5 mr-1.5" /> Upload
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                toast({ title: "Webcam", description: "Captura via webcam será integrada com o hardware Control iD." });
              }}
            >
              <Camera className="h-3.5 w-3.5 mr-1.5" /> Webcam
            </Button>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome Completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: João da Silva" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="matricula"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Matrícula (ID no Terminal Facial)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 20240001" inputMode="numeric" {...field} onChange={(e) => field.onChange(e.target.value.replace(/\D/g, ""))} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="turma_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Turma</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a turma" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {mockClassRooms.map((c) => (
                        <SelectItem key={c.id} value={c.id}>
                          {c.name} — {c.grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="telefone_responsavel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>WhatsApp do Responsável</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="(83) 99999-0000"
                      inputMode="tel"
                      {...field}
                      onChange={(e) => field.onChange(applyPhoneMask(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Hardware toggle */}
            <div className="flex items-center justify-between rounded-lg border border-border bg-muted/30 px-4 py-3">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-primary" />
                <Label htmlFor="send-terminal" className="text-sm font-medium cursor-pointer">
                  Enviar Imediatamente para o Terminal Facial
                </Label>
              </div>
              <Switch id="send-terminal" checked={sendToTerminal} onCheckedChange={setSendToTerminal} />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancelar
              </Button>
              <Button type="submit">
                {student ? "Salvar Alterações" : "Cadastrar Aluno"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
