import { motion } from "framer-motion";
import { mockClassRooms } from "@/data/mockData";
import { BarChart3, TrendingUp, Calendar } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend,
} from "recharts";

const classData = mockClassRooms.map((c) => ({
  name: c.name.replace("Turma ", "T"),
  presentes: c.presentCount,
  ausentes: c.absentCount,
}));

const totalPresent = mockClassRooms.reduce((a, c) => a + c.presentCount, 0);
const totalAbsent = mockClassRooms.reduce((a, c) => a + c.absentCount, 0);
const pieData = [
  { name: "Presentes", value: totalPresent },
  { name: "Ausentes", value: totalAbsent },
];
const PIE_COLORS = ["hsl(155, 60%, 40%)", "hsl(12, 80%, 55%)"];

const weeklyData = [
  { dia: "Seg", frequencia: 92 },
  { dia: "Ter", frequencia: 88 },
  { dia: "Qua", frequencia: 95 },
  { dia: "Qui", frequencia: 90 },
  { dia: "Sex", frequencia: 87 },
];

const Relatorios = () => {
  return (
    <div className="space-y-8">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <h1 className="text-2xl font-bold text-foreground">Relatórios</h1>
        <p className="text-muted-foreground mt-1">
          Análise de frequência escolar
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        {/* Bar chart - by class */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-xl border bg-card p-6 shadow-card"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <BarChart3 className="h-4 w-4" />
            </div>
            <h2 className="font-bold text-foreground">Frequência por Turma</h2>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={classData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200,20%,88%)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid hsl(200,20%,88%)",
                  fontSize: 13,
                }}
              />
              <Bar dataKey="presentes" fill="hsl(155,60%,40%)" radius={[4, 4, 0, 0]} name="Presentes" />
              <Bar dataKey="ausentes" fill="hsl(12,80%,55%)" radius={[4, 4, 0, 0]} name="Ausentes" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie chart */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-xl border bg-card p-6 shadow-card"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success/10 text-success">
              <TrendingUp className="h-4 w-4" />
            </div>
            <h2 className="font-bold text-foreground">Distribuição Geral</h2>
          </div>
          <ResponsiveContainer width="100%" height={240}>

            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={110}
                paddingAngle={4}
                dataKey="value"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Line chart - weekly trend */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border bg-card p-6 shadow-card lg:col-span-2"
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent/20 text-accent-foreground">
              <Calendar className="h-4 w-4" />
            </div>
            <h2 className="font-bold text-foreground">
              Tendência Semanal de Frequência (%)
            </h2>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(200,20%,88%)" />
              <XAxis dataKey="dia" tick={{ fontSize: 12 }} />
              <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: "1px solid hsl(200,20%,88%)",
                  fontSize: 13,
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="frequencia"
                stroke="hsl(182,58%,40%)"
                strokeWidth={2.5}
                dot={{ r: 5, fill: "hsl(182,58%,40%)" }}
                name="Frequência %"
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
};

export default Relatorios;
