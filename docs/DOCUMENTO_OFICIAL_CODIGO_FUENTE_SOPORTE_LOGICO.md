# DOCUMENTO TÉCNICO N° 4: EXTRACTO INDEXADO DE CÓDIGO FUENTE
# MUESTREO REPRESENTATIVO DE CÓDIGO FUENTE PARA REGISTRO DE SOPORTE LÓGICO

**REPÚBLICA DE COLOMBIA — DIRECCIÓN NACIONAL DE DERECHO DE AUTOR (DNDA)**  
**SOLICITUD DE REGISTRO DE SOPORTE LÓGICO (PROGRAMA DE COMPUTADOR)**  
**DENOMINACIÓN DE LA OBRA:** MATEMÁTICAS DIAGNÓSTICO & REFUERZO ADAPTATIVO — PLATAFORMA DE EVALUACIÓN DIAGNÓSTICA Y NIVELACIÓN DE COMPETENCIAS MATEMÁTICAS  
**FECHA DE DOCUMENTACIÓN:** 20 DE NOVIEMBRE DE 2026  
**VERSIÓN DEL SOFTWARE:** 1.0.0  
**TITULARIDAD DE DERECHOS:** DANIEL VICK  

---

## 1. PRESENTACIÓN FORMAL Y MARCO LEGAL DE PROTECCIÓN

El presente documento constituye el **MUESTREO REGISTRAL INDEXADO Y EXTRACTO REPRESENTATIVO DE CÓDIGO FUENTE** del programa de computador denominado **"Matemáticas Diagnóstico & Refuerzo Adaptativo — Plataforma de Evaluación Diagnóstica y Nivelación de Competencias Matemáticas"**, elaborado conforme a la **Ley 23 de 1982**, la **Decisión Andina 351 de 1993**, el **Decreto 1360 de 1989** y los lineamientos de la **Dirección Nacional de Derecho de Autor (DNDA)** de la República de Colombia.

Para cumplir la exigencia de depósito del soporte lógico sin exponer el código completo a copia no autorizada, el expediente se organiza en tres partes:

1. **Mapa de Módulos e Indexación Criptográfica (SHA-256):** identificación de los 18 archivos fuente que componen el sistema, con un total de **6,454 líneas de código**. Cada archivo se acompaña de su firma SHA-256 calculada sobre el archivo íntegro.
2. **Muestreo Representativo de Inicio y Cierre:** inclusión de las primeras y últimas líneas de los módulos esenciales, que acreditan la estructura, las dependencias y los contratos de exportación.
3. **Reserva de Código Intermedio:** descripción, sin transcripción, de las rutinas intermedias de los módulos muestreados, protegidas como secreto empresarial.

---

## 2. ÍNDICE GENERAL Y MAPA DE MÓDULOS DEL CÓDIGO FUENTE (18 ARCHIVOS / 6,454 LÍNEAS)

