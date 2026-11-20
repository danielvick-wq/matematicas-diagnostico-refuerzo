# REGISTRO DE PROPIEDAD INTELECTUAL Y DIAGRAMA DE ARQUITECTURA
## DIAGRAMA DE CLASES Y MODELO DE COMPONENTES — MATEMÁTICAS DIAGNÓSTICO & REFUERZO ADAPTATIVO

---

**INFORMACIÓN FORMAL DEL REGISTRO**
* **Nombre Comercial del Software:** Matemáticas Diagnóstico & Refuerzo Adaptativo — Plataforma de Evaluación Diagnóstica y Nivelación de Competencias Matemáticas
* **Autor y Creador de la Obra:** Daniel Vick
* **Versión del Software:** 1.0.0
* **Clasificación del Software:** Aplicación web interactiva, sistema psicométrico de diagnóstico matemático y nivelación adaptativa
* **Fecha de Documentación:** 20 de Noviembre de 2026
* **Licencia:** Derechos Reservados del Autor / Registro de Soporte Lógico DNDA (Ley 23 de 1982 & Decisión Andina 351)

---

## 1. INTRODUCCIÓN Y MODELO DE ENTIDADES

Este documento formaliza la estructura de datos, contratos de interfaz, relaciones de agregación y el modelo de componentes del sistema **Matemáticas Diagnóstico & Refuerzo Adaptativo**.

Siguiendo el paradigma funcional moderno de React 19 y TypeScript 7, las entidades del modelo son modeladas como **interfaces inmutables de datos**, mientras que la lógica de transformación y orquestación se encapsula en **módulos de funciones puras** y **componentes de interfaz de usuario**.

### 1.1 Diagrama UML de Clases y Entidades del Modelo

```mermaid
classDiagram
    class Question {
        +String id
        +Number number
        +String prompt
        +KnowledgeArea saber
        +SkillArea habilidad
        +DifficultyLevel difficulty
        +String diagramType
        +QuestionOption[] options
        +String correctAnswer
        +String explanation
        +String hint
        +Boolean isCustom
    }

    class QuestionOption {
        +String label
        +String text
        +String subtext
    }

    class DiagnosticResult {
        +Number totalQuestions
        +Number totalCorrect
        +Number totalPercentage
        +OverallLevel overallLevel
        +SaberDiagnosis[] saberBreakdown
        +SkillDiagnosis[] skillBreakdown
        +String[] fortalezas
        +String[] falencias
        +String completedAt
        +Object answers
    }

    class SaberDiagnosis {
        +KnowledgeArea saber
        +Number total
        +Number correct
        +Number percentage
        +PerformanceStatus status
        +String feedback
    }

    class SkillDiagnosis {
        +SkillArea habilidad
        +Number total
        +Number correct
        +Number percentage
        +PerformanceStatus status
        +String feedback
    }

    class RemediationExercise {
        +String id
        +KnowledgeArea saber
        +SkillArea habilidad
        +String title
        +String conceptSummary
        +String formulaOrTip
        +String prompt
        +String diagramType
        +QuestionOption[] options
        +String correctAnswer
        +String explanation
        +String[] steps
    }

    class UserAnswerMap {
        +Record~string, OptionLabel~ answers
    }

    Question "1" *-- "4" QuestionOption : contiene
    DiagnosticResult "1" *-- "5" SaberDiagnosis : desglosa
    DiagnosticResult "1" *-- "4" SkillDiagnosis : desglosa
    DiagnosticResult "1" *-- "1" UserAnswerMap : referencia
    RemediationExercise "1" *-- "4" QuestionOption : opciones
    RemediationExercise ..> Question : subsana vacíos de
```

### 1.2 Enumeraciones y Tipos del Dominio

