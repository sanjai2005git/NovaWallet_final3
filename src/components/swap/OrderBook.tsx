import React from 'react'
import { Activity } from 'lucide-react'

export const OrderBook: React.FC = () => {
  const asks = [
    { price: 1.874, amount: 14200, total: 26610.8 },
    { price: 1.868, amount: 28500, total: 53238.0 },
    { price: 1.861, amount: 45000, total: 83745.0 },
    { price: 1.855, amount: 12000, total: 22260.0 }
  ]

  const bids = [
    { price: 1.849, amount: 35000, total: 64715.0 },
    { price: 1.842, amount: 18400, total: 33892.8 },
    { price: 1.835, amount: 52000, total: 95420.0 },
    { price: 1.828, amount: 98000, total: 179144.0 }
  ]

  return (
    <div className="p-6 rounded-3xl bg-[#0D111A] border border-white/[0.08] shadow-card">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#00F29D]" />
          <h3 className="text-sm font-bold text-white tracking-tight">Real-Time Order Book</h3>
        </div>
        <span className="text-[11px] font-mono text-[#00F29D] bg-[#00F29D]/10 px-2 py-0.5 rounded border border-[#00F29D]/20">
          Spread: 0.006 (0.32%)
        </span>
      </div>

      <div className="grid grid-cols-3 text-[10px] font-mono text-slate-500 uppercase pb-2 border-b border-white/[0.04]">
        <span>Price (USDC)</span>
        <span className="text-right">Size (NOVA)</span>
        <span className="text-right">Total ($)</span>
      </div>

      {/* Asks (Sell Orders - Red) */}
      <div className="space-y-1 my-2">
        {asks.map((ask, i) => (
          <div
            key={i}
            className="grid grid-cols-3 text-xs font-mono py-1 px-1 rounded hover:bg-rose-500/10 transition-colors"
          >
            <span className="text-rose-400 font-semibold">{ask.price.toFixed(3)}</span>
            <span className="text-right text-slate-300">{ask.amount.toLocaleString()}</span>
            <span className="text-right text-slate-400">${ask.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
        ))}
      </div>

      {/* Mid Market Price */}
      <div className="py-2.5 my-2 px-3 rounded-xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-between text-xs font-mono">
        <span className="text-white font-bold text-sm">$1.850 Mid-Price</span>
        <span className="text-[#00F29D]">Sub-block Execution</span>
      </div>

      {/* Bids (Buy Orders - Green) */}
      <div className="space-y-1 my-2">
        {bids.map((bid, i) => (
          <div
            key={i}
            className="grid grid-cols-3 text-xs font-mono py-1 px-1 rounded hover:bg-emerald-500/10 transition-colors"
          >
            <span className="text-[#00F29D] font-semibold">{bid.price.toFixed(3)}</span>
            <span className="text-right text-slate-300">{bid.amount.toLocaleString()}</span>
            <span className="text-right text-slate-400">${bid.total.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
