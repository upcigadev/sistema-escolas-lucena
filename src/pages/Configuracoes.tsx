import { useState } from "react";
import { motion } from "framer-motion";
import {
  Camera,
  Wifi,
  Bell,
  Shield,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Monitor,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAppContext } from "@/contexts/AppContext";

interface SettingSection {
  icon: React.ElementType;
  title: string;
  description: string;
}

const sections: SettingSection[] = [
  {
    icon: Camera,
    title: "Câmeras iDFace",
    description: "Configure as câmeras de reconhecimento facial",
  },
  {
    icon: Wifi,
    title: "Conexão & Sincronização",
    description: "Parâmetros de rede e sincronização offline",
  },
  {
    icon: Bell,
    title: "Notificações WhatsApp",
    description: "Configurações de envio automático de mensagens",
  },
  {
    icon: Shield,
    title: "Segurança & Privacidade",
    description: "Políticas de dados e LGPD",
  },
];

const Configuracoes = () => {
  const { connectionStatus } = useAppContext();
  const [autoSync, setAutoSync] = useState(true);
  const [whatsappEnabled, setWhatsappEnabled] = useState(true);
  const [confidenceThreshold, setConfidenceThreshold] = useState("85");
  const [syncInterval, setSyncInterval] = useState("30");
  const [dataRetention, setDataRetention] = useState("90");

  const cameras = [
    { id: 1, name: "Câmera Entrada Principal", status: "online" as const, ip: "192.168.1.101" },
    { id: 2, name: "Câmera Portão Lateral", status: "online" as const, ip: "192.168.1.102" },
    { id: 3, name: "Câmera Pátio", status: "offline" as const, ip: "192.168.1.103" },
  ];

  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-foreground">
          Configurações iDFace
        </h1>
        <p className="text-muted-foreground mt-1">
          Gerencie câmeras, sincronização e notificações
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Cameras section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border bg-card p-6 shadow-card"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Camera className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">Câmeras iDFace</h2>
              <p className="text-xs text-muted-foreground">
                Status das câmeras conectadas
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {cameras.map((cam) => (
              <div
                key={cam.id}
                className="flex items-center justify-between rounded-lg border px-4 py-3"
              >
                <div className="flex items-center gap-3">
                  <Monitor className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {cam.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{cam.ip}</p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                    cam.status === "online"
                      ? "bg-success/10 text-success"
                      : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {cam.status === "online" ? (
                    <CheckCircle2 className="h-3 w-3" />
                  ) : (
                    <AlertCircle className="h-3 w-3" />
                  )}
                  {cam.status === "online" ? "Online" : "Offline"}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4">
            <label className="text-sm font-medium text-foreground">
              Limiar de confiança do reconhecimento (%)
            </label>
            <Input
              type="number"
              min="50"
              max="100"
              value={confidenceThreshold}
              onChange={(e) => setConfidenceThreshold(e.target.value)}
              className="mt-1.5 max-w-[120px]"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Mínimo de similaridade para registrar presença
            </p>
          </div>
        </motion.div>

        {/* Sync settings */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-xl border bg-card p-6 shadow-card"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-ocean/10 text-primary">
              <Wifi className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">
                Conexão & Sincronização
              </h2>
              <p className="text-xs text-muted-foreground">
                Status:{" "}
                <span
                  className={
                    connectionStatus === "online"
                      ? "text-success"
                      : "text-destructive"
                  }
                >
                  {connectionStatus === "online" ? "Online" : "Offline"}
                </span>
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Sincronização automática
                </p>
                <p className="text-xs text-muted-foreground">
                  Sincronizar dados quando online
                </p>
              </div>
              <Switch checked={autoSync} onCheckedChange={setAutoSync} />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">
                Intervalo de sincronização (segundos)
              </label>
              <Input
                type="number"
                min="10"
                max="300"
                value={syncInterval}
                onChange={(e) => setSyncInterval(e.target.value)}
                className="mt-1.5 max-w-[120px]"
              />
            </div>

            <Button variant="outline" className="gap-2">
              <RefreshCw className="h-4 w-4" />
              Forçar Sincronização Agora
            </Button>
          </div>
        </motion.div>

        {/* WhatsApp notifications */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border bg-card p-6 shadow-card"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success/10 text-success">
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">
                Notificações WhatsApp
              </h2>
              <p className="text-xs text-muted-foreground">
                Envio automático para responsáveis
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Envio automático de faltas
                </p>
                <p className="text-xs text-muted-foreground">
                  Notificar pais quando aluno faltar
                </p>
              </div>
              <Switch
                checked={whatsappEnabled}
                onCheckedChange={setWhatsappEnabled}
              />
            </div>

            <div className="rounded-lg border border-warning/20 bg-warning/5 p-3">
              <p className="text-xs text-warning font-medium">
                ⚠️ No modo offline, as notificações são enfileiradas e enviadas
                automaticamente quando a conexão for restabelecida.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Security & Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="rounded-xl border bg-card p-6 shadow-card"
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <h2 className="font-bold text-foreground">
                Segurança & Privacidade
              </h2>
              <p className="text-xs text-muted-foreground">
                Conformidade com LGPD
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className="text-sm font-medium text-foreground">
                Retenção de dados faciais (dias)
              </label>
              <Input
                type="number"
                min="30"
                max="365"
                value={dataRetention}
                onChange={(e) => setDataRetention(e.target.value)}
                className="mt-1.5 max-w-[120px]"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Período de armazenamento dos dados biométricos
              </p>
            </div>

            <div className="rounded-lg border p-3">
              <p className="text-xs text-muted-foreground">
                🔒 Os dados biométricos são criptografados em repouso e em
                trânsito. O consentimento dos responsáveis é obrigatório
                conforme a Lei nº 13.709/2018 (LGPD).
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Configuracoes;
