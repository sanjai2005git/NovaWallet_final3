import React, { useState } from 'react'
import { X, ShieldCheck, Check, KeyRound, Smartphone, Radio, Globe } from 'lucide-react'
import { useWallet } from '../../context/WalletContext'

interface ConnectWalletModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({ isOpen, onClose }) => {
  const { connectWallet, wallet } = useWallet()
  const [connectingId, setConnectingId] = useState<string | null>(null)

  if (!isOpen) return null

  const wallets = [
    {
      id: 'metamask',
      name: 'MetaMask Institutional (MMI)',
      badge: 'Popular',
      icon: '🦊',
      desc: 'Enterprise multi-custody with compliance hooks'
    },
    {
      id: 'ledger',
      name: 'Ledger Hardware Keystore',
      badge: 'Cold Storage',
      icon: '🔒',
      desc: 'Direct USB/Bluetooth ECDSA secp256k1 signing'
    },
    {
      id: 'phantom',
      name: 'Phantom Multi-Chain',
      badge: 'Solana + EVM',
      icon: '👻',
      desc: 'High-speed consumer & institutional integration'
    },
    {
      id: 'coinbase',
      name: 'Coinbase Custody & Prime',
      badge: 'Qualified Custody',
      icon: '🔷',
      desc: 'Institutional insurance and compliance custody'
    },
    {
      id: 'walletconnect',
      name: 'WalletConnect v2',
      badge: 'Protocol',
      icon: '🌐',
      desc: 'Scan QR code from any mobile cold signer'
    }
  ]

  const handleConnect = (walletName: string, id: string) => {
    setConnectingId(id)
    setTimeout(() => {
      connectWallet(walletName)
      setConnectingId(null)
      onClose()
    }, 700)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0D111A] border border-white/[0.12] shadow-2xl p-6 overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-1/4 w-48 h-48 bg-[#00F29D]/10 rounded-full blur-3xl -z-10 pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#00F29D]/15 text-[#00F29D] border border-[#00F29D]/30">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">Connect Institutional Keystore</h3>
              <p className="text-xs text-slate-400">Choose your verified hardware signer or custody provider</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wallet List */}
        <div className="mt-4 space-y-2.5">
          {wallets.map((w) => {
            const isConnecting = connectingId === w.id
            const isCurrentConnected = wallet.isConnected && w.id === 'metamask'

            return (
              <button
                key={w.id}
                onClick={() => handleConnect(w.name, w.id)}
                disabled={isConnecting}
                className="w-full flex items-center justify-between p-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-[#00F29D]/40 transition-all duration-200 group text-left"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-[#131926] border border-white/[0.08] flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
                    {w.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-white group-hover:text-[#00F29D] transition-colors">
                        {w.name}
                      </span>
                      <span className="px-1.5 py-0.5 text-[10px] font-mono rounded bg-white/[0.06] text-slate-400 border border-white/[0.08]">
                        {w.badge}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{w.desc}</p>
                  </div>
                </div>

                <div>
                  {isConnecting ? (
                    <div className="w-5 h-5 border-2 border-[#00F29D] border-t-transparent rounded-full animate-spin" />
                  ) : isCurrentConnected ? (
                    <span className="flex items-center gap-1 text-xs font-mono text-[#00F29D]">
                      <Check className="w-3.5 h-3.5" /> Connected
                    </span>
                  ) : (
                    <span className="text-xs text-slate-500 group-hover:text-white font-mono transition-colors">
                      Connect →
                    </span>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Modal Footer Guarantee */}
        <div className="mt-5 p-3 rounded-xl bg-[#080A0F] border border-white/[0.06] flex items-center gap-3 text-xs text-slate-400">
          <KeyRound className="w-4 h-4 text-[#00F29D] flex-shrink-0" />
          <span>
            Non-custodial cryptographic connection. Your private keys never leave your secure enclave or hardware device.
          </span>
        </div>
      </div>
    </div>
  )
}
