import React from 'react'
import { ShieldCheck, FileCode, CheckCircle2, Lock, Key } from 'lucide-react'

export const SecurityCert: React.FC = () => {
  const certs = [
    {
      title: 'Formal Verification by OpenZeppelin',
      status: 'Zero Critical Issues',
      date: 'Audited Oct 2026',
      hash: '0x94b...21a',
      icon: FileCode
    },
    {
      title: 'Trail of Bits Architectural Review',
      status: 'Fully Remediated',
      date: 'Audited Sept 2026',
      hash: '0x71c...08e',
      icon: ShieldCheck
    },
    {
      title: 'AICPA SOC-2 Type II Certified',
      status: 'Unqualified Audit Opinion',
      date: 'Annual Renewal 2026',
      hash: 'SOC-98214',
      icon: Lock
    },
    {
      title: 'FIDO2 Hardware Key Enforcement',
      status: 'Zero Web Phishing Risk',
      date: 'Hardware Enclave',
      hash: 'FIDO-L3',
      icon: Key
    }
  ]

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#0D111A] to-[#080A0F] border border-white/[0.08] shadow-card">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-8 border-b border-white/[0.08]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-[#00F29D] text-xs font-mono mb-3">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Independent Third-Party Verification</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Cryptographic Security &amp; Compliance Ledger
            </h3>
            <p className="text-sm text-slate-400 mt-2 max-w-xl">
              All protocol contracts are verified on-chain with continuous automated fuzzing, invariant checking, and a $5,000,000 active bug bounty.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="px-5 py-3 rounded-2xl bg-[#131926] border border-white/[0.08] text-center">
              <span className="text-xs font-mono text-slate-400 uppercase">Bug Bounty Pool</span>
              <p className="text-xl font-extrabold text-[#00F29D] font-mono mt-0.5">$5,000,000</p>
            </div>
            <div className="px-5 py-3 rounded-2xl bg-[#131926] border border-white/[0.08] text-center">
              <span className="text-xs font-mono text-slate-400 uppercase">Total Exploits</span>
              <p className="text-xl font-extrabold text-white font-mono mt-0.5">0 (Zero)</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          {certs.map((c, i) => {
            const Icon = c.icon
            return (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:border-white/[0.15] transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00F29D]/10 text-[#00F29D] flex items-center justify-center">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{c.date}</span>
                </div>
                <h4 className="text-xs font-bold text-white leading-snug">{c.title}</h4>
                <div className="mt-3 flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#00F29D]">{c.status}</span>
                  <span className="text-slate-500">{c.hash}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
