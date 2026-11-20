# REGISTRO DE PROPIEDAD INTELECTUAL Y ESPECIFICACIÓN DE INGENIERÍA DE SOFTWARE
## MANUAL TÉCNICO Y ARQUITECTURA DEL SISTEMA — MATEMÁTICAS DIAGNÓSTICO & REFUERZO ADAPTATIVO

---

**INFORMACIÓN FORMAL DEL REGISTRO**
* **Nombre Comercial del Software:** Matemáticas Diagnóstico & Refuerzo Adaptativo — Plataforma de Evaluación Diagnóstica y Nivelación de Competencias Matemáticas
* **Autor y Creador de la Obra:** Daniel Vick
* **Versión del Software:** 1.0.0
* **Clasificación del Software:** Aplicación web interactiva, sistema psicométrico de diagnóstico matemático y nivelación adaptativa
* **Fecha de Documentación:** 20 de Noviembre de 2026
* **Licencia:** Derechos Reservados del Autor / Registro de Soporte Lógico DNDA (Ley 23 de 1982 & Decisión Andina 351)

---

## 1. INTRODUCCIÓN Y FICHA TÉCNICA

Este documento contiene la especificación de ingeniería de software, arquitectura de componentes, modelo relacional de datos y formulación matemática de los algoritmos de **Matemáticas Diagnóstico & Refuerzo Adaptativo**.

La solución está construida bajo la arquitectura de **Single Page Application (SPA)** con renderizado en el cliente (*Client-Side Rendering*), sin dependencias obligatorias de servidores centrales para el procesamiento psicométrico ni el cálculo numérico, lo que otorga autonomía total de ejecución en cualquier navegador moderno.

### 1.1 Ficha de Componentes y Stack Tecnológico

| Componente | Tecnología | Versión | Función Principal |
| :--- | :--- | :--- | :--- |
| Lenguaje de Desarrollo | TypeScript | 7.0 / Strict | Tipado estático exhaustivo de entidades, contratos y lógica algorítmica. |
| Biblioteca de Interfaz | React | 19.0.1 | Renderizado declarativo mediante componentes funcionales e inmutabilidad de Hooks. |
| Empaquetador / Bundler | Vite | 8.3.8 | Servidor de desarrollo HMR ultrarrápido y empaquetador de producción optimizado (Rollup/esbuild). |
| Motor de Estilos | Tailwind CSS | 4.3.3 | Framework de diseño basado en utilidades modernas sin capas de abstracción pesadas. |
| Plugin de Integración | @tailwindcss/vite | 4.3.3 | Integración nativa a nivel de compilador para generación instantánea de CSS mínimo en `dist/`. |
| Iconografía Vectorial | lucide-react | 0.546.0 | Conjunto de pictogramas SVG optimizados para navegación y estados semánticos. |
| Animaciones y Microinteracciones | motion (Framer Motion) | 12.23.24 | Animaciones físicas de transición fluida y transiciones de estado accesibles. |
| Motor de Diagramación | SVG Nativo / React JSX | — | Renderizado procedural de esquemas matemáticos y gráficos geométricos escalables. |
| Persistencia Primaria | Web Storage API (`localStorage`) | — | Almacenamiento local persistente con serialización JSON estricta y segura. |
| Plataforma de Despliegue | Vercel Serverless Platform | — | Distribución global en CDN con reescritura de rutas para arquitectura SPA (`vercel.json`). |

### 1.2 Comandos del Ciclo de Vida del Software

| Comando | Acción y Resultado |
| :--- | :--- |
| `npm install` | Resuelve e instala el árbol verificado de dependencias según `package-lock.json`. |
| `npm run dev` | Inicia el servidor de desarrollo local en `http://localhost:3000` con recarga de módulos en caliente. |
| `npm run build` | Compila el código TypeScript a JavaScript puro minificado y genera los activos en la carpeta `dist/`. |
| `npm run lint` | Ejecuta la verificación estática de tipos (`tsc --noEmit`) sin generar archivos residuales. |
| `npm run docs` | Genera y compila toda la documentación oficial en formatos Markdown, HTML, PDF y DOCX. |

---

## 2. ARQUITECTURA DEL SISTEMA Y FLUJO DE DATOS

