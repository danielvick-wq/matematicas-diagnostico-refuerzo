import { Question } from '../types';

export const INITIAL_QUESTIONS: Question[] = [
  {
    id: 'q1',
    number: 1,
    prompt: 'Para la siguiente secuencia indique el número que debe estar en el espacio subrayado:',
    saber: 'Aritmética',
    habilidad: 'Procesos de pensamiento y razonamiento',
    difficulty: 'Básico',
    diagramType: 'pascal',
    options: [
      { label: 'a', text: '2' },
      { label: 'b', text: '3' },
      { label: 'c', text: '4' },
      { label: 'd', text: '6' }
    ],
    correctAnswer: 'd',
    explanation:
      'El arreglo corresponde al Triángulo de Pascal. Cada número interior es la suma de los dos números que están inmediatamente sobre él. En la quinta fila (1, 4, ___, 4, 1), el término central es 3 + 3 = 6.',
    hint: 'Observa la relación entre los elementos de la fila anterior (1, 3, 3, 1) y cómo se forman los elementos de la siguiente fila.'
  },
  {
    id: 'q2',
    number: 2,
    prompt:
      '¿Qué cantidad de árboles existe en el borde de un campo triangular que tiene un árbol en cada vértice y cinco en cada lado?',
    saber: 'Geometría',
    habilidad: 'Procesos de pensamiento y razonamiento',
    difficulty: 'Intermedio',
    diagramType: 'trees_triangle',
    options: [
      { label: 'a', text: '9' },
      { label: 'b', text: '10' },
      { label: 'c', text: '12' },
      { label: 'd', text: '15' }
    ],
    correctAnswer: 'c',
    explanation:
      'Un triángulo tiene 3 vértices y 3 lados. Si hay 5 árboles en cada lado incluyendo los dos vértices extremos, cada lado tiene 5 − 2 = 3 árboles intermedios. El total es: 3 vértices + 3 × 3 intermedios = 12 árboles (o bien: 3 × 5 = 15 menos los 3 vértices contados dos veces = 12).',
    hint: 'Ten cuidado de no contar dos veces los árboles que se encuentran en los tres vértices del triángulo.'
  },
  {
    id: 'q3',
    number: 3,
    prompt: 'El número que falta en el círculo según la secuencia es:',
    saber: 'Aritmética',
    habilidad: 'Procesos de pensamiento y razonamiento',
    difficulty: 'Intermedio',
    diagramType: 'circle_sequence',
    options: [
      { label: 'a', text: '6' },
      { label: 'b', text: '8' },
      { label: 'c', text: '10' },
      { label: 'd', text: '12' }
    ],
    correctAnswer: 'b',
    explanation:
      'La relación entre cada número n del círculo interior y su círculo periférico opuesto es n² − 1: para 8 → 8² − 1 = 63; para 7 → 7² − 1 = 48; para 6 → 6² − 1 = 35; para 5 → 5² − 1 = 24; para 4 → 4² − 1 = 15; por lo tanto, para 3 → 3² − 1 = 8.',
    hint: 'Compara 8 con 63 (8² − 1 = 63) y 7 con 48 (7² − 1 = 48). Aplica el mismo patrón al 3.'
  },
  {
    id: 'q4',
    number: 4,
    prompt:
      'Teniendo en cuenta las figuras geométricas relacionadas a las operaciones, indique el resultado de: Cuadrado × Triángulo × Círculo',
    saber: 'Álgebra',
    habilidad: 'Habilidades básicas',
    difficulty: 'Básico',
    diagramType: 'symbols_equation',
    options: [
      { label: 'a', text: '8' },
      { label: 'b', text: '12' },
      { label: 'c', text: '18' },
      { label: 'd', text: '24' }
    ],
    correctAnswer: 'b',
    explanation:
      '1) Cuadrado + Cuadrado = 8 → Cuadrado = 4.\n2) Cuadrado + Triángulo = 7 → 4 + Triángulo = 7 → Triángulo = 3.\n3) Triángulo − Círculo = 2 → 3 − Círculo = 2 → Círculo = 1.\nPor lo tanto, Cuadrado × Triángulo × Círculo = 4 × 3 × 1 = 12.',
    hint: 'Empieza por la primera ecuación donde sólo aparece una figura desconocida.'
  },
  {
    id: 'q5',
    number: 5,
    prompt:
      'El siguiente diagrama muestra el despliegue de un cubo. Cuando se pliega para formar el cubo, ¿qué borde se une con el borde MN?',
    saber: 'Geometría',
    habilidad: 'Habilidades especiales',
    difficulty: 'Intermedio',
    diagramType: 'cube_net',
    options: [
      { label: 'a', text: 'Borde QR' },
      { label: 'b', text: 'Borde ST' },
      { label: 'c', text: 'Borde MP' },
      { label: 'd', text: 'Borde PQ' }
    ],
    correctAnswer: 'a',
    explanation:
      'Al doblar las caras 90° alrededor de la cara central (base): el borde MP se une con PQ haciendo que el vértice M coincida con Q; al plegar finalmente la tapa superior, el vértice N coincide con R, de modo que el borde MN se une exactamente con el borde QR.',
    hint: 'Dobla primero las 4 caras laterales 90° hacia arriba alrededor de la base central y luego cierra la tapa superior.'
  },
  {
    id: 'q6',
    number: 6,
    prompt: 'Para el sólido mostrado (preguntas 6 y 7), indique las coordenadas del punto P:',
    saber: 'Geometría',
    habilidad: 'Habilidades especiales',
    difficulty: 'Intermedio',
    diagramType: 'solid_3d',
    options: [
      { label: 'a', text: '(3, 4, 2)' },
      { label: 'b', text: '(1, 3, 2)' },
      { label: 'c', text: '(4, 2, 3)' },
      { label: 'd', text: '(4, 3, 2)' }
    ],
    correctAnswer: 'd',
    explanation:
      'Siguiendo los ejes cartesianos (X, Y, Z) desde el origen (0, 0, 0): sobre el eje X la distancia total hasta P es 2.00 + 2.00 = 4.00; sobre el eje Y es 3.00; y en altura Z es 2.00. Por lo tanto, P = (4, 3, 2).',
    hint: 'Suma los segmentos a lo largo del eje X (2.00 + 2.00), luego lee la coordenada Y (3.00) y la altura Z (2.00).'
  },
  {
    id: 'q7',
    number: 7,
    prompt: 'Si cada una de las medidas está en cm, el volumen del sólido mostrado es:',
    saber: 'Cálculo',
    habilidad: 'Habilidades de análisis',
    difficulty: 'Avanzado',
    diagramType: 'solid_3d',
    options: [
      { label: 'a', text: '38 cm³' },
      { label: 'b', text: '42 cm³' },
      { label: 'c', text: '46 cm³' },
      { label: 'd', text: '64 cm³' }
    ],
    correctAnswer: 'b',
    explanation:
      'Descomponiendo el sólido en tres prismas rectangulares según sus cotas:\n1) Bloque posterior izquierdo: 2 × 3 × 4 = 24 cm³.\n2) Bloque posterior derecho: 2 × 1 × 3 = 6 cm³.\n3) Bloque frontal inferior: 2 × 3 × 2 = 12 cm³.\nVolumen total = 24 + 6 + 12 = 42 cm³ (equivalente a restar 22 cm³ de recortes al cubo envolvente de 4 × 4 × 4 = 64 cm³).',
    hint: 'Divide el sólido en tres bloques rectangulares simples y suma sus volúmenes (largo × ancho × alto).'
  },
  {
    id: 'q8',
    number: 8,
    prompt: 'Para la función f(x) = x² − 2x − 3, la gráfica que más se ajusta es:',
    saber: 'Cálculo',
    habilidad: 'Habilidades de análisis',
    difficulty: 'Intermedio',
    diagramType: 'parabola_options',
    options: [
      { label: 'a', text: 'Gráfica a' },
      { label: 'b', text: 'Gráfica b' },
      { label: 'c', text: 'Gráfica c' },
      { label: 'd', text: 'Gráfica d' }
    ],
    correctAnswer: 'd',
    explanation:
      'Para f(x) = x² − 2x − 3:\n1) Como a = 1 > 0, la parábola abre hacia arriba (descarta a y b).\n2) El vértice está en x_v = −b/(2a) = 2/2 = 1 y f(1) = 1 − 2 − 3 = −4 → V(1, −4).\n3) Sus raíces son (x − 3)(x + 1) = 0 → x = −1 y x = 3.\nLa única gráfica que cumple estas propiedades es la Gráfica d.',
    hint: 'Revisa el signo de x² para saber si abre hacia arriba o abajo, y luego verifica en qué valores de x corta al eje horizontal.'
  },
  {
    id: 'q9',
    number: 9,
    prompt: 'Para la siguiente expresión aritmética, indique el resultado:',
    saber: 'Aritmética',
    habilidad: 'Habilidades básicas',
    difficulty: 'Intermedio',
    diagramType: 'fraction_bracket',
    options: [
      { label: 'a', text: '−7' },
      { label: 'b', text: '7' },
      { label: 'c', text: '−7/6' },
      { label: 'd', text: '7/6' }
    ],
    correctAnswer: 'c',
    explanation:
      '1) Paréntesis: 3/8 − 5/24 = 9/24 − 5/24 = 4/24 = 1/6.\n2) Corchetes: −2 + 5/12 − 1/6 = −2 + 5/12 − 2/12 = −2 + 1/4 = −7/4.\n3) Llaves: −3/4 − (−7/4) − 1/6 = 4/4 − 1/6 = 1 − 1/6 = 5/6.\n4) Resultado final: −2 + 5/6 = −12/6 + 5/6 = −7/6.',
    hint: 'Resuelve de adentro hacia afuera: primero los paréntesis (), luego los corchetes [], y finalmente las llaves {}.'
  },
  {
    id: 'q10',
    number: 10,
    prompt: 'El resultado de simplificar la siguiente expresión algebraica es:',
    saber: 'Álgebra',
    habilidad: 'Habilidades básicas',
    difficulty: 'Intermedio',
    diagramType: 'radical_expr',
    options: [
      { label: 'a', text: '2b ∛(3a)' },
      { label: 'b', text: '3ab ∛b' },
      { label: 'c', text: '∛(3ab)' },
      { label: 'd', text: '3ab ∛a' }
    ],
    correctAnswer: 'a',
    explanation:
      'Extrayendo cubos perfectos de cada radical:\n1) a ∛(250b) = a ∛(125 · 2b) = 5a ∛(2b).\n2) ∛(3ab³) = b ∛(3a).\n3) 5 ∛(2a³b) = 5a ∛(2b).\n4) Término original: + 3b ∛(3a).\nReduciendo términos semejantes: (5a − 5a)∛(2b) + (3b − b)∛(3a) = 2b ∛(3a).',
    hint: 'Extrae fuera de las raíces cúbicas los factores como 125 = 5³, b³ y a³.'
  },
  {
    id: 'q11',
    number: 11,
    prompt: 'Para la expresión mostrada, si se tienen los valores T = 2 y m = 1, el valor de k es:',
    saber: 'Álgebra',
    habilidad: 'Habilidades de análisis',
    difficulty: 'Intermedio',
    diagramType: 'formula_k',
    options: [
      { label: 'a', text: 'π' },
      { label: 'b', text: '4π' },
      { label: 'c', text: 'π²' },
      { label: 'd', text: '4π²' }
    ],
    correctAnswer: 'c',
    explanation:
      'Sustituyendo T = 2 y m = 1: 2 = 2π √(1/k). Dividiendo entre 2 ambos miembros: 1 = π / √k → √k = π. Elevando al cuadrado ambos lados: k = π².',
    hint: 'Divide primero entre 2 ambos lados de la igualdad y despeja √k antes de elevar al cuadrado.'
  },
  {
    id: 'q12',
    number: 12,
    prompt:
      'Para el triángulo abc que se describe en la figura sobre un cubo de arista = 1, indique su área:',
    saber: 'Geometría',
    habilidad: 'Habilidades especiales',
    difficulty: 'Avanzado',
    diagramType: 'cube_triangle',
    options: [
      { label: 'a', text: '1/2' },
      { label: 'b', text: '2' },
      { label: 'c', text: '√2' },
      { label: 'd', text: '√2 / 2' }
    ],
    correctAnswer: 'd',
    explanation:
      'En el cubo de arista 1, el lado bc es una arista de longitud 1 y el lado ab es la diagonal de la cara lateral izquierda, con longitud √(1² + 1²) = √2. Como la arista bc es perpendicular a la cara lateral izquierda, el triángulo abc es rectángulo en b. Su área es: (base × altura) / 2 = (1 × √2) / 2 = √2 / 2.',
    hint: 'Observa que el segmento ab es la diagonal de la cara izquierda (√2) y es perpendicular a la arista bc (1).'
  },
  {
    id: 'q13',
    number: 13,
    prompt:
      'Para los cilindros mostrados en la figura (A: r = 4m, h = 5m; B: r = 3m, h = 10m; C: r = 2m, h = 15m), ordene de mayor a menor según su volumen:',
    saber: 'Cálculo',
    habilidad: 'Habilidades de análisis',
    difficulty: 'Intermedio',
    diagramType: 'cylinder_volumes',
    options: [
      { label: 'a', text: 'A, B, C' },
      { label: 'b', text: 'C, B, A' },
      { label: 'c', text: 'B, A, C' },
      { label: 'd', text: 'A, C, B' }
    ],
    correctAnswer: 'c',
    explanation:
      'Usando V = π · r² · h:\n- Cilindro A: π × 4² × 5 = 80π m³.\n- Cilindro B: π × 3² × 10 = 90π m³.\n- Cilindro C: π × 2² × 15 = 60π m³.\nOrdenando de mayor a menor volumen: 90π (B) > 80π (A) > 60π (C) → B, A, C.',
    hint: 'Calcula el volumen de cada cilindro con V = π · r² · h y compara los coeficientes de π.'
  },
  {
    id: 'q14',
    number: 14,
    prompt: '¿Para qué valores de X la ecuación mostrada tiene un valor de Y = 0?',
    saber: 'Álgebra',
    habilidad: 'Habilidades básicas',
    difficulty: 'Básico',
    diagramType: 'quad_roots',
    options: [
      { label: 'a', text: '(−5/2, 1)' },
      { label: 'b', text: '(−5/2, −1)' },
      { label: 'c', text: '(−5/2, 3/2)' },
      { label: 'd', text: '(−5/2, −3/2)' }
    ],
    correctAnswer: 'a',
    explanation:
      'Igualando a cero: 2X² + 3X − 5 = 0. Factorizando: (2X + 5)(X − 1) = 0.\n1) 2X + 5 = 0 → X = −5/2.\n2) X − 1 = 0 → X = 1.\nLas soluciones son (−5/2, 1).',
    hint: 'Factoriza por aspa simple o aplica la fórmula cuadrática X = (−b ± √(b² − 4ac)) / (2a).'
  },
  {
    id: 'q15',
    number: 15,
    prompt: 'Para la siguiente secuencia numérica, el siguiente valor que corresponde es:',
    saber: 'Aritmética',
    habilidad: 'Procesos de pensamiento y razonamiento',
    difficulty: 'Básico',
    diagramType: 'fibonacci_seq',
    options: [
      { label: 'a', text: '17' },
      { label: 'b', text: '19' },
      { label: 'c', text: '21' },
      { label: 'd', text: '23' }
    ],
    correctAnswer: 'c',
    explanation:
      'Corresponde a la Sucesión de Fibonacci, donde cada término a partir del tercero es la suma de los dos anteriores: 0+1=1, 1+1=2, 1+2=3, 2+3=5, 3+5=8, 5+8=13. El siguiente término es 8 + 13 = 21.',
    hint: 'Suma los dos últimos números de la serie para obtener el término siguiente.'
  },
  {
    id: 'q16',
    number: 16,
    prompt:
      'Se tiene un triángulo rectángulo con vértices ABC. Para el ángulo θ, la gráfica que relaciona los datos para el cálculo directo del sin θ es:',
    saber: 'Trigonometría',
    habilidad: 'Habilidades básicas',
    difficulty: 'Intermedio',
    diagramType: 'trig_diagram_options',
    options: [
      { label: 'a', text: 'Gráfica a' },
      { label: 'b', text: 'Gráfica b' },
      { label: 'c', text: 'Gráfica c' },
      { label: 'd', text: 'Gráfica d' }
    ],
    correctAnswer: 'a',
    explanation:
      'Por definición trigonométrica, sin(θ) = Cateto Opuesto / Hipotenusa. En la Gráfica a, respecto al ángulo θ ubicado en el vértice B, los datos suministrados son exactamente el cateto opuesto AC = 8 y la hipotenusa AB = 10, permitiendo el cálculo directo sin(θ) = 8/10.',
    hint: 'Identifica cuál de las cuatro gráficas proporciona directamente el cateto opuesto al ángulo θ y la hipotenusa.'
  },
  {
    id: 'q17',
    number: 17,
    prompt: 'Indique el conjunto de ángulos que tienen la misma relación trigonométrica:',
    saber: 'Trigonometría',
    habilidad: 'Habilidades básicas',
    difficulty: 'Básico',
    diagramType: 'trig_notable_angles',
    options: [
      { label: 'a', text: 'Sen 45° y tan 45°' },
      { label: 'b', text: 'Sen 30° y cos 60°' },
      { label: 'c', text: 'Cos 30° y tan 45°' },
      { label: 'd', text: 'Tan 60° y sen 45°' }
    ],
    correctAnswer: 'b',
    explanation:
      'Por la propiedad de cofunciones de ángulos complementarios (α + β = 90°), sen(α) = cos(90° − α). Para 30° y 60°: sen(30°) = cos(60°) = 1/2 = 0.5.',
    hint: 'Recuerda los valores notables: sen(30°) = 1/2, cos(60°) = 1/2, tan(45°) = 1, sen(45°) = √2/2.'
  },
  {
    id: 'q18',
    number: 18,
    prompt:
      'Una escalera está apoyada contra una pared vertical. Si el ángulo con el suelo es θ = 60° y la distancia de la base a la pared es X = 3 m, el valor de la longitud L de la escalera es:',
    saber: 'Trigonometría',
    habilidad: 'Procesos de pensamiento y razonamiento',
    difficulty: 'Intermedio',
    diagramType: 'ladder_trig',
    options: [
      { label: 'a', text: '4 m' },
      { label: 'b', text: '5 m' },
      { label: 'c', text: '6 m' },
      { label: 'd', text: '7 m' }
    ],
    correctAnswer: 'c',
    explanation:
      'En el triángulo rectángulo formado por el suelo, la pared y la escalera, X = 3 m es el cateto adyacente al ángulo θ = 60° y L es la hipotenusa. Usando cos(θ) = Adyacente / Hipotenusa:\ncos(60°) = 3 / L → 0.5 = 3 / L → L = 3 / 0.5 = 6 m.',
    hint: 'Aplica la razón trigonométrica coseno: cos(θ) = cateto adyacente / hipotenusa.'
  },
  {
    id: 'q19',
    number: 19,
    prompt:
      'En el sólido que muestra la figura cada división corresponde a 1 cm. El volumen de este sólido corresponde a:',
    saber: 'Geometría',
    habilidad: 'Habilidades especiales',
    difficulty: 'Intermedio',
    diagramType: 'isometric_blocks',
    options: [
      { label: 'a', text: '6 cm³' },
      { label: 'b', text: '7 cm³' },
      { label: 'c', text: '8 cm³' },
      { label: 'd', text: '9 cm³' }
    ],
    correctAnswer: 'b',
    explanation:
      'El sólido está formado por cubos unitarios de 1 cm × 1 cm × 1 cm (1 cm³ cada uno). La capa inferior completa un cuadrado de 2 × 2 = 4 cubos y la capa superior tiene 3 cubos (un cubo de 2 × 2 × 2 = 8 cm³ al que le falta 1 esquina superior). Total: 4 + 3 = 7 cm³.',
    hint: 'Cuenta ordenadamente los cubos unitarios por capas (nivel inferior y nivel superior) o resta la esquina faltante al cubo 2 × 2 × 2.'
  },
  {
    id: 'q20',
    number: 20,
    prompt: 'Para la expresión mostrada, el valor positivo de l corresponde a:',
    saber: 'Álgebra',
    habilidad: 'Habilidades básicas',
    difficulty: 'Básico',
    diagramType: 'fraction_equation',
    options: [
      { label: 'a', text: '2' },
      { label: 'b', text: '3' },
      { label: 'c', text: '12' },
      { label: 'd', text: '24' }
    ],
    correctAnswer: 'a',
    explanation:
      'Sumando las fracciones homogéneas: (l² + l²) / 24 = 2l² / 24 = l² / 12. Igualando a 1/3: l² / 12 = 1/3 → l² = 12 / 3 = 4. Tomando la raíz positiva: l = √4 = 2.',
    hint: 'Suma primero las dos fracciones del lado izquierdo ya que tienen el mismo denominador 24.'
  }
];
