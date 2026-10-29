import React, { useState } from 'react'
import {
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeftRight,
  Lock,
  Gift,
  Copy,
  ExternalLink,
  ChevronRight,
  Download
} from 'lucide-react'
import { useWallet } from '../../context/WalletContext'
import { Transaction, TxType } from '../../types'

interface LedgerTableProps {
  onSelectTx: (tx: Transaction) => void
}

export const LedgerTable: React.FC<LedgerTableProps> = ({ onSelectTx }) => {
  const { transactions, exportLedgerCSV, addToast } = useWallet()
  const [searchTerm, setSearchTerm] = useState('')
  const [typeFilter, setTypeFilter] = useState<string>('all')

  const copyHash = (hash: string) => {
    navigator.clipboard.writeText(hash)
    addToast('Copied', 'Transaction hash copied to clipboard', 'info')
  }

  const filtered = transactions.filter((tx) => {
    const matchesSearch =
      tx.hash.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.tokenSymbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tx.note && tx.note.toLowerCase().includes(searchTerm.toLowerCase())) ||
      tx.toAddress.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = typeFilter === 'all' || tx.type === typeFilter

    return matchesSearch && matchesType
  })

  const getTxTypeBadge = (type: TxType) => {
    switch (type) {
      case 'deposit':
        return {
          bg: 'bg-emerald-500/10',
          border: 'border-emerald-500/30',
          text: 'text-emerald-400',
          icon: ArrowDownLeft
        }
      case 'transfer':
      case 'withdraw':
        return {
          bg: 'bg-rose-500/10',
          border: 'border-rose-500/30',
          text: 'text-rose-400',
          icon: ArrowUpRight
        }
      case 'swap':
        return {
          bg: 'bg-cyan-500/10',
          border: 'border-cyan-500/30',
          text: 'text-cyan-400',
          icon: ArrowLeftRight
        }
      case 'stake':
        return {
          bg: 'bg-amber-500/10',
          border: 'border-amber-500/30',
          text: 'text-amber-400',
          icon: Lock
        }
      case 'reward':
        return {
          bg: 'bg-[#00F29D]/15',
          border: 'border-[#00F29D]/30',
          text: 'text-[#00F29D]',
          icon: Gift
        }
      default:
        return {
          bg: 'bg-slate-500/10',
          border: 'border-slate-500/30',
          text: 'text-slate-300',
          icon: ArrowLeftRight
        }
    }
  }

  return (
    <div className="p-6 rounded-3xl bg-[#0D111A] border border-white/[0.08] shadow-card">
      {/* Search and Filters Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        {/* Search input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Tx hash, token, note, or address..."
            className="w-full bg-[#131926] border border-white/[0.08] focus:border-[#00F29D] rounded-xl pl-10 pr-4 py-2.5 text-xs font-mono text-white placeholder-slate-500 focus:outline-none transition-colors"
          />
        </div>

        {/* Filter buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          {['all', 'swap', 'stake', 'deposit', 'reward', 'transfer'].map((t) => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono capitalize transition-all ${
                typeFilter === t
                  ? 'bg-[#00F29D] text-[#080A0F] font-bold shadow-glow-sm'
                  : 'bg-white/[0.03] text-slate-400 hover:text-white hover:bg-white/[0.06]'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Ledger Table */}
      <div className="overflow-x-auto mt-4">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-white/[0.06] text-slate-500 uppercase text-[10px]">
              <th className="py-3 px-3">Transaction</th>
              <th className="py-3 px-3">Hash</th>
              <th className="py-3 px-3">Timestamp</th>
              <th className="py-3 px-3">Destination / Route</th>
              <th className="py-3 px-3 text-right">Value (USD)</th>
              <th className="py-3 px-3 text-right">Gas Fee</th>
              <th className="py-3 px-3 text-center">Status</th>
              <th className="py-3 px-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.03]">
            {filtered.map((tx) => {
              const badge = getTxTypeBadge(tx.type)
              const Icon = badge.icon

              return (
                <tr
                  key={tx.id}
                  className="hover:bg-white/[0.02] transition-colors group cursor-pointer"
                  onClick={() => onSelectTx(tx)}
                >
                  {/* Type */}
                  <td className="py-4 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-lg flex items-center justify-center border ${badge.bg} ${badge.border} ${badge.text}`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <span className="font-bold text-white uppercase block text-[11px]">
                          {tx.type}
                        </span>
                        <span className="text-[10px] text-slate-400">{tx.tokenSymbol}</span>
                      </div>
                    </div>
                  </td>

                  {/* Hash */}
                  <td className="py-4 px-3 whitespace-nowrap">
                    <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                      <span className="text-slate-300">
                        {tx.hash.substring(0, 8)}...{tx.hash.substring(tx.hash.length - 6)}
                      </span>
                      <button
                        onClick={() => copyHash(tx.hash)}
                        className="p-1 hover:text-[#00F29D] text-slate-500 transition-colors"
                        title="Copy Tx Hash"
                      >
                        <Copy className="w-3 h-3" />
                      </button>
                    </div>
                  </td>

                  {/* Timestamp */}
                  <td className="py-4 px-3 text-slate-400 whitespace-nowrap text-[11px]">
                    {tx.timestamp}
                  </td>

                  {/* Destination */}
                  <td className="py-4 px-3 whitespace-nowrap">
                    <span className="text-slate-300 truncate max-w-[180px] block" title={tx.toAddress}>
                      {tx.toAddress}
                    </span>
                    {tx.note && (
                      <span className="text-[10px] text-slate-500 truncate block max-w-[200px]">
                        {tx.note}
                      </span>
                    )}
                  </td>

                  {/* Value */}
                  <td className="py-4 px-3 text-right whitespace-nowrap">
                    <span className="font-bold text-white text-sm block">
                      ${tx.usdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {tx.tokenAmount.toLocaleString()} units
                    </span>
                  </td>

                  {/* Gas Fee */}
                  <td className="py-4 px-3 text-right text-slate-400 whitespace-nowrap">
                    ${tx.networkFeeUsd.toFixed(2)}
                  </td>

                  {/* Status */}
                  <td className="py-4 px-3 text-center whitespace-nowrap">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-mono uppercase bg-emerald-500/10 text-[#00F29D] border border-emerald-500/20">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00F29D]" />
                      {tx.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-4 px-3 text-right whitespace-nowrap">
                    <button
                      onClick={() => onSelectTx(tx)}
                      className="px-2.5 py-1 rounded-lg bg-white/[0.04] hover:bg-[#00F29D]/20 hover:text-[#00F29D] text-slate-400 transition-colors text-[11px]"
                    >
                      Proof
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {filtered.length === 0 && (
        <div className="py-12 text-center text-slate-500 font-mono text-xs">
          No transactions match your search filter criteria.
        </div>
      )}

      {/* Pagination Footer */}
      <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-slate-400">
        <span>Showing {filtered.length} of {transactions.length} reconciled operations</span>
        <button
          onClick={exportLedgerCSV}
          className="flex items-center gap-1.5 text-[#00F29D] hover:underline"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Signed Ledger</span>
        </button>
      </div>
    </div>
  )
}
