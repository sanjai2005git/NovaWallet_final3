import {
  Asset,
  Transaction,
  Vault,
  Signer,
  WhitelistAddress,
  SecurityPolicy,
  WalletState,
  Stock,
  StockActivity
} from '../types'

export const initialWalletState: WalletState = {
  isConnected: true,
  address: '0x7F9e58B132C4982a0b1297eE69Ac0Fa049443B21',
  network: 'Ethereum Mainnet',
  accountName: 'Alexander Vance',
  totalNetWorth: 985250.40,
  netWorthChange24h: 14290.10,
  netWorthChangePct24h: 14.28,
  stakedAssetsUsd: 642800.00,
  availableCashUsd: 218450.40,
  accumulatedYieldUsd: 124000.00,
  totalSettledBalance: 1842950.40
}

export const initialAssets: Asset[] = [
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    balance: 145.50,
    price: 3450.00,
    change24h: 4.82,
    chain: 'ERC-20',
    iconColor: '#627EEA',
    allocationPct: 50.95
  },
  {
    id: 'btc',
    symbol: 'BTC',
    name: 'Bitcoin (Wrapped)',
    balance: 4.20,
    price: 68400.00,
    change24h: 2.34,
    chain: 'Native / WBTC',
    iconColor: '#F7931A',
    allocationPct: 29.16
  },
  {
    id: 'nova',
    symbol: 'NOVA',
    name: 'Nova Protocol',
    balance: 45000.00,
    price: 1.85,
    change24h: 18.45,
    chain: 'Nova Rollup L2',
    iconColor: '#00F29D',
    allocationPct: 8.45
  },
  {
    id: 'usdc',
    symbol: 'USDC',
    name: 'USD Coin',
    balance: 82745.40,
    price: 1.00,
    change24h: 0.01,
    chain: 'Multi-Chain',
    iconColor: '#2775CA',
    allocationPct: 8.40
  },
  {
    id: 'sol',
    symbol: 'SOL',
    name: 'Solana',
    balance: 200.00,
    price: 150.00,
    change24h: -1.24,
    chain: 'Solana SPL',
    iconColor: '#9945FF',
    allocationPct: 3.04
  }
]

export const initialStocks: Stock[] = [
  {
    id: 'stock-nvda',
    symbol: 'NVDA',
    name: 'NVIDIA Corporation',
    shares: 120,
    price: 138.25,
    change24h: 3.42,
    sector: 'Semiconductors & AI',
    iconColor: '#76B900'
  },
  {
    id: 'stock-aapl',
    symbol: 'AAPL',
    name: 'Apple Inc.',
    shares: 80,
    price: 231.50,
    change24h: 1.18,
    sector: 'Consumer Electronics',
    iconColor: '#A2AAAD'
  },
  {
    id: 'stock-tsla',
    symbol: 'TSLA',
    name: 'Tesla Inc.',
    shares: 50,
    price: 218.80,
    change24h: 5.64,
    sector: 'Autonomous Vehicles',
    iconColor: '#CC0000'
  },
  {
    id: 'stock-msft',
    symbol: 'MSFT',
    name: 'Microsoft Corporation',
    shares: 40,
    price: 428.10,
    change24h: 0.85,
    sector: 'Enterprise Cloud & AI',
    iconColor: '#00A4EF'
  },
  {
    id: 'stock-amzn',
    symbol: 'AMZN',
    name: 'Amazon.com Inc.',
    shares: 65,
    price: 186.40,
    change24h: 2.15,
    sector: 'E-Commerce & AWS',
    iconColor: '#FF9900'
  }
]

