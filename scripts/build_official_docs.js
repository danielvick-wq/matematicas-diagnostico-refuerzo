import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import crypto from 'crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/*
 * Generador de la documentación oficial (DNDA) de Matemáticas Diagnóstico & Refuerzo Adaptativo.
 *   1. Calcula líneas y firma SHA-256 de cada archivo fuente y escribe el Documento N° 4.
 *   2. Convierte cada .md de docs/ en HTML formal con KaTeX y Mermaid.
 *   3. Imprime cada HTML a PDF con Microsoft Edge (modo headless).
 *   4. Convierte cada HTML a DOCX con Microsoft Word mediante VBScript de enlace tardío.
 * Uso: npm run docs
 */
const EDGE_PATH = `"C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"`;
const ROOT_DIR = path.resolve(__dirname, '..');
const DOCS_DIR = path.join(ROOT_DIR, 'docs');

const WORK_NAME = 'Matemáticas Diagnóstico & Refuerzo Adaptativo — Plataforma de Evaluación Diagnóstica y Nivelación de Competencias Matemáticas';
const WORK_NAME_SHORT = 'MATEMÁTICAS DIAGNÓSTICO & REFUERZO ADAPTATIVO';
const AUTHOR = 'DANIEL VICK';
const VERSION = '1.0.0';
const DOC_DATE = '20 de Noviembre de 2026';
const SUBTITLE = 'Registro de Propiedad Intelectual — Matemáticas Diagnóstico & Refuerzo Adaptativo';

const SOURCE_DOC = 'DOCUMENTO_OFICIAL_CODIGO_FUENTE_SOPORTE_LOGICO.md';

const tasks = [
    { base: 'MANUAL_DE_USUARIO', title: 'DOCUMENTO TÉCNICO N° 1: MANUAL DE USUARIO Y GUÍA DE OPERACIÓN PEDAGÓGICA', subtitle: SUBTITLE },
    { base: 'MANUAL_TECNICO', title: 'DOCUMENTO TÉCNICO N° 2: MANUAL TÉCNICO Y ARQUITECTURA DE SOFTWARE', subtitle: SUBTITLE },
    { base: 'DIAGRAMA_DE_CLASES', title: 'DOCUMENTO TÉCNICO N° 3: DIAGRAMA DE CLASES Y MODELO DE COMPONENTES', subtitle: SUBTITLE },
    { base: 'DOCUMENTO_OFICIAL_CODIGO_FUENTE_SOPORTE_LOGICO', title: 'DOCUMENTO TÉCNICO N° 4: EXTRACTO INDEXADO DE CÓDIGO FUENTE', subtitle: null }
].map(t => ({ ...t, md: `${t.base}.md`, html: `${t.base}.html`, pdf: `${t.base}.pdf`, docx: `${t.base}.docx` }));

