import React from 'react'
import { Lock, ShieldCheck, Sparkles, Cpu } from 'lucide-react'

export const VaultHeader: React.FC = () => {
  return (
    <div className="relative p-8 rounded-3xl bg-gradient-to-r from-[#0E1524] via-[#10192E] to-[#0A101C] border border-white/[0.08] shadow-card overflow-hidden">
      <div className="absolute top-0 right-1/4 w-72 h-72 bg-[#00F29D]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F29D]/10 text-[#00F29D] text-xs font-mono mb-3 border border-[#00F29D]/30">
            <Cpu className="w-3.5 h-3.5" />
            <span>Smart Contract Vault Protocol v3.2</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Autonomous Cyber Vaults
          </h1>

          <p className="mt-3 text-sm text-slate-300 leading-relaxed">
            Multi-strategy algorithmic vaults that deploy capital across verified liquidity pools, zero-risk flash loan lending, and validator staking without custodial intermediaries.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-6 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#00F29D]" />
              Formally Verified Invariants
            </span>
            <span className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-[#00F29D]" />
              Non-Custodial Timelock
            </span>
            <span className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#00F29D]" />
              Continuous Compounding
            </span>
          </div>
        </div>

        {/* 3D Cyber Lock Visual simulation */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 mx-auto lg:mx-0 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-[#00F29D]/20 animate-spin" style={{ animationDuration: '20s' }} />
          <div className="absolute inset-3 rounded-full border border-dashed border-[#00D2FF]/30 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }} />
          <div className="w-36 h-36 rounded-2xl bg-[#131926] border border-[#00F29D]/40 shadow-glow flex flex-col items-center justify-center p-4 text-center">
            <Lock className="w-10 h-10 text-[#00F29D] mb-2 animate-bounce" style={{ animationDuration: '3s' }} />
            <span className="text-xs font-mono font-bold text-white">QUANTUM VAULT</span>
            <span className="text-[10px] font-mono text-[#00F29D]">ENCLAVE ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  )
}
