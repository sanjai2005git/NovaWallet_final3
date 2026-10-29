import React from 'react'
import { DollarSign, Activity, Percent, Server, ArrowUpRight } from 'lucide-react'

export const MetricsTicker: React.FC = () => {
  const stats = [
    {
      label: 'Total Value Locked (TVL)',
      value: '$4.82B',
      change: '+18.4% YTD',
      sub: '$4,824,910,240 USD',
      icon: DollarSign,
      color: '#00F29D'
    },
    {
      label: '24h Execution Volume',
      value: '$382.4M',
      change: '+8.2% 24h',
      sub: 'Ultra-low slippage',
      icon: Activity,
      color: '#00D2FF'
    },
    {
      label: 'Average Protocol APY',
      value: '18.6%',
      change: 'Algorithmic Yield',
      sub: 'Compounded every block',
      icon: Percent,
      color: '#10B981'
    },
    {
      label: 'Institutional Nodes',
      value: '1,248',
      change: '100% Validated',
      sub: 'Global Byzantine fault tolerance',
      icon: Server,
      color: '#8B5CF6'
    }
  ]

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div
              key={i}
              className="relative p-5 rounded-2xl bg-[#0D111A]/80 border border-white/[0.08] hover:border-[#00F29D]/30 transition-all duration-300 shadow-card group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{stat.label}</span>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tracking-tight">
                  {stat.value}
                </span>
                <span className="flex items-center text-xs font-mono font-medium text-[#00F29D]">
                  <ArrowUpRight className="w-3.5 h-3.5" />
                  {stat.change}
                </span>
              </div>

              <p className="text-[11px] font-mono text-slate-500 mt-2 truncate">{stat.sub}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
