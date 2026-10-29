import React, { useState } from 'react'
import {
  ArrowDownUp,
  Settings2,
  ShieldCheck,
  Zap,
  Info,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'
import { useWallet } from '../../context/WalletContext'
import { Asset } from '../../types'

export const SwapInterface: React.FC = () => {
  const { assets, executeSwap, wallet } = useWallet()
  const [fromSymbol, setFromSymbol] = useState('USDC')
  const [toSymbol, setToSymbol] = useState('NOVA')
  const [payAmount, setPayAmount] = useState('50000')
  const [slippage, setSlippage] = useState<number>(0.5)
  const [mevProtection, setMevProtection] = useState(true)
  const [isSwapping, setIsSwapping] = useState(false)

  const fromAsset = assets.find((a) => a.symbol === fromSymbol) || assets[0]
  const toAsset = assets.find((a) => a.symbol === toSymbol) || assets[1]

  const numericPay = parseFloat(payAmount) || 0
  const rate = (fromAsset.price || 1) / (toAsset.price || 1)
  const receiveAmount = numericPay * rate
  const minReceived = receiveAmount * (1 - slippage / 100)
  const priceImpact = 0.008 // 0.008%

  const handleInvert = () => {
    const temp = fromSymbol
    setFromSymbol(toSymbol)
    setToSymbol(temp)
  }

  const handlePercent = (pct: number) => {
    const val = (fromAsset.balance * pct) / 100
    setPayAmount(val.toFixed(2))
  }

  const handleSwap = () => {
    if (numericPay <= 0) return
    setIsSwapping(true)
    setTimeout(() => {
      const ok = executeSwap(fromSymbol, toSymbol, numericPay, receiveAmount, slippage)
      setIsSwapping(false)
      if (ok) {
        setPayAmount('')
      }
    }, 1200)
  }

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-[#0D111A] border border-white/[0.08] shadow-card relative">
      <div className="flex items-center justify-between pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#00F29D]" />
            <h2 className="text-lg font-bold text-white tracking-tight">Institutional Multi-Asset DEX</h2>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Decentralized Smart Order Routing with Sub-Second Execution
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setMevProtection(!mevProtection)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
              mevProtection
                ? 'bg-[#00F29D]/10 border-[#00F29D]/40 text-[#00F29D]'
                : 'bg-white/[0.02] border-white/[0.08] text-slate-400'
            }`}
            title="MEV Frontrunning Protection"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">MEV Shield</span>
          </button>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {/* Pay Input Box */}
        <div className="p-4 rounded-2xl bg-[#090C13] border border-white/[0.06] focus-within:border-[#00F29D]/50 transition-colors">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase">You Pay (Capital Outflow)</span>
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="text-slate-400">Bal: {fromAsset.balance.toLocaleString()} {fromAsset.symbol}</span>
              <button
                type="button"
                onClick={() => setPayAmount(fromAsset.balance.toString())}
                className="text-[#00F29D] font-bold hover:underline"
              >
                MAX
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <input
              type="number"
              step="any"
              value={payAmount}
              onChange={(e) => setPayAmount(e.target.value)}
              placeholder="0.00"
              className="w-full bg-transparent text-2xl sm:text-3xl font-extrabold font-mono text-white focus:outline-none"
            />

            <select
              value={fromSymbol}
              onChange={(e) => setFromSymbol(e.target.value)}
              className="bg-[#131926] border border-white/[0.1] rounded-xl px-3 py-2 text-white font-mono font-bold text-sm focus:outline-none focus:border-[#00F29D] cursor-pointer"
            >
              {assets.map((a) => (
                <option key={a.id} value={a.symbol} disabled={a.symbol === toSymbol}>
                  {a.symbol}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/[0.04] text-[11px] font-mono text-slate-400">
            <span>≈ ${(numericPay * fromAsset.price).toLocaleString(undefined, { minimumFractionDigits: 2 })} USD</span>
            <div className="flex items-center gap-1.5">
              {[25, 50, 75, 100].map((pct) => (
                <button
                  key={pct}
                  onClick={() => handlePercent(pct)}
                  className="px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08] text-slate-300 hover:text-white"
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Invert Arrow Button */}
        <div className="flex justify-center -my-2 relative z-10">
          <button
            onClick={handleInvert}
            className="w-10 h-10 rounded-xl bg-[#131926] border border-white/[0.12] hover:border-[#00F29D] text-slate-300 hover:text-[#00F29D] flex items-center justify-center shadow-lg transition-all hover:rotate-180"
            title="Invert tokens"
          >
            <ArrowDownUp className="w-4 h-4" />
          </button>
        </div>

        {/* Receive Input Box */}
        <div className="p-4 rounded-2xl bg-[#090C13] border border-white/[0.06]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase">You Receive (Estimated Inflow)</span>
            <span className="text-xs font-mono text-slate-400">
              Bal: {toAsset.balance.toLocaleString()} {toAsset.symbol}
            </span>
          </div>

          <div className="flex items-center justify-between gap-4">
            <div className="w-full text-2xl sm:text-3xl font-extrabold font-mono text-[#00F29D]">
              {receiveAmount ? receiveAmount.toLocaleString(undefined, { maximumFractionDigits: 4 }) : '0.00'}
            </div>

            <select
              value={toSymbol}
              onChange={(e) => setToSymbol(e.target.value)}
              className="bg-[#131926] border border-white/[0.1] rounded-xl px-3 py-2 text-white font-mono font-bold text-sm focus:outline-none focus:border-[#00F29D] cursor-pointer"
            >
              {assets.map((a) => (
                <option key={a.id} value={a.symbol} disabled={a.symbol === fromSymbol}>
                  {a.symbol}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/[0.04] text-[11px] font-mono text-slate-400">
            <span>≈ ${(receiveAmount * toAsset.price).toLocaleString(undefined, { minimumFractionDigits: 2 })} USD</span>
            <span>Rate: 1 {fromSymbol} = {rate.toFixed(4)} {toSymbol}</span>
          </div>
        </div>

        {/* Slippage & Routing Info */}
        <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-2.5 text-xs font-mono">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Slippage Tolerance</span>
            <div className="flex items-center gap-1">
              {[0.1, 0.5, 1.0].map((s) => (
                <button
                  key={s}
                  onClick={() => setSlippage(s)}
                  className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-colors ${
                    slippage === s
                      ? 'bg-[#00F29D] text-[#080A0F]'
                      : 'bg-white/[0.04] text-slate-300 hover:bg-white/[0.08]'
                  }`}
                >
                  {s}%
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-between text-slate-400">
            <span>Guaranteed Minimum Received</span>
            <span className="text-white">{minReceived.toLocaleString(undefined, { maximumFractionDigits: 4 })} {toSymbol}</span>
          </div>

          <div className="flex justify-between text-slate-400">
            <span>Price Impact</span>
            <span className="text-[#00F29D]">&lt;0.01% (Protected)</span>
          </div>

          <div className="flex justify-between text-slate-400">
            <span>Smart Routing</span>
            <span className="text-white">NovaRouter v2.4 → Uniswap v3 pool</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={handleSwap}
          disabled={isSwapping || numericPay <= 0 || numericPay > fromAsset.balance}
          className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all shadow-glow flex items-center justify-center gap-2 ${
            numericPay > fromAsset.balance
              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 cursor-not-allowed'
              : 'bg-gradient-to-r from-[#00F29D] to-[#00D68A] hover:brightness-110 text-[#080A0F]'
          }`}
        >
          {isSwapping ? (
            <>
              <div className="w-5 h-5 border-2 border-[#080A0F] border-t-transparent rounded-full animate-spin" />
              <span>Simulating &amp; Executing Transaction...</span>
            </>
          ) : numericPay > fromAsset.balance ? (
            <span>Insufficient {fromSymbol} Balance</span>
          ) : (
            <span>Execute Institutional Swap</span>
          )}
        </button>
      </div>
    </div>
  )
}
