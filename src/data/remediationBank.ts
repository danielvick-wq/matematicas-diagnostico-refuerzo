import { RemediationExercise } from '../types';

export const REMEDIATION_EXERCISES: RemediationExercise[] = [
  // --- ARITMÉTICA ---
  {
    id: 'rem-arit-basica-1',
    saber: 'Aritmética',
    habilidad: 'Habilidades básicas',
    title: 'Jerarquía de operaciones y signos de agrupación',
    conceptSummary:
      'Para resolver operaciones combinadas con fracciones y signos de agrupación, se opera de adentro hacia afuera: primero paréntesis ( ), luego corchetes [ ], y por último llaves { }. Para sumar o restar fracciones con distinto denominador, conviértelas al mínimo común múltiplo (m.c.m.).',
    formulaOrTip: 'Regla de signos: −(−a) = +a · m.c.m.(6, 3) = 6',
    hint: 'Convierte 1/3 a sextos (2/6) para resolver primero el paréntesis interior (5/6 − 2/6).',
    prompt: 'Calcule el resultado exacto de la expresión:\n3/4 − [ 1/2 − (5/6 − 1/3) ]',
    options: [
      { label: 'a', text: '1/4' },
      { label: 'b', text: '3/4' },
      { label: 'c', text: '1/2' },
      { label: 'd', text: '5/12' }
    ],
    correctAnswer: 'b',
    explanation:
      '1) Paréntesis: 5/6 − 1/3 = 5/6 − 2/6 = 3/6 = 1/2.\n2) Corchetes: 1/2 − 1/2 = 0.\n3) Resultado final: 3/4 − 0 = 3/4.',
    steps: [
      'Resuelve la resta dentro del paréntesis: 5/6 − 2/6 = 3/6 = 1/2.',
      'Evalúa el corchete sustituyendo el valor hallado: [1/2 − 1/2 = 0].',
      'Realiza la resta final: 3/4 − 0 = 3/4.'
    ]
  },
  {
    id: 'rem-arit-razonamiento-1',
    saber: 'Aritmética',
    habilidad: 'Procesos de pensamiento y razonamiento',
    title: 'Patrones en sucesiones numéricas de diferencias crecientes',
    conceptSummary:
      'Cuando una sucesión no crece con una suma constante, calcula las diferencias entre términos consecutivos (a₂ − a₁, a₃ − a₂, ...). Si esas diferencias forman una progresión regular (+1, +2, +3, ...), puedes predecir exactamente el siguiente incremento.',
    formulaOrTip: 'Diferencias de primer orden: Δₙ = aₙ₊₁ − aₙ',
    hint: 'Resta cada par de términos vecinos: 3−2 = 1, 5−3 = 2, 8−5 = 3... ¿qué número debes sumar a 23?',
    prompt: 'En la siguiente sucesión: 2, 3, 5, 8, 12, 17, 23, ... ¿Cuál es el siguiente número?',
    options: [
      { label: 'a', text: '28' },
      { label: 'b', text: '30' },
      { label: 'c', text: '31' },
      { label: 'd', text: '32' }
    ],
    correctAnswer: 'b',
    explanation:
      'Calculando las diferencias consecutivas: 3−2 = +1; 5−3 = +2; 8−5 = +3; 12−8 = +4; 17−12 = +5; 23−17 = +6. La siguiente diferencia es +7, por lo que 23 + 7 = 30.',
    steps: [
      'Calcula la diferencia entre cada par contiguo: +1, +2, +3, +4, +5, +6.',
      'Identifica que cada incremento aumenta en 1 respecto al anterior.',
      'Suma +7 al último término: 23 + 7 = 30.'
    ]
  },
  {
    id: 'rem-arit-razonamiento-2',
    saber: 'Aritmética',
    habilidad: 'Procesos de pensamiento y razonamiento',
    title: 'Reglas cuadráticas y relaciones entre parejas numéricas',
    conceptSummary:
      'En secuencias con relaciones radiales o parejas de números (como n → n² − 1 o n → n² + 1), prueba comparar el número de salida con el cuadrado (n²) o el doble/triple del número de entrada para descubrir la ley general.',
    formulaOrTip: 'Cuadrados perfectos: 2²=4, 3²=9, 4²=16, 5²=25, 6²=36, 7²=49, 8²=64',
    hint: 'Compara 4 con 18 (4² + 2 = 18) y 5 con 27 (5² + 2 = 27). Aplica esa misma regla a 7.',
    prompt:
      'En una secuencia de parejas se cumple: 3 → 11, 4 → 18, 5 → 27, 6 → 38. Según esta misma regla, ¿qué número corresponde a 7?',
    options: [
      { label: 'a', text: '47' },
      { label: 'b', text: '49' },
      { label: 'c', text: '51' },
      { label: 'd', text: '53' }
    ],
    correctAnswer: 'c',
    explanation:
      'Cada pareja sigue la regla f(n) = n² + 2:\n- 3² + 2 = 9 + 2 = 11\n- 4² + 2 = 16 + 2 = 18\n- 5² + 2 = 25 + 2 = 27\n- 6² + 2 = 36 + 2 = 38\nPor tanto, para n = 7: 7² + 2 = 49 + 2 = 51.',
    steps: [
      'Eleva al cuadrado cada número de entrada: 9, 16, 25, 36.',
      'Observa que cada resultado de salida excede al cuadrado en exactamente 2 unidades (n² + 2).',
      'Aplica la regla a n = 7: 7² + 2 = 49 + 2 = 51.'
    ]
  },

  // --- ÁLGEBRA ---
  {
    id: 'rem-alg-basica-1',
    saber: 'Álgebra',
    habilidad: 'Habilidades básicas',
    title: 'Factorización y raíces de polinomios cuadráticos',
    conceptSummary:
      'Para hallar las raíces de ax² + bx + c = 0, puedes factorizar en dos binomios o aplicar la fórmula general x = (−b ± √(b² − 4ac)) / (2a). Recuerda que cada factor igualado a cero entrega una solución.',
    formulaOrTip: 'Fórmula general: x = (−b ± √(b² − 4ac)) / (2a)',
    hint: 'Busca dos binomios (3x + p)(x + q) cuyo producto sea 3x² − 5x − 2, o reemplaza a=3, b=−5, c=−2 en la fórmula cuadrática.',
    prompt: 'Halle las soluciones de la ecuación cuadrática: 3x² − 5x − 2 = 0.',
    options: [
      { label: 'a', text: 'x = 2,  x = −1/3' },
      { label: 'b', text: 'x = −2, x = 1/3' },
      { label: 'c', text: 'x = 1,  x = −2/3' },
      { label: 'd', text: 'x = 3,  x = −1/2' }
    ],
    correctAnswer: 'a',
    explanation:
      'Factorizando por aspa simple: (3x + 1)(x − 2) = 0. Igualando a cero cada factor: 3x + 1 = 0 → x = −1/3; x − 2 = 0 → x = 2. Las soluciones son x = 2 y x = −1/3.',
    steps: [
      'Identifica los coeficientes a = 3, b = −5, c = −2.',
      'Factoriza el trinomio como (3x + 1)(x − 2) = 0.',
      'Despeja cada factor igualado a cero: x = −1/3 y x = 2.'
    ]
  },
  {
    id: 'rem-alg-basica-2',
    saber: 'Álgebra',
    habilidad: 'Habilidades básicas',
    title: 'Extracción de factores y reducción de radicales semejantes',
    conceptSummary:
      'Para simplificar radicales cúbicos ∛(A), descompón el radicando en un cubo perfecto (8, 27, 64, 125...) por otro factor. Recuerda: ∛(x³ · y) = x ∛y. Solo pueden sumarse o restarse radicales con igual índice e igual radicando.',
    formulaOrTip: 'Cubos perfectos: 2³ = 8 · 3³ = 27 · 4³ = 64 · 5³ = 125',
    hint: 'Descompón 54 = 27×2, 16 = 8×2 y 250 = 125×2 para expresar los tres términos como múltiplos de ∛2.',
    prompt: 'Al simplificar la expresión 2 ∛(54) − ∛(16) + ∛(250), el resultado es:',
    options: [
      { label: 'a', text: '7 ∛2' },
      { label: 'b', text: '9 ∛2' },
      { label: 'c', text: '5 ∛2' },
      { label: 'd', text: '11 ∛2' }
    ],
    correctAnswer: 'b',
    explanation:
      '1) ∛(54) = ∛(27 · 2) = 3 ∛2 → 2 ∛(54) = 6 ∛2.\n2) ∛(16) = ∛(8 · 2) = 2 ∛2.\n3) ∛(250) = ∛(125 · 2) = 5 ∛2.\nOperando términos semejantes: 6 ∛2 − 2 ∛2 + 5 ∛2 = 9 ∛2.',
    steps: [
      'Descompón cada radicando: 54 = 27×2, 16 = 8×2, 250 = 125×2.',
      'Extrae las raíces cúbicas exactas: ∛27 = 3, ∛8 = 2, ∛125 = 5.',
      'Opera los coeficientes de ∛2: 6 − 2 + 5 = 9 ∛2.'
    ]
  },
  {
    id: 'rem-alg-basica-3',
    saber: 'Álgebra',
    habilidad: 'Habilidades básicas',
    title: 'Ecuaciones fraccionarias homogéneas con potencias',
    conceptSummary:
      'Cuando sumas términos con el mismo denominador, suma únicamente los numeradores y conserva el denominador. Luego simplifica la fracción, multiplica en cruz o despeja la potencia y toma la raíz correspondiente.',
    formulaOrTip: '(x² / a) + (x² / a) = 2x² / a',
    hint: 'Suma las dos fracciones homogéneas de la izquierda: obtendrás 2x² / 18 = x² / 9.',
    prompt: 'Si se cumple (x² / 18) + (x² / 18) = 4, ¿cuál es el valor positivo de x?',
    options: [
      { label: 'a', text: '3' },
      { label: 'b', text: '4' },
      { label: 'c', text: '6' },
      { label: 'd', text: '9' }
    ],
    correctAnswer: 'c',
    explanation:
      'Sumando las fracciones homogéneas: 2x² / 18 = 4 → simplificando: x² / 9 = 4 → multiplicando por 9: x² = 36 → tomando la raíz positiva: x = √36 = 6.',
    steps: [
      'Suma los numeradores manteniendo el denominador 18: 2x² / 18 = 4.',
      'Simplifica 2/18 a 1/9 y multiplica ambos lados por 9: x² = 36.',
      'Extrae la raíz cuadrada positiva: x = 6.'
    ]
  },
  {
    id: 'rem-alg-analisis-1',
    saber: 'Álgebra',
    habilidad: 'Habilidades de análisis',
    title: 'Despeje de variables en ecuaciones con radicales y potencias',
    conceptSummary:
      'Para despejar una variable dentro de una raíz cuadrada: aísla primero el radical en un lado de la igualdad, luego eleva ambos lados al cuadrado para eliminar la raíz y finalmente despeja la incógnita.',
    formulaOrTip: 'Si y = √(k · x), entonces y² = k · x  ⇒  x = y² / k',
    hint: 'Eleva primero al cuadrado ambos miembros de V = √(2gh) para eliminar la raíz cuadrada.',
    prompt:
      'En la ecuación física V = √(2 · g · h), si se desea despejar la altura h en términos de V y g, la expresión correcta es:',
    options: [
      { label: 'a', text: 'h = V² / (2g)' },
      { label: 'b', text: 'h = 2g / V²' },
      { label: 'c', text: 'h = V / (2g)' },
      { label: 'd', text: 'h = (V / 2g)²' }
    ],
    correctAnswer: 'a',
    explanation:
      '1) Elevamos al cuadrado ambos lados: V² = 2gh.\n2) Dividimos ambos lados entre 2g: h = V² / (2g).',
    steps: [
      'Eleva al cuadrado ambos miembros para eliminar el radical: V² = 2gh.',
      'Divide ambos lados entre el factor 2g que multiplica a h.',
      'Obtienes la expresión despejada: h = V² / (2g).'
    ]
  },

  // --- GEOMETRÍA ---
  {
    id: 'rem-geom-especial-1',
    saber: 'Geometría',
    habilidad: 'Habilidades especiales',
    title: 'Visualización espacial y diagonales en el cubo',
    conceptSummary:
      'En un cubo de arista a, la diagonal de cualquier cara mide a√2 (por Pitágoras en 2D), y la diagonal interna que cruza el espacio entre vértices opuestos mide a√3 (por Pitágoras en 3D). Además, cada arista es perpendicular a las dos caras que toca.',
    formulaOrTip: 'Diagonal de cara = a√2 · Diagonal espacial = a√3',
    hint: 'Aplica Pitágoras en tres dimensiones: D = √(a² + a² + a²) con a = 4 cm.',
    prompt:
      'Un cubo tiene aristas de longitud 4 cm. ¿Cuál es la longitud exacta de la diagonal interna que une dos vértices opuestos del cubo?',
    options: [
      { label: 'a', text: '4√2 cm' },
      { label: 'b', text: '4√3 cm' },
      { label: 'c', text: '8 cm' },
      { label: 'd', text: '12 cm' }
    ],
    correctAnswer: 'b',
    explanation:
      'La diagonal espacial de un cubo de arista a se calcula con el teorema de Pitágoras en 3D: D = √(a² + a² + a²) = √(3a²) = a√3. Con a = 4 cm, D = 4√3 cm.',
    steps: [
      'Calcula la diagonal de una cara: d = √(4² + 4²) = 4√2 cm.',
      'Forma el triángulo rectángulo interno con la arista vertical: D² = (4√2)² + 4² = 32 + 16 = 48.',
      'Extrae la raíz cuadrada: D = √48 = 4√3 cm.'
    ]
  },
  {
    id: 'rem-geom-especial-2',
    saber: 'Geometría',
    habilidad: 'Habilidades especiales',
    title: 'Conteo espacial de cubos unitarios y coordenadas 3D',
    conceptSummary:
      'Para hallar el volumen de un sólido compuesto por cubos unitarios (1 cm³), cuenta por capas horizontales (capa inferior + capa superior) o calcula el prisma envolvente total y resta los cubos faltantes. Recuerda que todo cubo superior necesita soporte debajo.',
    formulaOrTip: 'Volumen = (cubos totales del prisma) − (cubos vacíos)',
    hint: 'Un bloque completo de 3 × 2 × 2 tiene 12 cubos. Si faltan 3 cubos en la capa superior, ¿cuántos quedan?',
    prompt:
      'Un sólido se construye con cubos unitarios de 1 cm³: su capa inferior completa un rectángulo de 3 cm × 2 cm y su capa superior tiene exactamente 3 cubos apoyados sobre la base. ¿Cuál es su volumen total?',
    options: [
      { label: 'a', text: '7 cm³' },
      { label: 'b', text: '8 cm³' },
      { label: 'c', text: '9 cm³' },
      { label: 'd', text: '12 cm³' }
    ],
    correctAnswer: 'c',
    explanation:
      'La capa inferior contiene 3 × 2 = 6 cubos unitarios (6 cm³). La capa superior contiene 3 cubos unitarios (3 cm³). Sumando ambas capas: 6 + 3 = 9 cm³.',
    steps: [
      'Calcula los cubos de la capa inferior (base): 3 × 2 = 6 cubos.',
      'Suma los 3 cubos ubicados en la capa superior.',
      'Volumen total = 6 + 3 = 9 cm³.'
    ]
  },
  {
    id: 'rem-geom-razonamiento-1',
    saber: 'Geometría',
    habilidad: 'Procesos de pensamiento y razonamiento',
    title: 'Conteo geométrico de perímetros discretos y vértices',
    conceptSummary:
      'Cuando se colocan objetos a lo largo de los lados de un polígono cerrado (árboles, postes o columnas), los vértices son compartidos por los dos lados contiguos. La fórmula para un polígono de N lados con k objetos por lado (incluyendo vértices) es: Total = N · (k − 1).',
    formulaOrTip: 'Polígono de N lados con k objetos/lado: Total = N · (k − 1)',
    hint: 'Cada lado tiene 6 postes, pero las 4 esquinas pertenecen a dos lados. Resta las 4 esquinas duplicadas a 4 × 6.',
    prompt:
      'En un terreno cuadrado se plantan postes en todo el perímetro, colocando un poste en cada esquina y 6 postes en cada lado. ¿Cuántos postes hay en total?',
    options: [
      { label: 'a', text: '24 postes' },
      { label: 'b', text: '20 postes' },
      { label: 'c', text: '18 postes' },
      { label: 'd', text: '16 postes' }
    ],
    correctAnswer: 'b',
    explanation:
      'El cuadrado tiene 4 lados y 4 esquinas. Cada lado tiene 6 − 2 = 4 postes intermedios. Total = 4 esquinas + 4 × 4 intermedios = 20 postes (o 4 × (6 − 1) = 20).',
    steps: [
      'Identifica que el cuadrado tiene 4 esquinas compartidas entre lados vecinos.',
      'Calcula los postes intermedios por lado: 6 − 2 = 4 postes.',
      'Suma esquinas e intermedios: 4 + (4 × 4) = 20 postes.'
    ]
  },

  // --- TRIGONOMETRÍA ---
  {
    id: 'rem-trig-basica-1',
    saber: 'Trigonometría',
    habilidad: 'Habilidades básicas',
    title: 'Razones trigonométricas en el triángulo rectángulo',
    conceptSummary:
      'En un triángulo rectángulo, respecto a un ángulo agudo α:\n- sen(α) = Cateto Opuesto / Hipotenusa\n- cos(α) = Cateto Adyacente / Hipotenusa\n- tan(α) = Cateto Opuesto / Cateto Adyacente\nSi te falta un cateto, calcúlalo primero con el teorema de Pitágoras.',
    formulaOrTip: 'SOH − CAH − TOA · a² + b² = c²',
    hint: 'Halla primero el cateto adyacente usando √(15² − 9²) y luego divídelo entre la hipotenusa 15.',
    prompt:
      'En un triángulo rectángulo, la hipotenusa mide 15 cm y el cateto opuesto al ángulo α mide 9 cm. ¿Cuál es el valor del coseno de α?',
    options: [
      { label: 'a', text: '3/5' },
      { label: 'b', text: '4/5' },
      { label: 'c', text: '3/4' },
      { label: 'd', text: '4/3' }
    ],
    correctAnswer: 'b',
    explanation:
      '1) Por Pitágoras, el cateto adyacente es √(15² − 9²) = √(225 − 81) = √144 = 12 cm.\n2) cos(α) = Cateto Adyacente / Hipotenusa = 12 / 15 = 4/5.',
    steps: [
      'Calcula el cateto adyacente con Pitágoras: √(15² − 9²) = 12 cm.',
      'Aplica la definición de coseno: cos(α) = 12 / 15.',
      'Simplifica dividiendo numerador y denominador entre 3: 4/5.'
    ]
  },
  {
    id: 'rem-trig-basica-2',
    saber: 'Trigonometría',
    habilidad: 'Habilidades básicas',
    title: 'Ángulos notables y cofunciones de ángulos complementarios',
    conceptSummary:
      'Dos ángulos agudos son complementarios si suman 90°. Por simetría en el triángulo rectángulo, el seno de un ángulo es siempre igual al coseno de su complemento: sen(α) = cos(90° − α).',
    formulaOrTip: 'sen(α) = cos(90° − α) · sen(60°) = cos(30°) = √3/2',
    hint: 'Busca dos ángulos que sumen 90° donde se comparen seno y coseno (o dos funciones cuyo valor notable sea idéntico).',
    prompt: '¿Cuál de las siguientes parejas de razones trigonométricas tiene exactamente el mismo valor numérico?',
    options: [
      { label: 'a', text: 'sen(60°) y cos(30°)' },
      { label: 'b', text: 'sen(60°) y cos(60°)' },
      { label: 'c', text: 'tan(30°) y sen(30°)' },
      { label: 'd', text: 'cos(45°) y tan(45°)' }
    ],
    correctAnswer: 'a',
    explanation:
      'Como 60° + 30° = 90° (ángulos complementarios), sen(60°) = cos(90° − 60°) = cos(30°) = √3 / 2.',
    steps: [
      'Verifica la suma de los ángulos: 60° + 30° = 90°.',
      'Aplica la identidad de cofunciones: sen(60°) = cos(30°).',
      'Confirma sus valores notables: ambos equivalen exactamente a √3 / 2.'
    ]
  },
  {
    id: 'rem-trig-razonamiento-1',
    saber: 'Trigonometría',
    habilidad: 'Procesos de pensamiento y razonamiento',
    title: 'Aplicaciones trigonométricas de altura y distancia',
    conceptSummary:
      'Para resolver problemas de escaleras, cables o sombras, modela el triángulo rectángulo e identifica qué lado conoces respecto al ángulo dado (opuesto o adyacente) y cuál es la incógnita para elegir seno, coseno o tangente.',
    formulaOrTip: 'cos(θ) = Adyacente / Hipotenusa  ⇒  Hipotenusa = Adyacente / cos(θ)',
    hint: 'Conoces el cateto adyacente (8√3 m) y el ángulo (30°). Usa cos(30°) = √3/2 para despejar la hipotenusa L.',
    prompt:
      'Un cable de acero sostiene un poste vertical. El cable forma un ángulo de 30° con el suelo y está anclado a 8√3 metros de la base del poste. ¿Cuál es la longitud del cable?',
    options: [
      { label: 'a', text: '12 metros' },
      { label: 'b', text: '16 metros' },
      { label: 'c', text: '18 metros' },
      { label: 'd', text: '24 metros' }
    ],
    correctAnswer: 'b',
    explanation:
      'El cateto adyacente es 8√3 m y la hipotenusa es L. Usando cos(30°) = √3 / 2:\n√3 / 2 = 8√3 / L → L = (8√3 × 2) / √3 = 16 metros.',
    steps: [
      'Identifica el cateto adyacente (8√3 m) y la hipotenusa incógnita (L).',
      'Plantea cos(30°) = 8√3 / L.',
      'Reemplaza cos(30°) = √3 / 2 y despeja L = 16 metros.'
    ]
  },

  // --- CÁLCULO ---
  {
    id: 'rem-calc-analisis-1',
    saber: 'Cálculo',
    habilidad: 'Habilidades de análisis',
    title: 'Análisis de funciones cuadráticas: vértice, concavidad y raíces',
    conceptSummary:
      'Para f(x) = ax² + bx + c: si a > 0, la parábola abre hacia arriba (mínimo); si a < 0, abre hacia abajo (máximo). La coordenada x del vértice es x_v = −b / (2a), y la coordenada y se obtiene evaluando f(x_v).',
    formulaOrTip: 'Vértice: x_v = −b / (2a) · y_v = f(x_v)',
    hint: 'Con a = −1 y b = 4, calcula primero x_v = −4 / (2 · (−1)) = 2 y luego evalúa f(2).',
    prompt:
      'Para la función f(x) = −x² + 4x − 3, ¿cuáles son las coordenadas de su punto máximo (vértice)?',
    options: [
      { label: 'a', text: '(2, 1)' },
      { label: 'b', text: '(−2, −15)' },
      { label: 'c', text: '(2, −1)' },
      { label: 'd', text: '(4, −3)' }
    ],
    correctAnswer: 'a',
    explanation:
      'Como a = −1 < 0, tiene un máximo en su vértice.\nx_v = −b / (2a) = −4 / (−2) = 2.\nf(2) = −(2)² + 4(2) − 3 = −4 + 8 − 3 = 1.\nEl vértice es (2, 1).',
    steps: [
      'Identifica los coeficientes: a = −1, b = 4, c = −3.',
      'Calcula x_v = −4 / (2 · (−1)) = 2.',
      'Evalúa f(2) = −4 + 8 − 3 = 1 para obtener el vértice (2, 1).'
    ]
  },
  {
    id: 'rem-calc-analisis-2',
    saber: 'Cálculo',
    habilidad: 'Habilidades de análisis',
    title: 'Cálculo y comparación de volúmenes de cilindros',
    conceptSummary:
      'El volumen de un cilindro es V = π · r² · h. Ten cuidado: duplicar el radio multiplica el volumen por 4 (efecto cuadrático), mientras que duplicar la altura solo lo multiplica por 2 (efecto lineal).',
    formulaOrTip: 'Cilindro: V = π · r² · h',
    hint: 'Calcula r² · h para ambos cilindros: 2² × 18 frente a 6² × 2.',
    prompt:
      'Un cilindro A tiene radio r = 2 cm y altura h = 18 cm. Un cilindro B tiene radio r = 6 cm y altura h = 2 cm. ¿Cuál tiene mayor volumen?',
    options: [
      { label: 'a', text: 'El cilindro A es mayor' },
      { label: 'b', text: 'Tienen exactamente el mismo volumen (72π cm³)' },
      { label: 'c', text: 'El cilindro B es el doble del A' },
      { label: 'd', text: 'No se puede determinar sin aproximar π' }
    ],
    correctAnswer: 'b',
    explanation:
      '1) V_A = π · (2)² · 18 = π · 4 · 18 = 72π cm³.\n2) V_B = π · (6)² · 2 = π · 36 · 2 = 72π cm³.\nAmbos cilindros tienen exactamente el mismo volumen: 72π cm³.',
    steps: [
      'Calcula V_A = π × 2² × 18 = 72π cm³.',
      'Calcula V_B = π × 6² × 2 = 72π cm³.',
      'Compara ambos resultados: los volúmenes son idénticos.'
    ]
  },
  {
    id: 'rem-calc-analisis-3',
    saber: 'Cálculo',
    habilidad: 'Habilidades de análisis',
    title: 'Volumen de sólidos compuestos por descomposición o resta',
    conceptSummary:
      'Un sólido escalonado puede medirse de dos formas equivalentes: (1) dividirlo en prismas rectangulares simples y sumar sus volúmenes, o (2) calcular el volumen del prisma envolvente completo y restarle los bloques vacíos recortados.',
    formulaOrTip: 'V_total = V_envolvente − V_recortes = ∑ (largo × ancho × alto)',
    hint: 'Calcula primero el cubo completo 5 × 5 × 5 = 125 cm³ y resta el volumen del recorte 2 × 3 × 5.',
    prompt:
      'De un cubo macizo de 5 cm de arista se recorta completamente una esquina rectangular de 2 cm de largo, 3 cm de ancho y 5 cm de altura. ¿Cuál es el volumen restante del sólido?',
    options: [
      { label: 'a', text: '85 cm³' },
      { label: 'b', text: '95 cm³' },
      { label: 'c', text: '100 cm³' },
      { label: 'd', text: '115 cm³' }
    ],
    correctAnswer: 'b',
    explanation:
      '1) Volumen del cubo original: 5 × 5 × 5 = 125 cm³.\n2) Volumen del prisma recortado: 2 × 3 × 5 = 30 cm³.\n3) Volumen restante: 125 − 30 = 95 cm³.',
    steps: [
      'Calcula el volumen del cubo completo: 5³ = 125 cm³.',
      'Calcula el volumen del bloque recortado: 2 × 3 × 5 = 30 cm³.',
      'Resta el recorte al total: 125 − 30 = 95 cm³.'
    ]
  }
];