La arquitectura implementa el principio de **flujo de datos unidireccional (*Unidirectional Data Flow*)**. El componente raíz `App` actúa como la única fuente de verdad (*Single Source of Truth*) del estado de la sesión, delegando a componentes puros la visualización y recibiendo eventos de mutación a través de manejadores tipados.

```text
+---------------------------------------------------------------------------------------------------------+
|                                         NAVEGADOR DEL CLIENTE                                           |
|                                                                                                         |
|     +----------------------------------------- App.tsx -------------------------------------------+     |
|     |  ESTADO GLOBAL DE LA APLICACIÓN:                                                            |     |
|     |  - questions: Question[]                                                                    |     |
|     |  - answers: Record<string, 'a'|'b'|'c'|'d'|null>                                            |     |
|     |  - flaggedQuestions: Set<string>                                                            |     |
|     |  - diagnosticResult: DiagnosticResult | null                                                |     |
|     |  - activeTab: 'test' | 'report' | 'remediation' | 'bank'                                    |     |
|     |                                                                                             |     |
|     |  PERSISTENCIA REACTIVA (useEffect):                                                         |     |
|     |  - localStorage['math_diag_questions_v1']  <─── Actualizaciones del banco                   |     |
|     |  - localStorage['math_diag_answers_v1']    <─── Selección de respuestas                     |     |
|     |  - localStorage['math_diag_flags_v1']      <─── Marcas de revisión                          |     |
|     |  - localStorage['math_diag_report_v1']     <─── Resultado diagnóstico procesado             |     |
|     +--------+------------------+-------------------+--------------------+------------------------+     |
|              │                  │                   │                    │                              |
|              ▼                  ▼                   ▼                    ▼                              |
|         Header.tsx         TestView.tsx     DiagnosticReport.tsx  RemediationView.tsx                   |
|         (pestañas,         (evaluación,     (tableros visuales,   (ejercicios adaptativos,              |
|          contadores)        progreso,        semáforos,            síntesis teórica,                     |
|                             banderas)        fortalezas)           soluciones guiadas)                   |
|                                 │                                                                       |
|                                 ▼                                                                       |
|                         DiagramRenderer.tsx <──────────────────── QuestionBankManager.tsx               |
|                         (motor SVG con 18                         (gestión, creación, filtros,          |
|                          tipos de diagramas)                       import/export JSON)                  |
|                                                                                                         |
|     SERVICIOS Y MOTORES MATEMÁTICOS:                                                                    |
|     - diagnosticEngine.ts: computeDiagnosticReport() · getRecommendedRemediations()                     |
|     - initialQuestions.ts: Banco canónico de 20 preguntas calibradas                                    |
|     - remediationBank.ts: Banco especializado de remediación                                            |
+---------------------------------------------------------------------------------------------------------+
```

### 2.1 Estructura del Árbol de Directorios

| Ruta | Descripción y Contenido |
| :--- | :--- |
| `src/main.tsx` | Punto de entrada que inicializa React 19 y ancla la aplicación en el DOM (`#root`). |
| `src/App.tsx` | Orquestador principal de estado, sincronización con `localStorage` y enrutamiento visual. |
| `src/types.ts` | Diccionario formal de tipos TypeScript e interfaces del dominio psicométrico. |
| `src/index.css` | Importación de Tailwind CSS v4 y configuración de la directiva `@theme`. |
| `src/components/Header.tsx` | Barra de navegación superior con conmutador de pestañas y botones de control. |
| `src/components/TestView.tsx` | Tarjetas interactivas de preguntas, opciones de selección múltiple y marcado. |
| `src/components/DiagnosticReport.tsx` | Reporte psicométrico con barras de progreso, categorización y resumen de fortalezas. |
| `src/components/RemediationView.tsx` | Vista de nivelación pedagógica con tarjetas de aprendizaje activo y pasos de resolución. |
| `src/components/QuestionBankManager.tsx` | Administrador CRUD de preguntas, filtros por área y herramientas de importación/exportación. |
| `src/components/DiagramRenderer.tsx` | Motor gráfico procedural que renderiza diagramas matemáticos y geométricos en SVG. |
| `src/data/initialQuestions.ts` | Colección de 20 preguntas diagnósticas calibradas con soluciones y explicaciones. |
| `src/data/remediationBank.ts` | Repositorio de ejercicios correctivos organizados por saber y competencia. |
| `src/utils/diagnosticEngine.ts` | Algoritmos de cálculo psicométrico, semaforización y selección adaptativa. |
| `docs/` | Expediente documental oficial de propiedad intelectual (DNDA). |
| `scripts/` | Script automatizado para cálculo de firmas SHA-256 y generación de PDF/DOCX. |

