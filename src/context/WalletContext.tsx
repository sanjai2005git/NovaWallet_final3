import React, { createContext, useContext, useState, useEffect } from 'react'
import {
  WalletState,
  Asset,
  Vault,
  Transaction,
  WhitelistAddress,
  SecurityPolicy,
  ViewMode,
  Stock,
  StockActivity,
  GreetingConfirmation
} from '../types'
import {
  initialWalletState,
  initialAssets,
  initialVaults,
  initialTransactions,
  initialWhitelistedAddresses,
  initialSecurityPolicies,
  initialStocks,
  initialStockActivities
} from '../data/initialState'

export interface ToastItem {
  id: string
  title: string
  message: string
  type: 'success' | 'info' | 'warning' | 'error'
  timestamp: number
}

interface WalletContextType {
  wallet: WalletState
  assets: Asset[]
  stocks: Stock[]
  vaults: Vault[]
  transactions: Transaction[]
  stockActivities: StockActivity[]
  whitelistedAddresses: WhitelistAddress[]
  securityPolicies: SecurityPolicy[]
  currentView: ViewMode
  toasts: ToastItem[]
  greetingModal: GreetingConfirmation
  setCurrentView: (view: ViewMode) => void
  connectWallet: (walletName?: string) => void
  disconnectWallet: () => void
  switchNetwork: (network: string) => void
  sendMoney: (recipient: string, amount: number, symbol: string, note?: string) => boolean
  buyStock: (symbol: string, shares: number) => boolean
  sellStock: (symbol: string, shares: number) => boolean
  executeSwap: (fromSymbol: string, toSymbol: string, fromAmount: number, toAmount: number, slippage: number) => boolean
  stakeInVault: (vaultId: string, amountUsd: number) => boolean
  claimVaultRewards: (vaultId: string) => boolean
  addWhitelistedAddress: (label: string, address: string, network: string) => void
  toggleSecurityPolicy: (policyId: string) => void
  addToast: (title: string, message: string, type?: 'success' | 'info' | 'warning' | 'error') => void
  removeToast: (id: string) => void
  showGreeting: (config: Omit<GreetingConfirmation, 'isOpen'>) => void
  closeGreeting: () => void
  exportLedgerCSV: () => void
}