* **KnowledgeArea:** `'Aritmética'` | `'Geometría'` | `'Trigonometría'` | `'Álgebra'` | `'Cálculo'`
* **SkillArea:** `'Habilidades básicas'` | `'Procesos de pensamiento y razonamiento'` | `'Habilidades especiales'` | `'Habilidades de análisis'`
* **DifficultyLevel:** `'Básico'` | `'Intermedio'` | `'Avanzado'`
* **PerformanceStatus:** `'Dominio Alto'` | `'Aceptable'` | `'Falencia Crítica'`
* **OverallLevel:** `'Sobresaliente'` | `'Competente'` | `'Requiere Refuerzo'` | `'Alerta Pedagógica'`

---

## 2. DIAGRAMA DE COMPONENTES REACT Y MÓDULOS DE SERVICIO

El sistema organiza sus responsabilidades visuales y lógicas de forma modular:

```mermaid
classDiagram
    class App {
        -Question[] questions
        -Record answers
        -Set flaggedQuestions
        -DiagnosticResult diagnosticResult
        -ActiveTab activeTab
        +handleSelectAnswer(questionId, option)
        +handleToggleFlag(questionId)
        +handleSubmitTest()
        +handleResetTest()
        +handleAddQuestion(newQuestion)
        +handleDeleteQuestion(questionId)
        +handleResetToDefault()
        +handleImportQuestions(imported)
    }

    class Header {
        +ActiveTab activeTab
        +onSelectTab(tab)
        +onReset()
        +Number totalQuestions
        +Number answeredCount
    }

    class TestView {
        +Question[] questions
        +Record answers
        +Set flaggedQuestions
        +onSelectAnswer(questionId, option)
        +onToggleFlag(questionId)
        +onSubmit()
    }

    class DiagnosticReport {
        +DiagnosticResult diagnostic
        +Question[] questions
        +onStartRemediation()
        +onRetakeTest()
    }

    class RemediationView {
        +DiagnosticResult diagnostic
        +onRetakeTest()
    }

    class QuestionBankManager {
        +Question[] questions
        +onAddQuestion(newQ)
        +onDeleteQuestion(id)
        +onResetToDefault()
        +onImportQuestions(list)
    }

    class DiagramRenderer {
        +String type
        +renderPascal()
        +renderTreesTriangle()
        +renderSolid3D()
        +renderParabola()
        +renderCylinders()
        +renderTrigLadder()
    }

    class diagnosticEngine {
        <<module>>
        +computeDiagnosticReport(questions, answers) DiagnosticResult
        +getRecommendedRemediations(diagnostic) RemediationExercise[]
    }

    class initialQuestions {
        <<module>>
        +Question[] INITIAL_QUESTIONS
    }

    class remediationBank {
        <<module>>
        +RemediationExercise[] REMEDIATION_EXERCISES
    }

    App *-- Header
    App *-- TestView
    App *-- DiagnosticReport
    App *-- RemediationView
    App *-- QuestionBankManager
    TestView *-- DiagramRenderer
    RemediationView *-- DiagramRenderer
    QuestionBankManager *-- DiagramRenderer
    App ..> diagnosticEngine : calcula informe
    App ..> initialQuestions : carga banco canónico
    diagnosticEngine ..> remediationBank : extrae nivelación
```

---

## 3. DIAGRAMA DE SECUENCIA: FLUJO DE DIAGNÓSTICO Y NIVELACIÓN

