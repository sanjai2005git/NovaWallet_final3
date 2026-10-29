import React from 'react'
import {
  FileText,
  DollarSign,
  TrendingUp,
  Lock,
  Download,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react'
import { useWallet } from '../../context/WalletContext'

export const LedgerHeader: React.FC = () => {
  const { wallet, exportLedgerCSV } = useWallet()

  const stats = [
    {
      label: 'Settled Liquid Reserve',
      value: `$${wallet.availableCashUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      sub: 'Zero timelock delay',
      color: '#00F29D'
    },
    {
      label: 'Active Staked in Vaults',
      value: `$${wallet.stakedAssetsUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      sub: 'Yield accruing every block',
      color: '#00D2FF'
    },
    {
      label: 'Institutional Clearance',
      value: '$138,000.00',
      sub: 'Inbound wire verified',
      color: '#10B981'
    },
    {
      label: 'Cumulative Protocol Yield',
      value: `$${wallet.accumulatedYieldUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      sub: 'Audited harvest returns',
      color: '#8B5CF6'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Primary Settlement Banner */}
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0D121D] via-[#0E1524] to-[#0A0E18] border border-white/[0.08] shadow-card flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              Account Balance &amp; Transaction Ledger
            </span>
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-[#00F29D] border border-emerald-500/20">
              <CheckCircle2 className="w-3 h-3" />
              Fully Reconciled
            </span>
          </div>

          <div className="flex items-baseline gap-3">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
              ${wallet.totalSettledBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </h1>
            <span className="text-xs font-mono text-slate-400">USD SETTLED</span>
          </div>

          <p className="text-xs font-mono text-slate-400 mt-2">
            All transactions cryptographically sealed with verifiable SHA-256 Merkle root proofs.
          </p>
        </div>

        <button
          onClick={exportLedgerCSV}
          className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#00F29D] to-[#00D68A] hover:brightness-110 text-[#080A0F] font-bold text-xs tracking-wide shadow-glow transition-all"
        >
          <Download className="w-4 h-4" />
          <span>Export Audit CSV Statement</span>
        </button>
      </div>

      {/* 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => (
          <div
            key={idx}
            className="p-4 rounded-2xl bg-[#0D111A] border border-white/[0.08] shadow-card"
          >
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block">
              {s.label}
            </span>
            <p className="text-lg sm:text-xl font-extrabold text-white font-mono mt-1">
              {s.value}
            </p>
            <p className="text-[10px] font-mono text-slate-500 mt-1 truncate">{s.sub}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
