import React, { useState } from 'react'
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownLeft, ShieldCheck, Zap } from 'lucide-react'
import { useWallet } from '../../context/WalletContext'

export const StocksTradingCard: React.FC = () => {
  const { stocks, wallet, buyStock, sellStock } = useWallet()
  const [activeTab, setActiveTab] = useState<'BUY' | 'SELL'>('BUY')
  const [selectedSymbol, setSelectedSymbol] = useState('NVDA')
  const [sharesInput, setSharesInput] = useState('10')
  const [isExecuting, setIsExecuting] = useState(false)

  const activeStock = stocks.find((s) => s.symbol === selectedSymbol) || stocks[0]
  const sharesCount = parseFloat(sharesInput) || 0
  const totalCostUsd = sharesCount * activeStock.price

  const handleTrade = (e: React.FormEvent) => {
    e.preventDefault()
    if (sharesCount <= 0) return

    setIsExecuting(true)
    setTimeout(() => {
      if (activeTab === 'BUY') {
        buyStock(activeStock.symbol, sharesCount)
      } else {
        sellStock(activeStock.symbol, sharesCount)
      }
      setIsExecuting(false)
      setSharesInput('')
    }, 1000)
  }

  return (
    <div className="p-6 rounded-3xl bg-[#0D111A] border border-white/[0.08] shadow-card">
      <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-[#00F29D]" />
            <h3 className="text-base font-bold text-white tracking-tight">Tokenized Equities &amp; Stocks Desk</h3>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Institutional 24/7 continuous stock trading with instant stablecoin settlement
          </p>
        </div>

        {/* Buy/Sell Tab switcher */}
        <div className="flex items-center bg-white/[0.04] p-1 rounded-xl border border-white/[0.06]">
          <button
            onClick={() => setActiveTab('BUY')}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'BUY'
                ? 'bg-emerald-500 text-[#080A0F] shadow-glow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            BUY
          </button>
          <button
            onClick={() => setActiveTab('SELL')}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              activeTab === 'SELL'
                ? 'bg-rose-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            SELL
          </button>
        </div>
      </div>

      {/* Stock Selection Grid */}
      <div className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {stocks.map((stock) => {
          const isSelected = selectedSymbol === stock.symbol
          const isPositive = stock.change24h >= 0

          return (
            <button
              key={stock.id}
              onClick={() => setSelectedSymbol(stock.symbol)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isSelected
                  ? 'bg-[#00F29D]/15 border-[#00F29D] shadow-glow-sm'
                  : 'bg-white/[0.02] border-white/[0.06] hover:border-white/[0.15]'
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono font-bold text-xs text-white">{stock.symbol}</span>
                <span
                  className={`text-[10px] font-mono flex items-center ${
                    isPositive ? 'text-[#00F29D]' : 'text-rose-400'
                  }`}
                >
                  {isPositive ? '+' : ''}
                  {stock.change24h}%
                </span>
              </div>
              <p className="text-xs font-mono font-bold text-slate-200">${stock.price.toFixed(2)}</p>
              <p className="text-[10px] font-mono text-slate-400 truncate mt-1">
                Holds: {stock.shares} Shs
              </p>
            </button>
          )
        })}
      </div>

      {/* Trade Form */}
      <form onSubmit={handleTrade} className="mt-6 space-y-4">
        <div className="p-4 rounded-2xl bg-[#090C13] border border-white/[0.06]">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-mono text-slate-400 uppercase">
              {activeTab === 'BUY' ? 'Shares to Purchase' : 'Shares to Liquidate'}
            </span>
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="text-slate-400">
                {activeTab === 'BUY'
                  ? `Available Cash: $${wallet.availableCashUsd.toLocaleString()} USD`
                  : `Your Holdings: ${activeStock.shares} ${activeStock.symbol}`}
              </span>
              {activeTab === 'SELL' && activeStock.shares > 0 && (
                <button
                  type="button"
                  onClick={() => setSharesInput(activeStock.shares.toString())}
                  className="text-[#00F29D] font-bold hover:underline"
                >
                  MAX
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <input
              type="number"
              step="any"
              value={sharesInput}
              onChange={(e) => setSharesInput(e.target.value)}
              placeholder="0"
              className="w-full bg-transparent text-2xl sm:text-3xl font-extrabold font-mono text-white focus:outline-none"
              required
            />
            <div className="text-right whitespace-nowrap">
              <span className="text-base font-bold font-mono text-white block">
                {activeStock.symbol}
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                ${activeStock.price.toFixed(2)} / share
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 pt-2 border-t border-white/[0.04] text-[11px] font-mono text-slate-400">
            <span>
              {activeTab === 'BUY' ? 'Total Capital Required' : 'Estimated Cash Proceeds'}
            </span>
            <span className="text-sm font-bold text-white font-mono">
              ${totalCostUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD
            </span>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={
            isExecuting ||
            sharesCount <= 0 ||
            (activeTab === 'BUY' && totalCostUsd > wallet.availableCashUsd) ||
            (activeTab === 'SELL' && sharesCount > activeStock.shares)
          }
          className={`w-full py-4 rounded-2xl font-bold text-sm tracking-wide transition-all shadow-glow flex items-center justify-center gap-2 ${
            activeTab === 'BUY'
              ? 'bg-gradient-to-r from-[#00F29D] to-[#00D68A] hover:brightness-110 text-[#080A0F]'
              : 'bg-gradient-to-r from-rose-500 to-rose-600 hover:brightness-110 text-white'
          }`}
        >
          {isExecuting ? (
            <>
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Executing Institutional Stock Order...</span>
            </>
          ) : activeTab === 'BUY' ? (
            <span>
              {totalCostUsd > wallet.availableCashUsd
                ? 'Insufficient Cash Balance'
                : `Buy ${sharesCount || 0} ${activeStock.symbol} ($${totalCostUsd.toLocaleString()} USD)`}
            </span>
          ) : (
            <span>
              {sharesCount > activeStock.shares
                ? 'Insufficient Shares'
                : `Sell ${sharesCount || 0} ${activeStock.symbol} (+$${totalCostUsd.toLocaleString()} USD)`}
            </span>
          )}
        </button>
      </form>
    </div>
  )
}