```mermaid
sequenceDiagram
    autonumber
    actor Estudiante as Evaluado / Estudiante
    participant TestView as TestView (Interfaz Examen)
    participant App as App.tsx (Controlador Raíz)
    participant Storage as Web Storage (localStorage)
    participant Engine as diagnosticEngine.ts (Motor Algorítmico)
    participant Report as DiagnosticReport (Informe Visual)
    participant Remediation as RemediationView (Nivelación)

    Estudiante->>TestView: Selecciona opción en pregunta q_i
    TestView->>App: handleSelectAnswer(q_i, 'c')
    App->>Storage: Actualiza 'math_diag_answers_v1'
    Estudiante->>TestView: Clic en "Finalizar y Generar Diagnóstico"
    TestView->>App: handleSubmitTest()
    App->>Engine: computeDiagnosticReport(questions, answers)
    activate Engine
    Engine->>Engine: Calcula aciertos globales y porcentajes
    Engine->>Engine: Desglosa por 5 Saberes y 4 Habilidades
    Engine->>Engine: Genera matriz de fortalezas y falencias
    Engine-->>App: Retorna DiagnosticResult
    deactivate Engine
    App->>Storage: Guarda 'math_diag_report_v1'
    App->>Report: Renderiza tablero psicométrico
    Estudiante->>Report: Clic en "Iniciar Nivelación Adaptativa"
    Report->>App: setActiveTab('remediation')
    App->>Engine: getRecommendedRemediations(diagnosticResult)
    Engine-->>App: Retorna ejercicios dirigidos a falencias
    App->>Remediation: Renderiza ejercicios con teoría y pasos guiados
    Estudiante->>Remediation: Resuelve ejercicios de refuerzo
```

---

## 4. DIAGRAMA DE ESTADOS: CICLO DE VIDA DE LA SESIÓN

```mermaid
stateDiagram-v2
    [*] --> BancoInicial : Carga de la aplicación
    BancoInicial --> EvaluacionEnProgreso : Estudiante lee preguntas
    
    state EvaluacionEnProgreso {
        [*] --> SinResponder
        SinResponder --> Respondida : Selecciona opción (a,b,c,d)
        Respondida --> MarcadaDuda : Clic en bandera de revisión
        MarcadaDuda --> Respondida : Desmarca bandera
        Respondida --> Respondida : Cambia de opción
    }

    EvaluacionEnProgreso --> DiagnosticoCompletado : Clic en "Finalizar Test"
    
    state DiagnosticoCompletado {
        [*] --> AnalisisResultados
        AnalisisResultados --> RevisionFalencias : Identifica falencias críticas
    }

    DiagnosticoCompletado --> NivelacionActiva : Clic en "Iniciar Nivelación"
    
    state NivelacionActiva {
        [*] --> LecturaConcepto
        LecturaConcepto --> ResolucionEjercicio
        ResolucionEjercicio --> ConsultaPasosSolucion : Visualiza retroalimentación
    }

    NivelacionActiva --> EvaluacionEnProgreso : Retomar Test / Reevaluación
    DiagnosticoCompletado --> EvaluacionEnProgreso : Reiniciar Test
    DiagnosticoCompletado --> [*]
```

---

## 5. ESPECIFICACIÓN DETALLADA DE LAS RELACIONES

1. **Relación `Question` - `QuestionOption` (Composición $1:4$):** Cada pregunta contiene forzosamente 4 opciones discretas identificadas de forma alfabética (`a`, `b`, `c`, `d`).
2. **Relación `DiagnosticResult` - `SaberDiagnosis` (Composición $1:5$):** El resultado desglosa exhaustivamente los 5 saberes curriculares obligatorios: Aritmética, Álgebra, Geometría, Trigonometría y Cálculo.
3. **Relación `DiagnosticResult` - `SkillDiagnosis` (Composición $1:4$):** El resultado evalúa de forma ortogonal las 4 habilidades cognitivas evaluadas: Básicas, Razonamiento, Especiales y Análisis.
4. **Relación `DiagramRenderer` - `Question` (Asociación Débil $0..1$):** El motor renderiza el diagrama correspondiente si la pregunta define un valor en la propiedad `diagramType`.
5. **Relación `diagnosticEngine` - `remediationBank` (Dependencia Funcional):** La función `getRecommendedRemediations` consulta el banco canónico de ejercicios correctivos para extraer aquellos cuyo saber o habilidad coinciden con los conjuntos de falencias críticas ($P < 70\%$).
