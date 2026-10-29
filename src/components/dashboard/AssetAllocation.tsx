import React from 'react'
import { PieChart, ArrowLeftRight, TrendingUp, TrendingDown } from 'lucide-react'
import { useWallet } from '../../context/WalletContext'

export const AssetAllocation: React.FC = () => {
  const { assets, setCurrentView } = useWallet()

  return (
    <div className="p-6 rounded-2xl bg-[#0D111A] border border-white/[0.08] shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <PieChart className="w-4 h-4 text-[#00F29D]" />
          <h3 className="text-base font-bold text-white tracking-tight">Portfolio Asset Allocation</h3>
        </div>
        <span className="text-xs font-mono text-slate-400">5 Active Currencies</span>
      </div>

      {/* Allocation Segment Bar */}
      <div className="w-full h-3 rounded-full bg-white/[0.05] overflow-hidden flex mb-6">
        {assets.map((asset) => (
          <div
            key={asset.id}
            style={{
              width: `${asset.allocationPct}%`,
              backgroundColor: asset.iconColor
            }}
            title={`${asset.symbol}: ${asset.allocationPct}%`}
            className="h-full transition-all duration-300 hover:opacity-80"
          />
        ))}
      </div>

      {/* Assets Table / List */}
      <div className="divide-y divide-white/[0.04]">
        {assets.map((asset) => {
          const isPositive = asset.change24h >= 0
          const usdValue = asset.balance * asset.price

          return (
            <div
              key={asset.id}
              className="py-3.5 flex items-center justify-between hover:bg-white/[0.02] px-2 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-mono font-bold text-xs text-white"
                  style={{ backgroundColor: `${asset.iconColor}20`, border: `1px solid ${asset.iconColor}40` }}
                >
                  <span style={{ color: asset.iconColor }}>{asset.symbol.substring(0, 3)}</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white group-hover:text-[#00F29D] transition-colors">
                      {asset.name}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.05] text-slate-400 border border-white/[0.06]">
                      {asset.chain}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-0.5">
                    <span>${asset.price.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                    <span
                      className={`flex items-center ${
                        isPositive ? 'text-[#00F29D]' : 'text-rose-400'
                      }`}
                    >
                      {isPositive ? (
                        <TrendingUp className="w-3 h-3 inline mr-0.5" />
                      ) : (
                        <TrendingDown className="w-3 h-3 inline mr-0.5" />
                      )}
                      {isPositive ? '+' : ''}
                      {asset.change24h}%
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right flex items-center gap-4">
                <div>
                  <p className="text-sm font-bold text-white font-mono">
                    ${usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </p>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    {asset.balance.toLocaleString()} {asset.symbol} ({asset.allocationPct}%)
                  </p>
                </div>

                <button
                  onClick={() => {
                    setCurrentView('swap')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className="hidden sm:flex items-center justify-center p-2 rounded-lg bg-white/[0.04] hover:bg-[#00F29D]/20 hover:text-[#00F29D] border border-white/[0.06] hover:border-[#00F29D]/40 text-slate-400 transition-all"
                  title={`Swap ${asset.symbol}`}
                >
                  <ArrowLeftRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
