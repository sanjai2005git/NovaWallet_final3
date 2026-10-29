import React from 'react'
import { ArrowRight, Terminal, ShieldCheck } from 'lucide-react'
import { useWallet } from '../../context/WalletContext'

export const CTASection: React.FC = () => {
  const { setCurrentView } = useWallet()

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="relative p-10 sm:p-16 rounded-3xl bg-gradient-to-r from-[#0E1522] via-[#111A2E] to-[#0A121F] border border-[#00F29D]/30 shadow-glow-lg text-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00F29D]/10 rounded-full blur-3xl -z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00D2FF]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-xs font-mono text-[#00F29D] mb-6">
          <ShieldCheck className="w-4 h-4" />
          <span>Non-Custodial Architecture</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-3xl mx-auto leading-tight">
          Deploy Capital with Real-time Security &amp; Liquidity
        </h2>

        <p className="mt-4 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Access deep multi-chain order books, institutional yield vaults, and cryptographic privacy sharding today with NovaWallet 2.4.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => {
              setCurrentView('dashboard')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-[#00F29D] to-[#00D68A] hover:brightness-110 text-[#080A0F] font-bold text-sm tracking-wide shadow-glow transition-all flex items-center justify-center gap-2"
          >
            <Terminal className="w-4 h-4" />
            <span>Launch Nova Terminal</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setCurrentView('settings')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] text-white font-medium text-sm tracking-wide transition-all"
          >
            Review Multi-Sig Specs
          </button>
        </div>
      </div>
    </section>
  )
}
