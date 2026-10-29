import React, { useState } from 'react'
import { X, ArrowDownLeft, Copy, Check, QrCode } from 'lucide-react'
import { useWallet } from '../../context/WalletContext'

interface ReceiveModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ReceiveModal: React.FC<ReceiveModalProps> = ({ isOpen, onClose }) => {
  const { wallet, addToast } = useWallet()
  const [copied, setCopied] = useState(false)

  if (!isOpen) return null

  const handleCopy = () => {
    navigator.clipboard.writeText(wallet.address)
    setCopied(true)
    addToast('Copied to Clipboard', wallet.address, 'info')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-[#0D111A] border border-white/[0.12] shadow-2xl p-6 text-center">
        <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
          <div className="flex items-center gap-2 text-left">
            <div className="w-8 h-8 rounded-lg bg-[#00F29D]/15 text-[#00F29D] border border-[#00F29D]/30 flex items-center justify-center">
              <ArrowDownLeft className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Receive Assets</h3>
              <p className="text-xs text-slate-400">Institutional Inbound Deposit Address</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* QR Code Container */}
        <div className="mt-6 flex flex-col items-center">
          <div className="p-4 bg-white rounded-2xl shadow-glow-sm">
            {/* SVG QR Code Simulation */}
            <svg className="w-44 h-44" viewBox="0 0 100 100">
              <rect x="0" y="0" width="100" height="100" fill="#ffffff" />
              {/* Corner position squares */}
              <rect x="10" y="10" width="28" height="28" fill="#080A0F" />
              <rect x="14" y="14" width="20" height="20" fill="#ffffff" />
              <rect x="18" y="18" width="12" height="12" fill="#00F29D" />

              <rect x="62" y="10" width="28" height="28" fill="#080A0F" />
              <rect x="66" y="14" width="20" height="20" fill="#ffffff" />
              <rect x="70" y="18" width="12" height="12" fill="#00F29D" />

              <rect x="10" y="62" width="28" height="28" fill="#080A0F" />
              <rect x="14" y="66" width="20" height="20" fill="#ffffff" />
              <rect x="18" y="70" width="12" height="12" fill="#00F29D" />

              {/* Data matrix dots */}
              <rect x="42" y="15" width="5" height="15" fill="#080A0F" />
              <rect x="52" y="22" width="6" height="6" fill="#080A0F" />
              <rect x="44" y="44" width="12" height="12" fill="#080A0F" />
              <rect x="15" y="44" width="8" height="8" fill="#080A0F" />
              <rect x="28" y="48" width="8" height="6" fill="#080A0F" />
              <rect x="65" y="45" width="24" height="6" fill="#080A0F" />
              <rect x="68" y="58" width="14" height="10" fill="#080A0F" />
              <rect x="45" y="68" width="8" height="14" fill="#080A0F" />
              <rect x="58" y="78" width="16" height="8" fill="#080A0F" />
            </svg>
          </div>
          <span className="text-[11px] font-mono text-slate-400 mt-3">
            Network: <strong className="text-white">{wallet.network}</strong> (All EVM Tokens)
          </span>
        </div>

        {/* Truncated Address Box */}
        <div className="mt-5 p-3 rounded-xl bg-[#131926] border border-white/[0.08] text-left">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase">Your Wallet Address</span>
            <span className="text-[10px] text-emerald-400 font-mono">Verified Active</span>
          </div>
          <p className="font-mono text-xs text-white break-all">{wallet.address}</p>
        </div>

        <button
          onClick={handleCopy}
          className="w-full mt-4 py-2.5 rounded-xl bg-[#00F29D]/15 hover:bg-[#00F29D]/25 border border-[#00F29D]/40 text-[#00F29D] font-mono font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2"
        >
          {copied ? <Check className="w-4 h-4 text-[#00F29D]" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Address Copied!' : 'Copy Wallet Address'}</span>
        </button>
      </div>
    </div>
  )
}
