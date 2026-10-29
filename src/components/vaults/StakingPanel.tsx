import React, { useState } from 'react'
import { Lock, Calculator, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react'
import { useWallet } from '../../context/WalletContext'

export const StakingPanel: React.FC = () => {
  const { vaults, wallet, stakeInVault } = useWallet()
  const [selectedVaultId, setSelectedVaultId] = useState(vaults[0]?.id || '')
  const [amount, setAmount] = useState('25000')
  const [lockDays, setLockDays] = useState(90)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const activeVault = vaults.find((v) => v.id === selectedVaultId) || vaults[0]
  const numericAmount = parseFloat(amount) || 0
  const projectedApy = activeVault ? activeVault.apy : 24.5
  const estimatedAnnualYield = (numericAmount * projectedApy) / 100
  const estimatedMonthlyYield = estimatedAnnualYield / 12

  const handleStake = (e: React.FormEvent) => {
    e.preventDefault()
    if (numericAmount <= 0) return
    setIsSubmitting(true)
    setTimeout(() => {
      stakeInVault(activeVault.id, numericAmount)
      setIsSubmitting(false)
      setAmount('')
    }, 1000)
  }

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#0D111A] border border-white/[0.08] shadow-card">
      <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#00F29D]/15 text-[#00F29D] border border-[#00F29D]/30 flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white tracking-tight">Direct Vault Staking Terminal</h3>
            <p className="text-xs text-slate-400">Lock liquidity to earn institutional yield dividends</p>
          </div>
        </div>

        <span className="text-xs font-mono text-[#00F29D] bg-[#00F29D]/10 px-3 py-1 rounded-full border border-[#00F29D]/30">
          Target APY: {projectedApy}%
        </span>
      </div>

      <form onSubmit={handleStake} className="mt-6 space-y-5">
        <div>
          <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Select Target Vault</label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {vaults.map((v) => (
              <button
                type="button"
                key={v.id}
                onClick={() => setSelectedVaultId(v.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  selectedVaultId === v.id
                    ? 'bg-[#00F29D]/15 border-[#00F29D] text-white shadow-glow-sm'
                    : 'bg-white/[0.02] border-white/[0.06] text-slate-400 hover:border-white/[0.15]'
                }`}
              >
                <p className="text-xs font-bold truncate">{v.title}</p>
                <p className="text-xs font-mono text-[#00F29D] mt-1">{v.apy}% APY</p>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-xs font-mono text-slate-400 uppercase">Deposit Amount (USD Value)</label>
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="text-slate-400">
                Available Liquid: ${wallet.availableCashUsd.toLocaleString()} USD
              </span>
              <button
                type="button"
                onClick={() => setAmount(wallet.availableCashUsd.toString())}
                className="text-[#00F29D] font-bold hover:underline"
              >
                MAX
              </button>
            </div>
          </div>
          <div className="relative">
            <input
              type="number"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-[#131926] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-xl font-mono focus:outline-none focus:border-[#00F29D] transition-colors"
              required
            />
            <span className="absolute right-4 top-3.5 text-xs font-mono text-slate-400">USD</span>
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono text-slate-400 uppercase mb-2">Commitment Lock Term</label>
          <div className="grid grid-cols-4 gap-2">
            {[0, 30, 90, 180].map((days) => (
              <button
                type="button"
                key={days}
                onClick={() => setLockDays(days)}
                className={`py-2 rounded-xl text-xs font-mono font-semibold transition-all ${
                  lockDays === days
                    ? 'bg-[#00F29D] text-[#080A0F] shadow-glow-sm'
                    : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]'
                }`}
              >
                {days === 0 ? 'Flexible' : `${days} Days`}
              </button>
            ))}
          </div>
        </div>

        {/* Projected Returns Summary */}
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div>
            <span className="text-slate-400 uppercase block mb-1">Estimated Monthly Harvest</span>
            <span className="text-base font-bold text-[#00F29D]">
              +${estimatedMonthlyYield.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
            </span>
          </div>
          <div>
            <span className="text-slate-400 uppercase block mb-1">Estimated Annual Harvest</span>
            <span className="text-base font-bold text-white">
              +${estimatedAnnualYield.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || numericAmount <= 0 || numericAmount > wallet.availableCashUsd}
          className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00F29D] to-[#00D68A] hover:brightness-110 text-[#080A0F] font-bold text-sm tracking-wide shadow-glow transition-all flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-[#080A0F] border-t-transparent rounded-full animate-spin" />
              <span>Locking Assets in Smart Contract...</span>
            </>
          ) : (
            <>
              <span>Deposit &amp; Lock Into {activeVault.title}</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  )
}