function escapeHtml(text) {
    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function formatInline(text) {
    let mathTokens = [];
    let cleanText = text.replace(/(\$\$[\s\S]*?\$\$|\$[^\$]+?\$)/g, (match) => {
        mathTokens.push(match);
        return `__MATH_TOKEN_${mathTokens.length - 1}__`;
    });

    let out = escapeHtml(cleanText);
    out = out.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    out = out.replace(/\*(.*?)\*/g, '<em>$1</em>');
    out = out.replace(/`([^`]+)`/g, '<code>$1</code>');

    out = out.replace(/__MATH_TOKEN_(\d+)__/g, (match, idx) => {
        return mathTokens[parseInt(idx, 10)];
    });

    return out;
}

function renderFormalTable(tableLines) {
    if (tableLines.length < 2) return '';
    const headerRow = tableLines[0].split('|').map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1);
    const dataRows = tableLines.slice(2).map(r => r.split('|').map(c => c.trim()).filter((c, idx, arr) => idx > 0 && idx < arr.length - 1));

    let html = '<table><thead><tr>';
    headerRow.forEach(cell => {
        html += `<th>${formatInline(cell)}</th>`;
    });
    html += '</tr></thead><tbody>';

    dataRows.forEach(row => {
        html += '<tr>';
        row.forEach(cell => {
            html += `<td>${formatInline(cell)}</td>`;
        });
        html += '</tr>';
    });

    html += '</tbody></table>';
    return html;
}

function buildFormalHtml(mdContent, documentTitle, documentSubtitle) {
    const lines = mdContent.split(/\r?\n/);
    let htmlLines = [];
    let inCodeBlock = false;
    let codeLanguage = '';
    let codeContent = [];
    let inList = false;

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        if (line.trim().startsWith('```')) {
            if (inCodeBlock) {
                inCodeBlock = false;
                const rawCode = codeContent.join('\n');
                if (codeLanguage === 'mermaid') {
                    htmlLines.push(`<div class="mermaid">\n${escapeHtml(rawCode)}\n</div>`);
                } else {
                    htmlLines.push(`<pre><code class="language-${codeLanguage}">${escapeHtml(rawCode)}</code></pre>`);
                }
                codeContent = [];
                codeLanguage = '';
            } else {
                if (inList) { htmlLines.push('</ul>'); inList = false; }
                inCodeBlock = true;
                codeLanguage = line.trim().replace('```', '').trim();
            }
            continue;
        }

        if (inCodeBlock) {
            codeContent.push(line);
            continue;
        }

        if (line.startsWith('# ')) {
            if (inList) { htmlLines.push('</ul>'); inList = false; }
            htmlLines.push(`<h1>${formatInline(line.substring(2))}</h1>`);
            continue;
        }
        if (line.startsWith('## ')) {
            if (inList) { htmlLines.push('</ul>'); inList = false; }
            htmlLines.push(`<h2>${formatInline(line.substring(3))}</h2>`);
            continue;
        }
        if (line.startsWith('### ')) {
            if (inList) { htmlLines.push('</ul>'); inList = false; }
            htmlLines.push(`<h3>${formatInline(line.substring(4))}</h3>`);
            continue;
        }
        if (line.startsWith('#### ')) {
            if (inList) { htmlLines.push('</ul>'); inList = false; }
            htmlLines.push(`<h4>${formatInline(line.substring(5))}</h4>`);
            continue;
        }

        if (line.trim() === '---') {
            if (inList) { htmlLines.push('</ul>'); inList = false; }
            htmlLines.push('<hr>');
            continue;
        }

        if (line.trim().startsWith('- ') || line.trim().startsWith('* ')) {
            if (!inList) { htmlLines.push('<ul>'); inList = true; }
            let itemText = line.trim().substring(2);
            htmlLines.push(`<li>${formatInline(itemText)}</li>`);
            continue;
        } else if (inList && line.trim() === '') {
            htmlLines.push('</ul>');
            inList = false;
        }

        if (line.trim().startsWith('|')) {
            if (inList) { htmlLines.push('</ul>'); inList = false; }
            let tableLines = [];
            while (i < lines.length && lines[i].trim().startsWith('|')) {
                tableLines.push(lines[i].trim());
                i++;
            }
            i--;
            htmlLines.push(renderFormalTable(tableLines));
            continue;
        }

        if (line.trim() === '') {
            if (inList) { htmlLines.push('</ul>'); inList = false; }
            continue;
        }

        htmlLines.push(`<p>${formatInline(line)}</p>`);
    }

    if (inList) htmlLines.push('</ul>');

    const bodyHtml = htmlLines.join('\n');

    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>${documentTitle}</title>
    <!-- KaTeX CSS & JS -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.css">
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/katex.min.js"></script>
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.21/dist/contrib/auto-render.min.js"></script>
    <!-- Mermaid JS -->
    <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
    <style>
        @page {
            size: A4 portrait;
            margin: 20mm 15mm 20mm 15mm;
            @bottom-center {
                content: counter(page);
                font-family: "Times New Roman", Times, serif;
                font-size: 9pt;
            }
        }

        body {
            font-family: "Times New Roman", Times, serif;
            font-size: 11pt;
            line-height: 1.45;
            color: #111111;
            margin: 0;
            padding: 0;
            background-color: #ffffff;
        }

        /* ESTILOS DE PORTADA FORMAL LEGAL */
        .legal-cover {
            text-align: center;
            padding: 40px 20px 20px 20px;
            page-break-after: always;
            min-height: 88vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
        }
        .legal-institution {
            font-size: 14pt;
            font-weight: bold;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin-bottom: 6px;
        }
        .legal-subinstitution {
            font-size: 10pt;
            text-transform: uppercase;
            margin-bottom: 35px;
            color: #222222;
        }
        .legal-title {
            font-size: 16pt;
            font-weight: bold;
            text-transform: uppercase;
            margin-bottom: 12px;
            line-height: 1.25;
            border-top: 2px solid #000000;
            border-bottom: 2px solid #000000;
            padding: 14px 0;
        }
        .legal-subtitle {
            font-size: 11.5pt;
            font-weight: normal;
            font-style: italic;
            margin-bottom: 40px;
        }
        .legal-box {
            margin: 30px auto;
            width: 90%;
            border: 1px solid #000000;
            padding: 18px 22px;
            text-align: left;
            font-size: 10pt;
            line-height: 1.75;
            background-color: #ffffff;
        }
        .legal-box-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 4px;
        }
        .legal-footer {
            margin-top: 50px;
            font-size: 9.5pt;
            text-transform: uppercase;
        }

        /* ENCABEZADOS Y JERARQUÍA */
        h1 {
            font-size: 14.5pt;
            font-weight: bold;
            text-transform: uppercase;
            border-bottom: 1.5px solid #000000;
            padding-bottom: 4px;
            margin-top: 25px;
            margin-bottom: 12px;
            page-break-before: always;
        }
        h2 {
            font-size: 12.5pt;
            font-weight: bold;
            text-transform: uppercase;
            border-bottom: 1px solid #444444;
            padding-bottom: 3px;
            margin-top: 20px;
            margin-bottom: 10px;
            page-break-after: avoid;
        }
        h3 {
            font-size: 11pt;
            font-weight: bold;
            margin-top: 15px;
            margin-bottom: 6px;
            page-break-after: avoid;
        }
        h4 {
            font-size: 10pt;
            font-weight: bold;
            margin-top: 10px;
            margin-bottom: 4px;
            page-break-after: avoid;
        }
        p {
            margin-bottom: 10px;
            text-indent: 15px;
            text-align: justify;
        }
        ul {
            margin-top: 5px;
            margin-bottom: 12px;
            padding-left: 25px;
        }
        li {
            margin-bottom: 4px;
        }

        /* TABLAS FORMALES LEGALES */
        table {
            width: 100%;
            border-collapse: collapse;
            margin: 16px 0;
            font-size: 9pt;
            page-break-inside: avoid;
        }
        th, td {
            border: 1px solid #000000;
            padding: 6px 8px;
            text-align: left;
            vertical-align: top;
        }
        th {
            background-color: #f0f0f0;
            font-weight: bold;
            text-transform: uppercase;
            font-size: 8.5pt;
        }

        /* CÓDIGO Y BLOQUES */
        pre {
            background-color: #f8f8f8;
            border: 1px solid #444444;
            padding: 10px;
            font-family: "Courier New", Courier, monospace;
            font-size: 8.5pt;
            line-height: 1.25;
            overflow-x: auto;
            white-space: pre-wrap;
            margin: 12px 0;
            page-break-inside: avoid;
        }
        code {
            font-family: "Courier New", Courier, monospace;
            font-size: 9pt;
            background: #f0f0f0;
            padding: 1px 4px;
            border: 1px solid #cccccc;
        }
        hr {
            border: none;
            border-top: 1px solid #000000;
            margin: 20px 0;
        }
        .mermaid {
            background: #ffffff;
            border: 1px solid #000000;
            padding: 12px;
            margin: 15px 0;
            text-align: center;
            page-break-inside: avoid;
        }
        .mermaid svg {
            max-width: 100% !important;
            height: auto !important;
        }
    </style>
