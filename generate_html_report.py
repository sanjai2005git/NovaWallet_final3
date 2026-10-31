import os
import base64

def get_base64_image(image_path):
    if not os.path.exists(image_path):
        return ""
    with open(image_path, "rb") as img_file:
        encoded = base64.b64encode(img_file.read()).decode('utf-8')
        return f"data:image/png;base64,{encoded}"

def create_html_report():
    proto_b64 = get_base64_image("novawallet_prototype.png")
    master_b64 = get_base64_image("novawallet2.png")
    s1_b64 = get_base64_image("screen1_landing.png")
    s2_b64 = get_base64_image("screen2_dashboard.png")
    s3_b64 = get_base64_image("screen3_swap.png")
    s4_b64 = get_base64_image("screen4_vaults.png")
    s5_b64 = get_base64_image("screen5_settings.png")
    s6_b64 = get_base64_image("screen6_ledger.png")

    html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Course Design Project Report - ISWE407L - NovaWallet 2.4</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {{
      --primary: #059669;
      --primary-mint: #00F29D;
      --primary-dark: #080A0F;
      --surface-card: #0D111A;
      --text-main: #1e293b;
      --text-muted: #64748b;
      --border-color: #e2e8f0;
      --bg-page: #ffffff;
    }}
    
    * {{
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }}
    
    body {{
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: var(--text-main);
      background-color: #f8fafc;
      padding: 2rem 1rem;
    }}
    
    .container {{
      max-width: 960px;
      margin: 0 auto;
      background: #ffffff;
      padding: 3.5rem 3rem;
      border-radius: 1rem;
      box-shadow: 0 4px 20px -2px rgba(0, 0, 0, 0.05);
      border: 1px solid var(--border-color);
    }}
    
    /* Cover / Title Page Header */
    .report-header {{
      text-align: center;
      padding-bottom: 2.5rem;
      border-bottom: 2px solid var(--border-color);
      margin-bottom: 2.5rem;
    }}
    .course-badge {{
      display: inline-block;
      padding: 0.35rem 0.9rem;
      background: #ecfdf5;
      color: #059669;
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.85rem;
      font-weight: 700;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.75rem;
      border: 1px solid #a7f3d0;
    }}
    .doc-category {{
      font-size: 1.25rem;
      font-weight: 700;
      color: var(--text-muted);
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }}
    .project-title {{
      font-size: 2.4rem;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.2;
      margin: 0.75rem 0;
    }}
    .project-subtitle {{
      font-size: 1.15rem;
      color: var(--primary);
      font-weight: 600;
    }}
    
    /* Meta Table */
    .meta-box {{
      margin: 2rem auto;
      max-width: 700px;
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 0.75rem;
      overflow: hidden;
    }}
    .meta-row {{
      display: flex;
      border-bottom: 1px solid #e2e8f0;
    }}
    .meta-row:last-child {{
      border-bottom: none;
    }}
    .meta-label {{
      width: 38%;
      background: #f1f5f9;
      padding: 0.75rem 1rem;
      font-weight: 600;
      font-size: 0.85rem;
      color: #334155;
      border-right: 1px solid #e2e8f0;
    }}
    .meta-val {{
      width: 62%;
      padding: 0.75rem 1rem;
      font-size: 0.85rem;
      color: #0f172a;
    }}
    
    /* Section Formatting */
    h2 {{
      font-size: 1.6rem;
      color: #0f172a;
      margin: 2.5rem 0 1rem;
      padding-bottom: 0.5rem;
      border-bottom: 2px solid #e2e8f0;
      font-weight: 800;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }}
    h3 {{
      font-size: 1.2rem;
      color: #1e293b;
      margin: 1.5rem 0 0.75rem;
      font-weight: 700;
    }}
    h4 {{
      font-size: 1rem;
      color: #334155;
      margin: 1rem 0 0.5rem;
      font-weight: 600;
    }}
    p {{
      margin-bottom: 1rem;
      font-size: 0.95rem;
      color: #334155;
      text-align: justify;
    }}
    ul, ol {{
      margin-left: 1.5rem;
      margin-bottom: 1.25rem;
      font-size: 0.95rem;
      color: #334155;
    }}
    li {{
      margin-bottom: 0.4rem;
    }}
    
    /* Tables */
    .styled-table {{
      width: 100%;
      border-collapse: collapse;
      margin: 1.5rem 0;
      font-size: 0.85rem;
      border-radius: 0.5rem;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
    }}
    .styled-table th {{
      background-color: #0f172a;
      color: #ffffff;
      text-align: left;
      padding: 0.85rem 1rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.03em;
    }}
    .styled-table td {{
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #e2e8f0;
      color: #1e293b;
      vertical-align: top;
    }}
    .styled-table tr:nth-child(even) {{
      background-color: #f8fafc;
    }}
    
    /* Callouts / Highlights */
    .callout {{
      padding: 1rem 1.25rem;
      background: #ecfdf5;
      border-left: 4px solid #059669;
      border-radius: 0.5rem;
      margin: 1.25rem 0;
      font-size: 0.9rem;
      color: #064e3b;
    }}
    
    /* Image Showcases */
    .figure-container {{
      margin: 2rem 0;
      text-align: center;
      background: #080a0f;
      padding: 1.5rem;
      border-radius: 0.75rem;
      border: 1px solid #1e293b;
    }}
    .figure-container img {{
      max-width: 100%;
      height: auto;
      border-radius: 0.5rem;
      box-shadow: 0 4px 15px rgba(0,0,0,0.4);
    }}
    .figure-caption {{
      margin-top: 0.75rem;
      font-size: 0.85rem;
      color: #94a3b8;
      font-family: 'JetBrains Mono', monospace;
    }}
    
    .screen-grid {{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 1.5rem;
      margin: 1.5rem 0;
    }}
    @media (max-width: 768px) {{
      .screen-grid {{
        grid-template-columns: 1fr;
      }}
    }}
    .screen-card {{
      background: #080a0f;
      border: 1px solid #1e293b;
      border-radius: 0.75rem;
      padding: 1rem;
      text-align: center;
    }}
    .screen-card img {{
      max-height: 280px;
      margin: 0 auto;
      border-radius: 0.35rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.5);
    }}
    .screen-title {{
      color: #f8fafc;
      font-size: 0.85rem;
      font-weight: 700;
      margin-top: 0.75rem;
    }}
    .screen-desc {{
      color: #94a3b8;
      font-size: 0.75rem;
      margin-top: 0.35rem;
      line-height: 1.4;
    }}
    
    /* Print Styles */
    @media print {{
      body {{
        background: #ffffff;
        padding: 0;
      }}
      .container {{
        box-shadow: none;
        border: none;
        padding: 0;
        max-width: 100%;
      }}
      .page-break {{
        page-break-before: always;
      }}
    }}
  </style>