---

## 3. FORMULACIÓN MATEMÁTICA Y ALGORITMOS

### 3.1 Algoritmo de Evaluación Diagnóstica (`computeDiagnosticReport`)

El motor psicométrico evalúa el vector de respuestas del evaluado $A = \{a_1, a_2, \dots, a_N\}$ contra el vector de respuestas canónicas correctas $K = \{k_1, k_2, \dots, k_N\}$ para $N$ preguntas activas.

#### Acierto Individual y Puntuación Total
Para cada pregunta $q_i \in Q$:

$$\delta_i = \begin{cases} 1 & \text{si } a_i = k_i \\ 0 & \text{si } a_i \neq k_i \text{ o } a_i = \text{null} \end{cases}$$

El total de aciertos $C_{total}$ y el porcentaje de rendimiento global $P_{total}$ se expresan como:

$$C_{total} = \sum_{i=1}^{N} \delta_i, \qquad P_{total} = \left(\frac{C_{total}}{N}\right) \times 100\%$$

#### Rendimiento Marginal por Área de Saber
Dado el conjunto de saberes $S = \{\text{Aritmética}, \text{Álgebra}, \text{Geometría}, \text{Trigonometría}, \text{Cálculo}\}$:

$$Q_s = \{q_i \in Q \mid q_i.\text{saber} = s\}, \qquad T_s = |Q_s|, \qquad C_s = \sum_{q_i \in Q_s} \delta_i$$

$$P_s = \begin{cases} \left(\frac{C_s}{T_s}\right) \times 100\% & \text{si } T_s > 0 \\ 0\% & \text{si } T_s = 0 \end{cases}$$

#### Rendimiento Marginal por Habilidad Cognitiva
Dado el conjunto de habilidades $H = \{\text{Básicas}, \text{Razonamiento}, \text{Especiales}, \text{Análisis}\}$:

$$Q_h = \{q_i \in Q \mid q_i.\text{habilidad} = h\}, \qquad T_h = |Q_h|, \qquad C_h = \sum_{q_i \in Q_h} \delta_i$$

$$P_h = \begin{cases} \left(\frac{C_h}{T_h}\right) \times 100\% & \text{si } T_h > 0 \\ 0\% & \text{si } T_h = 0 \end{cases}$$

#### Función de Clasificación Pedagógica y Semafórica
Cada dimensión ($s \in S$ y $h \in H$) se somete a una función de umbral triádica:

$$\text{Estado}(P) = \begin{cases} 
\text{"Dominio Alto"} & \text{si } P \ge 80\% \\ 
\text{"Aceptable"} & \text{si } 60\% \le P < 80\% \\ 
\text{"Falencia Crítica"} & \text{si } P < 60\% 
\end{cases}$$

El nivel pedagógico integral del estudiante $\Omega(P_{total})$ se calcula como:

$$\Omega(P_{total}) = \begin{cases}
\text{"Sobresaliente"} & \text{si } P_{total} \ge 85\% \\
\text{"Competente"} & \text{si } 65\% \le P_{total} < 85\% \\
\text{"Requiere Refuerzo"} & \text{si } 40\% \le P_{total} < 65\% \\
\text{"Alerta Pedagógica"} & \text{si } P_{total} < 40\%
\end{cases}$$

### 3.2 Algoritmo de Recomendación Adaptativa (`getRecommendedRemediations`)

El sistema identifica los saberes débiles $S_{weak} = \{s \in S \mid P_s < 70\% \land T_s > 0\}$ y las habilidades débiles $H_{weak} = \{h \in H \mid P_h < 70\% \land T_h > 0\}$.

A partir del catálogo general de ejercicios correctivos $E_{bank}$, el filtro de selección adaptativa $E_{rec}$ se formula como:

$$E_{rec} = \{e \in E_{bank} \mid e.\text{saber} \in S_{weak} \lor e.\text{habilidad} \in H_{weak}\}$$

Si $S_{weak} = \emptyset$ y $H_{weak} = \emptyset$ (rendimiento sobresaliente), el motor selecciona los primeros 5 ejercicios como práctica de maestría matemática. Si $E_{rec} = \emptyset$, retorna un subconjunto canónico base de 4 ejercicios de consolidación.

### 3.3 Algoritmos Gráficos y Matemáticos en `DiagramRenderer`

#### 1. Proyección Isométrica de Cuerpos Tridimensionales (`solid_3d`, `isometric_blocks`)
Para proyectar un vértice tridimensional $(X, Y, Z)$ del espacio euclídeo en un plano bidimensional de pantalla $(x_{scr}, y_{scr})$, el motor utiliza una proyección axonométrica isométrica con ángulo estándar de inclinación $\theta = 30^\circ$ ($\frac{\pi}{6}$ rad):

$$x_{scr} = x_{origin} + (X - Y) \cdot \cos(30^\circ) \cdot s$$

$$y_{scr} = y_{origin} + (X + Y) \cdot \sin(30^\circ) \cdot s - Z \cdot s$$

donde $s$ representa el factor de escala y $(x_{origin}, y_{origin})$ el punto focal central del lienzo SVG.

#### 2. Generación Combinatoria del Triángulo de Pascal (`pascal`)
Los coeficientes de cada nivel $n$ se obtienen mediante la relación recursiva de Tartaglia-Pascal:

$$\binom{n}{k} = \binom{n-1}{k-1} + \binom{n-1}{k}, \quad \text{con } \binom{n}{0} = \binom{n}{n} = 1$$

El renderer calcula la posición horizontal centrada de cada elemento $(n, k)$ según:

$$x_{n,k} = x_{center} + \left(k - \frac{n}{2}\right) \cdot \Delta x, \quad y_{n,k} = y_{top} + n \cdot \Delta y$$

#### 3. Trazado Analítico de Funciones Cuadráticas (`parabola_options`, `quad_roots`)
Para la función cuadrática $f(x) = ax^2 + bx + c$, el motor determina analíticamente:

$$\text{Vértice: } \left(x_v, y_v\right) = \left(-\frac{b}{2a}, \; f\left(-\frac{b}{2a}\right)\right)$$

$$\text{Raíces reales: } x_{1,2} = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$$

La curva SVG se parametriza a lo largo de un intervalo continuo $x \in [x_{min}, x_{max}]$ mapeado a coordenadas de píxeles:

$$X_{px} = W_{mid} + x \cdot S_x, \quad Y_{px} = H_{mid} - f(x) \cdot S_y$$

#### 4. Comparativa Volumétrica de Cuerpos de Revolución (`cylinder_volumes`)
Para cilindros con radio $r$ y altura $h$, el volumen exacto se computa con:

$$V = \pi r^2 h$$

El renderizador dimensiona la altura visual $H_{svg} \propto h$ y la anchura de la base elíptica $W_{svg} \propto 2r$, manteniendo congruencia métrica y perspectiva axial.

---

## 4. MODELO DE DATOS Y DEFINICIÓN DE TIPOS

El archivo `src/types.ts` establece el modelo formal de datos mediante contratos inmutables:

```typescript
export type KnowledgeArea = 'Aritmética' | 'Geometría' | 'Trigonometría' | 'Álgebra' | 'Cálculo';

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
  diagramType?: string;
  options: QuestionOption[];
  correctAnswer: 'a' | 'b' | 'c' | 'd';
  explanation: string;
  hint?: string;
  isCustom?: boolean;
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
```

---

## 5. DESPLIEGUE EN PRODUCCIÓN Y CONFIGURACIÓN VERCEL

El proyecto se despliega como una aplicación estática compilada en **Vercel**. La configuración de enrutamiento del lado del cliente se encuentra gobernada por el archivo `vercel.json`:

```json
{
  "buildCommand": "vite build",
  "outputDirectory": "dist",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

Esta directiva de reescritura garantiza que cualquier ruta profunda de la aplicación sea redirigida a `index.html`, permitiendo a React gestionar el enrutamiento interno sin ocasionar errores HTTP 404.
