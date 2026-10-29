import React from 'react'
import { TrendingUp, BarChart3, Clock, ShieldCheck } from 'lucide-react'

export const MarketStats: React.FC = () => {
  const stats = [
    { label: '24h Trading Volume', value: '$54,820,100.00', icon: BarChart3, color: '#00F29D' },
    { label: 'MEV Route Efficiency', value: '99.98%', icon: ShieldCheck, color: '#00D2FF' },
    { label: 'Average Settlement Gas', value: '$2.15 USD', icon: Clock, color: '#10B981' },
    { label: 'Aggregated TVL Depth', value: '$1.84 Billion', icon: TrendingUp, color: '#8B5CF6' }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => {
        const Icon = s.icon
        return (
          <div
            key={i}
            className="p-4 rounded-2xl bg-[#0D111A] border border-white/[0.08] shadow-card flex items-center justify-between"
          >
            <div>
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
                {s.label}
              </span>
              <p className="text-base sm:text-lg font-extrabold text-white font-mono mt-1">
                {s.value}
              </p>
            </div>
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: `${s.color}15`, color: s.color }}
            >
              <Icon className="w-4 h-4" />
            </div>
          </div>
        )
      })}
    </div>
  )
}
