import React from 'react'
import { ShieldCheck, UserCheck, Key, Lock, CheckCircle2, Copy } from 'lucide-react'
import { useWallet } from '../../context/WalletContext'

export const UserProfileCard: React.FC = () => {
  const { wallet, addToast } = useWallet()

  const copyAddress = () => {
    navigator.clipboard.writeText(wallet.address)
    addToast('Copied to Clipboard', wallet.address, 'info')
  }

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0D121D] via-[#0E1524] to-[#0A0E18] border border-white/[0.08] shadow-card">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00F29D]/20 via-[#131926] to-[#00D2FF]/20 border border-[#00F29D]/40 flex items-center justify-center text-2xl font-bold font-mono text-[#00F29D] shadow-glow-sm">
            AV
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">{wallet.accountName}</h2>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-[#00F29D]/20 text-[#00F29D] border border-[#00F29D]/40">
                VERIFIED TIER 4
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Enterprise Institutional Custody • ID #NV-94021
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="font-mono text-xs text-slate-300">
                {wallet.address.substring(0, 10)}...{wallet.address.substring(wallet.address.length - 8)}
              </span>
              <button
                onClick={copyAddress}
                className="text-slate-400 hover:text-[#00F29D] transition-colors p-1"
                title="Copy address"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Security Score Badge */}
        <div className="flex items-center gap-4 sm:border-l sm:border-white/[0.08] sm:pl-6">
          <div className="text-right">
            <span className="text-xs font-mono text-slate-400 uppercase">Security Health</span>
            <div className="text-2xl font-extrabold text-[#00F29D] font-mono mt-0.5">98 / 100</div>
            <span className="text-[11px] font-mono text-emerald-400">Institutional Grade</span>
          </div>

          <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[#00F29D]">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>
      </div>
    </div>
  )
}
