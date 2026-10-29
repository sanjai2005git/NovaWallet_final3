export type ViewMode = 'landing' | 'dashboard' | 'swap' | 'vaults' | 'settings' | 'ledger'

export interface Asset {
  id: string
  symbol: string
  name: string
  balance: number
  price: number
  change24h: number
  chain: string
  iconColor: string
  allocationPct: number
}

export interface Stock {
  id: string
  symbol: string
  name: string
  shares: number
  price: number
  change24h: number
  sector: string
  iconColor: string
}

export interface StockActivity {
  id: string
  stockSymbol: string
  stockName: string
  action: 'BUY' | 'SELL'
  shares: number
  sharePrice: number
  totalUsd: number
  timestamp: string
  status: 'filled' | 'settled'
  orderId: string
  notes?: string
}

export type TxType = 'swap' | 'transfer' | 'deposit' | 'stake' | 'reward' | 'withdraw' | 'stock_trade'
export type TxStatus = 'confirmed' | 'pending' | 'failed'

export interface Transaction {
  id: string
  hash: string
  type: TxType
  status: TxStatus
  timestamp: string
  fromAddress: string
  toAddress: string
  tokenSymbol: string
  tokenAmount: number
  usdValue: number
  networkFeeUsd: number
  blockNumber: number
  note?: string
}

export interface GreetingConfirmation {
  isOpen: boolean
  title: string
  greetingText: string
  actionType: 'send' | 'swap' | 'stock_buy' | 'stock_sell' | 'stake' | 'reward'
  amountText: string
  usdEquivalent: string
  recipientOrAsset: string
  hash: string
  networkFee: string
  timestamp: string
  note?: string
}

export interface Vault {
  id: string
  title: string
  symbol: string
  tag: string
  apy: number
  tvlUsd: number
  userStakedUsd: number
  unclaimedRewardsUsd: number
  lockPeriodDays: number
  riskLevel: 'Ultra-Low' | 'Low' | 'Medium' | 'Alpha'
  isFeatured?: boolean
}

export interface Signer {
  id: string
  name: string
  role: string
  address: string
  device: string
  lastActive: string
  status: 'active' | 'pending' | 'revoked'
  isYou?: boolean
}

export interface WhitelistAddress {
  id: string
  label: string
  address: string
  network: string
  addedDate: string
  timelockHours: number
  status: 'active' | 'in_timelock' | 'paused'
}

export interface SecurityPolicy {
  id: string
  name: string
  desc: string
  status: boolean
  level?: string
}

export interface WalletState {
  isConnected: boolean
  address: string
  network: string
  accountName: string
  totalNetWorth: number
  netWorthChange24h: number
  netWorthChangePct24h: number
  stakedAssetsUsd: number
  availableCashUsd: number
  accumulatedYieldUsd: number
  totalSettledBalance: number
}
