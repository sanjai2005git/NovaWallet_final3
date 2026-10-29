import React, { useState } from 'react'
import { Shield, Plus, Clock, Check, Copy } from 'lucide-react'
import { useWallet } from '../../context/WalletContext'

export const WhitelistTable: React.FC = () => {
  const { whitelistedAddresses, addWhitelistedAddress, addToast } = useWallet()
  const [showAddModal, setShowAddModal] = useState(false)
  const [label, setLabel] = useState('')
  const [address, setAddress] = useState('')
  const [network, setNetwork] = useState('Ethereum Mainnet')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!label || !address) return
    addWhitelistedAddress(label, address, network)
    setLabel('')
    setAddress('')
    setShowAddModal(false)
  }

  const copyAddress = (addr: string) => {
    navigator.clipboard.writeText(addr)
    addToast('Copied to Clipboard', addr, 'info')
  }

  return (
    <div className="p-6 rounded-3xl bg-[#0D111A] border border-white/[0.08] shadow-card">
      <div className="flex items-center justify-between pb-5 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#00F29D]" />
            <h3 className="text-base font-bold text-white tracking-tight">Whitelisted Destination Addresses</h3>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Outgoing capital transfers restricted strictly to cryptographically approved entities
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/[0.05] hover:bg-[#00F29D]/20 hover:text-[#00F29D] border border-white/[0.1] hover:border-[#00F29D]/40 text-xs font-mono text-white transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Address</span>
        </button>
      </div>

      <div className="mt-4 divide-y divide-white/[0.04]">
        {whitelistedAddresses.map((wl) => (
          <div
            key={wl.id}
            className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white">{wl.label}</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/[0.06] text-slate-400">
                  {wl.network}
                </span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 font-mono mt-1">
                <span>{wl.address}</span>
                <button
                  onClick={() => copyAddress(wl.address)}
                  className="hover:text-[#00F29D] transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end sm:self-center font-mono">
              <span className="flex items-center gap-1 text-[11px] text-slate-400">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                {wl.timelockHours}h Timelock
              </span>
              <span
                className={`flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border ${
                  wl.status === 'active'
                    ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                    : 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                }`}
              >
                {wl.status === 'active' ? (
                  <>
                    <Check className="w-3 h-3" /> Approved
                  </>
                ) : (
                  'Pending Timelock'
                )}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Add Address Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-[#0D111A] border border-white/[0.12] p-6 shadow-2xl">
            <h3 className="text-base font-bold text-white mb-1">Add Whitelisted Recipient</h3>
            <p className="text-xs text-slate-400 mb-4">
              Requires a mandatory 24h timelock cooldown before first withdrawal.
            </p>

            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Entity Label</label>
                <input
                  type="text"
                  value={label}
                  onChange={(e) => setLabel(e.target.value)}
                  placeholder="e.g. Ledger Cold Vault 02"
                  className="w-full bg-[#131926] border border-white/[0.1] rounded-xl px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-[#00F29D]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Wallet Address</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="0x..."
                  className="w-full bg-[#131926] border border-white/[0.1] rounded-xl px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-[#00F29D]"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-slate-400 uppercase mb-1">Network Chain</label>
                <select
                  value={network}
                  onChange={(e) => setNetwork(e.target.value)}
                  className="w-full bg-[#131926] border border-white/[0.1] rounded-xl px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-[#00F29D]"
                >
                  <option value="Ethereum Mainnet">Ethereum Mainnet</option>
                  <option value="Arbitrum One">Arbitrum One</option>
                  <option value="Nova Rollup L2">Nova Rollup L2</option>
                  <option value="Solana Mainnet">Solana Mainnet</option>
                </select>
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl bg-white/[0.05] text-white text-xs font-semibold hover:bg-white/[0.1] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#00F29D] hover:bg-[#00D68A] text-[#080A0F] text-xs font-bold transition-all shadow-glow"
                >
                  Submit to Timelock
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
