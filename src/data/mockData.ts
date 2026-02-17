export interface Student {
  id: string;
  name: string;
  matricula: string;
  telefone_responsavel: string;
  foto_base64?: string;
  turma_id: string;
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
    { id: "1", name: "João Silva", matricula: "20240001", telefone_responsavel: "(83) 99999-0001", turma_id: "101", present: true, arrivalTime: "07:45" },
    { id: "2", name: "Maria Santos", matricula: "20240002", telefone_responsavel: "(83) 99999-0002", turma_id: "101", present: true, arrivalTime: "07:42" },
    { id: "3", name: "Pedro Oliveira", matricula: "20240003", telefone_responsavel: "(83) 99999-0003", turma_id: "101", present: true, arrivalTime: "07:50" },
    { id: "4", name: "Ana Costa", matricula: "20240004", telefone_responsavel: "(83) 99999-0004", turma_id: "101", present: true, arrivalTime: "07:38" },
    { id: "5", name: "Lucas Pereira", matricula: "20240005", telefone_responsavel: "(83) 99999-0005", turma_id: "101", present: true, arrivalTime: "07:55" },
    { id: "6", name: "Beatriz Lima", matricula: "20240006", telefone_responsavel: "(83) 99999-0006", turma_id: "101", present: true, arrivalTime: "07:41" },
    { id: "7", name: "Gabriel Souza", matricula: "20240007", telefone_responsavel: "(83) 99999-0007", turma_id: "101", present: true, arrivalTime: "07:48" },
    { id: "8", name: "Isabela Ferreira", matricula: "20240008", telefone_responsavel: "(83) 99999-0008", turma_id: "101", present: true, arrivalTime: "07:39" },
    { id: "9", name: "Mateus Almeida", matricula: "20240009", telefone_responsavel: "(83) 99999-0009", turma_id: "101", present: true, arrivalTime: "07:52" },
    { id: "10", name: "Larissa Rodrigues", matricula: "20240010", telefone_responsavel: "(83) 99999-0010", turma_id: "101", present: true, arrivalTime: "07:44" },
    { id: "11", name: "Rafael Barbosa", matricula: "20240011", telefone_responsavel: "(83) 99999-0011", turma_id: "101", present: true, arrivalTime: "07:47" },
    { id: "12", name: "Camila Araújo", matricula: "20240012", telefone_responsavel: "(83) 99999-0012", turma_id: "101", present: true, arrivalTime: "07:36" },
    { id: "13", name: "Thiago Nascimento", matricula: "20240013", telefone_responsavel: "(83) 99999-0013", turma_id: "101", present: true, arrivalTime: "07:53" },
    { id: "14", name: "Juliana Carvalho", matricula: "20240014", telefone_responsavel: "(83) 99999-0014", turma_id: "101", present: true, arrivalTime: "07:40" },
    { id: "15", name: "Felipe Ribeiro", matricula: "20240015", telefone_responsavel: "(83) 99999-0015", turma_id: "101", present: true, arrivalTime: "07:49" },
    { id: "16", name: "Amanda Gonçalves", matricula: "20240016", telefone_responsavel: "(83) 99999-0016", turma_id: "101", present: true, arrivalTime: "07:43" },
    { id: "17", name: "Bruno Martins", matricula: "20240017", telefone_responsavel: "(83) 99999-0017", turma_id: "101", present: true, arrivalTime: "07:51" },
    { id: "18", name: "Carolina Dias", matricula: "20240018", telefone_responsavel: "(83) 99999-0018", turma_id: "101", present: true, arrivalTime: "07:37" },
    { id: "19", name: "Vinícius Moreira", matricula: "20240019", telefone_responsavel: "(83) 99999-0019", turma_id: "101", present: true, arrivalTime: "07:46" },
    { id: "20", name: "Laura Gomes", matricula: "20240020", telefone_responsavel: "(83) 99999-0020", turma_id: "101", present: true, arrivalTime: "07:54" },
    { id: "21", name: "Enzo Cardoso", matricula: "20240021", telefone_responsavel: "(83) 99999-0021", turma_id: "101", present: true, arrivalTime: "07:42" },
    { id: "22", name: "Sophia Teixeira", matricula: "20240022", telefone_responsavel: "(83) 99999-0022", turma_id: "101", present: true, arrivalTime: "07:48" },
    { id: "23", name: "Davi Mendes", matricula: "20240023", telefone_responsavel: "(83) 99999-0023", turma_id: "101", present: true, arrivalTime: "07:45" },
    { id: "24", name: "Valentina Rocha", matricula: "20240024", telefone_responsavel: "(83) 99999-0024", turma_id: "101", present: true, arrivalTime: "07:39" },
    { id: "25", name: "Arthur Correia", matricula: "20240025", telefone_responsavel: "(83) 99999-0025", turma_id: "101", present: true, arrivalTime: "07:50" },
    { id: "26", name: "Helena Nunes", matricula: "20240026", telefone_responsavel: "(83) 99999-0026", turma_id: "101", present: false, notificationStatus: "sent" },
    { id: "27", name: "Miguel Pinto", matricula: "20240027", telefone_responsavel: "(83) 99999-0027", turma_id: "101", present: false, notificationStatus: "sent" },
    { id: "28", name: "Alice Monteiro", matricula: "20240028", telefone_responsavel: "(83) 99999-0028", turma_id: "101", present: false, notificationStatus: "queued" },
    { id: "29", name: "Bernardo Cavalcanti", matricula: "20240029", telefone_responsavel: "(83) 99999-0029", turma_id: "101", present: false, notificationStatus: "sent" },
    { id: "30", name: "Manuela Freitas", matricula: "20240030", telefone_responsavel: "(83) 99999-0030", turma_id: "101", present: false, notificationStatus: "queued" },
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