</head>
<body>
    <div class="legal-cover">
        <div>
            <div class="legal-institution">REPÚBLICA DE COLOMBIA</div>
            <div class="legal-subinstitution">DIRECCIÓN NACIONAL DE DERECHO DE AUTOR — REGISTRO DE SOPORTE LÓGICO</div>
            <div class="legal-title">${documentTitle}</div>
            <div class="legal-subtitle">${documentSubtitle}</div>
            
            <div class="legal-box">
                <div class="legal-box-row"><strong>DENOMINACIÓN DE LA OBRA:</strong> <span>${WORK_NAME_SHORT}</span></div>
                <div class="legal-box-row"><strong>CLASIFICACIÓN LEGAL:</strong> <span>Soporte Lógico / Programa de Computador</span></div>
                <div class="legal-box-row"><strong>AUTOR Y TITULAR:</strong> <span>${AUTHOR}</span></div>
                <div class="legal-box-row"><strong>VERSIÓN DEL SOFTWARE:</strong> <span>${VERSION}</span></div>
                <div class="legal-box-row"><strong>FECHA DE DOCUMENTACIÓN:</strong> <span>${DOC_DATE}</span></div>
                <div class="legal-box-row"><strong>MARCO REGULATORIO:</strong> <span>Ley 23 de 1982 &amp; Decisión Andina 351</span></div>
            </div>
        </div>

        <div class="legal-footer">
            EXPEDIENTE OFICIAL DE REGISTRO REGISTRAL<br>
            MANIZALES, CALDAS, COLOMBIA
        </div>
    </div>

    ${bodyHtml}

    <script>
        document.addEventListener("DOMContentLoaded", function() {
            if (window.mermaid) {
                mermaid.initialize({ startOnLoad: true, theme: 'neutral' });
            }
            if (window.renderMathInElement) {
                renderMathInElement(document.body, {
                    delimiters: [
                        {left: '$$', right: '$$', display: true},
                        {left: '$', right: '$', display: false}
                    ],
                    throwOnError: false
                });
            }
        });
    </script>
