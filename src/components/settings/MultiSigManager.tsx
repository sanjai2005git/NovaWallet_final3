import React from 'react'
import { Users, Key, ShieldCheck, Check, Smartphone } from 'lucide-react'
import { initialSigners } from '../../data/initialState'

export const MultiSigManager: React.FC = () => {
  return (
    <div className="p-6 rounded-3xl bg-[#0D111A] border border-white/[0.08] shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#00F29D]" />
            <h3 className="text-base font-bold text-white tracking-tight">Multi-Signature Governance Quorum</h3>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Cryptographic M-of-N threshold required to authorize high-value transactions
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#00F29D]/15 text-[#00F29D] border border-[#00F29D]/30 font-mono text-xs font-bold">
          <ShieldCheck className="w-4 h-4" />
          <span>3 of 5 Signatures Required</span>
        </div>
      </div>

      <div className="mt-5 divide-y divide-white/[0.04]">
        {initialSigners.map((signer) => (
          <div
            key={signer.id}
            className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#131926] border border-white/[0.06] flex items-center justify-center text-slate-300">
                <Key className="w-4 h-4 text-[#00F29D]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{signer.name}</span>
                  {signer.isYou && (
                    <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-[#00F29D]/20 text-[#00F29D]">
                      YOU
                    </span>
                  )}
                  <span className="text-[11px] font-mono text-slate-400">({signer.role})</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400 font-mono mt-0.5">
                  <span>{signer.device}</span>
                  <span>•</span>
                  <span>{signer.address.substring(0, 10)}...{signer.address.substring(signer.address.length - 6)}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center font-mono">
              <span className="text-[11px] text-slate-400">{signer.lastActive}</span>
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                <Check className="w-3 h-3" /> Active Signer
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
