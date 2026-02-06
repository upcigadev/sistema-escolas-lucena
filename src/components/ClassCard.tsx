import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import type { ClassRoom } from "@/data/mockData";

interface ClassCardProps {
  classroom: ClassRoom;
  index: number;
}

export function ClassCard({ classroom, index }: ClassCardProps) {
  const percentage = Math.round((classroom.presentCount / classroom.totalStudents) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        to={`/turma/${classroom.id}`}
        className="group block rounded-xl border bg-card p-5 shadow-card transition-all hover:shadow-card-hover hover:-translate-y-0.5"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
              {classroom.name}
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">{classroom.grade}</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Users className="h-4 w-4" />
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 0.8, delay: index * 0.05 + 0.3 }}
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, hsl(155 60% 40%), hsl(182 58% 40%))`,
              }}
            />
          </div>
          <p className="mt-1.5 text-xs text-muted-foreground text-right">{percentage}% presente</p>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-1.5 text-success font-medium">
            <span className="inline-block h-2 w-2 rounded-full bg-success" />
            {classroom.presentCount} Presentes
          </span>
          <span className="flex items-center gap-1.5 text-destructive font-medium">
            <span className="inline-block h-2 w-2 rounded-full bg-destructive" />
            {classroom.absentCount} Ausentes
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