</head>
<body>

  <div class="container">
    <!-- COVER / HEADER -->
    <header class="report-header">
      <span class="course-badge">ISWE407L Course Project</span>
      <div class="doc-category">Course Design Project Report</div>
      <h1 class="project-title">NovaWallet 2.4</h1>
      <div class="project-subtitle">Institutional Private Wealth &amp; Frictionless Liquidity Terminal</div>
      
      <div class="meta-box">
        <div class="meta-row">
          <div class="meta-label">Course Name &amp; Code:</div>
          <div class="meta-val">ISWE407L — User Interface and User Experience Design</div>
        </div>
        <div class="meta-row">
          <div class="meta-label">Project Domain:</div>
          <div class="meta-val">FinTech, Decentralized Wealth Management, Digital Asset Custody</div>
        </div>
        <div class="meta-row">
          <div class="meta-label">High-Fidelity Specification:</div>
          <div class="meta-val">Figma NovaWallet2 (Node 0-1)</div>
        </div>
        <div class="meta-row">
          <div class="meta-label">Medium-Fidelity Specification:</div>
          <div class="meta-val">Figma NOVAWALLET FINAL-PROTOTYPE</div>
        </div>
      </div>
    </header>

    <!-- SECTION 1 -->
    <section>
      <h2>1. Project Scope and Domain</h2>
      
      <h3>1.1 Domain Background and Industry Analysis</h3>
      <p>
        The project operates in the domain of Financial Technology (FinTech), specifically focused on the intersection of
        <strong>Institutional Wealth Management</strong>, <strong>Decentralized Finance (DeFi)</strong>, and <strong>Tokenized Real-World Equities</strong>.
        As multi-billion-dollar institutions and family offices enter the digital asset space, existing retail cryptocurrency wallet interfaces prove wholly inadequate.
        Retail solutions typically suffer from poor visual hierarchy, opaque fee structures, non-existent multi-signature governance, and catastrophic UX vulnerabilities
        such as lack of optical invoicing assistance and post-execution confirmation blackouts.
      </p>
      
      <p>
        NovaWallet 2.4 was designed to solve this paradigm by providing an institutional visual cockpit that combines
        the sub-second data density of professional financial terminals (such as Bloomberg or FactSet) with the transparency, non-custodial
        security, and algorithmic yield capabilities of modern Web3 protocols.
      </p>

      <h3>1.2 Core Problem Statement &amp; User Pain Points</h3>
      <ul>
        <li><strong>The "Black Hole" Transaction Anxiety (Gulf of Evaluation):</strong> In blockchain operations, clicking "Send" or "Invest" often leads to ambiguous spinners. When handling $50,000 to $1,000,000 institutional wire transfers, the lack of an immediate celebratory confirmation and clear cryptographic receipt creates severe psychological stress.</li>
        <li><strong>Fragmented Asset Class Silos:</strong> Fund managers are currently forced to use separate websites for crypto token swaps, staking vaults, equities trading (Nasdaq stocks), and audit reconciliation. This context-switching leads to frequent execution errors.</li>
        <li><strong>MEV Frontrunning &amp; Execution Uncertainty:</strong> Institutional orders routed via public mempools are routinely frontrun by automated sandwich bots. Investors require guaranteed zero-slippage, Flashbots-shielded execution routes.</li>
        <li><strong>Cumbersome Hexadecimal Address Verification:</strong> Manually typing or pasting 42-character cryptographic addresses leads to severe capital risk. Desktop and mobile interfaces need camera-assisted optical QR code vision with built-in torch illumination and file upload capabilities.</li>
      </ul>

      <h3>1.3 Project Scope, Boundaries, and Target Personas</h3>
      <p>
        The project scope encompasses an end-to-end web terminal for <strong>High-Net-Worth Individuals (HNWIs)</strong>, <strong>Family Office CFOs</strong>,
        and <strong>Institutional Treasury Committees</strong>. Key deliverables include:
      </p>
      <ul>
        <li>Real-time consolidated Net Asset Value telemetry ($985,250.40 Net Worth) and multi-timeframe interactive SVG performance trajectory (1D, 1W, 1M, 1Y, ALL).</li>
        <li>Direct 24/7 continuous trading desk for tokenized Nasdaq equities (NVDA, AAPL, TSLA, MSFT, AMZN) with immediate cash settlement.</li>
        <li>Institutional decentralized exchange (DEX) with Flashbots MEV protection, slippage tolerance dials, and real-time bids/asks order book.</li>
        <li>Autonomous cyber staking vaults featuring compound yield modeling (up to 32.8% APY) and block-by-block reward harvesting.</li>
        <li>Hardware Multi-Signature Quorum governance (3-of-5 threshold) with 24-hour timelocked destination address verification.</li>
        <li>Task completion confirmation engine featuring particle confetti bursts, personalized greetings, and downloadable official receipts.</li>
        <li>Optical camera QR code scanner equipped with high-intensity torch beam and QR image file upload options.</li>
        <li>Full audit ledger ($1,842,950.40 settled balance) with SHA-256 Merkle proofs and one-click RFC-4180 CSV statement export.</li>
      </ul>
    </section>

    <!-- SECTION 2 -->
    <section class="page-break">
      <h2>2. Functional Requirements</h2>
      <p>
        The system's functional architecture has been categorized into 8 core functional requirements (FR-01 to FR-08),
        providing comprehensive specifications for inputs, system behaviors, and verifiable outputs.
      </p>

      <table class="styled-table">
        <thead>
          <tr>
            <th style="width: 12%;">Req ID</th>
            <th style="width: 25%;">Requirement Title</th>
            <th style="width: 30%;">User Action &amp; Input</th>
            <th style="width: 33%;">System Behavior &amp; Output</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>FR-01</strong></td>
            <td>Consolidated Portfolio Telemetry &amp; NAV</td>
            <td>User opens Dashboard or clicks timeframe pills (1D, 1W, 1M, 1Y, ALL).</td>
            <td>Renders live portfolio NAV ($985,250.40), interactive SVG trajectory chart with cursor tooltips, 24h P&amp;L (+14.28%), and 5-asset allocation bar.</td>
          </tr>
          <tr>
            <td><strong>FR-02</strong></td>
            <td>Institutional DEX &amp; Swap Routing</td>
            <td>Selects token pairs (USDC &rarr; NOVA), enters volume, toggles MEV-shield, chooses slippage.</td>
            <td>Calculates optimal smart order route via Uniswap v3 &amp; Nova L2, updates token balances, and renders real-time bids/asks order book depth.</td>
          </tr>
          <tr>
            <td><strong>FR-03</strong></td>
            <td>Tokenized Equities &amp; Stocks Desk</td>
            <td>Selects equity (NVDA, AAPL, TSLA, MSFT, AMZN), chooses BUY/SELL, enters share quantity.</td>
            <td>Executes continuous trade, reconciles liquid cash, generates order tracking ID (e.g. ORD-NVDA-9941), updates holding counts, and logs to stock activity.</td>
          </tr>
          <tr>
            <td><strong>FR-04</strong></td>
            <td>Celebratory Greeting &amp; Task Confirmation</td>
            <td>Triggered automatically upon completing money transfers, stock trades, swaps, or stakes.</td>
            <td>Launches modal popup with multi-color particle confetti blast, customized institutional greeting, settled USD value, 64-hex Tx hash, and receipt downloader.</td>
          </tr>
          <tr>
            <td><strong>FR-05</strong></td>
            <td>Non-Custodial Capital Dispatch &amp; QR Scanner</td>
            <td>Enters address manually or scans invoice QR code with camera viewfinder.</td>
            <td>Features High-Intensity Torch button and Upload QR Image option; decodes destination address, validates balance, deducts gas ($2.10), and dispatches funds.</td>
          </tr>
          <tr>
            <td><strong>FR-06</strong></td>
            <td>Autonomous Compounding Yield Vaults</td>
            <td>Selects vault tier (NOVA, stETH, USDC, wBTC), specifies lock term (0 to 180 days), clicks Stake.</td>
            <td>Locks liquidity, models compounding APY curve, compounds yield dividends per block, and provides one-click harvest dividends distribution.</td>
          </tr>
          <tr>
            <td><strong>FR-07</strong></td>
            <td>Hardware Multi-Sig Quorum Governance</td>
            <td>Admin manages signers, adds whitelist recipient, or toggles security policy rules.</td>
            <td>Enforces 3-of-5 hardware key quorum (YubiKey, Ledger, Trezor), activates 24h security timelock on new addresses, and enforces compliance guardrails.</td>
          </tr>
          <tr>
            <td><strong>FR-08</strong></td>
            <td>Cryptographic Audit Ledger &amp; CSV Export</td>
            <td>Searches by hash/token, filters by operation type (Deposit, Swap, Transfer, Stake), clicks Export.</td>
            <td>Presents settled custody balance ($1,842,950.40), displays Merkle block proofs, and exports signed RFC-4180 compliant CSV ledger files.</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- SECTION 3 -->
    <section class="page-break">
      <h2>3. Conceptual Design Applicable to the Project</h2>
      
      <h3>3.1 Theoretical Framework: Norman's Seven Stages of Action</h3>
      <p>
        In high-stakes financial user experience, user hesitation is driven by the <strong>Gulf of Execution</strong> (how difficult it is to perform the action)
        and the <strong>Gulf of Evaluation</strong> (how difficult it is to verify that the system state correctly reflects the desired action).
        NovaWallet applies Donald Norman's Seven Stages of Action to construct seamless execution pathways:
      </p>

      <div class="callout">
        <strong>The 7 Stages Mapped to NovaWallet Capital Allocation:</strong>
        <ol style="margin-top: 0.5rem; margin-bottom: 0;">
          <li><strong>Forming the Goal:</strong> Rebalance treasury holdings into tokenized AI equities (NVDA) and high-yield staking vaults.</li>
          <li><strong>Forming the Intention:</strong> Allocate $2,765.00 USD of available liquid cash into 20 shares of NVDA.</li>
          <li><strong>Specifying Action Sequence:</strong> Open Stocks Desk &rarr; Click "BUY" &rarr; Select NVDA &rarr; Enter 20 shares &rarr; Verify quote.</li>
          <li><strong>Executing the Action:</strong> Click "Buy 20 NVDA" (physical input gesture).</li>
          <li><strong>Perceiving the State:</strong> The system immediately opens the Celebratory Greeting Modal with particle confetti.</li>
          <li><strong>Interpreting the State:</strong> Reading the greeting confirms that the order filled without slippage.</li>
          <li><strong>Evaluating the Outcome:</strong> Inspecting the updated cash reserve and SHA-256 transaction proof confirms complete goal achievement.</li>
        </ol>
      </div>

      <h3>3.2 The Object-Action Interface (OAI) Model</h3>
      <p>
        Following Ben Shneiderman's Object-Action Interface (OAI) model, interface objects are direct metaphors of domain task objects:
      </p>
      <table class="styled-table">
        <thead>
          <tr>
            <th>Domain Task Object</th>
            <th>Interface Metaphor &amp; Object</th>
            <th>Direct Manipulation &amp; Affordances</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Net Portfolio Wealth</strong></td>
            <td>Primary Visual Hero Card with Pulse Beacon</td>
            <td>1-click Action Pills (Deposit, Send, Scan QR, Instant Swap, Stake &amp; Earn).</td>
          </tr>
          <tr>
            <td><strong>Tokenized Equities</strong></td>
            <td>Interactive Stock Tiles with Sector Tags</td>
            <td>BUY/SELL toggle, real-time share sliders, MAX capital fill button.</td>
          </tr>
          <tr>
            <td><strong>DEX Liquidity Pool</strong></td>
            <td>Dual Matrix Box with Invert Arrow</td>
            <td>Direct token flip, slippage preset chips (0.1%, 0.5%, 1.0%), MEV shield switch.</td>
          </tr>
          <tr>
            <td><strong>Invoice / Payment Address</strong></td>
            <td>Camera Viewfinder HUD with Laser Scan Line</td>
            <td>Torch option toggle, Upload QR Image file selector, 1-click Whitelist presets.</td>
          </tr>
        </tbody>
      </table>

      <h3>3.3 Bridging the "Gulf of Evaluation" with Confirmation Greeters</h3>
      <p>
        In traditional Web3 applications, the Gulf of Evaluation is notoriously wide: once a transaction is signed, users are left staring
        at a spinning circle or a generic toast notification that disappears after three seconds. NovaWallet eliminates this anxiety by introducing
        the <strong>Celebratory Confirmation Greeting Architecture</strong>. Upon state finality, the viewport dims, celebratory confetti cascades down,
        and an institutional confirmation dialogue addresses the user by name, providing full cryptographic receipt metrics (amount, USD equivalent,
        transaction hash, gas consumed, block height) and offering instant receipt downloads.
      </p>
    </section>

    <!-- SECTION 4 -->
    <section class="page-break">
      <h2>4. Deriving the Menus from Your Design</h2>
      
      <h3>4.1 Information Architecture &amp; Navigation Hierarchy</h3>
      <p>
        The navigation structure was derived using <strong>Card Sorting</strong> and <strong>Task-Frequency Analysis</strong>.
        Workflows were stratified into three distinct cognitive tiers:
      </p>
      <ul>
        <li><strong>Tier 1 — Top Persistent Command Bar:</strong> Houses brand identity, gas telemetry (14 Gwei), multi-chain network selector (Ethereum, Arbitrum, Nova L2, Polygon), system notification bell, and authenticated custody profile widget.</li>
        <li><strong>Tier 2 — Primary Navigation Suite:</strong> Six core functional views accessible via 1-click tabs (Overview, Portfolio, Institutional Swap, Vaults &amp; Staking, Ledger History, Security &amp; Settings).</li>
        <li><strong>Tier 3 — Contextual Action Modals:</strong> Non-intrusive floating overlays for high-intent actions (Send Money, Camera QR Scanner, Receive Deposit, Keystore Connect, Cryptographic Proof Inspector, and Celebratory Confirmation Greeter).</li>
      </ul>

      <table class="styled-table">
        <thead>
          <tr>
            <th style="width: 20%;">Menu / Route</th>
            <th style="width: 25%;">Primary User Goal</th>
            <th style="width: 35%;">Contained Components &amp; Panels</th>
            <th style="width: 20%;">Quorum / Security Level</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Overview (Landing)</strong></td>
            <td>Evaluate protocol capabilities and simulate compounding yield.</td>
            <td>Hero Value Showcase, Live Ticker ($4.82B TVL), Yield Simulation Calculator, Feature Matrix, Institutional Tiers, Security Certifications.</td>
            <td>Public Access (Read-Only)</td>
          </tr>
          <tr>
            <td><strong>Portfolio Dashboard</strong></td>
            <td>Monitor total NAV, manage asset distributions, and trade equities.</td>
            <td>Portfolio Hero ($985,250.40), 4 KPI Cards, Performance SVG Chart (1D-ALL), Stocks Trading Desk, Asset Allocation Bar, Dual Activity Ledger.</td>
            <td>Authenticated Keystore</td>
          </tr>
          <tr>
            <td><strong>Institutional Swap</strong></td>
            <td>Execute zero-slippage token swaps with sub-millisecond routing.</td>
            <td>Market Telemetry Cards, Smart Order DEX Router, Live Order Book Depth (Asks &amp; Bids), Invert Token Action, Slippage Controls.</td>
            <td>Flashbots MEV-Shield Active</td>
          </tr>
          <tr>
            <td><strong>Vaults &amp; Staking</strong></td>
            <td>Lock liquidity into sovereign yield pools and harvest dividends.</td>
            <td>Quantum Vault Header, Staking Terminal, Commitment Lock Selector (0-180 Days), 4 Vault Cards (NOVA, stETH, USDC, wBTC).</td>
            <td>Smart Contract Timelock</td>
          </tr>
          <tr>
            <td><strong>Ledger History</strong></td>
            <td>Audit transaction ledger, verify block proofs, and export CSV reports.</td>
            <td>Settled Balance Banner ($1,842,950.40), 4 Reconciliation Cards, Search &amp; Filter Toolbar, SHA-256 Proof Table, CSV Exporter.</td>
            <td>SHA-256 Merkle Verified</td>
          </tr>
          <tr>
            <td><strong>Security &amp; Settings</strong></td>
            <td>Manage multi-sig governance, approve whitelisted addresses, and compliance.</td>
            <td>Alexander Vance Tier 4 Profile, 3-of-5 Hardware Quorum Roster, 24h Timelocked Whitelist Table, Compliance Guardrail Toggles.</td>
            <td>Hardware Multi-Sig Required</td>
          </tr>
        </tbody>
      </table>
    </section>

    <!-- SECTION 5 -->
    <section class="page-break">
      <h2>5. Low-Fidelity and High-Fidelity Screenshots</h2>
      
      <h3>5.1 Medium-Fidelity / Low-Fidelity Structural Wireframe Analysis</h3>
      <p>
        The medium-fidelity wireframes (derived from the Figma <em>NOVAWALLET FINAL-PROTOTYPE</em> specification) established the
        fundamental structural layout and component hierarchy prior to high-fidelity visual styling. As shown below, the wireframe
        enforces clear modular card zoning, symmetrical columns, and prominent numerical anchors:
      </p>

      <div class="figure-container">
        <img src="{proto_b64}" alt="Low-Fidelity Prototype">
        <div class="figure-caption">Figure 5.1: Low-Fidelity / Medium-Fidelity Structural Wireframe (Figma NOVAWALLET FINAL-PROTOTYPE)</div>
      </div>

      <h3>5.2 High-Fidelity Interactive Visual Designs</h3>
      <p>
        The high-fidelity implementation (derived from the Figma <em>NovaWallet2</em> specification) transforms the wireframe
        into a dark obsidian visual environment (#080A0F, #0D111A, #131926) highlighted by high-contrast Nova Mint (#00F29D) and
        Electric Cyan (#00D2FF) neon accents.
      </p>

      <div class="figure-container">
        <img src="{master_b64}" alt="High-Fidelity Master System">
        <div class="figure-caption">Figure 5.2: Complete High-Fidelity Master System (Figma NovaWallet2 Master Screens)</div>
      </div>

      <h3>Modular High-Fidelity Component Views:</h3>
      
      <div class="screen-grid">
        <div class="screen-card">
          <img src="{s1_b64}" alt="Landing Page">
          <div class="screen-title">Overview &amp; Landing Page</div>
          <div class="screen-desc">Protocol value proposition, live $4.82B TVL ticker, interactive yield simulator, and security certifications.</div>
        </div>
        
        <div class="screen-card">
          <img src="{s2_b64}" alt="Dashboard">
          <div class="screen-title">Master Portfolio Dashboard</div>
          <div class="screen-desc">$985,250.40 total NAV, interactive SVG trajectory chart, tokenized stocks desk, and dual-tab activity feed.</div>
        </div>
        
        <div class="screen-card">
          <img src="{s3_b64}" alt="Swap">
          <div class="screen-title">Institutional DEX &amp; Order Book</div>
          <div class="screen-desc">Smart routing swap with Flashbots MEV protection, slippage dials, and real-time live order book depth.</div>
        </div>
        
        <div class="screen-card">
          <img src="{s4_b64}" alt="Vaults">
          <div class="screen-title">Autonomous Cyber Vaults</div>
          <div class="screen-desc">Quantum vault indicator, commitment lock selector (0-180d), and 4 yield pools with block harvest triggers.</div>
        </div>
        
        <div class="screen-card">
          <img src="{s5_b64}" alt="Settings">
          <div class="screen-title">Multi-Sig Governance &amp; Security</div>
          <div class="screen-desc">Tier 4 institutional profile, 3-of-5 hardware key quorum manager, 24h timelocked address whitelist, and policies.</div>
        </div>
        
        <div class="screen-card">
          <img src="{s6_b64}" alt="Ledger">
          <div class="screen-title">Transaction &amp; Reconciliation Ledger</div>
          <div class="screen-desc">Reconciled balance ($1,842,950.40), transaction search &amp; filter toolbar, Merkle proofs, and one-click CSV export.</div>
        </div>
      </div>

      <h3>5.3 Comparative UX/UI Evolution Analysis (Low-Fi vs. High-Fi)</h3>
      <table class="styled-table">
        <thead>
          <tr>
            <th style="width: 20%;">Design Dimension</th>
            <th style="width: 40%;">Low-Fidelity Prototype (Wireframe)</th>
            <th style="width: 40%;">High-Fidelity Production System (NovaWallet 2.4)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>Layout &amp; Spacing</strong></td>
            <td>Coarse container outlines without fixed mathematical spacing intervals.</td>
            <td>Rigorous Swiss International 8pt/4pt modular grid (p-4 for compact cards, p-6 to p-8 for primary views, gap-4/gap-6, space-y-8).</td>
          </tr>
          <tr>
            <td><strong>Visual Palette</strong></td>
            <td>Monochromatic grayscale boxes (#CCCCCC, #E2E8F0) lacking contrast cues.</td>
            <td>Obsidian dark mode (#080A0F) with Nova Mint (#00F29D) and Cyan (#00D2FF) neon accents meeting WCAG AAA contrast compliance.</td>
          </tr>
          <tr>
            <td><strong>Typography</strong></td>
            <td>Standard system sans-serif placeholders with uniform weights.</td>
            <td>Inter variable typeface for headings and prose, paired with JetBrains Mono for cryptographic hashes, block heights, and monetary values.</td>
          </tr>
          <tr>
            <td><strong>Interaction Feedback</strong></td>
            <td>Static, inert rectangles without dynamic state transitions.</td>
            <td>Celebratory Confirmation Greeting Modal with particle confetti bursts, SVG hover tooltips, and live optical QR camera vision.</td>
          </tr>
          <tr>
            <td><strong>Data Integrity</strong></td>
            <td>Simulated placeholder strings without mathematical coherence.</td>
            <td>Reconciled mathematical engine ($985,250.40 Net Worth, $1,842,950.40 Ledger), live order book spread, and downloadable CSV statements.</td>
          </tr>
        </tbody>
      </table>

      <h3>Conclusion</h3>
      <p>
        Through systematic application of user-centered design methodologies, Donald Norman's Seven Stages of Action,
        and Ben Shneiderman's Object-Action Interface model, NovaWallet 2.4 bridges the gap between institutional security
        and frictionless user experience. The addition of the celebratory task completion greeting modal, tokenized equities desk,
        and dual-option camera QR scanner ensures maximum operational efficiency while eliminating cognitive anxiety in high-capital financial workflows.
      </p>
    </section>
  </div>

</body>
</html>"""

    with open("COURSE_DESIGN_PROJECT_REPORT.html", "w", encoding="utf-8") as f:
        f.write(html_content)
    print("Successfully generated COURSE_DESIGN_PROJECT_REPORT.html")

if __name__ == '__main__':
    create_html_report()
