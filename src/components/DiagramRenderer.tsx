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
  vy: [number, number] = [28, 12],
  vz: [number, number] = [0, -30]
): [number, number] {
  return [
    ox + x * vx[0] + y * vy[0] + z * vz[0],
    oy + x * vx[1] + y * vy[1] + z * vz[1]
  ];
}

function polyStr(points: [number, number][]): string {
  return points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' ');
}

/**
 * Reusable textbook stacked fraction for math expressions.
 */
const Frac: React.FC<{ num: React.ReactNode; den: React.ReactNode; size?: 'md' | 'lg' }> = ({
  num,
  den,
  size = 'md'
}) => (
  <span
    className={`inline-flex flex-col items-center align-middle mx-0.5 leading-none ${
      size === 'lg' ? 'text-base sm:text-lg' : 'text-sm sm:text-base'
    }`}
  >
    <span className="px-1 pb-0.5 border-b border-slate-800">{num}</span>
    <span className="px-1 pt-0.5">{den}</span>
  </span>
);

/**
 * Reusable textbook cube/square radical with overbar vinculum.
 */
const Radical: React.FC<{ index?: number; children: React.ReactNode }> = ({ index, children }) => (
  <span className="inline-flex items-stretch align-middle mx-0.5">
    <span className="relative inline-flex items-end pr-0.5 select-none">
      {index && (
        <span className="text-[10px] font-bold leading-none absolute -top-0.5 left-0 text-slate-800">
          {index}
        </span>
      )}
      <span className="text-xl sm:text-2xl leading-none font-normal text-slate-800 ml-1">√</span>
    </span>
    <span className="border-t-[1.5px] border-slate-800 px-1 pt-0.5 leading-tight inline-flex items-center">
      {children}
    </span>
  </span>
);