| Módulo / Archivo Fuente | Rol y Descripción Funcional | Lenguaje / Formato | Total Líneas | Muestreo Depositado | Firma Digital de Autenticidad (SHA-256) | Estado de Reserva |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| `index.html` | Documento HTML de entrada, metadatos, fuentes tipográficas (Plus Jakarta Sans, JetBrains Mono) y montaje | HTML5 | 21 | Índice y firma | `52FD28996310851801D2B7894D560C32E6F1E8AFCF75700833DA4FEA83DAD3F0` | Reservado (Indexado por firma) |
| `vite.config.ts` | Configuración del empaquetador Vite, integración de Tailwind CSS v4 y resolución de rutas | TypeScript | 26 | Índice y firma | `62B39C8CEEFFF3DEE0A70DF069C86A55BA0547451C164E663F531C9F2CA6872F` | Reservado (Indexado por firma) |
| `vercel.json` | Configuración de enrutamiento y reescritura de URLs para despliegue SPA en la plataforma Vercel | JSON | 1 | Índice y firma | `49A7A82A4DD7DF742E864358FEC2053708CA4ED3C07E228CDAF96EDD318AB0BC` | Reservado (Indexado por firma) |
| `package.json` | Definición del manifiesto del proyecto, scripts de compilación, dependencias y metadatos | JSON | 36 | Índice y firma | `E424DD05ED7D7A77ED7FDD5101C9382D670022D3CB05A850A4C9BC29B7811F45` | Reservado (Indexado por firma) |
| `src/main.tsx` | Punto de entrada de ejecución y montaje de la aplicación React 19 en el contenedor DOM | React 19 / TSX | 5 | Índice y firma | `30D02EE59CB6576973DEA4368093B2DCAE692A40668F288FDBC66A114873FCD3` | Reservado (Indexado por firma) |
| `src/App.tsx` | Componente raíz: orquestador de pestañas, gestión de respuestas y persistencia reactiva en localStorage | React 19 / TSX | 334 | Líneas 1–45 y 295–334 | `86A91DD4C3A22BEA4A038C7CB9F8592F70B3E32652D9E74509B5CD2D6E1F509A` | Reservado (Reserva Parcial Intermedia) |
| `src/components/DiagnosticReport.tsx` | Informe psicométrico: calificación global, semaforización, fortalezas y falencias | React 19 / TSX | 492 | Índice y firma | `BCF7A3294616C0E7CDEB3AE2EBF7B637CC16AC25D6EADBB90DEF888DF9DB4C43` | Reservado (Indexado por firma) |
| `src/components/DiagramRenderer.tsx` | Motor de renderizado procedimental de diagramas matemáticos y esquemas geométricos SVG | React 19 / TSX | 2,174 | Líneas 1–50 y 2135–2174 | `832397244F8D02A2E1361138465AA434FEABD8FDB8D0AB0554D4E170CEFD5086` | Reservado (Reserva Parcial Intermedia) |
| `src/components/Header.tsx` | Barra superior con navegación por pestañas, contadores de progreso y controles de examen | React 19 / TSX | 143 | Índice y firma | `51951619B195207A1B08AF1A2B1789AE67AF3AF3FC383C1FD820CD918D16B358` | Reservado (Indexado por firma) |
| `src/components/QuestionBankManager.tsx` | Administrador del banco de preguntas: filtros, creación, eliminación e import/export JSON | React 19 / TSX | 1,107 | Índice y firma | `90F3E6355D8729EAEEADCB4A0A8479C24997403052D61700FDF69D820EE0376A` | Reservado (Indexado por firma) |
| `src/components/RemediationView.tsx` | Módulo de nivelación adaptativa: ejercicios guiados focalizados en vacíos conceptuales | React 19 / TSX | 534 | Índice y firma | `69186FC8F4A5C950BC3F1E1627485E8B5E54A32A6037D1C8B25D257D75982D48` | Reservado (Indexado por firma) |
| `src/components/TestView.tsx` | Módulo de presentación del examen: preguntas interactivas, selección de opciones y banderas | React 19 / TSX | 404 | Índice y firma | `9FF2FCC7D3D1744548A62B6830D54D07F2EF010C1A108AE8F0B678C285EF8B09` | Reservado (Indexado por firma) |
| `src/data/initialQuestions.ts` | Banco canónico calibrado de 20 preguntas diagnósticas con retroalimentación y pistas | TypeScript | 392 | Índice y firma | `D81CCD82AC1362DDDC8C27059DB2D3512099CD4ABE7674E455806AC46D444014` | Reservado (Indexado por firma) |
| `src/data/remediationBank.ts` | Banco especializado de ejercicios correctivos, síntesis conceptuales y resolución paso a paso | TypeScript | 423 | Índice y firma | `70D975BEAA33948BC1B82FF3A2F42FE253944E0971F3A367B4279D384FEFFBC5` | Reservado (Indexado por firma) |
| `src/index.css` | Importación y configuración de directivas globales de Tailwind CSS v4 | CSS3 / Tailwind | 1 | Índice y firma | `42070E0B45BB201B2B838A52AAAA6E965F964E0B542D97F1FE517FE59C4B75A8` | Reservado (Indexado por firma) |
| `src/lib/insforge.ts` | Cliente de integración para backend y persistencia remota opcional | TypeScript | 9 | Índice y firma | `47E02D4491110A157722432CCDC04603D4A1020E2CBF959BD93F9217E8A8763C` | Reservado (Indexado por firma) |
| `src/types.ts` | Definición del modelo de datos tipado: saberes, habilidades, preguntas, diagnósticos y nivelación | TypeScript | 108 | Líneas 1–45 y 74–108 | `8ED4428DC87DE39DA0B77ACE799BCAC44CEEF7E173413CEE2F98E59EDE7C97F7` | Reservado (Reserva Parcial Intermedia) |
| `src/utils/diagnosticEngine.ts` | Motor algorítmico psicométrico: cómputo diagnóstico, umbrales y recomendación adaptativa | TypeScript | 244 | Líneas 1–45 y 210–244 | `7115107562808FEE1F6C32215124C802D7B555E75402AA03DD8CF56978E709FA` | Reservado (Reserva Parcial Intermedia) |

