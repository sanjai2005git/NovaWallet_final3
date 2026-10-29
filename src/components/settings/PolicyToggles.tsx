import React from 'react'
import { ShieldCheck, ToggleLeft, ToggleRight, Lock } from 'lucide-react'
import { useWallet } from '../../context/WalletContext'

export const PolicyToggles: React.FC = () => {
  const { securityPolicies, toggleSecurityPolicy } = useWallet()

  return (
    <div className="p-6 rounded-3xl bg-[#0D111A] border border-white/[0.08] shadow-card">
      <div className="flex items-center gap-2 pb-5 border-b border-white/[0.08]">
        <ShieldCheck className="w-5 h-5 text-[#00F29D]" />
        <div>
          <h3 className="text-base font-bold text-white tracking-tight">Institutional Compliance &amp; Defense</h3>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Automated guardrails and enterprise security assertions
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {securityPolicies.map((p) => (
          <div
            key={p.id}
            className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.1] transition-all flex items-start justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white tracking-tight">{p.name}</span>
                {p.level && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-[#00F29D] border border-emerald-500/20">
                    {p.level}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
            </div>

            <button
              onClick={() => toggleSecurityPolicy(p.id)}
              className="text-[#00F29D] hover:brightness-110 flex-shrink-0 transition-transform active:scale-95"
            >
              {p.status ? (
                <ToggleRight className="w-8 h-8 text-[#00F29D]" />
              ) : (
                <ToggleLeft className="w-8 h-8 text-slate-600" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
