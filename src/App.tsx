import React, { useState } from 'react'
import { useWallet } from './context/WalletContext'
import { Navbar } from './components/common/Navbar'
import { Footer } from './components/common/Footer'
import { ToastContainer } from './components/common/Toast'

// Modals
import { ConnectWalletModal } from './components/modals/ConnectWalletModal'
import { TransferModal } from './components/modals/TransferModal'
import { ReceiveModal } from './components/modals/ReceiveModal'
import { TxDetailModal } from './components/modals/TxDetailModal'
import { ConfirmationGreetingModal } from './components/modals/ConfirmationGreetingModal'
import { Transaction } from './types'

// Landing Components
import { HeroSection } from './components/landing/HeroSection'
import { MetricsTicker } from './components/landing/MetricsTicker'
import { YieldCalculator } from './components/landing/YieldCalculator'
import { FeatureMatrix } from './components/landing/FeatureMatrix'
import { TierShowcase } from './components/landing/TierShowcase'
import { SecurityCert } from './components/landing/SecurityCert'
import { CTASection } from './components/landing/CTASection'

// Dashboard Components
import { PortfolioHero } from './components/dashboard/PortfolioHero'
import { MetricCards } from './components/dashboard/MetricCards'
import { PerformanceChart } from './components/dashboard/PerformanceChart'
import { AssetAllocation } from './components/dashboard/AssetAllocation'
import { RecentActivity } from './components/dashboard/RecentActivity'
import { StocksTradingCard } from './components/stocks/StocksTradingCard'

// Swap Components
import { SwapInterface } from './components/swap/SwapInterface'
import { OrderBook } from './components/swap/OrderBook'
import { MarketStats } from './components/swap/MarketStats'

// Vaults Components
import { VaultHeader } from './components/vaults/VaultHeader'
import { StakingPanel } from './components/vaults/StakingPanel'
import { VaultTierGrid } from './components/vaults/VaultTierGrid'

// Settings Components
import { UserProfileCard } from './components/settings/UserProfileCard'
import { MultiSigManager } from './components/settings/MultiSigManager'
import { WhitelistTable } from './components/settings/WhitelistTable'
import { PolicyToggles } from './components/settings/PolicyToggles'

// Ledger Components
import { LedgerHeader } from './components/ledger/LedgerHeader'
import { LedgerTable } from './components/ledger/LedgerTable'

export const App: React.FC = () => {
  const { currentView, greetingModal, closeGreeting } = useWallet()

  // Modal triggers
  const [isConnectOpen, setIsConnectOpen] = useState(false)
  const [isSendOpen, setIsSendOpen] = useState(false)
  const [isReceiveOpen, setIsReceiveOpen] = useState(false)
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null)

  return (
    <div className="min-h-screen flex flex-col bg-[#080A0F] text-slate-100 selection:bg-[#00F29D]/20 selection:text-[#00F29D]">
      <Navbar onOpenConnectModal={() => setIsConnectOpen(true)} />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentView === 'landing' && (
          <div className="space-y-4">
            <HeroSection />
            <MetricsTicker />
            <YieldCalculator />
            <FeatureMatrix />
            <TierShowcase />
            <SecurityCert />
            <CTASection />
          </div>
        )}

        {currentView === 'dashboard' && (
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
            <PortfolioHero
              onOpenSend={() => setIsSendOpen(true)}
              onOpenReceive={() => setIsReceiveOpen(true)}
            />
            <MetricCards />

            {/* Stocks & Equities Trading Card */}
            <StocksTradingCard />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-8">
                <PerformanceChart />
                {/* Recent Activity Ledger with Dual Tabs: Transactions & Stocks Activity */}
                <RecentActivity onSelectTx={(tx) => setSelectedTx(tx)} />
              </div>
              <div className="lg:col-span-5">
                <AssetAllocation />
              </div>
            </div>
          </div>
        )}

        {currentView === 'swap' && (
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
            <MarketStats />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-8">
                <SwapInterface />
                <StocksTradingCard />
              </div>
              <div className="lg:col-span-5">
                <OrderBook />
              </div>
            </div>
          </div>
        )}

        {currentView === 'vaults' && (
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
            <VaultHeader />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5">
                <StakingPanel />
              </div>
              <div className="lg:col-span-7">
                <VaultTierGrid />
              </div>
            </div>
          </div>
        )}

        {currentView === 'settings' && (
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
            <UserProfileCard />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-8">
                <MultiSigManager />
                <WhitelistTable />
              </div>
              <div className="lg:col-span-5">
                <PolicyToggles />
              </div>
            </div>
          </div>
        )}

        {currentView === 'ledger' && (
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
            <LedgerHeader />
            <LedgerTable onSelectTx={(tx) => setSelectedTx(tx)} />
          </div>
        )}
      </main>

      <Footer />

      {/* Global Modals */}
      <ConnectWalletModal isOpen={isConnectOpen} onClose={() => setIsConnectOpen(false)} />
      <TransferModal isOpen={isSendOpen} onClose={() => setIsSendOpen(false)} />
      <ReceiveModal isOpen={isReceiveOpen} onClose={() => setIsReceiveOpen(false)} />
      <TxDetailModal transaction={selectedTx} onClose={() => setSelectedTx(null)} />

      {/* Task Completed Confirmation Greeting Pop-Up Modal */}
      <ConfirmationGreetingModal data={greetingModal} onClose={closeGreeting} />

      {/* Toast Notification Layer */}
      <ToastContainer />
    </div>
  )
}
export default App