export const initialStockActivities: StockActivity[] = [
  {
    id: 'stk-act-101',
    stockSymbol: 'NVDA',
    stockName: 'NVIDIA Corporation',
    action: 'BUY',
    shares: 30,
    sharePrice: 135.00,
    totalUsd: 4050.00,
    timestamp: '2026-10-28 14:12:08 UTC',
    status: 'filled',
    orderId: 'ORD-NVDA-9941',
    notes: 'Tokenized Equity execution via Institutional Clearing Desk'
  },
  {
    id: 'stk-act-102',
    stockSymbol: 'AAPL',
    stockName: 'Apple Inc.',
    action: 'BUY',
    shares: 25,
    sharePrice: 228.40,
    totalUsd: 5710.00,
    timestamp: '2026-10-27 18:30:45 UTC',
    status: 'filled',
    orderId: 'ORD-AAPL-8832',
    notes: 'Direct Nasdaq Liquidity Feed via Nova Stock Bridge'
  },
  {
    id: 'stk-act-103',
    stockSymbol: 'TSLA',
    stockName: 'Tesla Inc.',
    action: 'SELL',
    shares: 15,
    sharePrice: 215.00,
    totalUsd: 3225.00,
    timestamp: '2026-10-26 11:20:19 UTC',
    status: 'settled',
    orderId: 'ORD-TSLA-7721',
    notes: 'Take-profit order executed at target limit'
  },
  {
    id: 'stk-act-104',
    stockSymbol: 'MSFT',
    stockName: 'Microsoft Corporation',
    action: 'BUY',
    shares: 10,
    sharePrice: 422.00,
    totalUsd: 4220.00,
    timestamp: '2026-10-25 15:45:00 UTC',
    status: 'filled',
    orderId: 'ORD-MSFT-6610',
    notes: 'Quarterly dividend reinvestment allocation'
  },
  {
    id: 'stk-act-105',
    stockSymbol: 'AMZN',
    stockName: 'Amazon.com Inc.',
    action: 'BUY',
    shares: 20,
    sharePrice: 184.50,
    totalUsd: 3690.00,
    timestamp: '2026-10-24 09:15:33 UTC',
    status: 'settled',
    orderId: 'ORD-AMZN-5502',
    notes: 'Institutional liquidity routing via SEC-regulated broker enclave'
  }
]

export const initialVaults: Vault[] = [
  {
    id: 'vault-nova',
    title: 'NOVA Sovereign Vault',
    symbol: 'NOVA-STAKE',
    tag: 'Institutional Alpha',
    apy: 32.80,
    tvlUsd: 182400000,
    userStakedUsd: 250000.00,
    unclaimedRewardsUsd: 12480.50,
    lockPeriodDays: 90,
    riskLevel: 'Medium',
    isFeatured: true
  },
  {
    id: 'vault-eth',
    title: 'ETH Liquid Staking Vault',
    symbol: 'stETH-PRIME',
    tag: 'Institutional Grade',
    apy: 14.20,
    tvlUsd: 840600000,
    userStakedUsd: 220000.00,
    unclaimedRewardsUsd: 4890.20,
    lockPeriodDays: 30,
    riskLevel: 'Low',
    isFeatured: false
  },
  {
    id: 'vault-usdc',
    title: 'USDC Stable Reserve',
    symbol: 'USDC-YIELD',
    tag: 'Capital Preservation',
    apy: 8.50,
    tvlUsd: 1240000000,
    userStakedUsd: 112800.00,
    unclaimedRewardsUsd: 2150.00,
    lockPeriodDays: 0,
    riskLevel: 'Ultra-Low',
    isFeatured: false
  },
  {
    id: 'vault-btc',
    title: 'BTC Liquidity Hedge Vault',
    symbol: 'wBTC-LQD',
    tag: 'Macro Hedge',
    apy: 11.40,
    tvlUsd: 510200000,
    userStakedUsd: 60000.00,
    unclaimedRewardsUsd: 1840.10,
    lockPeriodDays: 180,
    riskLevel: 'Low',
    isFeatured: false
  }
]