Las firmas se calcularon sobre el contenido exacto de cada archivo en la fecha de documentación. Cualquier cambio posterior en un archivo, incluido el tipo de salto de línea, produce una firma distinta; por eso este documento debe regenerarse (`npm run docs`) con la versión definitiva que se deposite.

---

## 3. PROTECCIÓN DEL CÓDIGO EN LA VERSIÓN DISTRIBUIDA

La versión de producción se genera con Vite, que elimina comentarios, acorta los nombres internos y une todos los módulos en un único archivo JavaScript minificado. El código fuente legible (TypeScript y TSX), cuyas firmas se listan en la sección 2, no se distribuye a los usuarios finales.

```text
+-----------------------------------------------------------------------------------------------+
|                     CADENA DE CONSTRUCCIÓN DE LA VERSIÓN DISTRIBUIDA                          |
+-----------------------------------------------------------------------------------------------+
| 1. VERIFICACIÓN DE TIPOS   tsc --noEmit  ──►  el código fuente se valida sin emitir JS         |
| 2. EMPAQUETADO             vite build    ──►  un solo bundle JS + CSS en dist/                 |
| 3. MINIFICACIÓN            eliminación de comentarios y espacios, renombrado de símbolos       |
|                            locales y eliminación de código no usado (tree-shaking)             |
| 4. INDEXACIÓN              firma SHA-256 de cada archivo fuente (este documento)               |
+-----------------------------------------------------------------------------------------------+
```

---

## 4. SECCIÓN I: MUESTREO DE MOTOR PSICOMÉTRICO Y RECOMENDACIÓN ADAPTATIVA (`src/utils/diagnosticEngine.ts`)

### 4.1 Encabezado, Dependencias y Definiciones (Líneas 1 a 45)

```typescript
import { 
  Question, 
  DiagnosticResult, 
  KnowledgeArea, 
  SkillArea, 
  SaberDiagnosis, 
  SkillDiagnosis, 
  RemediationExercise 
} from '../types';
import { REMEDIATION_EXERCISES } from '../data/remediationBank';

const ALL_SABERES: KnowledgeArea[] = [
  'Aritmética',
  'Álgebra',
  'Geometría',
  'Trigonometría',
  'Cálculo'
];

const ALL_SKILLS: SkillArea[] = [
  'Habilidades básicas',
  'Procesos de pensamiento y razonamiento',
  'Habilidades especiales',
  'Habilidades de análisis'
];

export function computeDiagnosticReport(
  questions: Question[],
  answers: Record<string, 'a' | 'b' | 'c' | 'd' | null>
): DiagnosticResult {
  let totalCorrect = 0;
  const totalQuestions = questions.length;

  const saberMap: Record<KnowledgeArea, { total: number; correct: number }> = {
    Aritmética: { total: 0, correct: 0 },
    Álgebra: { total: 0, correct: 0 },
    Geometría: { total: 0, correct: 0 },
    Trigonometría: { total: 0, correct: 0 },
    Cálculo: { total: 0, correct: 0 }
  };

  const skillMap: Record<SkillArea, { total: number; correct: number }> = {
    'Habilidades básicas': { total: 0, correct: 0 },
    'Procesos de pensamiento y razonamiento': { total: 0, correct: 0 },
    'Habilidades especiales': { total: 0, correct: 0 },
```

### 4.2 RESERVA LEGAL DE CÓDIGO INTERMEDIO — MOTOR PSICOMÉTRICO Y RECOMENDACIÓN ADAPTATIVA

```typescript
/* =========================================================================================================
   [ RESERVA LEGAL DE CÓDIGO FUENTE CONFORME A LA LEY 23 DE 1982 Y DECISIÓN ANDINA 351 ]
   ---------------------------------------------------------------------------------------------------------
   Las líneas 46 a 209 del archivo fuente 'src/utils/diagnosticEngine.ts' corresponden a:
   - Cálculo de aciertos marginales por los 5 saberes matemáticos y las 4 habilidades cognitivas.
   - Lógica de categorización semafórica de desempeño (Dominio Alto, Aceptable, Falencia Crítica).
   - Generación adaptativa de la matriz de fortalezas pedagógicas y falencias críticas del evaluado.
   - Filtrado conjuntivo de ejercicios correctivos en función del perfil de debilidades detectadas.

   Esta sección se encuentra protegida bajo el régimen de Reserva y Secreto Empresarial.
   La autenticidad completa del archivo fuente (244 líneas) se valida mediante la firma SHA-256:
   7115107562808FEE1F6C32215124C802D7B555E75402AA03DD8CF56978E709FA
   ========================================================================================================= */
```

