# NovaWallet 2.4 — Institutional Private Wealth & Frictionless Liquidity

> Institutional-grade decentralized asset management, ultra-low latency multi-chain execution, tokenized equities trading, automated yield vaults, and zero-knowledge cryptographic privacy.

---

## ⚡ Core Features

- **Portfolio Dashboard**: Total Net Worth tracking (`$985,250.40`), 24h P&L metrics (`+$14,290.10 / +14.28%`), interactive SVG performance trajectory chart across multiple timeframes (1D, 1W, 1M, 1Y, ALL), and asset allocation breakdown (ETH, BTC, NOVA, USDC, SOL).
- **Tokenized Equities & Stocks Desk**: Live continuous trading for institutional equities including **NVDA**, **AAPL**, **TSLA**, **MSFT**, and **AMZN** with instant cash settlement.
- **Dual Activity Hub**: Real-time switchable ledger displaying:
  - **Recent Transactions**: Confirmed sends, receives, DEX swaps, staking, and inbound wires.
  - **Stocks Activity Feed**: Executed equity orders with order IDs, timestamps, shares, and execution prices.
- **Celebratory Greeting Pop-Up Modal**: Full confirmation pop-up with particle confetti blast, customized greetings, cryptographic receipt breakdown (Amount, USD equivalent, Tx Hash, Gas Fee, Timestamp), and downloadable signed receipts.
- **QR Code Scanner**: Live camera viewfinder with laser HUD, **Torch / Flashlight option**, and **Upload QR Code Image option** for effortless invoice scanning.
- **Institutional Multi-Asset DEX**: Multi-chain swap routing, slippage tolerance selector, MEV frontrunning protection, and real-time order book (Bids & Asks).
- **Cyber Vaults & Staking**: High-yield algorithmic staking vaults (NOVA Sovereign 32.8% APY, ETH Liquid Staking 14.2%, USDC Stable Reserve 8.5%, BTC Liquidity Hedge 11.4%) with real-time harvest/claim functionality.
- **Institutional Governance & Security**: 3-of-5 hardware multisig quorum (YubiKey, Ledger, Trezor), 24h timelocked address whitelist, and compliance guardrails.
- **Account Balance & Transaction Ledger**: Settled custody balance (`$1,842,950.40`), search and filter toolbar, cryptographic block proofs, and one-click **CSV Statement Export**.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Lucide React, Canvas Confetti
- **Build Tool**: Vite 6
- **Architecture**: Swiss International 8pt/4pt layout grid, cyber-dark theme (`#080A0F`, `#00F29D`)
- **Testing**: Node.js Native Test Runner (`test/qa_verification.test.mjs`)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- npm (v9+)

### Installation

```bash
git clone https://github.com/sanjai2005git/NovaWallet_final3.git
cd NovaWallet_final3
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
```

### Run Automated QA Tests

```bash
npm run test
```

---

## 📄 License

MIT License © 2026 Nova Protocol Foundation.

