import React, { useState, useId } from 'react'
import { TrendingUp, BarChart2, Calendar } from 'lucide-react'

type TimeRange = '1D' | '1W' | '1M' | '1Y' | 'ALL'

export const PerformanceChart: React.FC = () => {
  const [range, setRange] = useState<TimeRange>('1M')
  const [hoveredPoint, setHoveredPoint] = useState<{ x: number; y: number; val: number; label: string } | null>(null)
  const gradientId = useId()

  const rangeData: Record<TimeRange, { values: number[]; labels: string[]; gain: string }> = {
    '1D': {
      values: [971000, 973400, 972000, 978900, 976500, 981200, 985250],
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', 'Now'],
      gain: '+1.47%'
    },
    '1W': {
      values: [942000, 948000, 955000, 962000, 971000, 979000, 985250],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Today'],
      gain: '+4.59%'
    },
    '1M': {
      values: [860000, 875000, 890000, 915000, 930000, 945000, 960000, 985250],
      labels: ['Oct 1', 'Oct 6', 'Oct 11', 'Oct 16', 'Oct 21', 'Oct 25', 'Oct 28', 'Oct 29'],
      gain: '+14.56%'
    },
    '1Y': {
      values: [540000, 590000, 640000, 710000, 780000, 840000, 910000, 985250],
      labels: ['Nov', 'Jan', 'Mar', 'May', 'Jul', 'Sep', 'Oct', 'Current'],
      gain: '+82.45%'
    },
    'ALL': {
      values: [220000, 310000, 450000, 620000, 780000, 985250],
      labels: ['2023', '2024 H1', '2024 H2', '2025 H1', '2025 H2', '2026'],
      gain: '+347.84%'
    }
  }

  const current = rangeData[range]
  const minVal = Math.min(...current.values)
  const maxVal = Math.max(...current.values)
  const valRange = maxVal - minVal || 1

  const width = 600
  const height = 220
  const paddingX = 20
  const paddingY = 30

  const points = current.values.map((v, i) => {
    const x = paddingX + (i / (current.values.length - 1)) * (width - 2 * paddingX)
    const y = height - paddingY - ((v - minVal) / valRange) * (height - 2 * paddingY)
    return { x, y, val: v, label: current.labels[i] }
  })

  const pathD = points.reduce((acc, p, i) => (i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`), '')
  const areaD = `${pathD} L ${points[points.length - 1].x} ${height - paddingY} L ${points[0].x} ${height - paddingY} Z`

  return (
    <div className="p-6 rounded-2xl bg-[#0D111A] border border-white/[0.08] shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <BarChart2 className="w-4 h-4 text-[#00F29D]" />
            <h3 className="text-base font-bold text-white tracking-tight">Portfolio Performance</h3>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Institutional Net Asset Value (NAV) Historical Trajectory
          </p>
        </div>

        {/* Timeframe Buttons */}
        <div className="flex items-center bg-white/[0.04] p-1 rounded-xl border border-white/[0.06]">
          {(['1D', '1W', '1M', '1Y', 'ALL'] as TimeRange[]).map((t) => (
            <button
              key={t}
              onClick={() => {
                setRange(t)
                setHoveredPoint(null)
              }}
              className={`px-3 py-1 rounded-lg text-xs font-mono font-semibold transition-all ${
                range === t
                  ? 'bg-[#00F29D] text-[#080A0F] shadow-glow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Canvas */}
      <div className="relative w-full h-[240px] bg-[#090C13] rounded-xl p-3 border border-white/[0.04] select-none">
        {/* Tooltip Overlay */}
        {hoveredPoint && (
          <div
            className="absolute z-20 pointer-events-none transform -translate-x-1/2 -translate-y-full -mt-2 bg-[#131926] border border-[#00F29D]/40 rounded-lg px-3 py-1.5 shadow-xl text-center"
            style={{
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: `${(hoveredPoint.y / height) * 100}%`
            }}
          >
            <p className="text-[10px] font-mono text-slate-400">{hoveredPoint.label}</p>
            <p className="text-xs font-mono font-bold text-[#00F29D]">
              ${hoveredPoint.val.toLocaleString()}
            </p>
          </div>
        )}

        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-full overflow-visible"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00F29D" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#00F29D" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Guidelines */}
          <line x1={paddingX} y1={paddingY} x2={width - paddingX} y2={paddingY} stroke="#ffffff08" strokeDasharray="3 3" />
          <line x1={paddingX} y1={height / 2} x2={width - paddingX} y2={height / 2} stroke="#ffffff08" strokeDasharray="3 3" />
          <line x1={paddingX} y1={height - paddingY} x2={width - paddingX} y2={height - paddingY} stroke="#ffffff10" />

          {/* Area Fill */}
          <path d={areaD} fill={`url(#${gradientId})`} />

          {/* Smooth Line */}
          <path
            d={pathD}
            fill="none"
            stroke="#00F29D"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Interactive Points */}
          {points.map((p, i) => (
            <g key={i}>
              <circle
                cx={p.x}
                cy={p.y}
                r="4"
                fill="#0D111A"
                stroke="#00F29D"
                strokeWidth="2"
                className="cursor-pointer hover:r-6 transition-all"
                onMouseEnter={() => setHoveredPoint(p)}
              />
            </g>
          ))}
        </svg>

        {/* X-Axis Labels */}
        <div className="flex justify-between px-2 text-[10px] font-mono text-slate-500 mt-1">
          {current.labels.map((lbl, idx) => (
            <span key={idx}>{lbl}</span>
          ))}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2">
        <div className="flex items-center gap-4">
          <span>
            Period Gain: <strong className="text-[#00F29D]">{current.gain}</strong>
          </span>
          <span className="hidden sm:inline">
            Period High: <strong className="text-white">${maxVal.toLocaleString()}</strong>
          </span>
          <span className="hidden sm:inline">
            Period Low: <strong className="text-white">${minVal.toLocaleString()}</strong>
          </span>
        </div>
        <span className="text-[#00F29D] flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00F29D]" />
          Real-Time Oracle Feed
        </span>
      </div>
    </div>
  )
}
