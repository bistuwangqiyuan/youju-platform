"use client";

import { SOJOURN_DIMENSIONS } from "@/lib/constants";

interface SojourIndexChartProps {
  scores: {
    climate: number;
    cost: number;
    medical: number;
    internet: number;
    transport: number;
    community: number;
    culture: number;
  };
  size?: number;
}

export default function SojourIndexChart({
  scores,
  size = 320,
}: SojourIndexChartProps) {
  const cx = size / 2;
  const cy = size / 2;
  const maxRadius = size * 0.38;
  const levels = 5;
  const dimensions = SOJOURN_DIMENSIONS;
  const n = dimensions.length;
  const angleStep = (2 * Math.PI) / n;
  const startAngle = -Math.PI / 2;

  function polarToCartesian(angle: number, radius: number) {
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  }

  function getGridPoints(level: number) {
    const radius = (maxRadius * level) / levels;
    return dimensions.map((_, i) => {
      const angle = startAngle + i * angleStep;
      return polarToCartesian(angle, radius);
    });
  }

  function getGridPath(level: number) {
    const pts = getGridPoints(level);
    return pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
  }

  const scoreKeys = ["climate", "cost", "medical", "internet", "transport", "community", "culture"] as const;

  const dataPoints = scoreKeys.map((key, i) => {
    const value = scores[key];
    const radius = (maxRadius * value) / 100;
    const angle = startAngle + i * angleStep;
    return { ...polarToCartesian(angle, radius), value };
  });

  const dataPath =
    dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  const labelOffset = maxRadius + 28;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="mx-auto"
    >
      {Array.from({ length: levels }, (_, i) => (
        <path
          key={`grid-${i}`}
          d={getGridPath(i + 1)}
          fill="none"
          stroke="#e5e7eb"
          strokeWidth={i === levels - 1 ? 1.5 : 0.8}
          opacity={0.6}
        />
      ))}

      {dimensions.map((_, i) => {
        const end = polarToCartesian(startAngle + i * angleStep, maxRadius);
        return (
          <line
            key={`axis-${i}`}
            x1={cx}
            y1={cy}
            x2={end.x}
            y2={end.y}
            stroke="#d1d5db"
            strokeWidth={0.8}
          />
        );
      })}

      <path
        d={dataPath}
        fill="rgba(45, 95, 62, 0.15)"
        stroke="#2D5F3E"
        strokeWidth={2}
        strokeLinejoin="round"
      />

      {dataPoints.map((p, i) => (
        <circle
          key={`dot-${i}`}
          cx={p.x}
          cy={p.y}
          r={4}
          fill="#2D5F3E"
          stroke="white"
          strokeWidth={2}
        />
      ))}

      {dimensions.map((dim, i) => {
        const angle = startAngle + i * angleStep;
        const pos = polarToCartesian(angle, labelOffset);
        let anchor: "start" | "middle" | "end" = "middle";
        if (Math.cos(angle) > 0.3) anchor = "start";
        else if (Math.cos(angle) < -0.3) anchor = "end";

        return (
          <g key={`label-${i}`}>
            <text
              x={pos.x}
              y={pos.y - 6}
              textAnchor={anchor}
              className="fill-foreground text-xs font-medium"
              dominantBaseline="auto"
            >
              {dim.label}
            </text>
            <text
              x={pos.x}
              y={pos.y + 10}
              textAnchor={anchor}
              className="fill-primary text-xs font-bold"
              dominantBaseline="auto"
            >
              {scores[scoreKeys[i]]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
