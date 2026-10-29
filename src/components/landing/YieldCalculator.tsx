import React, { useState, useId } from 'react'
import { Calculator, TrendingUp, Sparkles, ArrowRight } from 'lucide-react'
import { useWallet } from '../../context/WalletContext'

export const YieldCalculator: React.FC = () => {
  const { setCurrentView } = useWallet()
  const [deposit, setDeposit] = useState<number>(100000)
  const [months, setMonths] = useState<number>(12)
  const [strategyApy, setStrategyApy] = useState<number>(24.5)
  const gradientId = useId()

  // Compound Interest: A = P * (1 + r/12)^(months)
  const rate = strategyApy / 100
  const finalAmount = deposit * Math.pow(1 + rate / 12, months)
  const totalEarned = finalAmount - deposit

  const strategies = [
    { name: 'USDC Reserve', apy: 8.5 },
    { name: 'ETH Liquid Staking', apy: 14.2 },
    { name: 'NOVA Alpha Vault', apy: 24.5 },
    { name: 'Sovereign Multi-Strategy', apy: 32.8 }
  ]

  // Generate SVG curve points
  const pointsCount = 10
  const points = Array.from({ length: pointsCount }, (_, i) => {
    const fraction = i / (pointsCount - 1)
    const currentMonths = fraction * months
    const value = deposit * Math.pow(1 + rate / 12, currentMonths)
    const x = fraction * 400
    // Normalized y between 160 and 20
    const normalizedY = 170 - ((value - deposit) / Math.max(totalEarned, 1)) * 140
    return `${x},${normalizedY}`
  }).join(' ')

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F29D]/10 border border-[#00F29D]/30 text-[#00F29D] text-xs font-mono mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Interactive Capital Simulation</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Algorithmic Yield &amp; Compounding Engine
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
          Simulate historical multi-tier vault yields backed by automated protocol liquidation rewards and zero-loss liquidity routing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Controls Card */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-2xl bg-[#0D111A] border border-white/[0.08] shadow-card flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-6">
              <Calculator className="w-5 h-5 text-[#00F29D]" />
              <h3 className="text-base font-bold text-white tracking-tight">Configure Parameters</h3>
            </div>

            {/* Deposit Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono text-slate-400 uppercase">Capital Commitment</span>
                <span className="text-sm font-mono font-bold text-white">
                  ${deposit.toLocaleString()} USD
                </span>
              </div>
              <input
                type="range"
                min="5000"
                max="1000000"
                step="5000"
                value={deposit}
                onChange={(e) => setDeposit(Number(e.target.value))}
                className="w-full h-2 bg-white/[0.08] rounded-lg appearance-none cursor-pointer accent-[#00F29D]"
              />
              <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
                <span>$5,000</span>
                <span>$500,000</span>
                <span>$1,000,000+</span>
              </div>
            </div>

            {/* Timeframe Slider */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono text-slate-400 uppercase">Lock Duration</span>
                <span className="text-sm font-mono font-bold text-[#00F29D]">
                  {months} Months ({Math.round(months * 30.4)} Days)
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[3, 6, 12, 24].map((m) => (
                  <button
                    key={m}
                    onClick={() => setMonths(m)}
                    className={`py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                      months === m
                        ? 'bg-[#00F29D] text-[#080A0F] shadow-glow-sm'
                        : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]'
                    }`}
                  >
                    {m}M
                  </button>
                ))}
              </div>
            </div>

            {/* Strategy Select */}
            <div>
              <span className="block text-xs font-mono text-slate-400 uppercase mb-2">Vault Protocol</span>
              <div className="grid grid-cols-2 gap-2">
                {strategies.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setStrategyApy(s.apy)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      strategyApy === s.apy
                        ? 'bg-[#00F29D]/15 border-[#00F29D] text-white shadow-glow-sm'
                        : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:border-white/[0.15]'
                    }`}
                  >
                    <p className="text-xs font-semibold truncate">{s.name}</p>
                    <p className="text-xs font-mono text-[#00F29D] mt-0.5">{s.apy}% APY</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/[0.08]">
            <button
              onClick={() => {
                setCurrentView('vaults')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#00F29D] to-[#00D68A] hover:brightness-110 text-[#080A0F] font-bold text-xs tracking-wide shadow-glow transition-all flex items-center justify-center gap-2"
            >
              <span>Stake Into This Vault</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Output & Chart Card */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-2xl bg-[#0D111A] border border-white/[0.08] shadow-card flex flex-col justify-between">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
              <div>
                <span className="text-xs font-mono text-slate-400 uppercase">Projected Net Returns</span>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#00F29D] font-mono mt-1">
                  +${totalEarned.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
              <div className="sm:text-right">
                <span className="text-xs font-mono text-slate-400 uppercase">Final Portfolio Value</span>
                <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono mt-1">
                  ${finalAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            {/* Visual SVG Chart */}
            <div className="mt-8 relative">
              <div className="flex justify-between items-center text-xs font-mono text-slate-400 mb-2">
                <span>Compound Trajectory Curve</span>
                <span className="text-[#00F29D]">Daily Auto-Reinvesting</span>
              </div>

              <div className="w-full h-48 bg-[#090C12] rounded-xl p-3 border border-white/[0.06] flex items-end">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 400 180" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#00F29D" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#00F29D" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>
                  {/* Grid horizontal guidelines */}
                  <line x1="0" y1="40" x2="400" y2="40" stroke="#ffffff10" strokeDasharray="3 3" />
                  <line x1="0" y1="90" x2="400" y2="90" stroke="#ffffff10" strokeDasharray="3 3" />
                  <line x1="0" y1="140" x2="400" y2="140" stroke="#ffffff10" strokeDasharray="3 3" />

                  {/* Shaded Area */}
                  <polygon
                    points={`0,170 ${points} 400,170`}
                    fill={`url(#${gradientId})`}
                  />

                  {/* Line */}
                  <polyline
                    fill="none"
                    stroke="#00F29D"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    points={points}
                  />

                  {/* Pulsing point at end */}
                  <circle cx="400" cy={170 - ((finalAmount - deposit) / Math.max(totalEarned, 1)) * 140} r="5" fill="#00F29D" />
                </svg>
              </div>

              <div className="flex justify-between text-[11px] font-mono text-slate-500 mt-2 px-1">
                <span>Month 0 (${deposit.toLocaleString()})</span>
                <span>Month {Math.round(months / 2)}</span>
                <span>Month {months} (${Math.round(finalAmount).toLocaleString()})</span>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#00F29D]" />
              Zero slippage, zero withdrawal penalties on flexible tiers
            </span>
            <span className="font-mono text-slate-300">Audited By OpenZeppelin</span>
          </div>
        </div>
      </div>
    </section>
  )
}
