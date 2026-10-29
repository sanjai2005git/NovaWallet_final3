import React from 'react'
import { X, CheckCircle2, Copy, ExternalLink, ShieldCheck } from 'lucide-react'
import { Transaction } from '../../types'
import { useWallet } from '../../context/WalletContext'

interface TxDetailModalProps {
  transaction: Transaction | null
  onClose: () => void
}

export const TxDetailModal: React.FC<TxDetailModalProps> = ({ transaction, onClose }) => {
  const { addToast } = useWallet()

  if (!transaction) return null

  const copyText = (txt: string, label: string) => {
    navigator.clipboard.writeText(txt)
    addToast('Copied', `${label} copied to clipboard`, 'info')
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0D111A] border border-white/[0.12] shadow-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#00F29D]" />
            <h3 className="text-base font-bold text-white">Transaction Cryptographic Proof</h3>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-5 space-y-3.5 text-xs">
          <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
            <span className="text-slate-400 font-mono">Status</span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-mono uppercase bg-emerald-500/15 text-[#00F29D] border border-[#00F29D]/30">
              {transaction.status}
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
            <span className="text-slate-400 font-mono">Transaction Hash</span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-slate-200">
                {transaction.hash.substring(0, 10)}...{transaction.hash.substring(transaction.hash.length - 8)}
              </span>
              <button
                onClick={() => copyText(transaction.hash, 'Tx Hash')}
                className="p-1 hover:text-[#00F29D] text-slate-400"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
            <span className="text-slate-400 font-mono">Block Height</span>
            <span className="font-mono text-white">#{transaction.blockNumber.toLocaleString()}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
            <span className="text-slate-400 font-mono">Timestamp</span>
            <span className="font-mono text-white">{transaction.timestamp}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
            <span className="text-slate-400 font-mono">From Initiator</span>
            <span className="font-mono text-slate-300">{transaction.fromAddress}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
            <span className="text-slate-400 font-mono">To Destination</span>
            <span className="font-mono text-slate-300">{transaction.toAddress}</span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
            <span className="text-slate-400 font-mono">Value</span>
            <span className="font-mono text-base font-bold text-white">
              ${transaction.usdValue.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
            </span>
          </div>

          <div className="flex justify-between items-center py-2 border-b border-white/[0.04]">
            <span className="text-slate-400 font-mono">Gas Fee Settled</span>
            <span className="font-mono text-slate-300">${transaction.networkFeeUsd.toFixed(2)} USD</span>
          </div>

          {transaction.note && (
            <div className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] text-slate-300">
              <span className="text-[10px] uppercase font-mono text-slate-400 block mb-0.5">Execution Log</span>
              {transaction.note}
            </div>
          )}
        </div>

        <div className="mt-5 flex gap-3">
          <a
            href={`https://etherscan.io/tx/${transaction.hash}`}
            target="_blank"
            rel="noreferrer"
            className="flex-1 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-mono text-white flex items-center justify-center gap-2 transition-colors"
          >
            <span>View on Etherscan</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-[#00F29D] hover:bg-[#00D68A] text-[#080A0F] font-bold text-xs tracking-wide transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
