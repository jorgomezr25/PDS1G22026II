// Estructura de public/data/*.json (la genera generar_notas_web.py).

export interface CursoIndice {
  id: string;
  titulo: string;
  archivo: string;
}

export interface Componente {
  corte: number;
  nombre: string;
  fecha?: string;
  max: number;
  peso: number;
}

export interface Corte {
  corte: number;
  nombre: string;
  max: number;
  nota?: string;
}

export interface Sesion {
  fecha: string;
  tema: string;
}

/** P = presente, R = retardo, F = ausente, J = falta justificada, null = sin registro. */
export type EstadoAsistencia = "P" | "R" | "F" | "J" | null;

export interface Curso {
  id: string;
  curso: string;
  programa: string;
  grupo: string;
  periodo: string;
  profesor: string;
  max_total: number; // puntaje máximo (500)
  nota_minima: number; // puntaje mínimo para aprobar (300)
  aviso: string;
  actualizado: string;
  componentes: Componente[];
  cortes: Corte[];
  sesiones?: Sesion[];
  asistencia_nota?: string;
  estadisticas: {
    n: number;
    componentes: (number | null)[];
    cortes: (number | null)[];
    definitiva: number | null;
    asistencia?: number | null;
  };
  modo?: "publico" | "cifrado";
  estudiantes?: NotasEstudiante[];
}

// Registro de un estudiante (en modo público no lleva nombre).
export interface NotasEstudiante {
  codigo: string;
  nombre?: string;
  componentes: (number | null)[];
  cortes: (number | null)[];
  definitiva: number; // 0 a max_total, entero
  asistencia?: EstadoAsistencia[];
}