### 4.3 Cierre del Módulo (Líneas 210 a 244)

```typescript

  // If student achieved mastery across all areas, offer 1 advanced challenge per saber
  if (weakSaberes.size === 0 && weakSkills.size === 0) {
    const picked: RemediationExercise[] = [];
    const seenSaberes = new Set<KnowledgeArea>();
    for (const ex of REMEDIATION_EXERCISES) {
      if (!seenSaberes.has(ex.saber)) {
        seenSaberes.add(ex.saber);
        picked.push(ex);
      }
    }
    return picked;
  }

  // Score exercises so weak saber + weak skill appear first, then weak saber, then weak skill
  const scored = REMEDIATION_EXERCISES.map(ex => {
    const matchesSaber = weakSaberes.has(ex.saber);
    const matchesSkill = weakSkills.has(ex.habilidad);
    const saberDeficit = 100 - (saberScoreMap.get(ex.saber) ?? 100);
    const skillDeficit = 100 - (skillScoreMap.get(ex.habilidad) ?? 100);

    let priority = 0;
    if (matchesSaber && matchesSkill) priority = 300 + saberDeficit + skillDeficit;
    else if (matchesSaber) priority = 200 + saberDeficit;
    else if (matchesSkill && weakSaberes.size === 0) priority = 100 + skillDeficit;

    return { ex, priority };
  })
    .filter(item => item.priority > 0)
    .sort((a, b) => b.priority - a.priority);

  return scored.length > 0
    ? scored.map(item => item.ex)
    : REMEDIATION_EXERCISES.slice(0, 5);
}
```

---

## 5. SECCIÓN II: MUESTREO DE MOTOR DE RENDERIZADO PROCEDIMENTAL DE DIAGRAMAS SVG (`src/components/DiagramRenderer.tsx`)

### 5.1 Encabezado, Dependencias y Definiciones (Líneas 1 a 50)

```typescript
import React from 'react';

interface DiagramRendererProps {
  diagramType?: string;
  className?: string;
  showSolution?: boolean;
}

/**
 * Helper to plot a quadratic y = a*x^2 + b*x + c cleanly into an SVG coordinate space
 * where math +Y points UPWARD (svgY = cy - y * sy).
 */
function buildParabolaPath(
  a: number,
  b: number,
  c: number,
  cx: number,
  cy: number,
  sx: number,
  sy: number,
  xMin = -4.2,
  xMax = 4.2,
  yMin = -5.2,
  yMax = 5.2
): string {
  const pts: string[] = [];
  const steps = 80;
  for (let i = 0; i <= steps; i++) {
    const x = xMin + (i / steps) * (xMax - xMin);
    const y = a * x * x + b * x + c;
    if (y >= yMin && y <= yMax) {
      const px = cx + x * sx;
      const py = cy - y * sy;
      pts.push(`${px.toFixed(1)},${py.toFixed(1)}`);
    }
  }
  return pts.join(' ');
}

/**
 * Helper to project a 3D point (x, y, z) into 2D axonometric coordinates
 * (+X forward-left, +Y forward-right, +Z vertical up).
 */
function project3D(
  x: number,
  y: number,
  z: number,
  ox = 158,
  oy = 172,
  vx: [number, number] = [-26, 13],
```

### 5.2 RESERVA LEGAL DE CÓDIGO INTERMEDIO — MOTOR DE RENDERIZADO PROCEDIMENTAL DE DIAGRAMAS SVG

