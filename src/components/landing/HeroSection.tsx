import React from 'react'
import { ArrowRight, ShieldCheck, Zap, Lock, Terminal, TrendingUp } from 'lucide-react'
import { useWallet } from '../../context/WalletContext'

export const HeroSection: React.FC = () => {
  const { setCurrentView } = useWallet()

  return (
    <section className="relative pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#00F29D]/12 via-[#00D2FF]/5 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

      {/* Cyber Grid pattern lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10 pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-[#00F29D]/30 shadow-glow-sm mb-8 animate-fade-in">
          <span className="flex h-2 w-2 rounded-full bg-[#00F29D] animate-ping" />
          <span className="text-xs font-mono font-medium text-slate-200">
            Next-Gen Autonomous Liquidity & Private Wealth Protocol v2.4
          </span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#00F29D]/20 text-[#00F29D]">
            AUDITED
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] max-w-5xl mx-auto">
          Next-Generation{' '}
          <span className="text-gradient-mint">Private Wealth</span> &amp;{' '}
          <span className="relative inline-block">
            Frictionless Liquidity
            <span className="absolute left-0 bottom-1 w-full h-[3px] bg-gradient-to-r from-[#00F29D] to-transparent" />
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed font-normal">
          Institutional-grade decentralized asset management, sub-millisecond multi-chain execution, automated yield aggregation, and zero-knowledge cryptographic privacy.
        </p>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              setCurrentView('dashboard')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#00F29D] to-[#00D68A] hover:brightness-110 text-[#080A0F] font-bold text-sm tracking-wide shadow-glow transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <Terminal className="w-4 h-4 text-[#080A0F]" />
            <span>Launch Nova Terminal</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => {
              setCurrentView('swap')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] hover:border-[#00F29D]/40 text-white font-medium text-sm tracking-wide transition-all duration-200 flex items-center justify-center gap-2"
          >
            <Zap className="w-4 h-4 text-[#00F29D]" />
            <span>Multi-Asset DEX</span>
          </button>
        </div>

        {/* Micro Guarantees */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#00F29D]" />
            <span>Multi-Sig Hardware Enclave</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#00F29D]" />
            <span>Zero-Knowledge Privacy Sharding</span>
          </div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-[#00F29D]" />
            <span>Automated MEV Defense</span>
          </div>
        </div>
      </div>
    </section>
  )
}