export const initialTransactions: Transaction[] = [
  {
    id: 'tx-1001',
    hash: '0x8b3f12a9e0481cfc94101e92da3b89012a4f61e721a9dc9103c801e0fa0192ea',
    type: 'swap',
    status: 'confirmed',
    timestamp: '2026-10-29 10:48:12 UTC',
    fromAddress: '0x7F9e58...3B21',
    toAddress: '0xNovaRouterV2_DEX',
    tokenSymbol: 'USDC → NOVA',
    tokenAmount: 50000.00,
    usdValue: 50000.00,
    networkFeeUsd: 2.45,
    blockNumber: 19824012,
    note: 'Optimal routing via Uniswap v3 & Nova L2'
  },
  {
    id: 'tx-1002',
    hash: '0x3f98c17b80a2948e912401ef98124801e892cfa7129038ecba91823dfa90218a',
    type: 'stake',
    status: 'confirmed',
    timestamp: '2026-10-28 16:32:04 UTC',
    fromAddress: '0x7F9e58...3B21',
    toAddress: '0xNovaSovereignVault_V3',
    tokenSymbol: 'NOVA',
    tokenAmount: 25000.00,
    usdValue: 46250.00,
    networkFeeUsd: 4.12,
    blockNumber: 19822180,
    note: '90-Day Lock Stake @ 32.80% APY'
  },
  {
    id: 'tx-1003',
    hash: '0x99201fa8120381023a9b12e873201948bafe8192301824efac01948123fa9081',
    type: 'deposit',
    status: 'confirmed',
    timestamp: '2026-10-28 11:15:30 UTC',
    fromAddress: '0xGenesisInstitutionalCustodian',
    toAddress: '0x7F9e58...3B21',
    tokenSymbol: 'ETH',
    tokenAmount: 40.00,
    usdValue: 138000.00,
    networkFeeUsd: 1.80,
    blockNumber: 19821045,
    note: 'Institutional Wire Inbound Liquidity'
  },
  {
    id: 'tx-1004',
    hash: '0x550182efa90123812038ef0192384aef0192834018239048fac109283fa09182',
    type: 'reward',
    status: 'confirmed',
    timestamp: '2026-10-27 23:59:00 UTC',
    fromAddress: '0xNovaYieldDistributor',
    toAddress: '0x7F9e58...3B21',
    tokenSymbol: 'USDC',
    tokenAmount: 1842.50,
    usdValue: 1842.50,
    networkFeeUsd: 0.00,
    blockNumber: 19818900,
    note: 'Automated Daily Vault Yield Distribution'
  },
  {
    id: 'tx-1005',
    hash: '0x129038fae0192384019283401928301984201948210398401928340192834019',
    type: 'transfer',
    status: 'confirmed',
    timestamp: '2026-10-27 14:20:19 UTC',
    fromAddress: '0x7F9e58...3B21',
    toAddress: '0xColdStorageVault_Alpha',
    tokenSymbol: 'BTC',
    tokenAmount: 1.50,
    usdValue: 102600.00,
    networkFeeUsd: 6.20,
    blockNumber: 19817450,
    note: 'Multi-Sig Approved Cold Storage Transfer'
  },
  {
    id: 'tx-1006',
    hash: '0x7701923840192830491820394810293840192830491820394810293840192830',
    type: 'swap',
    status: 'confirmed',
    timestamp: '2026-10-26 09:05:44 UTC',
    fromAddress: '0x7F9e58...3B21',
    toAddress: '0xNovaRouterV2_DEX',
    tokenSymbol: 'ETH → USDC',
    tokenAmount: 20.00,
    usdValue: 69000.00,
    networkFeeUsd: 3.10,
    blockNumber: 19812980,
    note: 'Zero-slippage MEV protected execution'
  },
  {
    id: 'tx-1007',
    hash: '0x4401928301928340192830192840192830192840192830192840192830192840',
    type: 'withdraw',
    status: 'confirmed',
    timestamp: '2026-10-25 18:40:11 UTC',
    fromAddress: '0xNovaStableReserve',
    toAddress: '0x7F9e58...3B21',
    tokenSymbol: 'USDC',
    tokenAmount: 25000.00,
    usdValue: 25000.00,
    networkFeeUsd: 1.15,
    blockNumber: 19808400,
    note: 'Instant Liquidity Unstake without lock penalty'
  }
]

