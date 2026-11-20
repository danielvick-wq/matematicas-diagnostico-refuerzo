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
    'Habilidades de análisis': { total: 0, correct: 0 }
  };

  questions.forEach(q => {
    const userChoice = answers[q.id];
    const isCorrect = userChoice === q.correctAnswer;

    if (isCorrect) {
      totalCorrect++;
    }

    if (saberMap[q.saber]) {
      saberMap[q.saber].total++;
      if (isCorrect) saberMap[q.saber].correct++;
    }

    if (skillMap[q.habilidad]) {
      skillMap[q.habilidad].total++;
      if (isCorrect) skillMap[q.habilidad].correct++;
    }
  });

  const totalPercentage = totalQuestions > 0 ? Math.round((totalCorrect / totalQuestions) * 100) : 0;

  // Breakdown by Saber
  const saberBreakdown: SaberDiagnosis[] = ALL_SABERES.map(saber => {
    const data = saberMap[saber];
    const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
    let status: 'Dominio Alto' | 'Aceptable' | 'Falencia Crítica' = 'Falencia Crítica';
    let feedback = '';

    if (pct >= 75) {
      status = 'Dominio Alto';
      feedback = `Excelente solvencia conceptual y operativa en ${saber}.`;
    } else if (pct >= 50) {
      status = 'Aceptable';
      feedback = `Comprensión intermedia en ${saber}, con margen de mejora en problemas de mayor nivel.`;
    } else {
      status = 'Falencia Crítica';
      feedback = `Se detecta una deficiencia prioritaria en ${saber}; requiere nivelación conceptual y ejercicios guiados.`;
    }

    return {
      saber,
      total: data.total,
      correct: data.correct,
      percentage: pct,
      status,
      feedback
    };
  });

  // Breakdown by Skill
  const skillBreakdown: SkillDiagnosis[] = ALL_SKILLS.map(habilidad => {
    const data = skillMap[habilidad];
    const pct = data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0;
    let status: 'Dominio Alto' | 'Aceptable' | 'Falencia Crítica' = 'Falencia Crítica';
    let feedback = '';

    if (pct >= 75) {
      status = 'Dominio Alto';
      feedback = `Capacidad destacada para aplicar ${habilidad.toLowerCase()}.`;
    } else if (pct >= 50) {
      status = 'Aceptable';
      feedback = `Rendimiento moderado en ${habilidad.toLowerCase()}; se sugiere profundizar el rigor deductivo.`;
    } else {
      status = 'Falencia Crítica';
      feedback = `Dificultad en ${habilidad.toLowerCase()}; requiere entrenamiento paso a paso y estrategias de visualización.`;
    }

    return {
      habilidad,
      total: data.total,
      correct: data.correct,
      percentage: pct,
      status,
      feedback
    };
  });

  // Strengths and Deficiencies
  const fortalezas: string[] = [];
  const falencias: string[] = [];

  saberBreakdown.forEach(s => {
    if (s.status === 'Dominio Alto') {
      fortalezas.push(`Conocimiento en ${s.saber} (${s.correct}/${s.total} aciertos - ${s.percentage}%)`);
    } else if (s.status === 'Falencia Crítica' && s.total > 0) {
      falencias.push(`Deficiencia en ${s.saber} (${s.correct}/${s.total} aciertos - ${s.percentage}%)`);
    }
  });

  skillBreakdown.forEach(sk => {
    if (sk.status === 'Dominio Alto') {
      fortalezas.push(`Habilidad: ${sk.habilidad} (${sk.correct}/${sk.total} aciertos - ${sk.percentage}%)`);
    } else if (sk.status === 'Falencia Crítica' && sk.total > 0) {
      falencias.push(`Falencia en ${sk.habilidad} (${sk.correct}/${sk.total} aciertos - ${sk.percentage}%)`);
    }
  });

  // Fallback defaults if high or low
  if (fortalezas.length === 0) {
    const bestSaber = [...saberBreakdown].sort((a, b) => b.percentage - a.percentage)[0];
    if (bestSaber && bestSaber.percentage > 0) {
      fortalezas.push(`Mejor desempeño relativo en ${bestSaber.saber} (${bestSaber.percentage}%)`);
    } else {
      fortalezas.push('Disposición al aprendizaje y determinación para iniciar el plan de refuerzo.');
    }
  }

  if (falencias.length === 0) {
    falencias.push('Sin falencias críticas detectadas. Puedes continuar con desafíos avanzados para consolidar maestría.');
  }

  // Overall assessment level
  let overallLevel: 'Sobresaliente' | 'Competente' | 'Requiere Refuerzo' | 'Alerta Pedagógica' = 'Requiere Refuerzo';
  if (totalPercentage >= 85) {
    overallLevel = 'Sobresaliente';
  } else if (totalPercentage >= 65) {
    overallLevel = 'Competente';
  } else if (totalPercentage >= 40) {
    overallLevel = 'Requiere Refuerzo';
  } else {
    overallLevel = 'Alerta Pedagógica';
  }

  return {
    totalQuestions,
    totalCorrect,
    totalPercentage,
    overallLevel,
    saberBreakdown,
    skillBreakdown,
    fortalezas,
    falencias,
    completedAt: new Date().toISOString(),
    answers
  };
}

export function getRecommendedRemediations(
  diagnostic: DiagnosticResult
): RemediationExercise[] {
  const saberScoreMap = new Map<KnowledgeArea, number>();
  diagnostic.saberBreakdown.forEach(s => {
    if (s.total > 0) saberScoreMap.set(s.saber, s.percentage);
  });

  const skillScoreMap = new Map<SkillArea, number>();
  diagnostic.skillBreakdown.forEach(sk => {
    if (sk.total > 0) skillScoreMap.set(sk.habilidad, sk.percentage);
  });

  const weakSaberes = new Set(
    diagnostic.saberBreakdown
      .filter(s => s.percentage < 75 && s.total > 0)
      .map(s => s.saber)
  );

  const weakSkills = new Set(
    diagnostic.skillBreakdown
      .filter(sk => sk.percentage < 75 && sk.total > 0)
      .map(sk => sk.habilidad)
  );

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
