import React, { useState } from 'react'
import {
  History,
  ArrowRight,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeftRight,
  Lock,
  Gift,
  TrendingUp,
  TrendingDown,
  Briefcase,
  Copy,
  ExternalLink,
  CheckCircle2
} from 'lucide-react'
import { useWallet } from '../../context/WalletContext'
import { Transaction, StockActivity } from '../../types'

interface RecentActivityProps {
  onSelectTx: (tx: Transaction) => void
}

export const RecentActivity: React.FC<RecentActivityProps> = ({ onSelectTx }) => {
  const { transactions, stockActivities, setCurrentView, addToast } = useWallet()
  const [activeTab, setActiveTab] = useState<'TRANSACTIONS' | 'STOCKS'>('TRANSACTIONS')

  const getTxIcon = (type: Transaction['type']) => {
    switch (type) {
      case 'deposit':
        return <ArrowDownLeft className="w-4 h-4 text-emerald-400" />
      case 'transfer':
      case 'withdraw':
        return <ArrowUpRight className="w-4 h-4 text-rose-400" />
      case 'swap':
        return <ArrowLeftRight className="w-4 h-4 text-[#00D2FF]" />
      case 'stake':
        return <Lock className="w-4 h-4 text-amber-400" />
      case 'reward':
        return <Gift className="w-4 h-4 text-[#00F29D]" />
      case 'stock_trade':
        return <Briefcase className="w-4 h-4 text-purple-400" />
      default:
        return <ArrowLeftRight className="w-4 h-4 text-slate-400" />
    }
  }

  const copyText = (txt: string) => {
    navigator.clipboard.writeText(txt)
    addToast('Copied to Clipboard', txt, 'info')
  }

  return (
    <div className="p-6 rounded-3xl bg-[#0D111A] border border-white/[0.08] shadow-card">
      {/* Header with Switcher Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <History className="w-5 h-5 text-[#00F29D]" />
            <h3 className="text-base font-bold text-white tracking-tight">
              Activity &amp; Settlement Ledger
            </h3>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Real-time feed of all confirmed transfers, DEX swaps, and stock executions
          </p>
        </div>

        {/* Dual Tab Switcher */}
        <div className="flex items-center bg-white/[0.04] p-1 rounded-xl border border-white/[0.06]">
          <button
            onClick={() => setActiveTab('TRANSACTIONS')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'TRANSACTIONS'
                ? 'bg-[#00F29D] text-[#080A0F] shadow-glow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Recent Transactions ({transactions.length})
          </button>
          <button
            onClick={() => setActiveTab('STOCKS')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'STOCKS'
                ? 'bg-[#00F29D] text-[#080A0F] shadow-glow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Stocks Activity ({stockActivities.length})
          </button>
        </div>
      </div>

      {/* Content for TAB 1: Recent Transactions */}
      {activeTab === 'TRANSACTIONS' && (
        <div className="mt-4 space-y-2.5">
          {transactions.slice(0, 6).map((tx) => (
            <div
              key={tx.id}
              onClick={() => onSelectTx(tx)}
              className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] hover:border-[#00F29D]/30 flex items-center justify-between cursor-pointer transition-all duration-200 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#131926] border border-white/[0.06] flex items-center justify-center group-hover:scale-105 transition-transform">
                  {getTxIcon(tx.type)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-white uppercase font-mono group-hover:text-[#00F29D] transition-colors">
                      {tx.type}: {tx.tokenSymbol}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[#00F29D] bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                      <span className="w-1 h-1 rounded-full bg-[#00F29D]" />
                      {tx.status}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                    {tx.timestamp} • To: {tx.toAddress.substring(0, 14)}...
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-sm font-bold font-mono text-white">
                  ${tx.usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                  Fee: ${tx.networkFeeUsd.toFixed(2)} USD
                </p>
              </div>
            </div>
          ))}

          <div className="pt-3 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Showing latest {Math.min(6, transactions.length)} transactions</span>
            <button
              onClick={() => {
                setCurrentView('ledger')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="text-[#00F29D] hover:underline flex items-center gap-1 font-bold"
            >
              <span>Open Master Ledger</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Content for TAB 2: Stocks Activity History */}
      {activeTab === 'STOCKS' && (
        <div className="mt-4 space-y-2.5">
          {stockActivities.map((act) => {
            const isBuy = act.action === 'BUY'
            return (
              <div
                key={act.id}
                className="p-3.5 rounded-2xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] hover:border-[#00F29D]/30 flex items-center justify-between transition-all duration-200 group"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-mono font-bold text-xs ${
                      isBuy
                        ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                        : 'bg-rose-500/15 border border-rose-500/30 text-rose-400'
                    }`}
                  >
                    {isBuy ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white font-mono">
                        {act.action} {act.shares} Shares of {act.stockSymbol}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/[0.06] text-slate-300">
                        {act.orderId}
                      </span>
                      <span className="text-[10px] font-mono text-[#00F29D] bg-emerald-500/10 px-1.5 py-0.2 rounded">
                        {act.status}
                      </span>
                    </div>
                    <p className="text-[11px] font-mono text-slate-400 mt-0.5">
                      {act.timestamp} • @ ${act.sharePrice.toFixed(2)}/share
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p
                    className={`text-sm font-bold font-mono ${
                      isBuy ? 'text-white' : 'text-[#00F29D]'
                    }`}
                  >
                    {isBuy ? '-' : '+'}${act.totalUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
                  </p>
                  <p className="text-[10px] font-mono text-slate-500 mt-0.5">
                    Nasdaq Settlement
                  </p>
                </div>
              </div>
            )
          })}

          <div className="pt-3 flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Showing {stockActivities.length} institutional stock executions</span>
            <span className="text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              100% Filled &amp; Cleared
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