</body>
</html>`;
}

// =====================================================================================
// DOCUMENTO N° 4: ÍNDICE DE CÓDIGO FUENTE CON FIRMAS SHA-256 (generado desde el código real)
// =====================================================================================

const FILE_DESCRIPTIONS = {
    'index.html': 'Documento HTML de entrada, metadatos, fuentes tipográficas (Plus Jakarta Sans, JetBrains Mono) y montaje',
    'vite.config.ts': 'Configuración del empaquetador Vite, integración de Tailwind CSS v4 y resolución de rutas',
    'vercel.json': 'Configuración de enrutamiento y reescritura de URLs para despliegue SPA en la plataforma Vercel',
    'package.json': 'Definición del manifiesto del proyecto, scripts de compilación, dependencias y metadatos',
    'src/main.tsx': 'Punto de entrada de ejecución y montaje de la aplicación React 19 en el contenedor DOM',
    'src/App.tsx': 'Componente raíz: orquestador de pestañas, gestión de respuestas y persistencia reactiva en localStorage',
    'src/types.ts': 'Definición del modelo de datos tipado: saberes, habilidades, preguntas, diagnósticos y nivelación',
    'src/index.css': 'Importación y configuración de directivas globales de Tailwind CSS v4',
    'src/components/Header.tsx': 'Barra superior con navegación por pestañas, contadores de progreso y controles de examen',
    'src/components/TestView.tsx': 'Módulo de presentación del examen: preguntas interactivas, selección de opciones y banderas',
    'src/components/DiagnosticReport.tsx': 'Informe psicométrico: calificación global, semaforización, fortalezas y falencias',
    'src/components/RemediationView.tsx': 'Módulo de nivelación adaptativa: ejercicios guiados focalizados en vacíos conceptuales',
    'src/components/QuestionBankManager.tsx': 'Administrador del banco de preguntas: filtros, creación, eliminación e import/export JSON',
    'src/components/DiagramRenderer.tsx': 'Motor de renderizado procedimental de diagramas matemáticos y esquemas geométricos SVG',
    'src/data/initialQuestions.ts': 'Banco canónico calibrado de 20 preguntas diagnósticas con retroalimentación y pistas',
    'src/data/remediationBank.ts': 'Banco especializado de ejercicios correctivos, síntesis conceptuales y resolución paso a paso',
    'src/utils/diagnosticEngine.ts': 'Motor algorítmico psicométrico: cómputo diagnóstico, umbrales y recomendación adaptativa',
    'src/lib/insforge.ts': 'Cliente de integración para backend y persistencia remota opcional'
};

const SAMPLED_MODULES = [
    {
        file: 'src/utils/diagnosticEngine.ts',
        title: 'MOTOR PSICOMÉTRICO Y RECOMENDACIÓN ADAPTATIVA',
        head: 45, tail: 35,
        reserved: [
            'Cálculo de aciertos marginales por los 5 saberes matemáticos y las 4 habilidades cognitivas.',
            'Lógica de categorización semafórica de desempeño (Dominio Alto, Aceptable, Falencia Crítica).',
            'Generación adaptativa de la matriz de fortalezas pedagógicas y falencias críticas del evaluado.',
            'Filtrado conjuntivo de ejercicios correctivos en función del perfil de debilidades detectadas.'
        ]
    },
    {
        file: 'src/components/DiagramRenderer.tsx',
        title: 'MOTOR DE RENDERIZADO PROCEDIMENTAL DE DIAGRAMAS SVG',
        head: 50, tail: 40,
        reserved: [
            'Proyección isométrica tridimensional axonométrica con transformación de coordenadas 3D a 2D.',
            'Cálculo analítico de raíces y trazado continuo de parábolas cuadráticas con escalado métrico.',
            'Generación combinatoria del Triángulo de Pascal con distribución piramidal centrada.',
            'Modelado geométrico de cuerpos de revolución, cilindros proporcionales y relaciones trigonométricas.'
        ]
    },
    {
        file: 'src/types.ts',
        title: 'MODELO DE DATOS Y CONTRATOS DE TIPOS PSICOMÉTRICOS',
        head: 45, tail: 35,
        reserved: [
            'Definición de las uniones de tipos literales para KnowledgeArea, SkillArea y DifficultyLevel.',
            'Contratos de Question, QuestionOption, DiagnosticResult, SaberDiagnosis y RemediationExercise.'
        ]
    },
    {
        file: 'src/App.tsx',
        title: 'COMPONENTE RAÍZ Y GESTIÓN REACTIVA DE ESTADO',
        head: 45, tail: 40,
        reserved: [
            'Estrategia de inicialización perezosa de estado con lectura sincronizada de Web Storage.',
            'Efectos reactivos (useEffect) para la persistencia automática de preguntas, respuestas y reporte.',
            'Manejadores de eventos de examen, adición de preguntas, importación JSON y reinicio canónico.'
        ]
    }
];

function walk(dir) {
    const out = [];
    if (!fs.existsSync(dir)) return out;
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const full = path.join(dir, entry.name);
        if (entry.isDirectory()) out.push(...walk(full));
        else out.push(full);
    }
    return out;
}

function countLines(text) {
    const lines = text.split(/\r?\n/);
    if (lines.length && lines[lines.length - 1] === '') lines.pop();
    return lines.length;
}

function languageOf(file) {
    if (file.endsWith('.tsx')) return 'React 19 / TSX';
    if (file.endsWith('.ts')) return 'TypeScript';
    if (file.endsWith('.css')) return 'CSS3 / Tailwind';
    if (file.endsWith('.html')) return 'HTML5';
    if (file.endsWith('.json')) return 'JSON';
    return 'Texto';
}

function collectSourceFiles() {
    const files = walk(path.join(ROOT_DIR, 'src'))
        .filter(f => /\.(ts|tsx|css)$/.test(f))
        .map(f => path.relative(ROOT_DIR, f).replace(/\\/g, '/'));
    const extra = ['index.html', 'vite.config.ts', 'vercel.json', 'package.json'].filter(f => fs.existsSync(path.join(ROOT_DIR, f)));
    const order = f => (f === 'index.html' ? 0 : f === 'vite.config.ts' ? 1 : f === 'vercel.json' ? 2 : f === 'package.json' ? 3 : f.startsWith('src/main') ? 4 : f.startsWith('src/App') ? 5 : 6);
    return [...extra, ...files].sort((a, b) => order(a) - order(b) || a.localeCompare(b));
}

function fileInfo(rel) {
    const buf = fs.readFileSync(path.join(ROOT_DIR, rel));
    const text = buf.toString('utf8');
    return {
        rel,
        lines: text.split(/\r?\n/),
        total: countLines(text),
        sha: crypto.createHash('sha256').update(buf).digest('hex').toUpperCase()
    };
}

function fmt(n) {
    return n.toLocaleString('en-US');
}

function buildSourceDocument() {
    const infos = collectSourceFiles().map(fileInfo);
    const totalLines = infos.reduce((a, i) => a + i.total, 0);
    const sampled = new Map(SAMPLED_MODULES.map(m => [m.file, m]));

    const rangeOf = (info) => {
        const m = sampled.get(info.rel);
        if (!m) return null;
        if (info.total <= m.head + m.tail + 10) return { full: true };
        return { full: false, head: m.head, tailStart: info.total - m.tail + 1 };
    };

    const rows = infos.map(info => {
        const r = rangeOf(info);
        const sample = !r ? 'Índice y firma' : r.full ? `Líneas 1–${info.total} (Completo)` : `Líneas 1–${r.head} y ${r.tailStart}–${info.total}`;
        const state = !r ? 'Reservado (Indexado por firma)' : r.full ? 'Registrado Completo' : 'Reservado (Reserva Parcial Intermedia)';
        return `| \`${info.rel}\` | ${FILE_DESCRIPTIONS[info.rel] || 'Archivo fuente del sistema'} | ${languageOf(info.rel)} | ${fmt(info.total)} | ${sample} | \`${info.sha}\` | ${state} |`;
    });

    const md = [];
    md.push('# DOCUMENTO TÉCNICO N° 4: EXTRACTO INDEXADO DE CÓDIGO FUENTE');
    md.push('# MUESTREO REPRESENTATIVO DE CÓDIGO FUENTE PARA REGISTRO DE SOPORTE LÓGICO');
    md.push('');
    md.push('**REPÚBLICA DE COLOMBIA — DIRECCIÓN NACIONAL DE DERECHO DE AUTOR (DNDA)**  ');
    md.push('**SOLICITUD DE REGISTRO DE SOPORTE LÓGICO (PROGRAMA DE COMPUTADOR)**  ');
    md.push(`**DENOMINACIÓN DE LA OBRA:** ${WORK_NAME.toUpperCase()}  `);
    md.push(`**FECHA DE DOCUMENTACIÓN:** ${DOC_DATE.toUpperCase()}  `);
    md.push(`**VERSIÓN DEL SOFTWARE:** ${VERSION}  `);
    md.push(`**TITULARIDAD DE DERECHOS:** ${AUTHOR}  `);
    md.push('');
    md.push('---');
    md.push('');
    md.push('## 1. PRESENTACIÓN FORMAL Y MARCO LEGAL DE PROTECCIÓN');
    md.push('');
    md.push(`El presente documento constituye el **MUESTREO REGISTRAL INDEXADO Y EXTRACTO REPRESENTATIVO DE CÓDIGO FUENTE** del programa de computador denominado **"${WORK_NAME}"**, elaborado conforme a la **Ley 23 de 1982**, la **Decisión Andina 351 de 1993**, el **Decreto 1360 de 1989** y los lineamientos de la **Dirección Nacional de Derecho de Autor (DNDA)** de la República de Colombia.`);
    md.push('');
    md.push('Para cumplir la exigencia de depósito del soporte lógico sin exponer el código completo a copia no autorizada, el expediente se organiza en tres partes:');
    md.push('');
    md.push(`1. **Mapa de Módulos e Indexación Criptográfica (SHA-256):** identificación de los ${infos.length} archivos fuente que componen el sistema, con un total de **${fmt(totalLines)} líneas de código**. Cada archivo se acompaña de su firma SHA-256 calculada sobre el archivo íntegro.`);
    md.push('2. **Muestreo Representativo de Inicio y Cierre:** inclusión de las primeras y últimas líneas de los módulos esenciales, que acreditan la estructura, las dependencias y los contratos de exportación.');
    md.push('3. **Reserva de Código Intermedio:** descripción, sin transcripción, de las rutinas intermedias de los módulos muestreados, protegidas como secreto empresarial.');
    md.push('');
    md.push('---');
    md.push('');
    md.push(`## 2. ÍNDICE GENERAL Y MAPA DE MÓDULOS DEL CÓDIGO FUENTE (${infos.length} ARCHIVOS / ${fmt(totalLines)} LÍNEAS)`);
    md.push('');
    md.push('| Módulo / Archivo Fuente | Rol y Descripción Funcional | Lenguaje / Formato | Total Líneas | Muestreo Depositado | Firma Digital de Autenticidad (SHA-256) | Estado de Reserva |');
    md.push('| :--- | :--- | :--- | :--- | :--- | :--- | :--- |');
    md.push(...rows);
    md.push('');
    md.push('Las firmas se calcularon sobre el contenido exacto de cada archivo en la fecha de documentación. Cualquier cambio posterior en un archivo, incluido el tipo de salto de línea, produce una firma distinta; por eso este documento debe regenerarse (`npm run docs`) con la versión definitiva que se deposite.');
    md.push('');
    md.push('---');
    md.push('');
    md.push('## 3. PROTECCIÓN DEL CÓDIGO EN LA VERSIÓN DISTRIBUIDA');
    md.push('');
    md.push('La versión de producción se genera con Vite, que elimina comentarios, acorta los nombres internos y une todos los módulos en un único archivo JavaScript minificado. El código fuente legible (TypeScript y TSX), cuyas firmas se listan en la sección 2, no se distribuye a los usuarios finales.');
    md.push('');
    md.push('```text');
    md.push('+-----------------------------------------------------------------------------------------------+');
    md.push('|                     CADENA DE CONSTRUCCIÓN DE LA VERSIÓN DISTRIBUIDA                          |');
    md.push('+-----------------------------------------------------------------------------------------------+');
    md.push('| 1. VERIFICACIÓN DE TIPOS   tsc --noEmit  ──►  el código fuente se valida sin emitir JS         |');
    md.push('| 2. EMPAQUETADO             vite build    ──►  un solo bundle JS + CSS en dist/                 |');
    md.push('| 3. MINIFICACIÓN            eliminación de comentarios y espacios, renombrado de símbolos       |');
    md.push('|                            locales y eliminación de código no usado (tree-shaking)             |');
    md.push('| 4. INDEXACIÓN              firma SHA-256 de cada archivo fuente (este documento)               |');
    md.push('+-----------------------------------------------------------------------------------------------+');
    md.push('```');
    md.push('');

    let section = 4;
    for (const m of SAMPLED_MODULES) {
        const info = infos.find(i => i.rel === m.file);
        if (!info) continue;
        const r = rangeOf(info);
        const roman = ['I', 'II', 'III', 'IV', 'V', 'VI'][section - 4];
        md.push('---');
        md.push('');
        md.push(`## ${section}. SECCIÓN ${roman}: MUESTREO DE ${m.title} (\`${m.file}\`)`);
        md.push('');
        if (r.full) {
            md.push(`### ${section}.1 Archivo Completo (Líneas 1 a ${info.total})`);
            md.push('');
            md.push('```typescript');
            md.push(...info.lines.slice(0, info.total));
            md.push('```');
            md.push('');
        } else {
            md.push(`### ${section}.1 Encabezado, Dependencias y Definiciones (Líneas 1 a ${r.head})`);
            md.push('');
            md.push('```typescript');
            md.push(...info.lines.slice(0, r.head));
            md.push('```');
            md.push('');
            md.push(`### ${section}.2 RESERVA LEGAL DE CÓDIGO INTERMEDIO — ${m.title}`);
            md.push('');
            md.push('```typescript');
            md.push('/* =========================================================================================================');
            md.push('   [ RESERVA LEGAL DE CÓDIGO FUENTE CONFORME A LA LEY 23 DE 1982 Y DECISIÓN ANDINA 351 ]');
            md.push('   ---------------------------------------------------------------------------------------------------------');
            md.push(`   Las líneas ${r.head + 1} a ${r.tailStart - 1} del archivo fuente '${m.file}' corresponden a:`);
            m.reserved.forEach(item => md.push(`   - ${item}`));
            md.push('');
            md.push('   Esta sección se encuentra protegida bajo el régimen de Reserva y Secreto Empresarial.');
            md.push(`   La autenticidad completa del archivo fuente (${info.total} líneas) se valida mediante la firma SHA-256:`);
            md.push(`   ${info.sha}`);
            md.push('   ========================================================================================================= */');
            md.push('```');
            md.push('');
            md.push(`### ${section}.3 Cierre del Módulo (Líneas ${r.tailStart} a ${info.total})`);
            md.push('');
            md.push('```typescript');
            md.push(...info.lines.slice(r.tailStart - 1, info.total));
            md.push('```');
            md.push('');
        }
        section++;
    }

    md.push('---');
    md.push('');
    md.push(`## ${section}. DECLARACIÓN JURAMENTADA Y CERTIFICADO DE AUTENTICIDAD`);
    md.push('');
    md.push(`Yo, **${AUTHOR}**, identificado como autor y titular de la obra de software titulada **"${WORK_NAME.toUpperCase()}"**, declaro bajo la gravedad del juramento que:`);
    md.push('');
    md.push('1. El presente documento contiene un muestreo auténtico, veraz y representativo del código fuente de la obra.');
    md.push(`2. Las firmas digitales **SHA-256** de la Tabla General corresponden a los ${infos.length} archivos fuente, con un total de **${fmt(totalLines)} líneas de código**, en la versión ${VERSION} documentada.`);
    md.push('3. Las porciones intermedias reservadas constituyen métodos propios de implementación, protegidos conforme a la legislación nacional e internacional de Derecho de Autor.');
    md.push('');
    md.push(`Para constancia de lo anterior, se expide y firma el presente documento en la ciudad de Manizales, Caldas, República de Colombia, el ${DOC_DATE}.`);
    md.push('');
    md.push('---');
    md.push('');
    md.push(`**${AUTHOR}**  `);
    md.push('Autor y Titular de los Derechos Patrimoniales y Morales  ');
    md.push(WORK_NAME);
    md.push('');

    fs.writeFileSync(path.join(DOCS_DIR, SOURCE_DOC), md.join('\n'), 'utf8');
    return { files: infos.length, lines: totalLines };
}

