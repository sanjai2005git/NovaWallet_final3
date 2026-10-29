import React from 'react'
import { Lock, Sparkles, Gift, ArrowUpRight, ShieldCheck, AlertCircle } from 'lucide-react'
import { useWallet } from '../../context/WalletContext'
import { Vault } from '../../types'

export const VaultTierGrid: React.FC = () => {
  const { vaults, claimVaultRewards } = useWallet()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-white tracking-tight">Active Protocol Vaults</h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Real-time APYs with automated compounding and reward redistribution
          </p>
        </div>
        <span className="text-xs font-mono text-slate-400">Total TVL: $2.77B</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {vaults.map((vault) => {
          return (
            <div
              key={vault.id}
              className={`p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                vault.isFeatured
                  ? 'bg-gradient-to-br from-[#0F1626] to-[#0A0E18] border-2 border-[#00F29D]/50 shadow-glow'
                  : 'bg-[#0D111A] border border-white/[0.08] shadow-card hover:border-white/[0.16]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-white tracking-tight">{vault.title}</h4>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-slate-300 border border-white/[0.08]">
                        {vault.symbol}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-slate-400 mt-0.5 block">{vault.tag}</span>
                  </div>

                  <div className="text-right">
                    <span className="text-2xl font-extrabold text-[#00F29D] font-mono block">
                      {vault.apy}%
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Net APY</span>
                  </div>
                </div>

                {/* Staked Metrics */}
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-[#090C13] border border-white/[0.04] text-xs font-mono my-4">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Your Position</span>
                    <span className="text-white font-bold text-sm">
                      ${vault.userStakedUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">Total TVL</span>
                    <span className="text-slate-300 font-bold text-sm">
                      ${(vault.tvlUsd / 1000000).toFixed(1)}M USD
                    </span>
                  </div>
                </div>

                {/* Unclaimed Rewards */}
                <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center justify-between text-xs font-mono mb-4">
                  <div>
                    <span className="text-slate-400 block text-[10px] uppercase">Unclaimed Yield</span>
                    <span className="text-[#00F29D] font-bold text-sm">
                      +${vault.unclaimedRewardsUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })} USDC
                    </span>
                  </div>

                  <button
                    onClick={() => claimVaultRewards(vault.id)}
                    disabled={vault.unclaimedRewardsUsd <= 0}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                      vault.unclaimedRewardsUsd > 0
                        ? 'bg-[#00F29D]/20 hover:bg-[#00F29D]/30 text-[#00F29D] border border-[#00F29D]/40'
                        : 'bg-white/[0.03] text-slate-500 border border-white/[0.04] cursor-not-allowed'
                    }`}
                  >
                    <Gift className="w-3.5 h-3.5" />
                    <span>Harvest</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-3 border-t border-white/[0.06]">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#00F29D]" />
                  Risk Level: <strong className="text-white">{vault.riskLevel}</strong>
                </span>
                <span>
                  Lock: <strong className="text-white">{vault.lockPeriodDays === 0 ? 'Flexible' : `${vault.lockPeriodDays} Days`}</strong>
                </span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
