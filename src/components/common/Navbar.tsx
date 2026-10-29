import React, { useState } from 'react'
import {
  ShieldCheck,
  ChevronDown,
  Fuel,
  Bell,
  Copy,
  ExternalLink,
  LogOut,
  Layers,
  BarChart3,
  ArrowLeftRight,
  Lock,
  History,
  Home
} from 'lucide-react'
import { useWallet } from '../../context/WalletContext'
import { ViewMode } from '../../types'

interface NavbarProps {
  onOpenConnectModal: () => void
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenConnectModal }) => {
  const { wallet, currentView, setCurrentView, disconnectWallet, switchNetwork, addToast } = useWallet()
  const [showNetworkMenu, setShowNetworkMenu] = useState(false)
  const [showWalletMenu, setShowWalletMenu] = useState(false)

  const networks = [
    { name: 'Ethereum Mainnet', id: 'eth', color: '#627EEA' },
    { name: 'Arbitrum One', id: 'arb', color: '#28A0F0' },
    { name: 'Nova L2 Rollup', id: 'nova', color: '#00F29D' },
    { name: 'Polygon PoS', id: 'poly', color: '#8247E5' }
  ]

  const navItems: { id: ViewMode; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'landing', label: 'Overview', icon: Home },
    { id: 'dashboard', label: 'Portfolio', icon: BarChart3 },
    { id: 'swap', label: 'Institutional Swap', icon: ArrowLeftRight },
    { id: 'vaults', label: 'Vaults & Staking', icon: Lock },
    { id: 'ledger', label: 'Ledger History', icon: History },
    { id: 'settings', label: 'Security & Multi-Sig', icon: ShieldCheck }
  ]

  const copyAddress = () => {
    navigator.clipboard.writeText(wallet.address)
    addToast('Copied to Clipboard', wallet.address, 'info')
    setShowWalletMenu(false)
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/[0.08] bg-[#080A0F]/90 backdrop-blur-xl">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <button
            onClick={() => setCurrentView('dashboard')}
            className="flex items-center gap-3 group text-left focus:outline-none"
          >
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-[#00F29D]/20 via-[#0D111A] to-[#00D2FF]/20 border border-[#00F29D]/40 group-hover:border-[#00F29D] shadow-glow-sm transition-all duration-300">
              <Layers className="w-5 h-5 text-[#00F29D] transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 rounded-xl bg-[#00F29D]/10 filter blur-sm -z-10" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold tracking-wider text-white font-mono">
                  NOVA<span className="text-[#00F29D]">WALLET</span>
                </span>
                <span className="px-1.5 py-0.5 text-[10px] font-mono font-semibold tracking-wider bg-[#00F29D]/15 text-[#00F29D] rounded border border-[#00F29D]/30">
                  v2.4
                </span>
              </div>
              <p className="text-[10px] tracking-wider text-slate-400 uppercase font-mono hidden sm:block">
                Institutional Wealth & Liquidity
              </p>
            </div>
          </button>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden xl:flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentView === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentView(item.id)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium tracking-wide transition-all duration-200 ${
                    isActive
                      ? 'bg-white/[0.08] text-[#00F29D] border border-[#00F29D]/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#00F29D]' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Right Action Bar */}
        <div className="flex items-center gap-3">
          {/* Live Gas Price Indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0D111A] border border-white/[0.08] text-xs font-mono text-slate-300">
            <Fuel className="w-3.5 h-3.5 text-[#00F29D]" />
            <span>14 Gwei</span>
          </div>

          {/* Network Selector Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setShowNetworkMenu(!showNetworkMenu)
                setShowWalletMenu(false)
              }}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0D111A] border border-white/[0.08] hover:border-white/[0.18] text-xs font-medium text-slate-200 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-[#00F29D] animate-pulse" />
              <span className="hidden sm:inline font-mono">{wallet.network}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {showNetworkMenu && (
              <div className="absolute right-0 mt-2 w-52 rounded-xl bg-[#0D111A] border border-white/[0.12] shadow-2xl p-1.5 z-50">
                <div className="px-3 py-1.5 text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                  Select Chain Network
                </div>
                {networks.map((net) => (
                  <button
                    key={net.id}
                    onClick={() => {
                      switchNetwork(net.name)
                      setShowNetworkMenu(false)
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono transition-colors ${
                      wallet.network === net.name
                        ? 'bg-[#00F29D]/15 text-[#00F29D]'
                        : 'text-slate-300 hover:bg-white/[0.05] hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: net.color }} />
                      <span>{net.name}</span>
                    </div>
                    {wallet.network === net.name && <span className="text-[10px] text-[#00F29D]">Active</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notifications Button */}
          <button
            onClick={() => addToast('System Health Optimal', 'All cryptographic oracles & multi-chain bridges 100% operational.', 'info')}
            className="p-2 rounded-lg bg-[#0D111A] border border-white/[0.08] text-slate-300 hover:text-white hover:border-white/[0.18] transition-colors relative"
            title="System Notifications"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#00F29D] rounded-full ring-2 ring-[#080A0F]" />
          </button>

          {/* Wallet Action Button */}
          {wallet.isConnected ? (
            <div className="relative">
              <button
                onClick={() => {
                  setShowWalletMenu(!showWalletMenu)
                  setShowNetworkMenu(false)
                }}
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-[#00F29D]/15 to-[#00D2FF]/10 border border-[#00F29D]/40 hover:border-[#00F29D] text-xs font-mono text-slate-100 transition-all shadow-glow-sm"
              >
                <div className="w-2 h-2 rounded-full bg-[#00F29D] shadow-[0_0_8px_#00F29D]" />
                <span className="font-semibold text-white">
                  {wallet.address.substring(0, 6)}...{wallet.address.substring(wallet.address.length - 4)}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {showWalletMenu && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-[#0D111A] border border-white/[0.12] shadow-2xl p-2 z-50">
                  <div className="p-3 border-b border-white/[0.08] mb-1">
                    <p className="text-xs text-slate-400 font-mono">Institutional Custody</p>
                    <p className="text-sm font-semibold text-white mt-0.5">{wallet.accountName}</p>
                    <p className="text-[11px] font-mono text-[#00F29D] mt-1 break-all">{wallet.address}</p>
                  </div>
                  <button
                    onClick={copyAddress}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copy Full Address</span>
                  </button>
                  <a
                    href="https://etherscan.io"
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-slate-300 hover:text-white hover:bg-white/[0.05] transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    <span>View on Etherscan</span>
                  </a>
                  <div className="h-[1px] bg-white/[0.08] my-1" />
                  <button
                    onClick={() => {
                      disconnectWallet()
                      setShowWalletMenu(false)
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5 text-red-400" />
                    <span>Disconnect Wallet</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenConnectModal}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00F29D] to-[#00D68A] hover:brightness-110 text-[#080A0F] font-semibold text-xs tracking-wide shadow-glow transition-all"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>

      {/* Mobile Navigation Sub-bar */}
      <div className="xl:hidden border-t border-white/[0.06] bg-[#0A0E17] px-4 py-2 overflow-x-auto flex items-center gap-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = currentView === item.id
          return (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id)}
              className={`flex items-center gap-1.5 whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium tracking-wide transition-colors ${
                isActive
                  ? 'bg-white/[0.1] text-[#00F29D] border border-[#00F29D]/30'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {item.label}
            </button>
          )
        })}
      </div>
    </header>
  )
}