// =====================================================================================
// CONVERSIÓN A PDF (Edge) Y DOCX (Word VBScript)
// =====================================================================================

function fileUrl(p) {
    return `file:///${path.resolve(p).replace(/\\/g, '/')}`;
}

const WORD_RENDER_SCRIPT = `<script>
document.addEventListener("DOMContentLoaded", async function () {
    if (window.renderMathInElement) {
        renderMathInElement(document.body, { delimiters: [{left: '$$', right: '$$', display: true}, {left: '$', right: '$', display: false}], throwOnError: false });
    }
    if (!window.mermaid) return;
    mermaid.initialize({ startOnLoad: false, theme: 'neutral', htmlLabels: false, flowchart: { htmlLabels: false }, class: { htmlLabels: false } });
    await mermaid.run({ querySelector: '.mermaid' });
    for (const svg of document.querySelectorAll('.mermaid svg')) {
        const box = svg.getBBox();
        const w = Math.ceil(box.width + 20), h = Math.ceil(box.height + 20);
        svg.setAttribute('width', w); svg.setAttribute('height', h);
        svg.setAttribute('viewBox', (box.x - 10) + ' ' + (box.y - 10) + ' ' + w + ' ' + h);
        const img = new Image();
        img.src = 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(svg));
        await img.decode();
        const scale = 2, canvas = document.createElement('canvas');
        canvas.width = w * scale; canvas.height = h * scale;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const out = document.createElement('img');
        out.src = canvas.toDataURL('image/png');
        out.width = Math.min(w, 640);
        svg.replaceWith(out);
    }
});
</script>`;

