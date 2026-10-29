import React, { useState } from 'react'
import {
  ArrowDownLeft,
  ArrowUpRight,
  ArrowLeftRight,
  Lock,
  TrendingUp,
  ShieldCheck,
  Scan,
  TrendingDown
} from 'lucide-react'
import { useWallet } from '../../context/WalletContext'
import { QrScannerModal } from '../modals/QrScannerModal'

interface PortfolioHeroProps {
  onOpenSend: () => void
  onOpenReceive: () => void
}

export const PortfolioHero: React.FC<PortfolioHeroProps> = ({ onOpenSend, onOpenReceive }) => {
  const { wallet, setCurrentView, addToast } = useWallet()
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false)

  const handleScanSuccess = (addr: string) => {
    addToast('Scanned QR Target', `Detected address: ${addr}`, 'info')
    onOpenSend()
  }

  return (
    <>
      <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0D121D] via-[#0E1524] to-[#0A0E18] border border-white/[0.08] shadow-card overflow-hidden">
        {/* Decorative gradient glow in corner */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#00F29D]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                Total Net Portfolio Value
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/10 text-[#00F29D] border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F29D] animate-pulse" />
                Live Feed
              </span>
            </div>

            <div className="flex items-baseline gap-4">
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-mono tracking-tight">
                ${wallet.totalNetWorth.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h1>
              <span className="text-xs font-mono text-slate-400">USD</span>
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-3 text-xs font-mono">
              <div className="flex items-center gap-1 text-[#00F29D] bg-[#00F29D]/10 px-2.5 py-1 rounded-lg border border-[#00F29D]/20">
                <TrendingUp className="w-3.5 h-3.5" />
                <span className="font-bold">
                  +${wallet.netWorthChange24h.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
                <span>(+{wallet.netWorthChangePct24h}%)</span>
              </div>
              <span className="text-slate-400">Past 24 Hours</span>
              <span className="text-slate-600 hidden sm:inline">•</span>
              <span className="text-slate-400 hidden sm:inline">
                Account: <strong className="text-slate-200">{wallet.accountName}</strong> (Tier 4)
              </span>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenReceive}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-semibold text-white transition-all shadow-sm"
            >
              <ArrowDownLeft className="w-4 h-4 text-[#00F29D]" />
              <span>Deposit</span>
            </button>

            <button
              onClick={onOpenSend}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-semibold text-white transition-all shadow-sm"
            >
              <ArrowUpRight className="w-4 h-4 text-[#00F29D]" />
              <span>Send Money</span>
            </button>

            <button
              onClick={() => setIsQrScannerOpen(true)}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-[#00F29D]/20 hover:text-[#00F29D] border border-white/[0.1] hover:border-[#00F29D]/40 text-xs font-semibold text-slate-200 transition-all shadow-sm"
              title="Scan QR Code (Torch & Upload)"
            >
              <Scan className="w-4 h-4 text-[#00D2FF]" />
              <span>Scan QR</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('swap')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#00F29D] to-[#00D68A] hover:brightness-110 text-[#080A0F] font-bold text-xs tracking-wide shadow-glow transition-all"
            >
              <ArrowLeftRight className="w-4 h-4" />
              <span>Instant Swap</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('vaults')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-xs font-semibold text-white transition-all shadow-sm"
            >
              <Lock className="w-4 h-4 text-[#00D2FF]" />
              <span>Stake &amp; Earn</span>
            </button>
          </div>
        </div>
      </div>

      <QrScannerModal
        isOpen={isQrScannerOpen}
        onClose={() => setIsQrScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
      />
    </>
  )
}