```typescript
/* =========================================================================================================
   [ RESERVA LEGAL DE CÓDIGO FUENTE CONFORME A LA LEY 23 DE 1982 Y DECISIÓN ANDINA 351 ]
   ---------------------------------------------------------------------------------------------------------
   Las líneas 51 a 2134 del archivo fuente 'src/components/DiagramRenderer.tsx' corresponden a:
   - Proyección isométrica tridimensional axonométrica con transformación de coordenadas 3D a 2D.
   - Cálculo analítico de raíces y trazado continuo de parábolas cuadráticas con escalado métrico.
   - Generación combinatoria del Triángulo de Pascal con distribución piramidal centrada.
   - Modelado geométrico de cuerpos de revolución, cilindros proporcionales y relaciones trigonométricas.

   Esta sección se encuentra protegida bajo el régimen de Reserva y Secreto Empresarial.
   La autenticidad completa del archivo fuente (2174 líneas) se valida mediante la firma SHA-256:
   832397244F8D02A2E1361138465AA434FEABD8FDB8D0AB0554D4E170CEFD5086
   ========================================================================================================= */
```

### 5.3 Cierre del Módulo (Líneas 2135 a 2174)

```typescript
    /* Q20: Ecuación fraccionaria l²/24 + l²/24 = 1/3                         */
    /* ---------------------------------------------------------------------- */
    case 'fraction_equation':
      return (
        <div
          className={`p-5 bg-slate-50/80 border border-slate-200 rounded-xl flex flex-col items-center ${className}`}
        >
          <div className="text-xs font-medium text-slate-500 mb-3">Ecuación dada</div>
          <div className="bg-white border border-slate-200 rounded-lg px-8 py-4 shadow-2xs flex items-center gap-2 text-lg sm:text-xl font-serif text-slate-900">
            <Frac
              num={
                <span>
                  <i>l</i>
                  <sup>2</sup>
                </span>
              }
              den="24"
              size="lg"
            />
            <span>+</span>
            <Frac
              num={
                <span>
                  <i>l</i>
                  <sup>2</sup>
                </span>
              }
              den="24"
              size="lg"
            />
            <span>=</span>
            <Frac num="1" den="3" size="lg" />
          </div>
        </div>
      );

    default:
      return null;
  }
};
```

---

## 6. SECCIÓN III: MUESTREO DE MODELO DE DATOS Y CONTRATOS DE TIPOS PSICOMÉTRICOS (`src/types.ts`)

### 6.1 Encabezado, Dependencias y Definiciones (Líneas 1 a 45)

```typescript
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
```

### 6.2 RESERVA LEGAL DE CÓDIGO INTERMEDIO — MODELO DE DATOS Y CONTRATOS DE TIPOS PSICOMÉTRICOS

```typescript
/* =========================================================================================================
   [ RESERVA LEGAL DE CÓDIGO FUENTE CONFORME A LA LEY 23 DE 1982 Y DECISIÓN ANDINA 351 ]
   ---------------------------------------------------------------------------------------------------------
   Las líneas 46 a 73 del archivo fuente 'src/types.ts' corresponden a:
   - Definición de las uniones de tipos literales para KnowledgeArea, SkillArea y DifficultyLevel.
   - Contratos de Question, QuestionOption, DiagnosticResult, SaberDiagnosis y RemediationExercise.

   Esta sección se encuentra protegida bajo el régimen de Reserva y Secreto Empresarial.
   La autenticidad completa del archivo fuente (108 líneas) se valida mediante la firma SHA-256:
   8ED4428DC87DE39DA0B77ACE799BCAC44CEEF7E173413CEE2F98E59EDE7C97F7
   ========================================================================================================= */
```

### 6.3 Cierre del Módulo (Líneas 74 a 108)

```typescript
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
```

---

## 7. SECCIÓN IV: MUESTREO DE COMPONENTE RAÍZ Y GESTIÓN REACTIVA DE ESTADO (`src/App.tsx`)

### 7.1 Encabezado, Dependencias y Definiciones (Líneas 1 a 45)

