# REGISTRO DE PROPIEDAD INTELECTUAL Y GUÍA DE OPERACIÓN PEDAGÓGICA
## MANUAL DE USUARIO — MATEMÁTICAS DIAGNÓSTICO & REFUERZO ADAPTATIVO

---

**INFORMACIÓN FORMAL DEL REGISTRO**
* **Nombre Comercial del Software:** Matemáticas Diagnóstico & Refuerzo Adaptativo — Plataforma de Evaluación Diagnóstica y Nivelación de Competencias Matemáticas
* **Autor y Creador de la Obra:** Daniel Vick
* **Versión del Software:** 1.0.0
* **Clasificación del Software:** Aplicación web interactiva, sistema psicométrico de diagnóstico matemático y nivelación adaptativa
* **Fecha de Documentación:** 20 de Noviembre de 2026
* **Licencia:** Derechos Reservados del Autor / Registro de Soporte Lógico DNDA (Ley 23 de 1982 & Decisión Andina 351)

---

## 1. INTRODUCCIÓN Y PROPÓSITO PEDAGÓGICO

El presente **Manual de Usuario** constituye la guía integral de operación y aprovechamiento pedagógico del software **Matemáticas Diagnóstico & Refuerzo Adaptativo**. Esta plataforma ha sido diseñada como un entorno de evaluación formativa y nivelación personalizada que diagnostica con rigor técnico el dominio de estudiantes y evaluados en cinco saberes nucleares de las matemáticas y cuatro dimensiones cognitivas fundamentales:

### 1.1 Saberes Matemáticos Evaluados
1. **Aritmética:** Estructuras numéricas, proporcionalidad, progresiones, teoría de números, secuencias y Triángulo de Pascal.
2. **Geometría:** Propiedades espaciales, perímetros, áreas, desarrollo plano de poliedros, geometría cartesiana tridimensional y relaciones métricas.
3. **Trigonometría:** Razones trigonométricas en triángulos rectángulos, ángulos de elevación y depresión, identidades fundamentales y resolución de problemas de aplicación geométrica.
4. **Álgebra:** Lenguaje algebraico, factorización, simplificación de expresiones racionales y radicales, ecuaciones de primer y segundo grado, y modelado simbólico.
5. **Cálculo:** Comportamiento de funciones cuadráticas y polinómicas, análisis de gráficas (vértices, asíntotas, concavidad), optimización geométrica, cálculo de volúmenes de cuerpos de revolución y variación acumulada.

### 1.2 Habilidades Cognitivas Diagnosticadas
1. **Habilidades básicas:** Comprensión de conceptos elementales, lectura directa de datos y aplicación inmediata de definiciones y algoritmos estándar.
2. **Procesos de pensamiento y razonamiento:** Reconocimiento de regularidades, deducción lógica, secuenciación inductiva y argumentación deductiva formal.
3. **Habilidades especiales (Orientación y Visualización Espacial):** Capacidad de rotación mental tridimensional, traslación de vistas planas a sólidas, manipulación de desarrollos en el espacio y lectura de sistemas coordenados $XYZ$.
4. **Habilidades de análisis:** Descomposición de problemas complejos en partes elementales, contraste de variables interdependientes, síntesis e inferencia de conclusiones a partir de modelos matemáticos.

Toda la aplicación opera de manera local en el navegador (*Client-Side Execution*) haciendo uso del almacenamiento persistente `localStorage`. Esto garantiza privacidad absoluta para el estudiante, rendimiento instantáneo sin latencia de red y funcionamiento continuo incluso sin conexión a Internet una vez cargada la aplicación.

---

## 2. ESTRUCTURA DE LA INTERFAZ

La interfaz de usuario ha sido concebida siguiendo los más rigurosos estándares de diseño limpio, accesibilidad universal (WCAG AA), tipografía técnica de alta legibilidad (`Plus Jakarta Sans` y `JetBrains Mono`) y ausencia de elementos superfluos. La navegación se organiza mediante cuatro módulos principales accesibles desde la barra superior:

```text
+---------------------------------------------------------------------------------------------------------+
|  MATEMÁTICAS DIAGNÓSTICO & REFUERZO ADAPTATIVO                       [Saber / Habilidad / Estado]       |
|  [Evaluación (n)]    [Diagnóstico]    [Refuerzo Adaptativo]    [Banco de Preguntas (20)]   [Reiniciar]  |
+---------------------------------------------------------------------------------------------------------+
|                                                                                                         |
|   ZONA DE TRABAJO (cambia dinámicamente según la pestaña activa seleccionada)                          |
|                                                                                                         |
+---------------------------------------------------------------------------------------------------------+
```

* **Evaluación (`TestView`):** Entorno de examen donde se presentan las preguntas, diagramas interactivos y opciones de respuesta.
* **Diagnóstico (`DiagnosticReport`):** Informe psicométrico completo con semaforización de desempeño, desglose analítico por saber y habilidad, y lista de fortalezas y falencias detectadas.
* **Refuerzo Adaptativo (`RemediationView`):** Entorno de nivelación guiada que ofrece ejercicios específicos para superar los conceptos reprobados o dudosos.
* **Banco de Preguntas (`QuestionBankManager`):** Módulo administrativo para visualizar, filtrar, agregar, eliminar, respaldar y restaurar preguntas en formato JSON.

