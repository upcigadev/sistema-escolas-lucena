export interface Student {
  id: string;
  name: string;
  photo?: string;
  present: boolean;
  arrivalTime?: string;
  notificationStatus?: "sent" | "queued" | "pending";
}

export interface ClassRoom {
  id: string;
  name: string;
  grade: string;
  totalStudents: number;
  presentCount: number;
  absentCount: number;
  students: Student[];
}

export const mockStudents: Record<string, Student[]> = {
  "101": [
    { id: "1", name: "João Silva", present: true, arrivalTime: "07:45" },
    { id: "2", name: "Maria Santos", present: true, arrivalTime: "07:42" },
    { id: "3", name: "Pedro Oliveira", present: true, arrivalTime: "07:50" },
    { id: "4", name: "Ana Costa", present: true, arrivalTime: "07:38" },
    { id: "5", name: "Lucas Pereira", present: true, arrivalTime: "07:55" },
    { id: "6", name: "Beatriz Lima", present: true, arrivalTime: "07:41" },
    { id: "7", name: "Gabriel Souza", present: true, arrivalTime: "07:48" },
    { id: "8", name: "Isabela Ferreira", present: true, arrivalTime: "07:39" },
    { id: "9", name: "Mateus Almeida", present: true, arrivalTime: "07:52" },
    { id: "10", name: "Larissa Rodrigues", present: true, arrivalTime: "07:44" },
    { id: "11", name: "Rafael Barbosa", present: true, arrivalTime: "07:47" },
    { id: "12", name: "Camila Araújo", present: true, arrivalTime: "07:36" },
    { id: "13", name: "Thiago Nascimento", present: true, arrivalTime: "07:53" },
    { id: "14", name: "Juliana Carvalho", present: true, arrivalTime: "07:40" },
    { id: "15", name: "Felipe Ribeiro", present: true, arrivalTime: "07:49" },
    { id: "16", name: "Amanda Gonçalves", present: true, arrivalTime: "07:43" },
    { id: "17", name: "Bruno Martins", present: true, arrivalTime: "07:51" },
    { id: "18", name: "Carolina Dias", present: true, arrivalTime: "07:37" },
    { id: "19", name: "Vinícius Moreira", present: true, arrivalTime: "07:46" },
    { id: "20", name: "Laura Gomes", present: true, arrivalTime: "07:54" },
    { id: "21", name: "Enzo Cardoso", present: true, arrivalTime: "07:42" },
    { id: "22", name: "Sophia Teixeira", present: true, arrivalTime: "07:48" },
    { id: "23", name: "Davi Mendes", present: true, arrivalTime: "07:45" },
    { id: "24", name: "Valentina Rocha", present: true, arrivalTime: "07:39" },
    { id: "25", name: "Arthur Correia", present: true, arrivalTime: "07:50" },
    { id: "26", name: "Helena Nunes", present: false, notificationStatus: "sent" },
    { id: "27", name: "Miguel Pinto", present: false, notificationStatus: "sent" },
    { id: "28", name: "Alice Monteiro", present: false, notificationStatus: "queued" },
    { id: "29", name: "Bernardo Cavalcanti", present: false, notificationStatus: "sent" },
    { id: "30", name: "Manuela Freitas", present: false, notificationStatus: "queued" },
  ],
};

export const mockClassRooms: ClassRoom[] = [
  { id: "101", name: "Turma 101", grade: "1º Ano - Ensino Fundamental", totalStudents: 30, presentCount: 25, absentCount: 5, students: mockStudents["101"] },
  { id: "201", name: "Turma 201", grade: "2º Ano - Ensino Fundamental", totalStudents: 28, presentCount: 26, absentCount: 2, students: [] },
  { id: "301", name: "Turma 301", grade: "3º Ano - Ensino Fundamental", totalStudents: 32, presentCount: 30, absentCount: 2, students: [] },
  { id: "401", name: "Turma 401", grade: "4º Ano - Ensino Fundamental", totalStudents: 27, presentCount: 22, absentCount: 5, students: [] },
  { id: "501", name: "Turma 501", grade: "5º Ano - Ensino Fundamental", totalStudents: 30, presentCount: 28, absentCount: 2, students: [] },
  { id: "601", name: "Turma 601", grade: "6º Ano - Ensino Fundamental", totalStudents: 35, presentCount: 31, absentCount: 4, students: [] },
  { id: "701", name: "Turma 701", grade: "7º Ano - Ensino Fundamental", totalStudents: 33, presentCount: 29, absentCount: 4, students: [] },
  { id: "801", name: "Turma 801", grade: "8º Ano - Ensino Fundamental", totalStudents: 29, presentCount: 27, absentCount: 2, students: [] },
  { id: "901", name: "Turma 901", grade: "9º Ano - Ensino Fundamental", totalStudents: 31, presentCount: 25, absentCount: 6, students: [] },
];

export const getTotalExpected = () => mockClassRooms.reduce((acc, c) => acc + c.totalStudents, 0);
export const getTotalPresent = () => mockClassRooms.reduce((acc, c) => acc + c.presentCount, 0);
export const getTotalAbsent = () => mockClassRooms.reduce((acc, c) => acc + c.absentCount, 0);
