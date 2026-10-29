import React from 'react'
import { TrendingUp, Lock, Wallet, Sparkles, ArrowUpRight } from 'lucide-react'
import { useWallet } from '../../context/WalletContext'

export const MetricCards: React.FC = () => {
  const { wallet } = useWallet()

  const metrics = [
    {
      label: '24h Net Gain',
      value: `+$${wallet.netWorthChange24h.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      sub: `+${wallet.netWorthChangePct24h}% portfolio expansion`,
      icon: TrendingUp,
      color: '#00F29D'
    },
    {
      label: 'Total Assets Staked',
      value: `$${wallet.stakedAssetsUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      sub: 'Earning ~18.6% composite APY',
      icon: Lock,
      color: '#00D2FF'
    },
    {
      label: 'Liquid / Available Cash',
      value: `$${wallet.availableCashUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      sub: 'Immediate settlement liquidity',
      icon: Wallet,
      color: '#10B981'
    },
    {
      label: 'Accumulated Yield Harvested',
      value: `$${wallet.accumulatedYieldUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      sub: 'All-time smart contract returns',
      icon: Sparkles,
      color: '#8B5CF6'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, idx) => {
        const Icon = m.icon
        return (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-[#0D111A] border border-white/[0.08] hover:border-white/[0.16] transition-all duration-200 shadow-card group"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{m.label}</span>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform group-hover:scale-110"
                style={{ backgroundColor: `${m.color}15`, color: m.color }}
              >
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="text-xl sm:text-2xl font-extrabold text-white font-mono tracking-tight">
              {m.value}
            </div>

            <p className="text-[11px] font-mono text-slate-500 mt-2 truncate flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3 text-[#00F29D]" />
              {m.sub}
            </p>
          </div>
        )
      })}
    </div>
  )
}
