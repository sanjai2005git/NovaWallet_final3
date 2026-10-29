import React, { useState } from 'react'
import { X, ArrowUpRight, ShieldCheck, AlertCircle, Scan, QrCode } from 'lucide-react'
import { useWallet } from '../../context/WalletContext'
import { QrScannerModal } from './QrScannerModal'

interface TransferModalProps {
  isOpen: boolean
  onClose: () => void
}

export const TransferModal: React.FC<TransferModalProps> = ({ isOpen, onClose }) => {
  const { wallet, assets, sendMoney, addToast } = useWallet()
  const [recipient, setRecipient] = useState('')
  const [selectedToken, setSelectedToken] = useState('USDC')
  const [amount, setAmount] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false)

  if (!isOpen) return null

  const currentAsset = assets.find((a) => a.symbol === selectedToken) || assets[0]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const numericAmount = parseFloat(amount)
    if (!recipient || isNaN(numericAmount) || numericAmount <= 0) {
      addToast('Invalid Input', 'Please enter a valid recipient address and amount.', 'error')
      return
    }

    if (numericAmount > currentAsset.balance) {
      addToast('Exceeds Balance', `You only hold ${currentAsset.balance} ${currentAsset.symbol}.`, 'error')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      const ok = sendMoney(recipient, numericAmount, selectedToken)
      setIsSubmitting(false)
      if (ok) {
        setAmount('')
        setRecipient('')
        onClose()
      }
    }, 900)
  }

  const handleScanSuccess = (scannedAddr: string) => {
    setRecipient(scannedAddr)
    addToast('Address Loaded from QR', scannedAddr, 'success')
  }

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
        <div className="relative w-full max-w-lg rounded-3xl bg-[#0D111A] border border-white/[0.12] shadow-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#00F29D]/15 text-[#00F29D] border border-[#00F29D]/30 flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Send Capital / Transfer</h3>
                <p className="text-xs text-slate-400">Institutional secure dispatch with MEV shield</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            {/* Asset Selector */}
            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase mb-1.5">Select Asset</label>
              <div className="grid grid-cols-5 gap-2">
                {assets.map((asset) => (
                  <button
                    type="button"
                    key={asset.id}
                    onClick={() => setSelectedToken(asset.symbol)}
                    className={`p-2 rounded-xl border text-center transition-all ${
                      selectedToken === asset.symbol
                        ? 'bg-[#00F29D]/15 border-[#00F29D] text-white shadow-glow-sm'
                        : 'bg-white/[0.03] border-white/[0.08] text-slate-400 hover:border-white/[0.2]'
                    }`}
                  >
                    <p className="text-xs font-bold font-mono">{asset.symbol}</p>
                    <p className="text-[10px] text-slate-500 truncate">{asset.balance.toFixed(2)}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Amount Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono text-slate-400 uppercase">Amount</label>
                <button
                  type="button"
                  onClick={() => setAmount(currentAsset.balance.toString())}
                  className="text-[11px] font-mono text-[#00F29D] hover:underline"
                >
                  Max: {currentAsset.balance.toLocaleString()} {currentAsset.symbol}
                </button>
              </div>
              <div className="relative">
                <input
                  type="number"
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="0.00"
                  className="w-full bg-[#131926] border border-white/[0.1] rounded-xl px-4 py-3 text-white text-lg font-mono focus:outline-none focus:border-[#00F29D] transition-colors"
                  required
                />
                <span className="absolute right-4 top-3.5 text-xs font-mono text-slate-400">
                  ≈ ${(parseFloat(amount || '0') * currentAsset.price).toLocaleString()} USD
                </span>
              </div>
            </div>

            {/* Recipient Address with QR Scanner Button */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono text-slate-400 uppercase">Recipient Address</label>
                <button
                  type="button"
                  onClick={() => setIsQrScannerOpen(true)}
                  className="text-[11px] font-mono text-[#00F29D] hover:text-[#00D68A] flex items-center gap-1 transition-colors"
                >
                  <Scan className="w-3.5 h-3.5" />
                  <span>Scan QR Code</span>
                </button>
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={recipient}
                  onChange={(e) => setRecipient(e.target.value)}
                  placeholder="0x... or ENS domain"
                  className="w-full bg-[#131926] border border-white/[0.1] rounded-xl pl-4 pr-12 py-3 text-white text-xs font-mono focus:outline-none focus:border-[#00F29D] transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setIsQrScannerOpen(true)}
                  className="absolute right-2 top-2 p-1.5 rounded-lg bg-white/[0.04] hover:bg-[#00F29D]/20 text-slate-400 hover:text-[#00F29D] transition-colors"
                  title="Open Camera QR Scanner (Torch & Upload)"
                >
                  <QrCode className="w-4 h-4" />
                </button>
              </div>

              {/* Dedicated QR Scan Banner with Torch & Upload options indicator */}
              <button
                type="button"
                onClick={() => setIsQrScannerOpen(true)}
                className="mt-2 w-full py-2.5 px-3 rounded-xl bg-white/[0.03] hover:bg-[#00F29D]/10 border border-white/[0.06] hover:border-[#00F29D]/30 flex items-center justify-between text-xs font-mono text-slate-300 transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Scan className="w-4 h-4 text-[#00F29D] group-hover:scale-110 transition-transform" />
                  <span>Scan QR Code with Camera</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-400">
                  <span className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08]">Torch Option</span>
                  <span className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08]">Upload QR Option</span>
                </div>
              </button>
            </div>

            {/* Fee & Confirmation Guarantee */}
            <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-xs text-slate-400 space-y-1.5 font-mono">
              <div className="flex justify-between">
                <span>Network Execution Fee</span>
                <span className="text-white">$2.10 USD (EVM Gas)</span>
              </div>
              <div className="flex justify-between">
                <span>Confirmation Flow</span>
                <span className="text-[#00F29D]">Celebratory Greeting Pop-Up Enabled</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#00F29D] to-[#00D68A] hover:brightness-110 text-[#080A0F] font-bold text-sm tracking-wide shadow-glow transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-[#080A0F] border-t-transparent rounded-full animate-spin" />
                  <span>Broadcasting &amp; Confirming Transfer...</span>
                </>
              ) : (
                <span>Confirm &amp; Dispatch Payment</span>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* QR Scanner Modal with Torch & Upload options */}
      <QrScannerModal
        isOpen={isQrScannerOpen}
        onClose={() => setIsQrScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
      />
    </>
  )
}