```typescript
import React, { useState, useEffect } from 'react';
import { AlertTriangle } from 'lucide-react';
import { INITIAL_QUESTIONS } from './data/initialQuestions';
import { Question, DiagnosticResult } from './types';
import { computeDiagnosticReport } from './utils/diagnosticEngine';
import { Header, ActiveTab } from './components/Header';
import { TestView } from './components/TestView';
import { DiagnosticReport } from './components/DiagnosticReport';
import { RemediationView } from './components/RemediationView';
import { QuestionBankManager } from './components/QuestionBankManager';

const STORAGE_KEY_QUESTIONS = 'math_diag_questions_v3';
const STORAGE_KEY_ANSWERS = 'math_diag_answers_v3';
const STORAGE_KEY_FLAGS = 'math_diag_flags_v3';
const STORAGE_KEY_REPORT = 'math_diag_report_v3';

function renumberQuestions(list: Question[]): Question[] {
  return list.map((q, idx) => ({
    ...q,
    number: idx + 1
  }));
}

const OFFICIAL_QUESTION_MAP = new Map<string, Question>(
  INITIAL_QUESTIONS.map(q => [q.id, q])
);

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('test');
  const [confirmAction, setConfirmAction] = useState<'resetTest' | 'resetBank' | null>(null);

  // Questions bank state (syncs official q1..q20 with latest definitions while preserving custom/imported items)
  const [questions, setQuestions] = useState<Question[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_QUESTIONS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const restored: Question[] = parsed.map((p: Question) => {
            const official = OFFICIAL_QUESTION_MAP.get(p.id);
            if (official) return official;
            return { ...p, isCustom: true };
          });
          return renumberQuestions(restored);
        }
```

### 7.2 RESERVA LEGAL DE CÓDIGO INTERMEDIO — COMPONENTE RAÍZ Y GESTIÓN REACTIVA DE ESTADO

```typescript
/* =========================================================================================================
   [ RESERVA LEGAL DE CÓDIGO FUENTE CONFORME A LA LEY 23 DE 1982 Y DECISIÓN ANDINA 351 ]
   ---------------------------------------------------------------------------------------------------------
   Las líneas 46 a 294 del archivo fuente 'src/App.tsx' corresponden a:
   - Estrategia de inicialización perezosa de estado con lectura sincronizada de Web Storage.
   - Efectos reactivos (useEffect) para la persistencia automática de preguntas, respuestas y reporte.
   - Manejadores de eventos de examen, adición de preguntas, importación JSON y reinicio canónico.

   Esta sección se encuentra protegida bajo el régimen de Reserva y Secreto Empresarial.
   La autenticidad completa del archivo fuente (334 líneas) se valida mediante la firma SHA-256:
   86A91DD4C3A22BEA4A038C7CB9F8592F70B3E32652D9E74509B5CD2D6E1F509A
   ========================================================================================================= */
```

### 7.3 Cierre del Módulo (Líneas 295 a 334)

```typescript
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {confirmAction === 'resetTest'
                    ? '¿Reiniciar respuestas del test?'
                    : '¿Restablecer banco de preguntas?'}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {confirmAction === 'resetTest'
                    ? 'Se limpiarán tus respuestas actuales y el reporte diagnóstico para comenzar una nueva evaluación desde cero.'
                    : 'Se restaurarán las 20 preguntas originales del examen y se eliminarán las preguntas personalizadas o importadas.'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                onClick={() => setConfirmAction(null)}
                className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={executeConfirmedAction}
                className={`px-4 py-2 text-xs font-semibold text-white rounded-lg transition-colors cursor-pointer ${
                  confirmAction === 'resetBank'
                    ? 'bg-rose-600 hover:bg-rose-700'
                    : 'bg-sky-600 hover:bg-sky-700'
                }`}
              >
                {confirmAction === 'resetTest' ? 'Sí, reiniciar test' : 'Sí, restablecer banco'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
```

---

## 8. DECLARACIÓN JURAMENTADA Y CERTIFICADO DE AUTENTICIDAD

Yo, **DANIEL VICK**, identificado como autor y titular de la obra de software titulada **"MATEMÁTICAS DIAGNÓSTICO & REFUERZO ADAPTATIVO — PLATAFORMA DE EVALUACIÓN DIAGNÓSTICA Y NIVELACIÓN DE COMPETENCIAS MATEMÁTICAS"**, declaro bajo la gravedad del juramento que:

1. El presente documento contiene un muestreo auténtico, veraz y representativo del código fuente de la obra.
2. Las firmas digitales **SHA-256** de la Tabla General corresponden a los 18 archivos fuente, con un total de **6,454 líneas de código**, en la versión 1.0.0 documentada.
3. Las porciones intermedias reservadas constituyen métodos propios de implementación, protegidos conforme a la legislación nacional e internacional de Derecho de Autor.

Para constancia de lo anterior, se expide y firma el presente documento en la ciudad de Manizales, Caldas, República de Colombia, el 20 de Noviembre de 2026.

---

**DANIEL VICK**  
Autor y Titular de los Derechos Patrimoniales y Morales  
Matemáticas Diagnóstico & Refuerzo Adaptativo — Plataforma de Evaluación Diagnóstica y Nivelación de Competencias Matemáticas
