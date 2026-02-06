import { OverviewCard } from "@/components/OverviewCard";
import { ClassCard } from "@/components/ClassCard";
import { mockClassRooms, getTotalExpected, getTotalPresent, getTotalAbsent } from "@/data/mockData";
import { Users, UserCheck, UserX } from "lucide-react";
import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Visão geral da frequência escolar de hoje
        </p>
      </motion.div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <OverviewCard
          title="Total de Alunos Esperados Hoje"
          value={getTotalExpected()}
          icon={Users}
          variant="primary"
        />
        <OverviewCard
          title="Presenças Confirmadas (Agora)"
          value={getTotalPresent()}
          icon={UserCheck}
          variant="success"
        />
        <OverviewCard
          title="Ausências / Faltas"
          value={getTotalAbsent()}
          icon={UserX}
          variant="destructive"
        />
      </div>

      {/* Class Grid */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Grade de Turmas</h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {mockClassRooms.map((classroom, index) => (
            <ClassCard key={classroom.id} classroom={classroom} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
