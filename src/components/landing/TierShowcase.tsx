import React from 'react'
import { Check, Crown, Shield, Award, ArrowRight } from 'lucide-react'
import { useWallet } from '../../context/WalletContext'

export const TierShowcase: React.FC = () => {
  const { setCurrentView } = useWallet()

  const tiers = [
    {
      name: 'Sentinel Protocol',
      icon: Shield,
      minCapital: '$100,000 USD',
      targetApy: 'Up to 14.2% APY',
      desc: 'Designed for high-net-worth individual private custody and algorithmic yield.',
      features: [
        'Multi-Chain EVM & Solana Wallet Support',
        'Direct Uniswap v3 & Curve Routing',
        'FIDO2 Hardware Key 2-of-3 Multisig',
        'Standard 24h Timelock Address Defense',
        'Exportable Institutional Tax Statements'
      ],
      popular: false,
      btnLabel: 'Launch Sentinel'
    },
    {
      name: 'Sovereign Institutional',
      icon: Crown,
      minCapital: '$1,000,000 USD',
      targetApy: 'Up to 24.5% APY',
      desc: 'Engineered for hedge funds, family offices, and DAOs demanding zero slippage.',
      features: [
        'Dedicated Private High-Speed RPC Node (0ms mempool)',
        '3-of-5 Hardware Quorum Multi-Signature Policies',
        'Flashbots MEV-Shielded Execution Gateways',
        'Zero-Knowledge Balance & Transaction Sharding',
        'Custom Risk Parameters & Automated Rebalancing',
        'Dedicated 24/7 Institutional Account Officer'
      ],
      popular: true,
      btnLabel: 'Deploy Sovereign Tier'
    },
    {
      name: 'Apex Sovereign Desk',
      icon: Award,
      minCapital: '$10,000,000+ USD',
      targetApy: 'Up to 32.8% APY',
      desc: 'Full sovereign infrastructure with custom smart contracts and OTC block liquidity.',
      features: [
        'Bespoke Single-Tenant Smart Contract Deployment',
        'Direct OTC Block Settlement Desk (Zero Market Impact)',
        'Sponsored Gas Fees on All Operations',
        'Custom Hardware Security Module (HSM) Integrations',
        'Cross-Jurisdictional Legal Custody Frameworks',
        'Direct Core Protocol Engineering Channel'
      ],
      popular: false,
      btnLabel: 'Consult Institutional Desk'
    }
  ]

  return (
    <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="text-xs font-mono text-[#00F29D] uppercase tracking-wider block mb-2">
          Capital Allocations &amp; Tiers
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
          Institutional Custody Solutions
        </h2>
        <p className="text-sm sm:text-base text-slate-400 mt-3">
          Transparent fee schedules and privileged liquidity access structured around total capital deployment.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {tiers.map((tier, i) => {
          const Icon = tier.icon
          return (
            <div
              key={i}
              className={`relative p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                tier.popular
                  ? 'bg-[#0E1522] border-2 border-[#00F29D]/60 shadow-glow-lg -translate-y-2'
                  : 'bg-[#0D111A] border border-white/[0.08] shadow-card hover:border-white/[0.18]'
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-[#00F29D] to-[#00D2FF] text-[#080A0F] font-mono text-[11px] font-extrabold uppercase tracking-wider shadow-glow-sm">
                  Recommended Institutional
                </div>
              )}

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      tier.popular ? 'bg-[#00F29D]/20 text-[#00F29D]' : 'bg-white/[0.05] text-slate-300'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white tracking-tight">{tier.name}</h3>
                    <p className="text-xs text-slate-400 font-mono">{tier.minCapital} Minimum</p>
                  </div>
                </div>

                <div className="py-4 border-y border-white/[0.08] my-4">
                  <span className="text-2xl font-extrabold text-[#00F29D] font-mono block">
                    {tier.targetApy}
                  </span>
                  <p className="text-xs text-slate-400 mt-1">{tier.desc}</p>
                </div>

                <ul className="space-y-3 my-6">
                  {tier.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                      <Check className="w-4 h-4 text-[#00F29D] flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-white/[0.08]">
                <button
                  onClick={() => {
                    setCurrentView('dashboard')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className={`w-full py-3.5 rounded-xl font-bold text-xs tracking-wide transition-all flex items-center justify-center gap-2 ${
                    tier.popular
                      ? 'bg-gradient-to-r from-[#00F29D] to-[#00D68A] hover:brightness-110 text-[#080A0F] shadow-glow'
                      : 'bg-white/[0.05] hover:bg-white/[0.1] text-white border border-white/[0.1]'
                  }`}
                >
                  <span>{tier.btnLabel}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