export const initialSigners: Signer[] = [
  {
    id: 'sig-1',
    name: 'Alexander Vance',
    role: 'Primary Administrator',
    address: '0x7F9e58B132C4982a0b1297eE69Ac0Fa049443B21',
    device: 'YubiKey 5Ci (FIDO2 Hardware)',
    lastActive: 'Active Now',
    status: 'active',
    isYou: true
  },
  {
    id: 'sig-2',
    name: 'Elena Rostova',
    role: 'Chief Risk Officer',
    address: '0x4A1c88dF291a0B92e83120b08a1c89f029a17381',
    device: 'Ledger Nano X (ECDSA secp256k1)',
    lastActive: '3 hours ago',
    status: 'active'
  },
  {
    id: 'sig-3',
    name: 'Marcus Sterling',
    role: 'Head of Treasury',
    address: '0x9920bfA12903c801e9a901823019284019283a01',
    device: 'Trezor Model T (Hardware Keystore)',
    lastActive: '12 hours ago',
    status: 'active'
  },
  {
    id: 'sig-4',
    name: 'Nova Automated Sentinel',
    role: 'Automated Fraud Defense',
    address: '0x00NovaSentinelContract_V2',
    device: 'AWS Nitro Cloud HSM Enclave',
    lastActive: '1 minute ago',
    status: 'active'
  },
  {
    id: 'sig-5',
    name: 'Sarah Chen',
    role: 'Compliance Lead',
    address: '0x8B3910cfa01923840192834019283a0192834019',
    device: 'YubiKey Bio Series',
    lastActive: '1 day ago',
    status: 'active'
  }
]

export const initialWhitelistedAddresses: WhitelistAddress[] = [
  {
    id: 'wl-1',
    label: 'Nova Institutional Cold Storage Alpha',
    address: '0x1A2b3C4d5E6F708192aBcDeF0123456789aBcDeF',
    network: 'Ethereum Mainnet',
    addedDate: '2026-08-15',
    timelockHours: 24,
    status: 'active'
  },
  {
    id: 'wl-2',
    label: 'Coinbase Prime Custody Vault',
    address: '0x3c2a901fbc019238401928301928401928301928',
    network: 'Ethereum / Arbitrum',
    addedDate: '2026-09-02',
    timelockHours: 48,
    status: 'active'
  },
  {
    id: 'wl-3',
    label: 'Anchor OTC Settlement Desk',
    address: '0x7701928301928301928301928301928301928301',
    network: 'Nova L2 Rollup',
    addedDate: '2026-10-10',
    timelockHours: 24,
    status: 'active'
  }
]

export const initialSecurityPolicies: SecurityPolicy[] = [
  {
    id: 'pol-1',
    name: 'Multi-Signature Governance Threshold',
    desc: 'Require 3 of 5 authorized hardware signers for outgoing transfers above $50,000.',
    status: true,
    level: '3 / 5 Signers'
  },
  {
    id: 'pol-2',
    name: 'Mandatory 24h Timelock on New Addresses',
    desc: 'Any newly added recipient address must undergo a 24-hour cryptographic cooldown period.',
    status: true,
    level: '24 Hours Cooldown'
  },
  {
    id: 'pol-3',
    name: 'MEV Protection & Private Mempool Routing',
    desc: 'Route all DEX orders through Flashbots and private builder endpoints to prevent frontrunning.',
    status: true,
    level: 'Shield Active'
  },
  {
    id: 'pol-4',
    name: 'Hardware Security Key Enforcement',
    desc: 'Require FIDO2 WebAuthn / physical hardware key approval on all transactions and setting adjustments.',
    status: true,
    level: 'FIDO2 / U2F'
  },
  {
    id: 'pol-5',
    name: 'Adaptive Geo-Fencing & IP Sentinel',
    desc: 'Automatically flag and pause ledger sessions detected outside authorized company static IP subnets.',
    status: true,
    level: 'Enforced'
  }
]