const WalletContext = createContext<WalletContextType | undefined>(undefined)

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard')

  const [wallet, setWallet] = useState<WalletState>(() => {
    const saved = localStorage.getItem('nova_wallet_state')
    return saved ? JSON.parse(saved) : initialWalletState
  })

  const [assets, setAssets] = useState<Asset[]>(() => {
    const saved = localStorage.getItem('nova_assets')
    return saved ? JSON.parse(saved) : initialAssets
  })

  const [stocks, setStocks] = useState<Stock[]>(() => {
    const saved = localStorage.getItem('nova_stocks')
    return saved ? JSON.parse(saved) : initialStocks
  })

  const [vaults, setVaults] = useState<Vault[]>(() => {
    const saved = localStorage.getItem('nova_vaults')
    return saved ? JSON.parse(saved) : initialVaults
  })

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('nova_transactions')
    return saved ? JSON.parse(saved) : initialTransactions
  })

  const [stockActivities, setStockActivities] = useState<StockActivity[]>(() => {
    const saved = localStorage.getItem('nova_stock_activities')
    return saved ? JSON.parse(saved) : initialStockActivities
  })

  const [whitelistedAddresses, setWhitelistedAddresses] = useState<WhitelistAddress[]>(() => {
    const saved = localStorage.getItem('nova_whitelist')
    return saved ? JSON.parse(saved) : initialWhitelistedAddresses
  })

  const [securityPolicies, setSecurityPolicies] = useState<SecurityPolicy[]>(() => {
    const saved = localStorage.getItem('nova_policies')
    return saved ? JSON.parse(saved) : initialSecurityPolicies
  })

  const [toasts, setToasts] = useState<ToastItem[]>([])

  const [greetingModal, setGreetingModal] = useState<GreetingConfirmation>({
    isOpen: false,
    title: '',
    greetingText: '',
    actionType: 'send',
    amountText: '',
    usdEquivalent: '',
    recipientOrAsset: '',
    hash: '',
    networkFee: '$0.00',
    timestamp: ''
  })

  // Persistence
  useEffect(() => {
    localStorage.setItem('nova_wallet_state', JSON.stringify(wallet))
  }, [wallet])

  useEffect(() => {
    localStorage.setItem('nova_assets', JSON.stringify(assets))
  }, [assets])

  useEffect(() => {
    localStorage.setItem('nova_stocks', JSON.stringify(stocks))
  }, [stocks])

  useEffect(() => {
    localStorage.setItem('nova_vaults', JSON.stringify(vaults))
  }, [vaults])

  useEffect(() => {
    localStorage.setItem('nova_transactions', JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem('nova_stock_activities', JSON.stringify(stockActivities))
  }, [stockActivities])

  useEffect(() => {
    localStorage.setItem('nova_whitelist', JSON.stringify(whitelistedAddresses))
  }, [whitelistedAddresses])

  useEffect(() => {
    localStorage.setItem('nova_policies', JSON.stringify(securityPolicies))
  }, [securityPolicies])

  const showGreeting = (config: Omit<GreetingConfirmation, 'isOpen'>) => {
    setGreetingModal({
      ...config,
      isOpen: true
    })
  }

  const closeGreeting = () => {
    setGreetingModal((prev) => ({ ...prev, isOpen: false }))
  }

  const addToast = (title: string, message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`
    setToasts((prev) => [...prev, { id, title, message, type, timestamp: Date.now() }])
    setTimeout(() => {
      removeToast(id)
    }, 4500)
  }

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }

  const connectWallet = (walletName = 'MetaMask Institutional') => {
    setWallet((prev) => ({
      ...prev,
      isConnected: true,
      address: '0x7F9e58B132C4982a0b1297eE69Ac0Fa049443B21'
    }))
    addToast('Keystore Connected', `Connected to ${walletName} (0x7F9e...3B21)`, 'success')
  }

  const disconnectWallet = () => {
    setWallet((prev) => ({
      ...prev,
      isConnected: false
    }))
    addToast('Session Ended', 'Institutional wallet disconnected.', 'info')
  }

  const switchNetwork = (network: string) => {
    setWallet((prev) => ({ ...prev, network }))
    addToast('Network Switched', `Switched network to ${network}`, 'info')
  }

  // 1. Send Money with Balance Deduction, History Logging, and Greeting Pop-up!
  const sendMoney = (recipient: string, amount: number, symbol: string, note?: string): boolean => {
    const asset = assets.find((a) => a.symbol === symbol)
    if (!asset || asset.balance < amount) {
      addToast('Insufficient Liquidity', `Available: ${asset ? asset.balance : 0} ${symbol}`, 'error')
      return false
    }

    const usdVal = amount * asset.price

    // Deduct balance
    setAssets((prev) =>
      prev.map((a) => (a.symbol === symbol ? { ...a, balance: a.balance - amount } : a))
    )

    // Deduct from net worth & available cash if USDC
    setWallet((prev) => ({
      ...prev,
      totalNetWorth: Math.max(0, prev.totalNetWorth - usdVal),
      availableCashUsd: symbol === 'USDC' ? Math.max(0, prev.availableCashUsd - amount) : prev.availableCashUsd
    }))

    const hashHex = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      hash: hashHex,
      type: 'transfer',
      status: 'confirmed',
      timestamp,
      fromAddress: wallet.address,
      toAddress: recipient,
      tokenSymbol: symbol,
      tokenAmount: amount,
      usdValue: usdVal,
      networkFeeUsd: 2.10,
      blockNumber: 19825420 + Math.floor(Math.random() * 40),
      note: note || `Dispatched to ${recipient.substring(0, 8)}... via MEV-Shield`
    }

    setTransactions((prev) => [newTx, ...prev])

    // Trigger Celebratory Greeting Confirmation Pop-Up!
    showGreeting({
      title: 'Transfer Dispatched Successfully! 🎉',
      greetingText: `Greeting from Nova Institutional Wealth Desk, ${wallet.accountName}! Your transfer has been verified by the hardware quorum and permanently settled on-chain.`,
      actionType: 'send',
      amountText: `${amount.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${symbol}`,
      usdEquivalent: `≈ $${usdVal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`,
      recipientOrAsset: recipient,
      hash: hashHex,
      networkFee: '$2.10 USD (EVM Gas)',
      timestamp,
      note: newTx.note
    })

    return true
  }

  // 2. Buy Tokenized Stocks with Portfolio Adjustment & Greeting Pop-up!
  const buyStock = (symbol: string, shares: number): boolean => {
    const stock = stocks.find((s) => s.symbol === symbol)
    if (!stock || shares <= 0) return false

    const totalUsd = shares * stock.price
    if (wallet.availableCashUsd < totalUsd) {
      addToast('Insufficient Cash Balance', `Need $${totalUsd.toLocaleString()} USD in available cash.`, 'error')
      return false
    }

    // Deduct cash, increase stock shares
    setWallet((prev) => ({
      ...prev,
      availableCashUsd: prev.availableCashUsd - totalUsd
    }))

    setStocks((prev) =>
      prev.map((s) => (s.symbol === symbol ? { ...s, shares: s.shares + shares } : s))
    )

    const orderId = `ORD-${symbol}-${Math.floor(1000 + Math.random() * 9000)}`
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'

    const newActivity: StockActivity = {
      id: `stk-${Date.now()}`,
      stockSymbol: symbol,
      stockName: stock.name,
      action: 'BUY',
      shares,
      sharePrice: stock.price,
      totalUsd,
      timestamp,
      status: 'filled',
      orderId,
      notes: `Institutional execution on Nasdaq via Nova Stock Bridge`
    }

    setStockActivities((prev) => [newActivity, ...prev])

    // Also record in master ledger
    const hashHex = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      hash: hashHex,
      type: 'stock_trade',
      status: 'confirmed',
      timestamp,
      fromAddress: wallet.address,
      toAddress: `NovaStockBridge_${symbol}`,
      tokenSymbol: `${symbol} (Equities)`,
      tokenAmount: shares,
      usdValue: totalUsd,
      networkFeeUsd: 1.50,
      blockNumber: 19825480,
      note: `Bought ${shares} shares of ${stock.name} @ $${stock.price}`
    }

    setTransactions((prev) => [newTx, ...prev])

    // Trigger Celebratory Greeting Confirmation Pop-Up!
    showGreeting({
      title: 'Stock Purchase Filled! 📈',
      greetingText: `Congratulations ${wallet.accountName}! Your market order for ${shares} shares of ${stock.name} (${symbol}) has been filled by the institutional broker enclave with zero market delay.`,
      actionType: 'stock_buy',
      amountText: `${shares} Shares of ${symbol}`,
      usdEquivalent: `$${totalUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`,
      recipientOrAsset: `${stock.name} (Nasdaq Tokenized)`,
      hash: hashHex,
      networkFee: '$1.50 USD Commission',
      timestamp,
      note: `Order ID: ${orderId}`
    })

    return true
  }

  // 3. Sell Tokenized Stocks
  const sellStock = (symbol: string, shares: number): boolean => {
    const stock = stocks.find((s) => s.symbol === symbol)
    if (!stock || stock.shares < shares) {
      addToast('Insufficient Shares', `You only hold ${stock ? stock.shares : 0} shares of ${symbol}.`, 'error')
      return false
    }

    const totalUsd = shares * stock.price

    // Increase cash, decrease stock shares
    setWallet((prev) => ({
      ...prev,
      availableCashUsd: prev.availableCashUsd + totalUsd
    }))

    setStocks((prev) =>
      prev.map((s) => (s.symbol === symbol ? { ...s, shares: s.shares - shares } : s))
    )

    const orderId = `ORD-SELL-${symbol}-${Math.floor(1000 + Math.random() * 9000)}`
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'

    const newActivity: StockActivity = {
      id: `stk-${Date.now()}`,
      stockSymbol: symbol,
      stockName: stock.name,
      action: 'SELL',
      shares,
      sharePrice: stock.price,
      totalUsd,
      timestamp,
      status: 'settled',
      orderId,
      notes: `Liquidated ${shares} shares via Institutional Liquidity Pool`
    }

    setStockActivities((prev) => [newActivity, ...prev])

    const hashHex = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      hash: hashHex,
      type: 'stock_trade',
      status: 'confirmed',
      timestamp,
      fromAddress: wallet.address,
      toAddress: `NovaStockBridge_${symbol}`,
      tokenSymbol: `${symbol} (Equities)`,
      tokenAmount: shares,
      usdValue: totalUsd,
      networkFeeUsd: 1.50,
      blockNumber: 19825510,
      note: `Sold ${shares} shares of ${stock.name} for $${totalUsd.toLocaleString()} USD`
    }

    setTransactions((prev) => [newTx, ...prev])

    // Trigger Celebratory Greeting Confirmation Pop-Up!
    showGreeting({
      title: 'Stock Sale Settled! 💵',
      greetingText: `Order complete, ${wallet.accountName}! Your sale of ${shares} shares of ${stock.name} has settled. $${totalUsd.toLocaleString()} USD has been credited directly to your liquid reserve.`,
      actionType: 'stock_sell',
      amountText: `${shares} Shares of ${symbol}`,
      usdEquivalent: `+$${totalUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`,
      recipientOrAsset: `Settled into Liquid Cash`,
      hash: hashHex,
      networkFee: '$1.50 USD Commission',
      timestamp,
      note: `Order ID: ${orderId}`
    })

    return true
  }

  // 4. Swap Execution with Greeting Pop-Up!
  const executeSwap = (
    fromSymbol: string,
    toSymbol: string,
    fromAmount: number,
    toAmount: number,
    slippage: number
  ): boolean => {
    const sourceAsset = assets.find((a) => a.symbol === fromSymbol)
    const targetAsset = assets.find((a) => a.symbol === toSymbol)

    if (!sourceAsset || sourceAsset.balance < fromAmount) {
      addToast('Insufficient Balance', `You do not have enough ${fromSymbol} to complete this swap.`, 'error')
      return false
    }

    setAssets((prev) =>
      prev.map((a) => {
        if (a.symbol === fromSymbol) {
          return { ...a, balance: Math.max(0, a.balance - fromAmount) }
        }
        if (a.symbol === toSymbol) {
          return { ...a, balance: a.balance + toAmount }
        }
        return a
      })
    )

    const hashHex = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      hash: hashHex,
      type: 'swap',
      status: 'confirmed',
      timestamp,
      fromAddress: wallet.address,
      toAddress: '0xNovaRouterV2_DEX',
      tokenSymbol: `${fromSymbol} → ${toSymbol}`,
      tokenAmount: fromAmount,
      usdValue: fromAmount * (sourceAsset.price || 1),
      networkFeeUsd: 2.15,
      blockNumber: 19825550,
      note: `Executed with ${slippage}% slippage tolerance via Nova MEV-Shield`
    }

    setTransactions((prev) => [newTx, ...prev])

    // Trigger Celebratory Greeting Confirmation Pop-Up!
    showGreeting({
      title: 'Institutional Swap Executed! ⚡',
      greetingText: `Greetings ${wallet.accountName}! Your swap of ${fromAmount.toLocaleString()} ${fromSymbol} for ${toAmount.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${toSymbol} has completed with zero frontrunning exposure.`,
      actionType: 'swap',
      amountText: `${toAmount.toLocaleString(undefined, { maximumFractionDigits: 4 })} ${toSymbol}`,
      usdEquivalent: `≈ $${(fromAmount * sourceAsset.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`,
      recipientOrAsset: `${fromSymbol} → ${toSymbol} Liquidity Pool`,
      hash: hashHex,
      networkFee: '$2.15 USD (Protected Routing)',
      timestamp,
      note: newTx.note
    })

    return true
  }

  // 5. Staking in Vault with Greeting Pop-Up!
  const stakeInVault = (vaultId: string, amountUsd: number): boolean => {
    const vault = vaults.find((v) => v.id === vaultId)
    if (!vault) return false

    if (wallet.availableCashUsd < amountUsd) {
      addToast('Insufficient Liquidity', 'Not enough available cash balance to stake this amount.', 'error')
      return false
    }

    setWallet((prev) => ({
      ...prev,
      availableCashUsd: Math.max(0, prev.availableCashUsd - amountUsd),
      stakedAssetsUsd: prev.stakedAssetsUsd + amountUsd
    }))

    setVaults((prev) =>
      prev.map((v) => (v.id === vaultId ? { ...v, userStakedUsd: v.userStakedUsd + amountUsd } : v))
    )

    const hashHex = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      hash: hashHex,
      type: 'stake',
      status: 'confirmed',
      timestamp,
      fromAddress: wallet.address,
      toAddress: vault.title,
      tokenSymbol: vault.symbol,
      tokenAmount: amountUsd,
      usdValue: amountUsd,
      networkFeeUsd: 3.40,
      blockNumber: 19825600,
      note: `Staked in ${vault.title} @ ${vault.apy}% APY`
    }

    setTransactions((prev) => [newTx, ...prev])

    // Trigger Celebratory Greeting Confirmation Pop-Up!
    showGreeting({
      title: 'Yield Position Locked! 💎',
      greetingText: `Welcome to high-velocity yield generation, ${wallet.accountName}! $${amountUsd.toLocaleString()} USD has been successfully locked in ${vault.title}. You are now earning an estimated ${vault.apy}% APY compounded every block.`,
      actionType: 'stake',
      amountText: `$${amountUsd.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USD`,
      usdEquivalent: `${vault.apy}% APY Accrual Rate`,
      recipientOrAsset: vault.title,
      hash: hashHex,
      networkFee: '$3.40 USD Smart Contract Fee',
      timestamp,
      note: `Lock Term: ${vault.lockPeriodDays === 0 ? 'Flexible' : `${vault.lockPeriodDays} Days`}`
    })

    return true
  }

  // 6. Claim Rewards with Greeting Pop-Up!
  const claimVaultRewards = (vaultId: string): boolean => {
    const vault = vaults.find((v) => v.id === vaultId)
    if (!vault || vault.unclaimedRewardsUsd <= 0) {
      addToast('No Rewards', 'There are currently no rewards available to claim for this vault.', 'warning')
      return false
    }

    const claimed = vault.unclaimedRewardsUsd

    setWallet((prev) => ({
      ...prev,
      availableCashUsd: prev.availableCashUsd + claimed,
      totalNetWorth: prev.totalNetWorth + claimed,
      accumulatedYieldUsd: prev.accumulatedYieldUsd + claimed
    }))

    setVaults((prev) =>
      prev.map((v) => (v.id === vaultId ? { ...v, unclaimedRewardsUsd: 0 } : v))
    )

    const hashHex = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC'

    const newTx: Transaction = {
      id: `tx-${Date.now()}`,
      hash: hashHex,
      type: 'reward',
      status: 'confirmed',
      timestamp,
      fromAddress: vault.title,
      toAddress: wallet.address,
      tokenSymbol: 'USDC',
      tokenAmount: claimed,
      usdValue: claimed,
      networkFeeUsd: 0.00,
      blockNumber: 19825650,
      note: `Claimed automated yield harvest from ${vault.title}`
    }

    setTransactions((prev) => [newTx, ...prev])

    showGreeting({
      title: 'Yield Dividend Harvested! 🎁',
      greetingText: `Congratulations ${wallet.accountName}! $${claimed.toLocaleString(undefined, { minimumFractionDigits: 2 })} in USDC yield dividends has been withdrawn from ${vault.title} and deposited to your cash reserve.`,
      actionType: 'reward',
      amountText: `+$${claimed.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} USDC`,
      usdEquivalent: 'Zero Gas Distribution',
      recipientOrAsset: `Harvested to Liquid Cash`,
      hash: hashHex,
      networkFee: '$0.00 (Sponsored)',
      timestamp,
      note: newTx.note
    })

    return true
  }

  const addWhitelistedAddress = (label: string, address: string, network: string) => {
    const newWl: WhitelistAddress = {
      id: `wl-${Date.now()}`,
      label,
      address,
      network,
      addedDate: new Date().toISOString().substring(0, 10),
      timelockHours: 24,
      status: 'in_timelock'
    }
    setWhitelistedAddresses((prev) => [newWl, ...prev])
    addToast('Address Submitted to Timelock', `${label} added. 24h security review initiated.`, 'info')
  }

  const toggleSecurityPolicy = (policyId: string) => {
    setSecurityPolicies((prev) =>
      prev.map((p) => {
        if (p.id === policyId) {
          const next = !p.status
          addToast('Policy Updated', `${p.name} is now ${next ? 'Enforced' : 'Disabled'}.`, 'info')
          return { ...p, status: next }
        }
        return p
      })
    )
  }

  const exportLedgerCSV = () => {
    const headers = ['TxID', 'Hash', 'Type', 'Status', 'Timestamp', 'Token/Route', 'USD Value', 'Network Fee', 'Block']
    const rows = transactions.map((t) => [
      t.id,
      t.hash,
      t.type,
      t.status,
      `"${t.timestamp}"`,
      `"${t.tokenSymbol}"`,
      t.usdValue,
      t.networkFeeUsd,
      t.blockNumber
    ])

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n')
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `NovaWallet_Ledger_${new Date().toISOString().substring(0, 10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    addToast('Statement Exported', 'Full transaction ledger CSV downloaded.', 'success')
  }

  return (
    <WalletContext.Provider
      value={{
        wallet,
        assets,
        stocks,
        vaults,
        transactions,
        stockActivities,
        whitelistedAddresses,
        securityPolicies,
        currentView,
        toasts,
        greetingModal,
        setCurrentView,
        connectWallet,
        disconnectWallet,
        switchNetwork,
        sendMoney,
        buyStock,
        sellStock,
        executeSwap,
        stakeInVault,
        claimVaultRewards,
        addWhitelistedAddress,
        toggleSecurityPolicy,
        addToast,
        removeToast,
        showGreeting,
        closeGreeting,
        exportLedgerCSV
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}

export const useWallet = () => {
  const context = useContext(WalletContext)
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider')
  }
  return context
}