export const DiagramRenderer: React.FC<DiagramRendererProps> = ({
  diagramType,
  className = '',
  showSolution = false
}) => {
  if (!diagramType) return null;

  switch (diagramType) {
    /* ---------------------------------------------------------------------- */
    /* Q1: Triángulo de Pascal                                                */
    /* ---------------------------------------------------------------------- */
    case 'pascal': {
      const rows = [
        ['1'],
        ['1', '1'],
        ['1', '2', '1'],
        ['1', '3', '3', '1'],
        ['1', '4', '___', '4', '1']
      ];
      return (
        <div
          className={`p-5 sm:p-6 bg-slate-50/80 border border-slate-200 rounded-xl flex flex-col items-center justify-center ${className}`}
        >
          <div className="text-xs font-medium text-slate-500 mb-3">
            Secuencia numérica
          </div>
          <div className="bg-white border border-slate-200 rounded-lg px-8 py-5 shadow-2xs font-mono">
            <div className="space-y-2.5 flex flex-col items-center">
              {rows.map((row, rIdx) => (
                <div key={rIdx} className="flex items-center justify-center gap-6 sm:gap-8">
                  {row.map((val, cIdx) =>
                    val === '___' ? (
                      <span
                        key={cIdx}
                        className={`w-10 text-center font-bold text-lg sm:text-xl border-b-2 pb-0.5 ${
                          showSolution
                            ? 'border-emerald-600 text-emerald-700 bg-emerald-50 rounded-xs'
                            : 'border-slate-900 text-sky-700 bg-sky-50/70 rounded-xs'
                        }`}
                      >
                        {showSolution ? '6' : '\u00A0'}
                      </span>
                    ) : (
                      <span
                        key={cIdx}
                        className="w-6 text-center text-base sm:text-lg font-semibold text-slate-900 tabular-nums"
                      >
                        {val}
                      </span>
                    )
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

    /* ---------------------------------------------------------------------- */
    /* Q2: Campo triangular con árboles                                       */
    /* ---------------------------------------------------------------------- */
    case 'trees_triangle': {
      const vertices: [number, number][] = [
        [160, 32],
        [46, 198],
        [274, 198]
      ];
      const sideIntermediates = (p1: [number, number], p2: [number, number]) =>
        [1, 2, 3].map(
          (k) =>
            [
              p1[0] + ((p2[0] - p1[0]) * k) / 4,
              p1[1] + ((p2[1] - p1[1]) * k) / 4
            ] as [number, number]
        );

      const intermediates = [
        ...sideIntermediates(vertices[0], vertices[1]),
        ...sideIntermediates(vertices[1], vertices[2]),
        ...sideIntermediates(vertices[2], vertices[0])
      ];

      // Stylized tree marker for vertices
      const TreePin: React.FC<{ x: number; y: number; color?: string }> = ({
        x,
        y,
        color = '#15803d'
      }) => (
        <g transform={`translate(${x}, ${y})`}>
          <circle cx="0" cy="0" r="8.5" fill={color} stroke="#ffffff" strokeWidth="2" />
          <circle cx="0" cy="0" r="3" fill="#ffffff" fillOpacity="0.85" />
        </g>
      );

      return (
        <div
          className={`p-4 sm:p-5 bg-slate-50/80 border border-slate-200 rounded-xl flex flex-col items-center ${className}`}
        >
          <div className="text-xs font-medium text-slate-500 mb-2">
            {showSolution
              ? 'Verificación geométrica — 3 vértices + 9 árboles intermedios = 12 árboles'
              : 'Esquema del campo triangular (un árbol en cada vértice y 5 en cada lado)'}
          </div>
          <svg viewBox="0 0 320 236" className="w-full max-w-xs h-auto">
            {/* Triangular field */}
            <polygon
              points="160,32 46,198 274,198"
              fill="#ecfdf5"
              stroke="#059669"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />

            {showSolution ? (
              <>
                {/* Show all 9 intermediate trees explicitly ONLY in solution mode */}
                {intermediates.map(([x, y], i) => (
                  <circle
                    key={`int-${i}`}
                    cx={x}
                    cy={y}
                    r="5.5"
                    fill="#10b981"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                ))}
                {vertices.map(([x, y], i) => (
                  <TreePin key={`v-${i}`} x={x} y={y} color="#d97706" />
                ))}
                <text x="160" y="17" fill="#b45309" fontSize="11" fontWeight="700" textAnchor="middle">
                  Vértice compartido
                </text>
                <text x="160" y="132" fill="#065f46" fontSize="12" fontWeight="700" textAnchor="middle">
                  5 árboles por lado
                </text>
                <text x="160" y="149" fill="#475569" fontSize="10.5" fontWeight="600" textAnchor="middle">
                  3 vértices + 3 × 3 = 12 árboles
                </text>
              </>
            ) : (
              <>
                {/* In test mode: highlight vertex trees and side condition without spoiling count */}
                {vertices.map(([x, y], i) => (
                  <TreePin key={`v-${i}`} x={x} y={y} color="#059669" />
                ))}
                {/* Side dimension labels */}
                <text
                  x="84"
                  y="108"
                  fill="#065f46"
                  fontSize="10.5"
                  fontWeight="700"
                  textAnchor="middle"
                  transform="rotate(-55.5 84 108)"
                >
                  5 árboles en este lado
                </text>
                <text
                  x="236"
                  y="108"
                  fill="#065f46"
                  fontSize="10.5"
                  fontWeight="700"
                  textAnchor="middle"
                  transform="rotate(55.5 236 108)"
                >
                  5 árboles en este lado
                </text>
                <text x="160" y="219" fill="#065f46" fontSize="10.5" fontWeight="700" textAnchor="middle">
                  5 árboles en este lado
                </text>

                {/* Vertex caption */}
                <text x="160" y="16" fill="#047857" fontSize="10.5" fontWeight="700" textAnchor="middle">
                  Árbol en vértice
                </text>
                <text x="160" y="136" fill="#334155" fontSize="11.5" fontWeight="600" textAnchor="middle">
                  Campo triangular
                </text>
                <text x="160" y="152" fill="#64748b" fontSize="10" textAnchor="middle">
                  ¿Total de árboles en el borde?
                </text>
              </>
            )}
          </svg>
        </div>
      );
    }

    /* ---------------------------------------------------------------------- */
    /* Q3: Secuencia en círculo dentro de cuadrado rojo (exact radial math)   */
    /* ---------------------------------------------------------------------- */
    case 'circle_sequence': {
      const cx = 160;
      const cy = 160;
      const rInner = 62;
      const rNum = 43;
      const rOuter = 104;

      // 8 evenly spaced positions every 45° around the central circle:
      // Counter-clockwise 1..8 starting from Top (12:00 = -90°):
      // 1 (-90°), 2 (-135°), 3 (180°), 4 (135°), 5 (90°), 6 (45°), 7 (0°), 8 (-45°)
      // Outer circles correspond radially to n^2 - 1:
      // 8 -> 63, 7 -> 48, 6 -> 35, 5 -> 24, 4 -> 15, 3 -> ?
      const items: {
        num: number;
        angleDeg: number;
        outer?: string;
        isTarget?: boolean;
      }[] = [
        { num: 1, angleDeg: -90 },
        { num: 8, angleDeg: -45, outer: '63' },
        { num: 7, angleDeg: 0, outer: '48' },
        { num: 6, angleDeg: 45, outer: '35' },
        { num: 5, angleDeg: 90, outer: '24' },
        { num: 4, angleDeg: 135, outer: '15' },
        { num: 3, angleDeg: 180, outer: showSolution ? '8' : '?', isTarget: true },
        { num: 2, angleDeg: -135 }
      ];

      return (
        <div
          className={`p-4 sm:p-5 bg-slate-50/80 border border-slate-200 rounded-xl flex flex-col items-center ${className}`}
        >
          <div className="text-xs font-medium text-slate-500 mb-3">
            Relación radial de la secuencia numérica
          </div>
          <svg viewBox="0 0 320 320" className="w-full max-w-[300px] h-auto">
            {/* Outer red square border matching reference PDF */}
            <rect
              x="16"
              y="16"
              width="288"
              height="288"
              rx="4"
              fill="#ffffff"
              stroke="#dc2626"
              strokeWidth="3"
            />

            {/* Subtle radial connector lines between inner circle and outer circles */}
            {items
              .filter((it) => it.outer !== undefined)
              .map((it) => {
                const rad = (it.angleDeg * Math.PI) / 180;
                const x1 = cx + Math.cos(rad) * rInner;
                const y1 = cy + Math.sin(rad) * rInner;
                const x2 = cx + Math.cos(rad) * (rOuter - 20);
                const y2 = cy + Math.sin(rad) * (rOuter - 20);
                return (
                  <line
                    key={`ray-${it.num}`}
                    x1={x1}
                    y1={y1}
                    x2={x2}
                    y2={y2}
                    stroke={it.isTarget ? '#0284c7' : '#94a3b8'}
                    strokeWidth={it.isTarget ? '1.8' : '1.2'}
                    strokeDasharray={it.isTarget ? '3,3' : undefined}
                  />
                );
              })}

            {/* Central green circle */}
            <circle
              cx={cx}
              cy={cy}
              r={rInner}
              fill="#dcfce7"
              stroke="#16a34a"
              strokeWidth="2.5"
            />

            {/* Subtle 8-sector dividers inside central circle */}
            {[22.5, 67.5, 112.5, 157.5].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              return (
                <line
                  key={`div-${deg}`}
                  x1={cx - Math.cos(rad) * rInner}
                  y1={cy - Math.sin(rad) * rInner}
                  x2={cx + Math.cos(rad) * rInner}
                  y2={cy + Math.sin(rad) * rInner}
                  stroke="#86efac"
                  strokeWidth="1"
                />
              );
            })}

            {/* Inner numbers 1..8 and outer paired circles */}
            {items.map((it) => {
              const rad = (it.angleDeg * Math.PI) / 180;
              const nx = cx + Math.cos(rad) * rNum;
              const ny = cy + Math.sin(rad) * rNum;
              const ox = cx + Math.cos(rad) * rOuter;
              const oy = cy + Math.sin(rad) * rOuter;

              return (
                <g key={`item-${it.num}`}>
                  <text
                    x={nx}
                    y={ny + 5.5}
                    fill="#0f172a"
                    fontSize="16"
                    fontWeight="700"
                    textAnchor="middle"
                    className="font-mono"
                  >
                    {it.num}
                  </text>

                  {it.outer !== undefined && (
                    <g>
                      <circle
                        cx={ox}
                        cy={oy}
                        r="20"
                        fill={
                          it.isTarget
                            ? showSolution
                              ? '#dcfce7'
                              : '#e0f2fe'
                            : '#f8fafc'
                        }
                        stroke={
                          it.isTarget
                            ? showSolution
                              ? '#059669'
                              : '#0284c7'
                            : '#334155'
                        }
                        strokeWidth={it.isTarget ? '2.5' : '1.8'}
                        strokeDasharray={it.isTarget && !showSolution ? '4,3' : undefined}
                      />
                      <text
                        x={ox}
                        y={oy + 5.5}
                        fill={
                          it.isTarget
                            ? showSolution
                              ? '#065f46'
                              : '#0369a1'
                            : '#0f172a'
                        }
                        fontSize={it.isTarget && !showSolution ? '18' : '14.5'}
                        fontWeight="700"
                        textAnchor="middle"
                        className="font-mono"
                      >
                        {it.outer}
                      </text>
                    </g>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      );
    }

    /* ---------------------------------------------------------------------- */
    /* Q4: Ecuaciones con figuras geométricas (crisp uniform SVGs)            */
    /* ---------------------------------------------------------------------- */
    case 'symbols_equation': {
      const SquareIcon = () => (
        <svg viewBox="0 0 28 28" className="w-7 h-7 shrink-0" aria-label="Cuadrado">
          <rect
            x="3"
            y="3"
            width="22"
            height="22"
            rx="2"
            fill="#dcfce7"
            stroke="#15803d"
            strokeWidth="2.2"
          />
        </svg>
      );
      const TriangleIcon = () => (
        <svg viewBox="0 0 28 28" className="w-7 h-7 shrink-0" aria-label="Triángulo">
          <polygon
            points="14,3 25,24 3,24"
            fill="#e0f2fe"
            stroke="#0369a1"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
        </svg>
      );
      const CircleIcon = () => (
        <svg viewBox="0 0 28 28" className="w-7 h-7 shrink-0" aria-label="Círculo">
          <circle
            cx="14"
            cy="14"
            r="10.5"
            fill="#ffe4e6"
            stroke="#be123c"
            strokeWidth="2.2"
          />
        </svg>
      );

      return (
        <div
          className={`p-5 bg-slate-50/80 border border-slate-200 rounded-xl flex justify-center ${className}`}
        >
          <div className="bg-white border border-slate-200 rounded-lg p-5 w-full max-w-sm shadow-2xs">
            <div className="text-xs font-semibold text-slate-600 text-center pb-2.5 mb-3.5 border-b border-slate-100">
              Sabiendo que:
            </div>
            <div className="space-y-3 font-mono text-lg font-bold text-slate-900">
              <div className="flex items-center justify-center gap-3.5">
                <SquareIcon />
                <span className="text-slate-500">+</span>
                <SquareIcon />
                <span className="text-slate-500">=</span>
                <span className="w-6 text-left tabular-nums">8</span>
              </div>
              <div className="flex items-center justify-center gap-3.5">
                <SquareIcon />
                <span className="text-slate-500">+</span>
                <TriangleIcon />
                <span className="text-slate-500">=</span>
                <span className="w-6 text-left tabular-nums">7</span>
              </div>
              <div className="flex items-center justify-center gap-3.5">
                <TriangleIcon />
                <span className="text-slate-500">−</span>
                <CircleIcon />
                <span className="text-slate-500">=</span>
                <span className="w-6 text-left tabular-nums">2</span>
              </div>
            </div>

            <div className="mt-4 pt-3.5 border-t border-slate-200 text-center">
              <div className="text-xs font-medium text-slate-500 mb-2.5">
                Indique el resultado de:
              </div>
              <div className="flex items-center justify-center gap-2.5 bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 font-mono text-lg font-bold text-slate-900">
                <SquareIcon />
                <span className="text-slate-600">×</span>
                <TriangleIcon />
                <span className="text-slate-600">×</span>
                <CircleIcon />
                <span className="text-slate-600">=</span>
                <span className={showSolution ? 'text-emerald-700' : 'text-sky-700'}>
                  {showSolution ? '12' : '?'}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    /* ---------------------------------------------------------------------- */
    /* Q5: Despliegue plano de un cubo (3D-verified perimeter chain N-M-P-Q-R-S-T) */
    /* ---------------------------------------------------------------------- */
    case 'cube_net': {
      // Exact 3D fold verification:
      // Base face: [80..130, 80..130] (Center)
      // Face 1 (Top):    [80..130, 30..80]
      // Face 2 (Left):   [30..80, 80..130]
      // Face 3 (Center): [80..130, 80..130]
      // Face 4 (Right):  [130..180, 80..130]
      // Face 5 (Front):  [80..130, 130..180]
      // Face 6 (Lid):    [80..130, 180..230]
      // Right perimeter chain going bottom-to-top:
      // N=(130,230), M=(130,180), P=(130,130), Q=(180,130), R=(180,80), S=(130,80), T=(130,30)
      // When folded into a cube:
      //   M -> (1,0,1), N -> (1,1,1) => Edge MN = (1,0,1)-(1,1,1)
      //   Q -> (1,0,1), R -> (1,1,1) => Edge QR = (1,0,1)-(1,1,1)
      // Exact match: Edge MN joins Edge QR!
      const vertices = [
        { label: 'T', x: 130, y: 30, dx: 12, dy: 4 },
        { label: 'S', x: 130, y: 80, dx: 10, dy: -8 },
        { label: 'R', x: 180, y: 80, dx: 12, dy: 4 },
        { label: 'Q', x: 180, y: 130, dx: 12, dy: 5 },
        { label: 'P', x: 130, y: 130, dx: 10, dy: 15 },
        { label: 'M', x: 130, y: 180, dx: 13, dy: 4 },
        { label: 'N', x: 130, y: 230, dx: 13, dy: 5 }
      ];

      return (
        <div
          className={`p-4 sm:p-5 bg-slate-50/80 border border-slate-200 rounded-xl flex flex-col items-center ${className}`}
        >
          <div className="text-xs font-medium text-slate-500 mb-2">
            Desarrollo plano del cubo (las líneas discontinuas son dobleces)
          </div>
          <svg viewBox="0 0 240 260" className="w-full max-w-[260px] h-auto">
            {/* 6 faces of the cube net */}
            <g fill="#ffffff" stroke="#1e293b" strokeWidth="1.8">
              {/* Top face */}
              <rect x="80" y="30" width="50" height="50" />
              {/* Left face */}
              <rect x="30" y="80" width="50" height="50" />
              {/* Center (base) face */}
              <rect x="80" y="80" width="50" height="50" fill="#f1f5f9" />
              {/* Right face */}
              <rect x="130" y="80" width="50" height="50" />
              {/* Below center */}
              <rect x="80" y="130" width="50" height="50" />
              {/* Bottom flap (top lid when folded) */}
              <rect x="80" y="180" width="50" height="50" />
            </g>

            {/* Internal fold creases styled cleanly as dashed lines */}
            <g stroke="#64748b" strokeWidth="1.4" strokeDasharray="4,3">
              <line x1="80" y1="80" x2="130" y2="80" />
              <line x1="80" y1="80" x2="80" y2="130" />
              <line x1="130" y1="80" x2="130" y2="130" />
              <line x1="80" y1="130" x2="130" y2="130" />
              <line x1="80" y1="180" x2="130" y2="180" />
            </g>

            {/* Highlight ONLY Edge MN (the edge asked about in the prompt) */}
            <line
              x1="130"
              y1="180"
              x2="130"
              y2="230"
              stroke="#0284c7"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Only highlight matching Edge QR when showSolution is true */}
            {showSolution && (
              <line
                x1="180"
                y1="80"
                x2="180"
                y2="130"
                stroke="#059669"
                strokeWidth="4"
                strokeLinecap="round"
              />
            )}

            {/* Vertex markers and labels */}
            {vertices.map((v) => (
              <g key={v.label}>
                <circle
                  cx={v.x}
                  cy={v.y}
                  r="3.2"
                  fill={
                    v.label === 'M' || v.label === 'N'
                      ? '#0284c7'
                      : showSolution && (v.label === 'Q' || v.label === 'R')
                      ? '#059669'
                      : '#0f172a'
                  }
                />
                <text
                  x={v.x + v.dx}
                  y={v.y + v.dy}
                  fill={
                    v.label === 'M' || v.label === 'N'
                      ? '#0369a1'
                      : showSolution && (v.label === 'Q' || v.label === 'R')
                      ? '#047857'
                      : '#0f172a'
                  }
                  fontSize="13"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  {v.label}
                </text>
              </g>
            ))}
          </svg>
          <div className="text-xs text-slate-600 mt-1 text-center">
            Borde de referencia <span className="font-bold text-sky-700">MN</span> resaltado en azul.
            {showSolution && (
              <span className="ml-1.5 font-semibold text-emerald-700">
                Al plegar se une con el borde QR.
              </span>
            )}
          </div>
        </div>
      );
    }

    /* ---------------------------------------------------------------------- */
    /* Q6 & Q7: Sólido 3D cartesiano exacto (Volumen = 42 cm³, P = (4, 3, 2)) */
    /* ---------------------------------------------------------------------- */
    case 'solid_3d': {
      // Exact 3D stepped solid inside [0,4] x [0,4] x [0,4]:
      //   Block 1 (Back-Left):  X in [0,2], Y in [0,3], Z in [0,4] -> 2*3*4 = 24 cm³
      //   Block 2 (Back-Right): X in [0,2], Y in [3,4], Z in [0,3] -> 2*1*3 =  6 cm³
      //   Block 3 (Front-Left): X in [2,4], Y in [0,3], Z in [0,2] -> 2*3*2 = 12 cm³
      //   Total Volume = 24 + 6 + 12 = 42 cm³ (Bounding box 4x4x4 = 64 cm³)
      //   Vertex P = (4, 3, 2)
      const p = (x: number, y: number, z: number) => project3D(x, y, z, 175, 168);

      const renderBlock = (
        x0: number,
        x1: number,
        y0: number,
        y1: number,
        z0: number,
        z1: number,
        colors: { top: string; left: string; right: string }
      ) => {
        const top = polyStr([p(x0, y0, z1), p(x0, y1, z1), p(x1, y1, z1), p(x1, y0, z1)]);
        const frontLeft = polyStr([p(x1, y0, z0), p(x1, y1, z0), p(x1, y1, z1), p(x1, y0, z1)]);
        const frontRight = polyStr([p(x0, y1, z0), p(x1, y1, z0), p(x1, y1, z1), p(x0, y1, z1)]);
        return (
          <g stroke="#1e293b" strokeWidth="1.5" strokeLinejoin="round">
            <polygon points={frontLeft} fill={colors.left} />
            <polygon points={frontRight} fill={colors.right} />
            <polygon points={top} fill={colors.top} />
          </g>
        );
      };

      const origin = p(0, 0, 0);
      const xExit = p(4, 0, 0);
      const xTip = p(5.1, 0, 0);
      const yExit = p(0, 4, 0);
      const yTip = p(0, 5.1, 0);
      const zExit = p(0, 0, 4);
      const zTip = p(0, 0, 4.9);
      const ptP = p(4, 3, 2);

      // Dimension helper: draws a crisp CAD dimension line between 3D points a and b shifted by (dx, dy)
      const DimLine: React.FC<{
        a: [number, number, number];
        b: [number, number, number];
        offset: [number, number];
        label: string;
        labelShift?: [number, number];
      }> = ({ a, b, offset, label, labelShift = [0, 0] }) => {
        const [ax, ay] = p(...a);
        const [bx, by] = p(...b);
        const [ox, oy] = offset;
        const x1 = ax + ox;
        const y1 = ay + oy;
        const x2 = bx + ox;
        const y2 = by + oy;
        const mx = (x1 + x2) / 2 + labelShift[0];
        const my = (y1 + y2) / 2 + labelShift[1];
        return (
          <g>
            {/* Extension lines */}
            <line x1={ax} y1={ay} x2={x1} y2={y1} stroke="#94a3b8" strokeWidth="0.9" strokeDasharray="2,2" />
            <line x1={bx} y1={by} x2={x2} y2={y2} stroke="#94a3b8" strokeWidth="0.9" strokeDasharray="2,2" />
            {/* Dimension line */}
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#475569" strokeWidth="1.1" />
            <circle cx={x1} cy={y1} r="1.8" fill="#475569" />
            <circle cx={x2} cy={y2} r="1.8" fill="#475569" />
            <rect
              x={mx - 15}
              y={my - 7}
              width="30"
              height="13"
              rx="2"
              fill="#ffffff"
              fillOpacity="0.92"
            />
            <text
              x={mx}
              y={my + 3}
              fill="#0f172a"
              fontSize="10"
              fontWeight="700"
              textAnchor="middle"
              className="font-mono"
            >
              {label}
            </text>
          </g>
        );
      };

      return (
        <div
          className={`p-4 sm:p-5 bg-slate-50/80 border border-slate-200 rounded-xl flex flex-col items-center ${className}`}
        >
          <div className="text-xs font-medium text-slate-500 mb-2">
            Sólido en sistema cartesiano (X, Y, Z) — cotas en cm
          </div>
          <svg viewBox="0 0 380 305" className="w-full max-w-md h-auto">
            <defs>
              <marker
                id="axisArrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#334155" />
              </marker>
            </defs>

            {/* Hidden coordinate axes from origin (0,0,0) behind the solid */}
            <g stroke="#94a3b8" strokeWidth="1.2" strokeDasharray="4,3">
              <line x1={origin[0]} y1={origin[1]} x2={xExit[0]} y2={xExit[1]} />
              <line x1={origin[0]} y1={origin[1]} x2={yExit[0]} y2={yExit[1]} />
              <line x1={origin[0]} y1={origin[1]} x2={zExit[0]} y2={zExit[1]} />
            </g>

            {/* Painter's order: Block 1 (Back-Left), Block 2 (Back-Right), Block 3 (Front-Left) */}
            {renderBlock(0, 2, 0, 3, 0, 4, {
              top: '#f8fafc',
              left: '#e2e8f0',
              right: '#cbd5e1'
            })}
            {renderBlock(0, 2, 3, 4, 0, 3, {
              top: '#f1f5f9',
              left: '#dbeafe',
              right: '#bfdbfe'
            })}
            {renderBlock(2, 4, 0, 3, 0, 2, {
              top: '#f8fafc',
              left: '#e0f2fe',
              right: '#bae6fd'
            })}

            {/* Visible solid axes extending past the solid */}
            <g stroke="#334155" strokeWidth="1.8" markerEnd="url(#axisArrow)">
              <line x1={zExit[0]} y1={zExit[1]} x2={zTip[0]} y2={zTip[1]} />
              <line x1={xExit[0]} y1={xExit[1]} x2={xTip[0]} y2={xTip[1]} />
              <line x1={yExit[0]} y1={yExit[1]} x2={yTip[0]} y2={yTip[1]} />
            </g>

            {/* Axis Labels */}
            <text x={zTip[0] - 14} y={zTip[1] + 5} fill="#0f172a" fontSize="13" fontWeight="700">
              Z
            </text>
            <text x={xTip[0] - 12} y={xTip[1] + 12} fill="#0f172a" fontSize="13" fontWeight="700">
              X
            </text>
            <text x={yTip[0] + 10} y={yTip[1] + 5} fill="#0f172a" fontSize="13" fontWeight="700">
              Y
            </text>

            {/* Exact CAD Dimension Lines */}
            {/* X segments along the left edge (y=0) */}
            <DimLine a={[0, 0, 4]} b={[2, 0, 4]} offset={[-22, -11]} label="2.00" />
            <DimLine a={[2, 0, 2]} b={[4, 0, 2]} offset={[-22, -11]} label="2.00" />
            {/* Y segments */}
            <DimLine a={[4, 0, 0]} b={[4, 3, 0]} offset={[-12, 22]} label="3.00" />
            <DimLine a={[0, 3, 3]} b={[0, 4, 3]} offset={[16, -12]} label="1.00" />
            {/* Z heights */}
            <DimLine a={[4, 0, 0]} b={[4, 0, 2]} offset={[-26, 0]} label="2.00" />
            <DimLine a={[2, 4, 0]} b={[2, 4, 3]} offset={[26, 0]} label="3.00" />
            <DimLine a={[0, 3, 3]} b={[0, 3, 4]} offset={[44, -2]} label="1.00" />

            {/* Subtle origin indicator */}
            <text x={origin[0] - 10} y={origin[1] - 4} fill="#64748b" fontSize="9.5" fontWeight="600">
              (0,0,0)
            </text>

            {/* Point P = (4, 3, 2) with crisp callout */}
            <circle cx={ptP[0]} cy={ptP[1]} r="5" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
            <line
              x1={ptP[0] + 24}
              y1={ptP[1] + 24}
              x2={ptP[0] + 6}
              y2={ptP[1] + 6}
              stroke="#dc2626"
              strokeWidth="1.6"
            />
            <text
              x={ptP[0] + 32}
              y={ptP[1] + 35}
              fill="#dc2626"
              fontSize="14"
              fontWeight="800"
              textAnchor="middle"
            >
              P{showSolution ? ' (4,3,2)' : ''}
            </text>
          </svg>
        </div>
      );
    }

    /* ---------------------------------------------------------------------- */
    /* Q8: Gráficas de f(x) = x² - 2x - 3 (EXACT Cartesian math, NO spoilers) */
    /* ---------------------------------------------------------------------- */
    case 'parabola_options': {
      // Exact parabolas:
      // a: y = -x^2 + 2x + 3  (opens down, vertex (1, 4), roots -1, 3)
      // b: y = -x^2 - 2x + 3  (opens down, vertex (-1, 4), roots -3, 1)
      // c: y =  x^2 + 2x - 3  (opens up,   vertex (-1, -4), roots -3, 1)
      // d: y =  x^2 - 2x - 3  (opens up,   vertex (1, -4), roots -1, 3) -> CORRECT
      const graphs = [
        { key: 'a', a: -1, b: 2, c: 3, isCorrect: false },
        { key: 'b', a: -1, b: -2, c: 3, isCorrect: false },
        { key: 'c', a: 1, b: 2, c: -3, isCorrect: false },
        { key: 'd', a: 1, b: -2, c: -3, isCorrect: true }
      ];

      const cx = 100;
      const cy = 90;
      const sx = 20;
      const sy = 15;

      return (
        <div
          className={`p-4 sm:p-5 bg-slate-50/80 border border-slate-200 rounded-xl ${className}`}
        >
          <div className="text-xs font-medium text-slate-500 mb-3 text-center">
            Gráficas cartesianas para{' '}
            <span className="font-mono font-semibold text-slate-800">f(x) = x² − 2x − 3</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-xl mx-auto">
            {graphs.map((g) => {
              const points = buildParabolaPath(g.a, g.b, g.c, cx, cy, sx, sy);
              const highlight = showSolution && g.isCorrect;

              return (
                <div
                  key={g.key}
                  className={`rounded-xl p-3 bg-white border flex flex-col items-center ${
                    highlight
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="w-full flex items-center justify-between mb-1">
                    <span
                      className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                        highlight
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      Gráfica {g.key}
                    </span>
                    {highlight && (
                      <span className="text-[11px] font-semibold text-emerald-700">
                        Correcta
                      </span>
                    )}
                  </div>

                  <svg viewBox="0 0 200 180" className="w-full max-w-[210px] h-auto">
                    {/* 1-unit Cartesian grid */}
                    {[-4, -3, -2, -1, 1, 2, 3, 4].map((x) => (
                      <line
                        key={`gx-${x}`}
                        x1={cx + x * sx}
                        y1={12}
                        x2={cx + x * sx}
                        y2={168}
                        stroke="#e2e8f0"
                        strokeWidth="0.9"
                      />
                    ))}
                    {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((y) => (
                      <line
                        key={`gy-${y}`}
                        x1={14}
                        y1={cy - y * sy}
                        x2={186}
                        y2={cy - y * sy}
                        stroke="#e2e8f0"
                        strokeWidth="0.9"
                      />
                    ))}

                    {/* X and Y axes */}
                    <line x1={14} y1={cy} x2={188} y2={cy} stroke="#475569" strokeWidth="1.4" />
                    <line x1={cx} y1={168} x2={cx} y2={10} stroke="#475569" strokeWidth="1.4" />
                    {/* Axis arrows */}
                    <polygon points="191,90 185,87 185,93" fill="#475569" />
                    <polygon points="100,7 97,13 103,13" fill="#475569" />

                    {/* Axis labels */}
                    <text x="188" y="83" fill="#334155" fontSize="9" fontWeight="700">
                      x
                    </text>
                    <text x="106" y="15" fill="#334155" fontSize="9" fontWeight="700">
                      y
                    </text>

                    {/* Numeric tick labels on X axis */}
                    {[-3, -2, -1, 1, 2, 3].map((x) => (
                      <text
                        key={`tx-${x}`}
                        x={cx + x * sx}
                        y={cy + 11}
                        fill="#64748b"
                        fontSize="8"
                        textAnchor="middle"
                        className="font-mono"
                      >
                        {x}
                      </text>
                    ))}
                    {/* Numeric tick labels on Y axis */}
                    {[-4, -2, 2, 4].map((y) => (
                      <text
                        key={`ty-${y}`}
                        x={cx - 6}
                        y={cy - y * sy + 3}
                        fill="#64748b"
                        fontSize="8"
                        textAnchor="end"
                        className="font-mono"
                      >
                        {y}
                      </text>
                    ))}

                    {/* Exact plotted parabola curve */}
                    <polyline
                      points={points}
                      fill="none"
                      stroke={highlight ? '#059669' : '#0284c7'}
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />

                    {/* Key points ONLY shown in solution review */}
                    {highlight && (
                      <g>
                        <circle cx={cx + -1 * sx} cy={cy} r="3.2" fill="#059669" />
                        <circle cx={cx + 3 * sx} cy={cy} r="3.2" fill="#059669" />
                        <circle cx={cx + 1 * sx} cy={cy - -4 * sy} r="3.2" fill="#dc2626" />
                        <text
                          x={cx + 1 * sx + 22}
                          y={cy - -4 * sy + 3}
                          fill="#dc2626"
                          fontSize="8.5"
                          fontWeight="700"
                          className="font-mono"
                        >
                          V(1,-4)
                        </text>
                      </g>
                    )}
                  </svg>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    /* ---------------------------------------------------------------------- */
    /* Q9: Expresión aritmética con signos de agrupación y fracciones         */
    /* ---------------------------------------------------------------------- */
    case 'fraction_bracket':
      return (
        <div
          className={`p-5 bg-slate-50/80 border border-slate-200 rounded-xl flex flex-col items-center ${className}`}
        >
          <div className="text-xs font-medium text-slate-500 mb-3">Expresión aritmética</div>
          <div className="bg-white border border-slate-200 rounded-lg px-5 py-4 shadow-2xs overflow-x-auto max-w-full">
            <div className="flex items-center justify-center flex-wrap gap-y-2 text-base sm:text-lg font-serif text-slate-900 whitespace-nowrap">
              <span className="font-semibold">−2 +</span>
              <span className="text-2xl sm:text-3xl font-light text-slate-600 mx-1">{'{'}</span>
              <span>−</span>
              <Frac num="3" den="4" />
              <span className="mx-1">−</span>
              <span className="text-xl sm:text-2xl font-light text-slate-600 mr-0.5">[</span>
              <span>−2 +</span>
              <Frac num="5" den="12" />
              <span className="mx-1">−</span>
              <span className="text-xl sm:text-2xl font-light text-slate-600">(</span>
              <Frac num="3" den="8" />
              <span className="mx-1">−</span>
              <Frac num="5" den="24" />
              <span className="text-xl sm:text-2xl font-light text-slate-600">)</span>
              <span className="text-xl sm:text-2xl font-light text-slate-600 ml-0.5">]</span>
              <span className="mx-1">−</span>
              <Frac num="1" den="6" />
              <span className="text-2xl sm:text-3xl font-light text-slate-600 mx-1">{'}'}</span>
            </div>
          </div>
        </div>
      );

    /* ---------------------------------------------------------------------- */
    /* Q10: Expresión algebraica con radicales cúbicos                        */
    /* ---------------------------------------------------------------------- */
    case 'radical_expr':
      return (
        <div
          className={`p-5 bg-slate-50/80 border border-slate-200 rounded-xl flex flex-col items-center ${className}`}
        >
          <div className="text-xs font-medium text-slate-500 mb-3">Expresión con radicales</div>
          <div className="bg-white border border-slate-200 rounded-lg px-5 py-4 shadow-2xs overflow-x-auto max-w-full">
            <div className="flex items-center justify-center flex-wrap gap-y-2 text-base sm:text-xl font-serif text-slate-900 whitespace-nowrap">
              <span className="italic">a</span>
              <Radical index={3}>
                <span>
                  250<i className="ml-0.5">b</i>
                </span>
              </Radical>
              <span className="mx-1.5">−</span>
              <Radical index={3}>
                <span>
                  3<i>ab</i>
                  <sup>3</sup>
                </span>
              </Radical>
              <span className="mx-1.5">− 5</span>
              <Radical index={3}>
                <span>
                  2<i>a</i>
                  <sup>3</sup>
                  <i>b</i>
                </span>
              </Radical>
              <span className="mx-1.5">
                + 3<i>b</i>
              </span>
              <Radical index={3}>
                <span>
                  3<i>a</i>
                </span>
              </Radical>
            </div>
          </div>
        </div>
      );

    /* ---------------------------------------------------------------------- */
    /* Q11: Fórmula T = 2π √(m/k)                                             */
    /* ---------------------------------------------------------------------- */
    case 'formula_k':
      return (
        <div
          className={`p-5 bg-slate-50/80 border border-slate-200 rounded-xl flex flex-col items-center ${className}`}
        >
          <div className="text-xs font-medium text-slate-500 mb-3">Ecuación dada</div>
          <div className="bg-white border border-slate-200 rounded-lg px-8 py-4 shadow-2xs flex flex-col items-center gap-2.5">
            <div className="flex items-center gap-1.5 text-xl sm:text-2xl font-serif text-slate-900">
              <span className="italic font-semibold">T</span>
              <span>= 2π</span>
              <Radical>
                <Frac num={<i>m</i>} den={<i>k</i>} size="lg" />
              </Radical>
            </div>
            <div className="text-xs sm:text-sm text-slate-600 font-mono">
              Datos: <strong className="text-slate-900">T = 2</strong> ·{' '}
              <strong className="text-slate-900">m = 1</strong>
            </div>
          </div>
        </div>
      );

    /* ---------------------------------------------------------------------- */
    /* Q12: Triángulo abc dentro de cubo de arista = 1 (Área = √2 / 2)        */
    /* ---------------------------------------------------------------------- */
    case 'cube_triangle': {
      // Exact 3D cube [0,1]^3 projected cleanly:
      // Back-top-left:      a = (0, 0, 1)
      // Front-bottom-left:  b = (1, 0, 0)
      // Front-bottom-right: c = (1, 1, 0)
      // Check geometry:
      //   |ab| = diagonal of left face (y=0) = sqrt(2)
      //   |bc| = front bottom edge = 1
      //   angle(abc) = 90° (edge bc is perpendicular to left face containing ab)
      //   Area(abc) = (1 * sqrt(2)) / 2 = sqrt(2) / 2
      const cp = (x: number, y: number, z: number): [number, number] => [
        98 - x * 46 + y * 116,
        152 + x * 34 - z * 112
      ];

      const v000 = cp(0, 0, 0);
      const v100 = cp(1, 0, 0); // b
      const v110 = cp(1, 1, 0); // c
      const v010 = cp(0, 1, 0);
      const v001 = cp(0, 0, 1); // a
      const v101 = cp(1, 0, 1);
      const v111 = cp(1, 1, 1);
      const v011 = cp(0, 1, 1);

      return (
        <div
          className={`p-4 sm:p-5 bg-slate-50/80 border border-slate-200 rounded-xl flex flex-col items-center ${className}`}
        >
          <div className="text-xs font-medium text-slate-500 mb-2">
            Triángulo <span className="italic font-semibold text-slate-700">abc</span> en un cubo de arista = 1
          </div>
          <svg viewBox="0 0 280 220" className="w-full max-w-[290px] h-auto">
            {/* Hidden back edges of the cube (dashed) */}
            <g stroke="#94a3b8" strokeWidth="1.4" strokeDasharray="4,3" fill="none">
              <line x1={v000[0]} y1={v000[1]} x2={v100[0]} y2={v100[1]} />
              <line x1={v000[0]} y1={v000[1]} x2={v010[0]} y2={v010[1]} />
              <line x1={v000[0]} y1={v000[1]} x2={v001[0]} y2={v001[1]} />
            </g>

            {/* Shaded internal right triangle a-b-c */}
            <polygon
              points={polyStr([v001, v100, v110])}
              fill="rgba(220, 38, 38, 0.16)"
              stroke="#dc2626"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />

            {/* Visible solid edges of the cube */}
            <g stroke="#1e293b" strokeWidth="1.6" fill="none" strokeLinejoin="round">
              {/* Front face */}
              <polygon points={polyStr([v100, v110, v111, v101])} />
              {/* Top face */}
              <polygon points={polyStr([v001, v011, v111, v101])} />
              {/* Right face */}
              <polygon points={polyStr([v110, v010, v011, v111])} />
            </g>

            {/* Re-stroke triangle edges cleanly on top for clarity */}
            <line
              x1={v001[0]}
              y1={v001[1]}
              x2={v100[0]}
              y2={v100[1]}
              stroke="#dc2626"
              strokeWidth="2.4"
            />
            <line
              x1={v100[0]}
              y1={v100[1]}
              x2={v110[0]}
              y2={v110[1]}
              stroke="#dc2626"
              strokeWidth="2.4"
            />
            <line
              x1={v001[0]}
              y1={v001[1]}
              x2={v110[0]}
              y2={v110[1]}
              stroke="#dc2626"
              strokeWidth="2.2"
              strokeDasharray="5,3"
            />

            {/* Right-angle marker at b in solution mode */}
            {showSolution && (
              <g>
                <polyline
                  points={polyStr([
                    cp(0.84, 0, 0.16),
                    cp(0.84, 0.16, 0.16),
                    cp(1, 0.16, 0)
                  ])}
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="1.5"
                />
                <text
                  x={(v001[0] + v100[0]) / 2 - 18}
                  y={(v001[1] + v100[1]) / 2}
                  fill="#b91c1c"
                  fontSize="11.5"
                  fontWeight="700"
                >
                  √2
                </text>
                <text
                  x={(v100[0] + v110[0]) / 2}
                  y={v100[1] + 18}
                  fill="#b91c1c"
                  fontSize="11.5"
                  fontWeight="700"
                  textAnchor="middle"
                >
                  1
                </text>
              </g>
            )}

            {/* Vertices a, b, c */}
            {[
              { lbl: 'a', pt: v001, dx: -12, dy: -4 },
              { lbl: 'b', pt: v100, dx: -13, dy: 12 },
              { lbl: 'c', pt: v110, dx: 12, dy: 12 }
            ].map((v) => (
              <g key={v.lbl}>
                <circle cx={v.pt[0]} cy={v.pt[1]} r="4" fill="#dc2626" stroke="#ffffff" strokeWidth="1.5" />
                <text
                  x={v.pt[0] + v.dx}
                  y={v.pt[1] + v.dy}
                  fill="#b91c1c"
                  fontSize="14"
                  fontWeight="700"
                  fontStyle="italic"
                >
                  {v.lbl}
                </text>
              </g>
            ))}

            {/* Edge length annotation */}
            <text
              x={v010[0] + 12}
              y={(v010[1] + v011[1]) / 2 + 4}
              fill="#334155"
              fontSize="11.5"
              fontWeight="600"
            >
              arista = 1
            </text>
          </svg>
        </div>
      );
    }

    /* ---------------------------------------------------------------------- */
    /* Q13: Cilindros A, B y C dibujados a escala real sobre la misma base    */
    /* ---------------------------------------------------------------------- */
    case 'cylinder_volumes': {
      // Exact scale: 1m = 9px
      // A: r=4m (rx=36px, width=72px), h=5m  (45px)
      // B: r=3m (rx=27px, width=54px), h=10m (90px)
      // C: r=2m (rx=18px, width=36px), h=15m (135px)
      const baseY = 188;
      const scale = 9;
      const cylinders = [
        { id: 'A', cx: 78, r: 4, h: 5 },
        { id: 'B', cx: 196, r: 3, h: 10 },
        { id: 'C', cx: 298, r: 2, h: 15 }
      ];

      return (
        <div
          className={`p-4 sm:p-5 bg-slate-50/80 border border-slate-200 rounded-xl flex flex-col items-center ${className}`}
        >
          <div className="text-xs font-medium text-slate-500 mb-2">
            Cilindros a escala proporcional (radio y altura en metros)
          </div>
          <svg viewBox="0 0 380 232" className="w-full max-w-md h-auto">
            <defs>
              <linearGradient id="cylWall" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94a3b8" />
                <stop offset="32%" stopColor="#e2e8f0" />
                <stop offset="68%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#64748b" />
              </linearGradient>
              <linearGradient id="cylTop" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
            </defs>

            {/* Common floor baseline */}
            <line
              x1="20"
              y1={baseY + 12}
              x2="360"
              y2={baseY + 12}
              stroke="#cbd5e1"
              strokeWidth="1.2"
              strokeDasharray="4,3"
            />

            {cylinders.map((c) => {
              const rx = c.r * scale;
              const ry = Math.max(5.5, rx * 0.28);
              const hPx = c.h * scale;
              const topY = baseY - hPx;
              const leftX = c.cx - rx;
              const rightX = c.cx + rx;

              return (
                <g key={c.id}>
                  {/* Cylinder wall body */}
                  <path
                    d={`M ${leftX},${topY} L ${leftX},${baseY} A ${rx},${ry} 0 0,0 ${rightX},${baseY} L ${rightX},${topY} Z`}
                    fill="url(#cylWall)"
                    stroke="#334155"
                    strokeWidth="1.5"
                  />
                  {/* Hidden back half of bottom ellipse */}
                  <path
                    d={`M ${leftX},${baseY} A ${rx},${ry} 0 0,1 ${rightX},${baseY}`}
                    fill="none"
                    stroke="#64748b"
                    strokeWidth="1"
                    strokeDasharray="3,2"
                  />
                  {/* Top elliptical cap */}
                  <ellipse
                    cx={c.cx}
                    cy={topY}
                    rx={rx}
                    ry={ry}
                    fill="url(#cylTop)"
                    stroke="#334155"
                    strokeWidth="1.5"
                  />

                  {/* Radius line drawn on top cap */}
                  <circle cx={c.cx} cy={topY} r="2" fill="#0369a1" />
                  <line
                    x1={c.cx}
                    y1={topY}
                    x2={rightX}
                    y2={topY}
                    stroke="#0369a1"
                    strokeWidth="1.4"
                  />
                  <text
                    x={c.cx + rx / 2}
                    y={topY - ry - 5}
                    fill="#0369a1"
                    fontSize="10.5"
                    fontWeight="700"
                    textAnchor="middle"
                    className="font-mono"
                  >
                    r={c.r}m
                  </text>

                  {/* Height dimension bracket on the right side */}
                  <line
                    x1={rightX + 8}
                    y1={topY}
                    x2={rightX + 8}
                    y2={baseY}
                    stroke="#475569"
                    strokeWidth="1.1"
                  />
                  <line x1={rightX + 5} y1={topY} x2={rightX + 11} y2={topY} stroke="#475569" strokeWidth="1.1" />
                  <line x1={rightX + 5} y1={baseY} x2={rightX + 11} y2={baseY} stroke="#475569" strokeWidth="1.1" />
                  <text
                    x={rightX + 14}
                    y={(topY + baseY) / 2 + 3.5}
                    fill="#334155"
                    fontSize="10"
                    fontWeight="700"
                    className="font-mono"
                  >
                    {c.h}m
                  </text>

                  {/* Cylinder Letter Label */}
                  <text
                    x={c.cx}
                    y={(topY + baseY) / 2 + 5}
                    fill="#0f172a"
                    fontSize="14"
                    fontWeight="800"
                    textAnchor="middle"
                  >
                    {c.id}
                  </text>

                  {/* Caption underneath */}
                  <text
                    x={c.cx}
                    y={baseY + 28}
                    fill="#475569"
                    fontSize="10.5"
                    fontWeight="600"
                    textAnchor="middle"
                  >
                    Cilindro {c.id}
                  </text>
                  {showSolution && (
                    <text
                      x={c.cx}
                      y={baseY + 41}
                      fill="#059669"
                      fontSize="10"
                      fontWeight="700"
                      textAnchor="middle"
                      className="font-mono"
                    >
                      V = {c.r * c.r * c.h}π m³
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      );
    }

    /* ---------------------------------------------------------------------- */
    /* Q14: Ecuación cuadrática Y = 2X² + 3X - 5                              */
    /* ---------------------------------------------------------------------- */
    case 'quad_roots':
      return (
        <div
          className={`p-4 bg-slate-50/80 border border-slate-200 rounded-xl flex justify-center ${className}`}
        >
          <div className="bg-white border border-slate-200 rounded-lg px-7 py-3.5 shadow-2xs font-serif text-xl sm:text-2xl text-slate-900">
            <i>Y</i> = 2<i>X</i>
            <sup>2</sup> + 3<i>X</i> − 5
          </div>
        </div>
      );

    /* ---------------------------------------------------------------------- */
    /* Q15: Sucesión de Fibonacci                                             */
    /* ---------------------------------------------------------------------- */
    case 'fibonacci_seq': {
      const terms = ['0', '1', '1', '2', '3', '5', '8', '13'];
      return (
        <div
          className={`p-4 bg-slate-50/80 border border-slate-200 rounded-xl flex justify-center ${className}`}
        >
          <div className="bg-white border border-slate-200 rounded-lg px-5 py-3.5 shadow-2xs flex flex-wrap items-center justify-center gap-2 font-mono text-base sm:text-lg font-bold text-slate-900">
            {terms.map((t, idx) => (
              <React.Fragment key={idx}>
                <span className="px-2 py-0.5 bg-slate-50 border border-slate-200 rounded tabular-nums">
                  {t}
                </span>
                <span className="text-slate-400">,</span>
              </React.Fragment>
            ))}
            <span
              className={`px-3 py-0.5 rounded border-2 tabular-nums ${
                showSolution
                  ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                  : 'border-dashed border-sky-500 bg-sky-50 text-sky-700'
              }`}
            >
              {showSolution ? '21' : '?'}
            </span>
          </div>
        </div>
      );
    }

    /* ---------------------------------------------------------------------- */
    /* Q16: 4 Gráficas de triángulos rectángulos ABC para sin(θ) (NO spoilers)*/
    /* ---------------------------------------------------------------------- */
    case 'trig_diagram_options': {
      // Exact 6-8-10 right triangle scaled cleanly:
      // C = (42, 102) [90°], A = (42, 22) [AC = 80px -> 8], B = (102, 102) [BC = 60px -> 6], AB = 100px -> 10
      const options: {
        key: 'a' | 'b' | 'c' | 'd';
        thetaAt: 'A' | 'B';
        showAC?: string;
        showBC?: string;
        showAB?: string;
        isCorrect: boolean;
      }[] = [
        { key: 'a', thetaAt: 'B', showAC: '8', showAB: '10', isCorrect: true },
        { key: 'b', thetaAt: 'B', showAC: '8', showBC: '6', isCorrect: false },
        { key: 'c', thetaAt: 'A', showAC: '8', showBC: '6', isCorrect: false },
        { key: 'd', thetaAt: 'B', showBC: '6', showAB: '10', isCorrect: false }
      ];

      return (
        <div
          className={`p-4 sm:p-5 bg-slate-50/80 border border-slate-200 rounded-xl ${className}`}
        >
          <div className="text-xs font-medium text-slate-500 mb-3 text-center">
            Triángulos rectángulos ABC (opciones a, b, c, d)
          </div>
          <div className="grid grid-cols-2 gap-3.5 max-w-lg mx-auto">
            {options.map((opt) => {
              const highlight = showSolution && opt.isCorrect;
              return (
                <div
                  key={opt.key}
                  className={`rounded-xl p-3 bg-white border flex flex-col items-center ${
                    highlight
                      ? 'border-emerald-500 ring-2 ring-emerald-500/20'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="w-full flex items-center justify-between mb-1">
                    <span
                      className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                        highlight
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-slate-100 text-slate-800'
                      }`}
                    >
                      Gráfica {opt.key}
                    </span>
                    {highlight && (
                      <span className="text-[11px] font-semibold text-emerald-700">
                        sin θ = 8/10
                      </span>
                    )}
                  </div>

                  <svg viewBox="0 0 150 128" className="w-full max-w-[165px] h-auto">
                    {/* Right triangle ACB */}
                    <polygon
                      points="42,22 42,102 102,102"
                      fill={highlight ? '#ecfdf5' : '#f8fafc'}
                      stroke={highlight ? '#059669' : '#1e293b'}
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                    {/* Right angle symbol at C(42, 102) */}
                    <polyline
                      points="42,91 53,91 53,102"
                      fill="none"
                      stroke="#475569"
                      strokeWidth="1.2"
                    />

                    {/* Vertex labels A, B, C */}
                    <text x="36" y="16" fill="#0f172a" fontSize="12" fontWeight="700" textAnchor="middle">
                      A
                    </text>
                    <text x="29" y="109" fill="#0f172a" fontSize="12" fontWeight="700" textAnchor="middle">
                      C
                    </text>
                    <text x="112" y="109" fill="#0f172a" fontSize="12" fontWeight="700" textAnchor="middle">
                      B
                    </text>

                    {/* Angle θ arc */}
                    {opt.thetaAt === 'B' ? (
                      <g>
                        <path
                          d="M 84,102 A 18,18 0 0,1 91.2,87.6"
                          fill="none"
                          stroke="#dc2626"
                          strokeWidth="1.6"
                        />
                        <text x="77" y="96" fill="#dc2626" fontSize="11.5" fontWeight="700" fontStyle="italic">
                          θ
                        </text>
                      </g>
                    ) : (
                      <g>
                        <path
                          d="M 42,42 A 20,20 0 0,0 54,38"
                          fill="none"
                          stroke="#dc2626"
                          strokeWidth="1.6"
                        />
                        <text x="49" y="52" fill="#dc2626" fontSize="11.5" fontWeight="700" fontStyle="italic">
                          θ
                        </text>
                      </g>
                    )}

                    {/* Given side values */}
                    {opt.showAC && (
                      <text
                        x="28"
                        y="66"
                        fill="#0369a1"
                        fontSize="12.5"
                        fontWeight="700"
                        textAnchor="middle"
                        className="font-mono"
                      >
                        {opt.showAC}
                      </text>
                    )}
                    {opt.showBC && (
                      <text
                        x="72"
                        y="119"
                        fill="#0369a1"
                        fontSize="12.5"
                        fontWeight="700"
                        textAnchor="middle"
                        className="font-mono"
                      >
                        {opt.showBC}
                      </text>
                    )}
                    {opt.showAB && (
                      <text
                        x="83"
                        y="57"
                        fill="#0369a1"
                        fontSize="12.5"
                        fontWeight="700"
                        textAnchor="middle"
                        className="font-mono"
                      >
                        {opt.showAB}
                      </text>
                    )}
                  </svg>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    /* ---------------------------------------------------------------------- */
    /* Q17: Triángulos notables (30°–60°–90° y 45°–45°–90°) a escala exacta   */
    /* ---------------------------------------------------------------------- */
    case 'trig_notable_angles':
      return (
        <div
          className={`p-4 sm:p-5 bg-slate-50/80 border border-slate-200 rounded-xl ${className}`}
        >
          <div className="text-xs font-medium text-slate-500 mb-3 text-center">
            Triángulos rectángulos de ángulos notables (30°, 45° y 60°)
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 max-w-lg mx-auto">
            {/* 30-60-90 Triangle (vertical = 58 -> 1, horizontal = 100.5 -> √3, hyp = 116 -> 2) */}
            <div
              className={`rounded-xl p-3 bg-white border flex flex-col items-center ${
                showSolution ? 'border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200'
              }`}
            >
              <span className="text-xs font-semibold text-slate-600 mb-1">
                Triángulo 30° – 60° – 90°
              </span>
              <svg viewBox="0 0 175 130" className="w-full max-w-[185px] h-auto">
                <polygon
                  points="32,44 32,102 132.5,102"
                  fill={showSolution ? '#ecfdf5' : '#f8fafc'}
                  stroke="#1e293b"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                {/* Right angle */}
                <polyline
                  points="32,91 43,91 43,102"
                  fill="none"
                  stroke="#475569"
                  strokeWidth="1.2"
                />

                {/* 60° arc at top-left (32, 44) */}
                <path
                  d="M 32,64 A 20,20 0 0,0 49.3,54"
                  fill="none"
                  stroke="#dc2626"
                  strokeWidth="1.5"
                />
                <text x="48" y="73" fill="#dc2626" fontSize="10.5" fontWeight="700">
                  60°
                </text>

                {/* 30° arc at bottom-right (132.5, 102) */}
                <path
                  d="M 106.5,102 A 26,26 0 0,1 110,89"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="1.5"
                />
                <text x="89" y="96" fill="#0369a1" fontSize="10.5" fontWeight="700">
                  30°
                </text>

                {/* Side lengths */}
                <text
                  x="19"
                  y="77"
                  fill={showSolution ? '#059669' : '#0f172a'}
                  fontSize="12"
                  fontWeight="700"
                  textAnchor="middle"
                  className="font-mono"
                >
                  1
                </text>
                <text
                  x="82"
                  y="118"
                  fill="#0f172a"
                  fontSize="12"
                  fontWeight="700"
                  textAnchor="middle"
                  className="font-mono"
                >
                  √3
                </text>
                <text
                  x="91"
                  y="64"
                  fill={showSolution ? '#059669' : '#0f172a'}
                  fontSize="12"
                  fontWeight="700"
                  textAnchor="middle"
                  className="font-mono"
                >
                  2
                </text>
              </svg>
              {showSolution && (
                <span className="text-[11px] font-semibold text-emerald-700 font-mono mt-1">
                  sen 30° = cos 60° = 1/2
                </span>
              )}
            </div>

            {/* 45-45-90 Triangle (vertical = 72 -> 1, horizontal = 72 -> 1, hyp = 101.8 -> √2) */}
            <div className="rounded-xl p-3 bg-white border border-slate-200 flex flex-col items-center">
              <span className="text-xs font-semibold text-slate-600 mb-1">
                Triángulo 45° – 45° – 90°
              </span>
              <svg viewBox="0 0 175 130" className="w-full max-w-[185px] h-auto">
                <polygon
                  points="48,30 48,102 120,102"
                  fill="#f8fafc"
                  stroke="#1e293b"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                {/* Right angle */}
                <polyline
                  points="48,91 59,91 59,102"
                  fill="none"
                  stroke="#475569"
                  strokeWidth="1.2"
                />

                {/* Top 45° arc */}
                <path
                  d="M 48,50 A 20,20 0 0,0 62.1,44.1"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="1.5"
                />
                <text x="58" y="60" fill="#b45309" fontSize="10.5" fontWeight="700">
                  45°
                </text>

                {/* Bottom-right 45° arc */}
                <path
                  d="M 100,102 A 20,20 0 0,1 105.9,87.9"
                  fill="none"
                  stroke="#d97706"
                  strokeWidth="1.5"
                />
                <text x="83" y="96" fill="#b45309" fontSize="10.5" fontWeight="700">
                  45°
                </text>

                {/* Side lengths */}
                <text
                  x="34"
                  y="70"
                  fill="#0f172a"
                  fontSize="12"
                  fontWeight="700"
                  textAnchor="middle"
                  className="font-mono"
                >
                  1
                </text>
                <text
                  x="84"
                  y="118"
                  fill="#0f172a"
                  fontSize="12"
                  fontWeight="700"
                  textAnchor="middle"
                  className="font-mono"
                >
                  1
                </text>
                <text
                  x="96"
                  y="60"
                  fill="#0f172a"
                  fontSize="12"
                  fontWeight="700"
                  textAnchor="middle"
                  className="font-mono"
                >
                  √2
                </text>
              </svg>
            </div>
          </div>
        </div>
      );

    /* ---------------------------------------------------------------------- */
    /* Q18: Escalera apoyada en la pared (EXACT 60° geometry)                 */
    /* ---------------------------------------------------------------------- */
    case 'ladder_trig': {
      // Exact 60° right triangle:
      // Base of ladder: (100, 178)
      // Wall corner:    (175, 178) -> horizontal dx = 75px (represents X = 3 m)
      // Top of ladder:  (175, 178 - 75*sqrt(3)) = (175, 48.1) -> hypotenuse L = 150px (6 m)
      const xBase = 100;
      const xWall = 175;
      const yFloor = 178;
      const yTop = 48.1;

      return (
        <div
          className={`p-4 sm:p-5 bg-slate-50/80 border border-slate-200 rounded-xl flex flex-col items-center ${className}`}
        >
          <div className="text-xs font-medium text-slate-500 mb-2">
            Escalera apoyada contra una pared vertical
          </div>
          <svg viewBox="0 0 265 222" className="w-full max-w-[280px] h-auto">
            {/* Brick Wall */}
            <rect
              x={xWall}
              y="22"
              width="30"
              height={yFloor - 22}
              fill="#f1f5f9"
              stroke="#334155"
              strokeWidth="1.6"
            />
            {[42, 62, 82, 102, 122, 142, 162].map((y, idx) => (
              <g key={y} stroke="#cbd5e1" strokeWidth="1">
                <line x1={xWall} y1={y} x2={xWall + 30} y2={y} />
                <line
                  x1={xWall + (idx % 2 === 0 ? 15 : 8)}
                  y1={y - 20}
                  x2={xWall + (idx % 2 === 0 ? 15 : 8)}
                  y2={y}
                />
              </g>
            ))}
            <text x={xWall + 36} y="42" fill="#64748b" fontSize="10.5" fontWeight="600">
              Pared
            </text>

            {/* Floor line + hatch */}
            <line x1="25" y1={yFloor} x2="225" y2={yFloor} stroke="#1e293b" strokeWidth="2" />
            {[35, 55, 75, 95, 115, 135, 155, 175, 195, 215].map((x) => (
              <line
                key={x}
                x1={x}
                y1={yFloor}
                x2={x - 7}
                y2={yFloor + 7}
                stroke="#94a3b8"
                strokeWidth="1"
              />
            ))}

            {/* Right-angle marker at wall-floor intersection */}
            <polyline
              points={`${xWall - 12},${yFloor} ${xWall - 12},${yFloor - 12} ${xWall},${yFloor - 12}`}
              fill="none"
              stroke="#475569"
              strokeWidth="1.2"
            />

            {/* Two-rail ladder with rungs */}
            <g stroke="#b45309" strokeLinecap="round">
              <line x1={xBase - 3} y1={yFloor} x2={xWall - 3} y2={yTop} strokeWidth="2.6" />
              <line x1={xBase + 4} y1={yFloor} x2={xWall + 4} y2={yTop} strokeWidth="2.6" />
              {[0.12, 0.24, 0.36, 0.48, 0.6, 0.72, 0.84, 0.94].map((t) => {
                const lx1 = xBase - 3 + (xWall - xBase) * t;
                const ly1 = yFloor + (yTop - yFloor) * t;
                const lx2 = xBase + 4 + (xWall - xBase) * t;
                const ly2 = yFloor + (yTop - yFloor) * t;
                return <line key={t} x1={lx1} y1={ly1} x2={lx2} y2={ly2} strokeWidth="1.8" />;
              })}
            </g>

            {/* Exact 60° angle arc at base */}
            <path
              d={`M ${xBase + 28},${yFloor} A 28,28 0 0,0 ${xBase + 14},${yFloor - 24.2}`}
              fill="none"
              stroke="#dc2626"
              strokeWidth="1.8"
            />
            <text x={xBase + 32} y={yFloor - 9} fill="#dc2626" fontSize="11.5" fontWeight="700">
              θ = 60°
            </text>

            {/* Distance X dimension line below ground */}
            <line x1={xBase} y1="198" x2={xWall} y2="198" stroke="#0284c7" strokeWidth="1.4" />
            <line x1={xBase} y1="193" x2={xBase} y2="203" stroke="#0284c7" strokeWidth="1.4" />
            <line x1={xWall} y1="193" x2={xWall} y2="203" stroke="#0284c7" strokeWidth="1.4" />
            <text
              x={(xBase + xWall) / 2}
              y="214"
              fill="#0369a1"
              fontSize="12"
              fontWeight="700"
              textAnchor="middle"
              className="font-mono"
            >
              X = 3 m
            </text>

            {/* Ladder Length L label */}
            <text
              x="114"
              y="108"
              fill="#92400e"
              fontSize="13.5"
              fontWeight="800"
              className="font-mono"
            >
              {showSolution ? 'L = 6 m' : 'L = ?'}
            </text>
          </svg>
        </div>
      );
    }

    /* ---------------------------------------------------------------------- */
    /* Q19: Sólido isométrico exacto de 7 cubos unitarios (1 cm³ c/u)         */
    /* ---------------------------------------------------------------------- */
    case 'isometric_blocks': {
      // Exact 7 unit cubes: 2x2x2 cube minus the front-top corner (1,1,1) = 7 cm³
      // Bottom layer (z=0): (0,0,0), (1,0,0), (0,1,0), (1,1,0) -> 4 cubes
      // Top layer    (z=1): (0,0,1), (1,0,1), (0,1,1)          -> 3 cubes
      // Total = 7 cubes = 7 cm³ (every single grid division = 1 cm!)
      const rawCubes: [number, number, number][] = [
        [0, 0, 0],
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 0],
        [1, 0, 1],
        [0, 1, 1]
      ];
      const cubes = [...rawCubes].sort(
        (a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]) || a[2] - b[2]
      );

      const s = 34;
      const cos30 = 0.8660254;
      const cx = 135;
      const cy = 104;

      const iso = (x: number, y: number, z: number): [number, number] => [
        cx + (y - x) * cos30 * s,
        cy + (x + y) * 0.5 * s - z * s
      ];

      const dimA = iso(2, 0, 0);
      const dimB = iso(2, 1, 0);

      return (
        <div
          className={`p-4 sm:p-5 bg-slate-50/80 border border-slate-200 rounded-xl flex flex-col items-center ${className}`}
        >
          <div className="text-xs font-medium text-slate-500 mb-2">
            Sólido compuesto de cubos unitarios (cada división = 1 cm)
          </div>
          <svg viewBox="0 0 270 212" className="w-full max-w-[280px] h-auto">
            {cubes.map(([x, y, z], idx) => {
              // Top face (z + 1)
              const top = polyStr([
                iso(x, y, z + 1),
                iso(x, y + 1, z + 1),
                iso(x + 1, y + 1, z + 1),
                iso(x + 1, y, z + 1)
              ]);
              // Left-front face (x + 1)
              const left = polyStr([
                iso(x + 1, y, z),
                iso(x + 1, y + 1, z),
                iso(x + 1, y + 1, z + 1),
                iso(x + 1, y, z + 1)
              ]);
              // Right-front face (y + 1)
              const right = polyStr([
                iso(x, y + 1, z),
                iso(x + 1, y + 1, z),
                iso(x + 1, y + 1, z + 1),
                iso(x, y + 1, z + 1)
              ]);

              return (
                <g key={idx} stroke="#1e293b" strokeWidth="1.4" strokeLinejoin="round">
                  <polygon points={left} fill="#93c5fd" />
                  <polygon points={right} fill="#60a5fa" />
                  <polygon points={top} fill="#dbeafe" />
                </g>
              );
            })}

            {/* 1 cm unit scale indicator along one bottom edge */}
            <g>
              <line
                x1={dimA[0] - 8}
                y1={dimA[1] + 12}
                x2={dimB[0] - 8}
                y2={dimB[1] + 12}
                stroke="#0369a1"
                strokeWidth="1.4"
              />
              <line
                x1={dimA[0] - 5}
                y1={dimA[1] + 8}
                x2={dimA[0] - 11}
                y2={dimA[1] + 16}
                stroke="#0369a1"
                strokeWidth="1.4"
              />
              <line
                x1={dimB[0] - 5}
                y1={dimB[1] + 8}
                x2={dimB[0] - 11}
                y2={dimB[1] + 16}
                stroke="#0369a1"
                strokeWidth="1.4"
              />
              <text
                x={(dimA[0] + dimB[0]) / 2 - 22}
                y={(dimA[1] + dimB[1]) / 2 + 24}
                fill="#0369a1"
                fontSize="11"
                fontWeight="700"
                className="font-mono"
              >
                1 cm
              </text>
            </g>

            {showSolution && (
              <text
                x="135"
                y="204"
                fill="#059669"
                fontSize="11"
                fontWeight="700"
                textAnchor="middle"
              >
                Base: 4 cubos + Nivel superior: 3 cubos = 7 cm³
              </text>
            )}
          </svg>
        </div>
      );
    }

    /* ---------------------------------------------------------------------- */
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
