export type KnowledgeArea = 
  | 'Aritmética' 
  | 'Geometría' 
  | 'Trigonometría' 
  | 'Álgebra' 
  | 'Cálculo';

export type SkillArea = 
  | 'Habilidades básicas' 
  | 'Procesos de pensamiento y razonamiento' 
  | 'Habilidades especiales' 
  | 'Habilidades de análisis';

export type DifficultyLevel = 'Básico' | 'Intermedio' | 'Avanzado';

export interface QuestionOption {
  label: 'a' | 'b' | 'c' | 'd';
  text: string;
  subtext?: string;
}

export interface Question {
  id: string;
  number: number;
  prompt: string;
  saber: KnowledgeArea;
  habilidad: SkillArea;
  difficulty: DifficultyLevel;
  diagramType?: 
    | 'pascal' 
    | 'trees_triangle'
    | 'circle_sequence' 
    | 'symbols_equation' 
    | 'cube_net' 
    | 'solid_3d' 
    | 'parabola_options' 
    | 'fraction_bracket' 
    | 'radical_expr' 
    | 'formula_k'
    | 'cube_triangle' 
    | 'cylinder_volumes' 
    | 'quad_roots' 
    | 'fibonacci_seq' 
    | 'trig_diagram_options' 
    | 'trig_notable_angles'
    | 'ladder_trig' 
    | 'isometric_blocks' 
    | 'fraction_equation';
  options: QuestionOption[];
  correctAnswer: 'a' | 'b' | 'c' | 'd';
  explanation: string;
  hint?: string;
  isCustom?: boolean;
}

export interface UserAnswer {
  questionId: string;
  selectedOption: 'a' | 'b' | 'c' | 'd' | null;
  isFlagged?: boolean;
  timeSpentSeconds?: number;
}

export interface SaberDiagnosis {
  saber: KnowledgeArea;
  total: number;
  correct: number;
  percentage: number;
  status: 'Dominio Alto' | 'Aceptable' | 'Falencia Crítica';
  feedback: string;
}

export interface SkillDiagnosis {
  habilidad: SkillArea;
  total: number;
  correct: number;
  percentage: number;
  status: 'Dominio Alto' | 'Aceptable' | 'Falencia Crítica';
  feedback: string;
}

export interface DiagnosticResult {
  totalQuestions: number;
  totalCorrect: number;
  totalPercentage: number;
  overallLevel: 'Sobresaliente' | 'Competente' | 'Requiere Refuerzo' | 'Alerta Pedagógica';
  saberBreakdown: SaberDiagnosis[];
  skillBreakdown: SkillDiagnosis[];
  fortalezas: string[];
  falencias: string[];
  completedAt: string;
  answers: Record<string, 'a' | 'b' | 'c' | 'd' | null>;
}

export interface RemediationExercise {
  id: string;
  saber: KnowledgeArea;
  habilidad: SkillArea;
  title: string;
  conceptSummary: string;
  formulaOrTip?: string;
  hint?: string;
  prompt: string;
  diagramType?: string;
  options: QuestionOption[];
  correctAnswer: 'a' | 'b' | 'c' | 'd';
  explanation: string;
  steps: string[];
}
