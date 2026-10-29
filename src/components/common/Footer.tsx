import React from 'react'
import { Layers, ShieldCheck, Github, Twitter, Disc as Discord, Activity } from 'lucide-react'
import { useWallet } from '../../context/WalletContext'
import { ViewMode } from '../../types'

export const Footer: React.FC = () => {
  const { setCurrentView } = useWallet()

  return (
    <footer className="border-t border-white/[0.08] bg-[#07090E] text-slate-400 text-xs">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#00F29D]/20 to-[#0D111A] border border-[#00F29D]/40 text-[#00F29D]">
                <Layers className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold tracking-wider text-white font-mono">
                NOVA<span className="text-[#00F29D]">WALLET</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              The premier institutional asset management suite. Engineered with sub-millisecond execution, multi-sig hardware security, and zero-knowledge privacy shards.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-[#00F29D] border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F29D] animate-ping" />
                Mainnet v2.4 Operational
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                <ShieldCheck className="w-3 h-3" />
                SOC-2 Type II
              </span>
            </div>
          </div>

          {/* Protocol Links */}
          <div className="space-y-3">
            <h4 className="text-white font-mono text-xs font-semibold uppercase tracking-wider">
              Terminal Suite
            </h4>
            <ul className="space-y-2">
              {(
                [
                  ['Portfolio Dashboard', 'dashboard'],
                  ['Institutional Swap', 'swap'],
                  ['Cyber Vaults & Yield', 'vaults'],
                  ['Transaction Ledger', 'ledger'],
                  ['Multi-Sig Governance', 'settings']
                ] as [string, ViewMode][]
              ).map(([label, view]) => (
                <li key={view}>
                  <button
                    onClick={() => {
                      setCurrentView(view)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                    className="hover:text-[#00F29D] transition-colors text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Security & Audit Links */}
          <div className="space-y-3">
            <h4 className="text-white font-mono text-xs font-semibold uppercase tracking-wider">
              Security & Audits
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#audits" className="hover:text-white transition-colors">
                  OpenZeppelin Formal Verification
                </a>
              </li>
              <li>
                <a href="#audits" className="hover:text-white transition-colors">
                  Trail of Bits Protocol Audit
                </a>
              </li>
              <li>
                <a href="#audits" className="hover:text-white transition-colors">
                  Immunefi $5M Bug Bounty
                </a>
              </li>
              <li>
                <a href="#timelock" className="hover:text-white transition-colors">
                  Timelock Multisig Specifications
                </a>
              </li>
              <li>
                <a href="#compliance" className="hover:text-white transition-colors">
                  Institutional Travel Rule
                </a>
              </li>
            </ul>
          </div>

          {/* Community & Developer */}
          <div className="space-y-3">
            <h4 className="text-white font-mono text-xs font-semibold uppercase tracking-wider">
              Ecosystem
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#0D111A] border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-[#00F29D] hover:border-[#00F29D]/40 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#0D111A] border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-[#00F29D] hover:border-[#00F29D]/40 transition-colors"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://discord.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-[#0D111A] border border-white/[0.08] flex items-center justify-center text-slate-300 hover:text-[#00F29D] hover:border-[#00F29D]/40 transition-colors"
              >
                <Discord className="w-4 h-4" />
              </a>
            </div>
            <p className="text-[11px] text-slate-500 font-mono pt-2">
              RPC Latency: <span className="text-[#00F29D]">18ms</span> (P99)
            </p>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 font-mono">
          <p>© 2026 Nova Protocol Foundation. High-Fidelity Private Wealth Architecture.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-300 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-300 cursor-pointer">Privacy Framework</span>
            <span className="hover:text-slate-300 cursor-pointer">System Status</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