function convertPdfToDocx(pdfPath, docxPath) {
    const vbs = path.join(DOCS_DIR, '.__pdf_to_docx.vbs');
    try {
        fs.writeFileSync(vbs, [
            'Set w = CreateObject("Word.Application")',
            'w.Visible = False',
            'w.DisplayAlerts = 0',
            'On Error Resume Next',
            'Set d = w.Documents.Open(WScript.Arguments(0), False, True)',
            'If Err.Number = 0 Then',
            '  d.SaveAs2 WScript.Arguments(1), 16',
            '  d.Close False',
            'End If',
            'code = Err.Number',
            'w.Quit',
            'WScript.Quit code'
        ].join('\r\n'), 'utf8');
        execSync(`cscript //nologo "${vbs}" "${path.resolve(pdfPath)}" "${path.resolve(docxPath)}"`, { stdio: 'pipe' });
    } finally {
        fs.rmSync(vbs, { force: true });
    }
}

(async () => {
    console.log('=================================================================');
    console.log('COMPILADOR DOCUMENTAL OFICIAL DNDA — MATEMÁTICAS DIAGNÓSTICO');
    console.log('=================================================================\n');

    fs.mkdirSync(DOCS_DIR, { recursive: true });

    const stats = buildSourceDocument();
    console.log(`Índice de código fuente: ${stats.files} archivos, ${fmt(stats.lines)} líneas.\n`);

    for (const t of tasks) {
        const mdPath = path.join(DOCS_DIR, t.md);
        const htmlPath = path.join(DOCS_DIR, t.html);
        const pdfPath = path.join(DOCS_DIR, t.pdf);
        const docxPath = path.join(DOCS_DIR, t.docx);

        if (!fs.existsSync(mdPath)) {
            console.error(`No se encontró ${mdPath}`);
            continue;
        }
        console.log(`Procesando ${t.md}`);
        const subtitle = t.subtitle || `Registro de Propiedad Intelectual (DNDA) — Soporte Lógico (${fmt(stats.lines)} Líneas)`;
        fs.writeFileSync(htmlPath, buildFormalHtml(fs.readFileSync(mdPath, 'utf8'), t.title, subtitle), 'utf8');
        console.log(`  HTML  ${t.html}`);

        try {
            execSync(`${EDGE_PATH} --headless --disable-gpu --no-pdf-header-footer --run-all-compositor-stages-before-draw --virtual-time-budget=8000 --print-to-pdf="${path.resolve(pdfPath)}" "${fileUrl(htmlPath)}"`, { stdio: 'pipe' });
            console.log(`  PDF   ${t.pdf} (${(fs.statSync(pdfPath).size / 1024).toFixed(1)} KB)`);
        } catch (err) {
            console.error(`  Error al generar ${t.pdf}: ${err.message}`);
        }

        try {
            convertPdfToDocx(pdfPath, docxPath);
            console.log(`  DOCX  ${t.docx} (${(fs.statSync(docxPath).size / 1024).toFixed(1)} KB)\n`);
        } catch (err) {
            console.error(`  Error al generar ${t.docx}: ${err.message}\n`);
        }
    }

    console.log('Documentación generada en docs/');
})();