---

## 3. MÓDULOS FUNCIONALES Y GUÍA PASO A PASO

### 3.1 Módulo 1: Presentación de la Evaluación (`TestView`)

El módulo de evaluación permite al estudiante contestar el cuestionario de manera interactiva, clara y sin distracciones.

1. **Lectura del enunciado:** Cada pregunta presenta su número correlativo, el área de saber a la que pertenece, la habilidad evaluada y su nivel de dificultad (*Básico*, *Intermedio* o *Avanzado*).
2. **Visualización diagramática integrada:** Si la pregunta requiere apoyo gráfico, el motor `DiagramRenderer` genera directamente en pantalla diagramas vectoriales SVG nítidos e interactivos (sólidos 3D, funciones parabólicas, esquemas de trigonometría, patrones circulares, etc.).
3. **Selección de respuesta:** El usuario hace clic sobre cualquiera de las 4 opciones (`a`, `b`, `c`, `d`). La opción seleccionada se resalta visualmente en color azul índigo institucional.
4. **Marcado de preguntas dudosas (*Flagging*):** En la esquina superior derecha de cada tarjeta de pregunta se ubica el botón **Marcar para revisión** (icono de bandera). Permite identificar ítems sobre los cuales el estudiante duda, manteniéndolos destacados para una segunda lectura antes de enviar la prueba.
5. **Barra de navegación y progreso:** En la cabecera del examen se visualiza el porcentaje exacto de avance y la cantidad de preguntas contestadas frente al total.
6. **Envío de la prueba:** Al finalizar, el botón **Finalizar y Generar Diagnóstico** procesa instantáneamente las respuestas y transfiere al usuario a la pestaña de **Diagnóstico**.

### 3.2 Módulo 2: Informe y Diagnóstico Pedagógico (`DiagnosticReport`)

El motor de diagnóstico evalúa de forma multivariable el desempeño global y desglosado:

1. **Calificación y Nivel Global:** Muestra el porcentaje de aciertos ($0\%$ a $100\%$) y clasifica al estudiante en uno de cuatro estadios pedagógicos:
   * **Sobresaliente ($\ge 85\%$):** Dominio integral de conceptos y destrezas matemáticas avanzadas.
   * **Competente ($65\% - 84\%$):** Nivel adecuado con bases sólidas y falencias menores no estructurales.
   * **Requiere Refuerzo ($40\% - 64\%$):** Dominio parcial con vacíos conceptuales que comprometen la continuidad académica.
   * **Alerta Pedagógica ($< 40\%$):** Dificultades graves y generalizadas que exigen intervención inmediata.
2. **Desglose por Áreas de Saber:** Tablero analítico que evalúa de forma independiente Aritmética, Álgebra, Geometría, Trigonometría y Cálculo, señalando aciertos, total de preguntas y estado (*Dominio Alto*, *Aceptable* o *Falencia Crítica*).
3. **Desglose por Habilidades Cognitivas:** Análisis transversal del razonamiento, habilidades espaciales, habilidades básicas y capacidad analítica.
4. **Matriz de Fortalezas y Falencias:** Cuadro narrativo generado algorítmicamente que explica con exactitud en qué temas el estudiante demuestra solvencia y en cuáles presenta errores reiterados.
5. **Pasarela de Refuerzo:** El botón **Iniciar Nivelación Adaptativa** conduce directamente a los ejercicios recomendados para subsanar los puntos débiles identificados.

### 3.3 Módulo 3: Refuerzo y Nivelación Adaptativa (`RemediationView`)

Este módulo implementa el enfoque de educación adaptativa:

1. **Filtrado inteligente:** La aplicación no abruma al estudiante con todos los ejercicios del banco, sino que selecciona automáticamente aquellos ejercicios orientados a las áreas donde obtuvo un rendimiento inferior al $70\%$.
2. **Síntesis Conceptual y Fórmulas:** Cada ejercicio de remediación inicia con una cápsula teórica concisa (*Concept Summary*) y un recordatorio de fórmulas clave o estrategias de resolución.
3. **Desarrollo Paso a Paso:** Al responder, el estudiante accede a una explicación detallada paso a paso que descompone el razonamiento matemático necesario para alcanzar la respuesta correcta.
4. **Autonomía:** El estudiante puede practicar tantas veces como sea necesario hasta consolidar la competencia y retornar al examen para comprobar su progreso.

### 3.4 Módulo 4: Administrador del Banco de Preguntas (`QuestionBankManager`)

Diseñado tanto para estudiantes avanzados como para docentes y evaluadores institucionales:

1. **Exploración y Filtrado:** Permite buscar y filtrar preguntas por área de saber (Aritmética, Geometría, etc.), por habilidad o por nivel de dificultad.
2. **Creación de Nuevas Preguntas:** Formulario estructurado para incorporar preguntas al banco, especificando enunciado, opciones, respuesta correcta, retroalimentación pedagógica, pista de ayuda y tipo de diagrama asociado.
3. **Importación y Exportación JSON:**
   * **Exportar Banco:** Descarga un archivo estructurado `preguntas_matematicas_diagnostico.json` para respaldar la información o compartirla entre computadores.
   * **Importar Banco:** Permite cargar bancos masivos creados por docentes.
4. **Restablecimiento Canónico:** Un botón de reinicio seguro permite volver en cualquier momento al banco oficial de 20 preguntas calibradas del examen.

---

## 4. CATÁLOGO DE DIAGRAMAS MATEMÁTICOS INTEGRADOS

El sistema cuenta con un motor de representación gráfica (`DiagramRenderer`) que genera 18 tipologías de diagramas matemáticos vectoriales en tiempo real:

| Identificador | Descripción Matemática y Visual | Saber Principal |
| :--- | :--- | :--- |
| `pascal` | Representación triangular piramidal con sumas de coeficientes binomiales $\binom{n}{k}$. | Aritmética |
| `trees_triangle` | Campo triangular discreto con distribución perimetral de elementos y nodos en vértices. | Geometría |
| `circle_sequence` | Secuencia angular de sectores circulares con progresiones numéricas en sentido horario. | Aritmética |
| `symbols_equation` | Balanzas algebraicas y sistemas de ecuaciones lineales resueltas mediante íconos y figuras. | Álgebra |
| `cube_net` | Desarrollo plano bidimensional de un cubo con solapas y rotulación de segmentos coincidentes. | Geometría |
| `solid_3d` | Prisma escalonado tridimensional en perspectiva isométrica con proyecciones sobre ejes $X, Y, Z$. | Geometría / Cálculo |
| `parabola_options` | Conjunto cuádruple de curvas parabólicas cuadráticas con identificación de raíces y vértices. | Cálculo / Álgebra |
| `fraction_bracket` | Diagrama jerárquico de operaciones fraccionarias con corchetes y orden de precedencia. | Aritmética |
| `radical_expr` | Expresiones con radicales anidados, racionalización y simplificación de potencias fraccionarias. | Álgebra |
| `formula_k` | Gráfico de dispersión y proporcionalidad directa/inversa con constante de proporcionalidad $k$. | Álgebra |
| `cube_triangle` | Cubo unitario con triángulo rectángulo interior formado por una diagonal de cara y una arista. | Geometría |
| `cylinder_volumes` | Comparativa gráfica proporcional de tres cilindros de diferente radio y altura ($V = \pi r^2 h$). | Cálculo / Geometría |
| `quad_roots` | Representación analítica de la parábola $Y = 2X^2 + 3X - 5$ y sus cortes con el eje de abscisas. | Cálculo / Álgebra |
| `fibonacci_seq` | Espiral geométrica áurea y secuencia aditiva de términos consecutivos. | Aritmética |
| `trig_diagram_options` | Opciones de triángulos rectángulos para identificar razones seno, coseno y tangente. | Trigonometría |
| `ladder_trig` | Problema de aplicación de escalera apoyada sobre pared vertical con ángulo de elevación. | Trigonometría |
| `isometric_blocks` | Composición isométrica de cubos unitarios para conteo espacial de volumen y áreas visibles. | Geometría |
| `fraction_equation` | Modelado gráfico de áreas sombreadas y equivalencia con ecuaciones fraccionarias. | Álgebra / Aritmética |

---

## 5. FLUJO DE TRABAJO RECOMENDADO

```text
  [ Inicio de Sesión ]
           │
           ▼
  [ Módulo de Evaluación ] ──► Responder 20 preguntas con diagramas interactivos
           │                   Marcar con bandera las preguntas con dudas
           ▼
  [ Envío del Examen ] ──► Procesamiento instantáneo por el motor psicométrico
           │
           ▼
  [ Informe Diagnóstico ] ──► Revisar nivel global, semáforo por saber y habilidades
           │                  Identificar fortalezas y falencias críticas
           ▼
  [ Nivelación Adaptativa ] ──► Resolver ejercicios focalizados en las falencias
           │                    Consultar cápsulas de teoría y pasos de solución
           ▼
  [ Reevaluación o Práctica ] ──► Reiniciar el test o añadir nuevas preguntas al banco
```

---

## 6. PERSISTENCIA Y PRIVACIDAD

Toda la persistencia se gestiona en el almacenamiento local del cliente (`localStorage`), bajo las siguientes claves:

* `math_diag_questions_v1`: Arreglo de objetos `Question[]` con el banco actual.
* `math_diag_answers_v1`: Registro de selecciones del usuario `{ [questionId]: 'a' | 'b' | 'c' | 'd' }`.
* `math_diag_flags_v1`: Conjunto de identificadores de preguntas marcadas para revisión.
* `math_diag_report_v1`: Objeto serializado `DiagnosticResult` con el último informe generado.

El software no recopila, procesa ni transmite datos personales sensibles hacia servidores de terceros.
