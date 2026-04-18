"use client";

import { RATING_DIMENSIONS } from "@/lib/constants";

interface RatingRadarProps {
  ratings: {
    living: number;
    internet: number;
    surroundings: number;
    safety: number;
    community: number;
  };
  size?: number;
}

export default function RatingRadar({ ratings, size = 240 }: RatingRadarProps) {
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size * 0.35;
  const labelR = size * 0.48;
  const levels = [1, 2, 3, 4, 5];
  const dims = RATING_DIMENSIONS;

  const angleStep = (2 * Math.PI) / dims.length;
  const startAngle = -Math.PI / 2;

  const getPoint = (index: number, value: number) => {
    const angle = startAngle + index * angleStep;
    const r = (value / 5) * maxR;
    return {
      x: cx + r * Math.cos(angle),
      y: cy + r * Math.sin(angle),
    };
  };

  const getLabelPos = (index: number) => {
    const angle = startAngle + index * angleStep;
    return {
      x: cx + labelR * Math.cos(angle),
      y: cy + labelR * Math.sin(angle),
    };
  };

  const ratingValues = [
    ratings.living,
    ratings.internet,
    ratings.surroundings,
    ratings.safety,
    ratings.community,
  ];

  const dataPoints = ratingValues.map((val, i) => getPoint(i, val));
  const dataPath =
    dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  return (
    <div className="flex flex-col items-center">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="overflow-visible"
      >
        {/* Grid levels (pentagons) */}
        {levels.map((level) => {
          const pts = dims.map((_, i) => getPoint(i, level));
          const path =
            pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
          return (
            <path
              key={level}
              d={path}
              fill="none"
              stroke="currentColor"
              strokeWidth={0.5}
              className="text-border"
            />
          );
        })}

        {/* Axis lines */}
        {dims.map((_, i) => {
          const end = getPoint(i, 5);
          return (
            <line
              key={i}
              x1={cx}
              y1={cy}
              x2={end.x}
              y2={end.y}
              stroke="currentColor"
              strokeWidth={0.5}
              className="text-border"
            />
          );
        })}

        {/* Data area */}
        <path
          d={dataPath}
          fill="var(--color-brand-green)"
          fillOpacity={0.15}
          stroke="var(--color-brand-green)"
          strokeWidth={2}
        />

        {/* Data points */}
        {dataPoints.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r={3.5}
            fill="var(--color-brand-green)"
            stroke="white"
            strokeWidth={1.5}
          />
        ))}

        {/* Labels */}
        {dims.map((dim, i) => {
          const pos = getLabelPos(i);
          return (
            <g key={dim.key}>
              <text
                x={pos.x}
                y={pos.y - 7}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[11px] fill-foreground font-medium"
              >
                {dim.label}
              </text>
              <text
                x={pos.x}
                y={pos.y + 9}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-[12px] font-semibold"
                fill="var(--color-brand-green)"
              >
                {ratingValues[i].toFixed(1)}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
