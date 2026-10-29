import React from 'react'
import { ShieldCheck, Zap, Lock, Cpu, ArrowUpRight } from 'lucide-react'

export const FeatureMatrix: React.FC = () => {
  const features = [
    {
      title: 'Sub-Millisecond Multi-Chain Routing',
      desc: 'Smart contract aggregator that calculates optimal splits across Uniswap v3, Curve, and Nova Rollup with zero frontrunning risk.',
      icon: Zap,
      tag: 'Latency < 2ms',
      color: '#00F29D'
    },
    {
      title: 'Zero-Knowledge Privacy Shards',
      desc: 'Confidential institutional transactions using recursive zk-SNARKs. Verify liquidity without publicly revealing balance or wallet identity.',
      icon: Lock,
      tag: 'zk-Rollup Architecture',
      color: '#00D2FF'
    },
    {
      title: 'Autonomous Compounding Vaults',
      desc: 'Smart yield routing that automatically harvests, swaps, and restakes asset rewards every block to maximize capital velocity.',
      icon: Cpu,
      tag: 'Algorithmic Yield',
      color: '#8B5CF6'
    },
    {
      title: 'Multi-Signature Governance Enclave',
      desc: 'Enterprise security framework requiring 3-of-5 quorum with hardware FIDO2 keys (Ledger, Trezor, YubiKey) and 24h timelocks.',
      icon: ShieldCheck,
      tag: 'SOC-2 Type II Verified',
      color: '#10B981'
    }
  ]

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <span className="text-xs font-mono text-[#00F29D] uppercase tracking-wider block mb-2">
            Institutional Architecture
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Engineered For Sovereign Wealth
          </h2>
        </div>
        <p className="text-sm text-slate-400 max-w-md">
          Every layer of the Nova stack is constructed to eliminate custody vulnerabilities, maximize execution throughput, and protect institutional privacy.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((f, i) => {
          const Icon = f.icon
          return (
            <div
              key={i}
              className="p-8 rounded-2xl bg-[#0D111A] border border-white/[0.08] hover:border-[#00F29D]/30 transition-all duration-300 shadow-card group"
            >
              <div className="flex items-center justify-between mb-6">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: `${f.color}15`, color: f.color }}
                >
                  <Icon className="w-6 h-6" />
                </div>
                <span className="px-3 py-1 text-xs font-mono rounded-full bg-white/[0.04] text-slate-300 border border-white/[0.08]">
                  {f.tag}
                </span>
              </div>

              <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-[#00F29D] transition-colors">
                {f.title}
              </h3>

              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                {f.desc}
              </p>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-1.5 text-xs font-mono text-slate-400 group-hover:text-white transition-colors">
                <span>View Protocol Specifications</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#00F29D]" />
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
