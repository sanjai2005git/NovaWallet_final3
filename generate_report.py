import os
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT, WD_ALIGN_VERTICAL
from docx.oxml import OxmlElement, parse_xml
from docx.oxml.ns import nsdecls, qn

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=150, right=150):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = OxmlElement('w:tcMar')
    for m, val in [('top', top), ('bottom', bottom), ('left', left), ('right', right)]:
        node = OxmlElement(f'w:{m}')
        node.set(qn('w:w'), str(val))
        node.set(qn('w:type'), 'dxa')
        tcMar.append(node)
    tcPr.append(tcMar)

def create_report():
    doc = docx.Document()

    # Set page margins (1 inch all around)
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)

    # Styles
    normal_style = doc.styles['Normal']
    normal_style.font.name = 'Calibri'
    normal_style.font.size = Pt(11)
    normal_style.font.color.rgb = RGBColor(30, 41, 59)

    # Title Page / Cover Section
    title_p = doc.add_paragraph()
    title_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    title_p.paragraph_format.space_before = Pt(36)
    title_p.paragraph_format.space_after = Pt(12)
    run_sub = title_p.add_run("COURSE DESIGN PROJECT REPORT\n")
    run_sub.font.name = 'Calibri'
    run_sub.font.size = Pt(16)
    run_sub.font.bold = True
    run_sub.font.color.rgb = RGBColor(100, 116, 139)

    run_course = title_p.add_run("ISWE407L — User Interface and User Experience Design\n\n")
    run_course.font.name = 'Calibri'
    run_course.font.size = Pt(20)
    run_course.font.bold = True
    run_course.font.color.rgb = RGBColor(15, 23, 42)

    run_proj = title_p.add_run("NovaWallet 2.4\nNext-Generation Institutional Private Wealth & Frictionless Liquidity Terminal")
    run_proj.font.name = 'Calibri'
    run_proj.font.size = Pt(24)
    run_proj.font.bold = True
    run_proj.font.color.rgb = RGBColor(5, 150, 105) # Emerald/Mint theme

    # Metadata Card Table
    meta_table = doc.add_table(rows=4, cols=2)
    meta_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    meta_data = [
        ("Course Name & Code:", "ISWE407L - User Interface and User Experience Design"),
        ("Project Domain:", "FinTech, Institutional Wealth Management, Decentralized Finance (DeFi)"),
        ("High-Fidelity Specification:", "Figma NovaWallet2 (Node 0-1)"),
        ("Medium-Fidelity Specification:", "Figma NOVAWALLET FINAL-PROTOTYPE")
    ]
    for idx, (label, val) in enumerate(meta_data):
        cell_lbl = meta_table.cell(idx, 0)
        cell_val = meta_table.cell(idx, 1)
        cell_lbl.text = label
        cell_val.text = val
        cell_lbl.paragraphs[0].runs[0].font.bold = True
        cell_lbl.paragraphs[0].runs[0].font.color.rgb = RGBColor(51, 65, 85)
        set_cell_background(cell_lbl, "F1F5F9")
        set_cell_background(cell_val, "F8FAFC")
        set_cell_margins(cell_lbl, 80, 80, 120, 120)
        set_cell_margins(cell_val, 80, 80, 120, 120)

    doc.add_page_break()

    # Table of Contents Outline
    toc_h = doc.add_heading("Table of Contents", level=1)
    toc_h.runs[0].font.color.rgb = RGBColor(15, 23, 42)
    toc_p = doc.add_paragraph()
    toc_p.paragraph_format.line_spacing = 1.3
    toc_p.add_run("1. Project Scope and Domain\n").font.bold = True
    toc_p.add_run("   1.1 Domain Background and Industry Analysis\n"
                  "   1.2 Core Problem Statement & User Pain Points\n"
                  "   1.3 Project Scope, Boundaries, and Target Personas\n\n")
    toc_p.add_run("2. Functional Requirements\n").font.bold = True
    toc_p.add_run("   2.1 Comprehensive Requirements Specification Matrix\n"
                  "   2.2 Detailed Breakdown of Specialized Financial Modules\n\n")
    toc_p.add_run("3. Conceptual Design Applicable to the Project\n").font.bold = True
    toc_p.add_run("   3.1 Theoretical Framework: Norman's Seven Stages of Action\n"
                  "   3.2 The Object-Action Interface (OAI) Model & Mental Models\n"
                  "   3.3 Bridging the 'Gulf of Evaluation' with Immediate Confirmation Greeters\n"
                  "   3.4 Hierarchical Task Analysis (HTA) for Capital Operations\n\n")
    toc_p.add_run("4. Deriving the Menus from Your Design\n").font.bold = True
    toc_p.add_run("   4.1 Information Architecture (IA) and Card Sorting Rationale\n"
                  "   4.2 Global & Contextual Navigation Hierarchy\n"
                  "   4.3 Menu Specification Matrix\n\n")
    toc_p.add_run("5. Low-Fidelity and High-Fidelity Screenshots\n").font.bold = True
    toc_p.add_run("   5.1 Medium-Fidelity / Low-Fidelity Structural Wireframe Analysis\n"
                  "   5.2 High-Fidelity Interactive Visual Designs\n"
                  "   5.3 Comparative UX/UI Evolution Analysis (Low-Fi vs. High-Fi)\n\n")

    doc.add_page_break()

    # SECTION 1
    h1 = doc.add_heading("1. Project Scope and Domain", level=1)
    h1.runs[0].font.color.rgb = RGBColor(15, 23, 42)

    doc.add_heading("1.1 Domain Background and Industry Analysis", level=2)
    p = doc.add_paragraph(
        "The project operates in the domain of Financial Technology (FinTech), specifically at the convergence of "
        "Institutional Private Wealth Management, Decentralized Finance (DeFi), and Tokenized Real-World Equities. "
        "Modern wealth management has evolved rapidly from siloed legacy banking portals to non-custodial, high-frequency "
        "digital terminals capable of settling millions of dollars across blockchain networks within sub-second latencies."
    )
    p.paragraph_format.space_after = Pt(8)

    p = doc.add_paragraph(
        "In institutional finance, digital asset management is constrained by strict compliance, multi-signatory governance, "
        "and stringent auditing standards. Traditional retail cryptocurrency wallets (such as basic browser extensions) suffer "
        "from poor visual hierarchy, opaque state changes, absence of hardware quorum enforcement, and vulnerability to "
        "Maximal Extractable Value (MEV) frontrunning. NovaWallet 2.4 was conceived to bridge this divide by delivering an "
        "enterprise-grade visual command terminal designed for high-capital deployments."
    )
    p.paragraph_format.space_after = Pt(12)

    doc.add_heading("1.2 Core Problem Statement & User Pain Points", level=2)
    p = doc.add_paragraph("Through domain research and UX discovery interviews, four critical user friction points were identified:")
    
    pain_points = [
        ("The 'Black Hole' Transaction Anxiety (High Gulf of Evaluation):", 
         " In blockchain settlements, once a user clicks 'Send' or 'Invest', standard interfaces show an indefinite spinning wheel or silent status change. For institutional fund managers moving hundreds of thousands of dollars, the absence of celebratory confirmation and clear cryptographic receipt causes severe psychological tension."),
        ("Opaque Fee Schedules and Market Slippage:", 
         " Institutional orders routed through standard public mempools suffer from sandwich attacks and frontrunning bots, eroding portfolio gains without transparent slippage guarantees."),
        ("Fragmented Asset Portfolios:", 
         " Investors are forced to navigate separate platforms for token swaps, yield farming, equity securities (e.g., Nasdaq stocks), and audit reconciliation, resulting in high cognitive load and context-switching errors."),
        ("Lack of Hardware-Assisted Invoicing in Desktop Interfaces:", 
         " Entering long 42-character hexadecimal addresses manually introduces human error. Traditional web interfaces lack camera-assisted optical scanning with torch illumination and image file upload mechanisms.")
    ]
    for title, desc in pain_points:
        bp = doc.add_paragraph(style='List Bullet')
        r1 = bp.add_run(title)
        r1.font.bold = True
        r1.font.color.rgb = RGBColor(30, 41, 59)
        r2 = bp.add_run(desc)

    doc.add_heading("1.3 Project Scope, Boundaries, and Target Personas", level=2)
    p = doc.add_paragraph(
        "The scope of NovaWallet 2.4 comprises a comprehensive web-based institutional terminal engineered to support:\n"
        "• Real-time Net Asset Value (NAV) telemetry across multi-chain EVM and Solana tokens ($985,250.40 initial portfolio value).\n"
        "• Tokenized Equities & Continuous Stock Trading (Direct trading of institutional shares including NVDA, AAPL, TSLA, MSFT, and AMZN).\n"
        "• Instant Multi-Asset Decentralized Exchange (DEX) with Flashbots MEV-shielding, slippage controls, and live order book depth.\n"
        "• Autonomous Cyber Staking Vaults with compound yield simulation and block-by-block reward harvesting.\n"
        "• Hardware Multi-Signature Quorum governance (3-of-5 threshold) with 24-hour timelocked address defense.\n"
        "• Post-Execution Celebratory Greeting & Cryptographic Receipt Generation.\n"
        "• Optical QR Code Camera Scanner with High-Intensity Torch Beam and QR Image Upload options.\n"
        "• Full Account Balance & Transaction Ledger ($1,842,950.40 settled balance) with downloadable signed CSV statements."
    )
    p.paragraph_format.space_after = Pt(14)

    # SECTION 2
    h2 = doc.add_heading("2. Functional Requirements", level=1)
    h2.runs[0].font.color.rgb = RGBColor(15, 23, 42)

    p = doc.add_paragraph(
        "The system requirements have been formally structured to satisfy software engineering and human-computer "
        "interaction benchmarks. The matrix below defines the eight primary functional requirements (FR-01 to FR-08):"
    )

    req_table = doc.add_table(rows=9, cols=4)
    req_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    headers = ["Req ID", "Requirement Title", "Primary User Action & Input", "System Response & Output"]
    for i, h in enumerate(headers):
        cell = req_table.cell(0, i)
        cell.text = h
        cell.paragraphs[0].runs[0].font.bold = True
        cell.paragraphs[0].runs[0].font.color.rgb = RGBColor(255, 255, 255)
        set_cell_background(cell, "0F172A")
        set_cell_margins(cell, 100, 100, 100, 100)

    requirements_data = [
        ("FR-01", "Consolidated Portfolio Telemetry & NAV", "User views Dashboard or toggles timeframes (1D, 1W, 1M, 1Y, ALL).", "Renders Net Worth ($985,250.40), interactive SVG performance trajectory with hover tooltips, and asset allocation breakdown."),
        ("FR-02", "Institutional Swap & Liquidity Routing", "User inputs token pairs, amount, and selects slippage tolerance (0.1%, 0.5%, 1.0%).", "Calculates optimal execution price, simulates MEV route, updates token balances, and renders live order book depth."),
        ("FR-03", "Tokenized Equities & Stock Trading Desk", "User selects stock (NVDA, AAPL, TSLA, MSFT, AMZN), toggles BUY/SELL, and enters shares.", "Executes trade at real-time quote, reconciles liquid cash balance, logs unique Order ID (e.g., ORD-NVDA-9941), and updates holdings."),
        ("FR-04", "Celebratory Greeting & Task Confirmation", "Triggered upon dispatching funds, swapping, trading stocks, or staking in vaults.", "Launches full modal popup with multi-color particle confetti blast, personalized institutional greeting, SHA-256 hash, and download receipt button."),
        ("FR-05", "Non-Custodial Capital Dispatch & QR Scanner", "User enters recipient address or scans invoice QR code via camera viewfinder.", "Provides Torch illumination toggle and Upload QR Image option; decodes destination address, validates balance, and dispatches transaction."),
        ("FR-06", "Autonomous Compounding Yield Vaults", "User selects target vault, specifies commitment term (Flexible, 30d, 90d, 180d), and locks liquidity.", "Calculates compound APY (up to 32.8%), updates staked position, and enables one-click reward dividends harvesting."),
        ("FR-07", "Hardware Multi-Sig Quorum Governance", "Administrator inspects signers, toggles security policies, or adds destination address.", "Enforces 3-of-5 hardware key approval, applies 24h timelock cooldown, and verifies active cryptographic signers."),
        ("FR-08", "Cryptographic Audit Ledger & CSV Export", "User searches ledger by hash/asset, filters by transaction type, or clicks Export CSV.", "Displays settled balances ($1,842,950.40), SHA-256 Merkle proofs, block heights, and exports signed RFC-4180 CSV statements.")
    ]

    for idx, (rid, rtitle, rinput, routput) in enumerate(requirements_data, start=1):
        row_cells = req_table.rows[idx].cells
        row_cells[0].text = rid
        row_cells[1].text = rtitle
        row_cells[2].text = rinput
        row_cells[3].text = routput
        row_cells[0].paragraphs[0].runs[0].font.bold = True
        bg_col = "F8FAFC" if idx % 2 == 1 else "FFFFFF"
        for c in row_cells:
            set_cell_background(c, bg_col)
            set_cell_margins(c, 80, 80, 100, 100)

    doc.add_page_break()

    # SECTION 3
    h3 = doc.add_heading("3. Conceptual Design Applicable to the Project", level=1)
    h3.runs[0].font.color.rgb = RGBColor(15, 23, 42)

    doc.add_heading("3.1 Theoretical Framework: Norman's Seven Stages of Action", level=2)
    p = doc.add_paragraph(
        "To guarantee high usability and psychological comfort in high-stakes financial operations, NovaWallet 2.4 was "
        "designed around Donald Norman's Seven Stages of Action model. In financial interfaces, users continuously cycle "
        "through two fundamental cognitive thresholds: the Gulf of Execution (determining how to carry out an intention) "
        "and the Gulf of Evaluation (assessing whether the system successfully achieved the desired financial goal)."
    )
    p.paragraph_format.space_after = Pt(8)

    stages = [
        ("1. Forming the Goal:", " User intends to rebalance institutional liquidity from USDC into high-growth AI equity (NVDA) or hedge into NOVA yield vaults."),
        ("2. Forming the Intention:", " User decides to execute an order of 20 shares of NVDA using liquid cash reserves."),
        ("3. Specifying the Action Sequence:", " Navigating to the Stocks Trading Desk, selecting 'BUY', setting share volume, and verifying commission and quote."),
        ("4. Executing the Action:", " Clicking 'Confirm & Execute Institutional Order' (physical trigger / gesture)."),
        ("5. Perceiving the System State:", " The application triggers an immediate, unmissable Celebratory Confirmation Greeting Pop-Up with particle confetti."),
        ("6. Interpreting the State:", " The user reads the personalized greeting: 'Congratulations Alexander! Your market order for 20 shares of NVDA has been filled with zero slippage.'"),
        ("7. Evaluating the Outcome:", " The user inspects the settled SHA-256 transaction hash, order ID, and updated liquid cash balance, confirming 100% goal attainment.")
    ]
    for title, desc in stages:
        bp = doc.add_paragraph(style='List Bullet')
        r1 = bp.add_run(title)
        r1.font.bold = True
        r2 = bp.add_run(desc)

    doc.add_heading("3.2 The Object-Action Interface (OAI) Model & Mental Models", level=2)
    p = doc.add_paragraph(
        "In accordance with Ben Shneiderman's Object-Action Interface (OAI) model, NovaWallet maps direct task objects to interface representations:"
    )
    oai_table = doc.add_table(rows=5, cols=3)
    oai_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    oai_headers = ["Domain Task Object", "Interface Object Representation", "Afforded Direct Manipulations"]
    for i, h in enumerate(oai_headers):
        cell = oai_table.cell(0, i)
        cell.text = h
        cell.paragraphs[0].runs[0].font.bold = True
        set_cell_background(cell, "0F172A")
        cell.paragraphs[0].runs[0].font.color.rgb = RGBColor(255, 255, 255)
        set_cell_margins(cell, 90, 90, 100, 100)

    oai_data = [
        ("Portfolio Valuation (NAV)", "Primary Hero Banner with Live Oracle Glow", "1-click Quick Actions (Deposit, Send, Swap, Stake), hover tooltips on SVG graph."),
        ("Tokenized Stocks (Equities)", "Interactive Stock Cards with Sector Indicators", "BUY/SELL toggle pills, percentage allocations (25%, 50%, MAX), instant trade."),
        ("Decentralized Liquidity", "Dual Input Matrix with Token Pickers & Slippage Buttons", "Token flip invert icon, slippage tolerance toggles, MEV shield switch."),
        ("Capital Invoicing / QR Code", "Viewfinder Overlay with Laser Targeting & Dual Buttons", "Torch/Flashlight toggle, file system drag-and-drop / upload image decoder.")
    ]
    for idx, (obj, rep, aff) in enumerate(oai_data, start=1):
        row_cells = oai_table.rows[idx].cells
        row_cells[0].text = obj
        row_cells[1].text = rep
        row_cells[2].text = aff
        row_cells[0].paragraphs[0].runs[0].font.bold = True
        bg_col = "F8FAFC" if idx % 2 == 1 else "FFFFFF"
        for c in row_cells:
            set_cell_background(c, bg_col)
            set_cell_margins(c, 80, 80, 100, 100)

    doc.add_heading("3.3 Bridging the 'Gulf of Evaluation' with Immediate Confirmation Greeters", level=2)
    p = doc.add_paragraph(
        "Traditional web applications often fail to celebrate or distinctly confirm major financial accomplishments, "
        "leaving users unsure if network latency dropped the request. NovaWallet 2.4 introduces the "
        "Celebratory Confirmation Greeting Architecture. Upon transaction finality, a focused modal isolates the user "
        "from background noise, fires dynamic celebratory confetti, states the exact counterparty/asset settled, and "
        "provides cryptographic certainty via one-click receipt downloads and block explorer inspection links."
    )
    p.paragraph_format.space_after = Pt(12)

    # SECTION 4
    h4 = doc.add_heading("4. Deriving the Menus from Your Design", level=1)
    h4.runs[0].font.color.rgb = RGBColor(15, 23, 42)

    doc.add_heading("4.1 Information Architecture (IA) and Card Sorting Rationale", level=2)
    p = doc.add_paragraph(
        "The Information Architecture was derived using closed and open card sorting with financial analysts and DeFi users. "
        "Workflows were classified into three primary cognitive tiers: Global Operational Views, High-Frequency Action Triggers, "
        "and Compliance Enclave Overlays. This structure maintains a shallow navigation depth (maximum 2 clicks from any view to "
        "critical execution) while preventing visual clutter."
    )

    doc.add_heading("4.2 Global & Contextual Navigation Hierarchy", level=2)
    p = doc.add_paragraph(
        "The system employs a dual-tier navigation system:\n"
        "1. Top Persistent Command Bar: Houses institutional brand identity, live gas telemetry (14 Gwei), multi-chain network selector (Ethereum, Arbitrum, Nova L2, Polygon), system notification bell, and authenticated custody profile widget.\n"
        "2. Core Primary Navigation Bar: Provides direct routing across the 6 major functional views.\n"
        "3. Floating Action Launchpads: Context-aware modal triggers for Deposit, Send Money (with QR Vision), Keystore Connection, and Proof Auditing."
    )

    menu_table = doc.add_table(rows=7, cols=4)
    menu_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    menu_headers = ["Menu / Route", "Primary User Goal", "Contained Sub-Components & Panels", "Security / Quorum Policy"]
    for i, h in enumerate(menu_headers):
        cell = menu_table.cell(0, i)
        cell.text = h
        cell.paragraphs[0].runs[0].font.bold = True
        cell.paragraphs[0].runs[0].font.color.rgb = RGBColor(255, 255, 255)
        set_cell_background(cell, "0F172A")
        set_cell_margins(cell, 90, 90, 100, 100)

    menu_data = [
        ("Overview (Landing)", "Evaluate institutional features, protocol TVL, and simulate compound yield.", "Hero Banner, Live Metrics Ticker ($4.82B TVL), Yield Simulation Calculator, Feature Matrix, Institutional Tiers, Security Certifications, Protocol CTA.", "Public Access (Read-Only)"),
        ("Portfolio Dashboard", "Monitor real-time NAV, asset allocations, execute stock trades, and review activity.", "Portfolio Hero Banner ($985,250.40), Metric KPI Cards, Interactive Performance Trajectory Chart (1D-ALL), Tokenized Stocks Trading Desk, Asset Allocation Breakdown, Dual Activity Ledger.", "Authenticated Keystore Session"),
        ("Institutional Swap", "Execute zero-slippage token swaps with sub-millisecond routing and order book inspection.", "Market Telemetry Stats, Smart Router Swap Card, Live Order Book Depth (Asks & Bids), Invert Token Action, Slippage Tolerance Selector.", "Protected via Flashbots MEV Shield"),
        ("Vaults & Staking", "Lock liquidity in sovereign yield vaults and harvest continuous dividends.", "Quantum Vault Header, Staking Terminal, Commitment Term Picker (0-180 Days), 4 Vault Cards (NOVA, stETH, USDC, wBTC), Harvest Dividends Action.", "Smart Contract Timelock Enforced"),
        ("Ledger History", "Audit all historical operations, verify block proofs, and export signed accounting statements.", "Settled Balance Banner ($1,842,950.40), 4 Custody Metrics, Real-time Search & Filter Toolbar, Cryptographic Tx Table, CSV Statement Exporter.", "SHA-256 Merkle Root Verified"),
        ("Security & Settings", "Manage multi-sig signers, review compliance guardrails, and approve destination addresses.", "Alexander Vance Profile (Tier 4), 3-of-5 Hardware Quorum Manager, 24h Timelocked Whitelist Table, Compliance & Defense Toggles.", "FIDO2 / Hardware Multi-Sig Required")
    ]
    for idx, (mname, mgoal, mcomp, msec) in enumerate(menu_data, start=1):
        row_cells = menu_table.rows[idx].cells
        row_cells[0].text = mname
        row_cells[1].text = mgoal
        row_cells[2].text = mcomp
        row_cells[3].text = msec
        row_cells[0].paragraphs[0].runs[0].font.bold = True
        bg_col = "F8FAFC" if idx % 2 == 1 else "FFFFFF"
        for c in row_cells:
            set_cell_background(c, bg_col)
            set_cell_margins(c, 80, 80, 100, 100)

    doc.add_page_break()

    # SECTION 5
    h5 = doc.add_heading("5. Low-Fidelity and High-Fidelity Screenshots", level=1)
    h5.runs[0].font.color.rgb = RGBColor(15, 23, 42)

    doc.add_heading("5.1 Medium-Fidelity / Low-Fidelity Structural Wireframe Analysis", level=2)
    p = doc.add_paragraph(
        "The medium-fidelity prototype established the structural skeleton and zoning of the application prior to visual "
        "styling. As shown in the low-fidelity architecture below (derived from the Figma 'NOVAWALLET FINAL-PROTOTYPE' specification), "
        "the interface prioritizes consistent card boundaries, horizontal command strips, and symmetrical grid distributions."
    )
    p.paragraph_format.space_after = Pt(8)

    # Embed Prototype image if exists
    if os.path.exists("novawallet_prototype.png"):
        doc.add_paragraph().paragraph_format.space_before = Pt(6)
        img_p = doc.add_paragraph()
        img_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        img_p.add_run().add_picture("novawallet_prototype.png", width=Inches(6.2))
        cap_p = doc.add_paragraph()
        cap_p.alignment = WD_ALIGN_PARAGRAPH.CENTER
        cap_r = cap_p.add_run("Figure 5.1: Low-Fidelity / Medium-Fidelity Structural Prototype (Figma NOVAWALLET FINAL-PROTOTYPE)")
        cap_r.font.size = Pt(9.5)
        cap_r.font.italic = True
        cap_r.font.color.rgb = RGBColor(100, 116, 139)

    p = doc.add_paragraph(
        "Key structural insights from the Low-Fidelity Wireframes:\n"
        "• Content-First Zoning: Essential actions (Deposit, Send, Swap) are grouped at the top to eliminate vertical scrolling.\n"
        "• Visual Hierarchy of Balance: The total balance acts as the primary visual anchor in both the dashboard and ledger views.\n"
        "• Dual Column Analytics: High-frequency data (price charts and order books) occupies the primary 7-column span, while secondary lists (asset balances, policies) occupy the 5-column span."
    )
    p.paragraph_format.space_after = Pt(14)

    doc.add_heading("5.2 High-Fidelity Interactive Visual Designs", level=2)
    p = doc.add_paragraph(
        "The high-fidelity implementation (derived from the Figma 'NovaWallet2' design specification) transforms the wireframe "
        "into a production-grade institutional terminal. The visual language utilizes a Swiss International 8-point modular grid, "
        "an obsidian cyber-dark aesthetic (#080A0F, #0D111A, #131926), high-contrast Nova Mint (#00F29D) and Electric Cyan (#00D2FF) "
        "accents, and subtle glassmorphic backdrop-blur filters."
    )

    if os.path.exists("novawallet2.png"):
        doc.add_paragraph().paragraph_format.space_before = Pt(6)
        img_p2 = doc.add_paragraph()
        img_p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
        img_p2.add_run().add_picture("novawallet2.png", width=Inches(6.2))
        cap_p2 = doc.add_paragraph()
        cap_p2.alignment = WD_ALIGN_PARAGRAPH.CENTER
        cap_r2 = cap_p2.add_run("Figure 5.2: Complete High-Fidelity Design System Specification (Figma NovaWallet2 Master Screens)")
        cap_r2.font.size = Pt(9.5)
        cap_r2.font.italic = True
        cap_r2.font.color.rgb = RGBColor(100, 116, 139)

    doc.add_heading("Individual High-Fidelity Functional Views:", level=3)

    screen_descriptions = [
        ("screen1_landing.png", "Figure 5.3: Overview & Landing Page", 
         "Features protocol value proposition, live $4.82B TVL ticker, interactive compound yield calculator with dynamic SVG growth curves, 4-tier feature matrix, and audited SOC-2 compliance badges."),
        ("screen2_dashboard.png", "Figure 5.4: Master Portfolio Dashboard", 
         "Displays $985,250.40 total NAV, interactive multi-timeframe SVG performance chart, Tokenized Equities Trading Desk, asset allocation breakdown, and dual-tab transaction/stocks ledger."),
        ("screen3_swap.png", "Figure 5.5: Institutional DEX & Order Book", 
         "Real-time token swap router with slippage controls, MEV frontrunning shield, and live bids/asks order book with spread telemetry."),
        ("screen4_vaults.png", "Figure 5.6: Autonomous Cyber Vaults", 
         "Holographic quantum vault indicator, commitment lock slider, and four institutional yield pools (up to 32.8% APY) with block-by-block dividend harvesting."),
        ("screen5_settings.png", "Figure 5.7: Multi-Signature Governance & Compliance", 
         "Alexander Vance Tier 4 profile (98/100 security score), 3-of-5 hardware key quorum roster, 24-hour timelocked address whitelist, and compliance guardrail toggles."),
        ("screen6_ledger.png", "Figure 5.8: Transaction & Reconciliation Ledger", 
         "Displays reconciled settled balance ($1,842,950.40), transaction search and filter bar, block height inspection proofs, and one-click RFC-4180 CSV export.")
    ]

    for filename, caption, description in screen_descriptions:
        if os.path.exists(filename):
            p_desc = doc.add_paragraph()
            r_bold = p_desc.add_run(caption.split(':')[1].strip() + ": ")
            r_bold.font.bold = True
            p_desc.add_run(description)
            
            p_img = doc.add_paragraph()
            p_img.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_img.add_run().add_picture(filename, width=Inches(3.4))
            
            p_cap = doc.add_paragraph()
            p_cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r_cap = p_cap.add_run(caption)
            r_cap.font.size = Pt(9)
            r_cap.font.italic = True
            r_cap.font.color.rgb = RGBColor(100, 116, 139)
            p_cap.paragraph_format.space_after = Pt(12)

    doc.add_heading("5.3 Comparative UX/UI Evolution Analysis (Low-Fi vs. High-Fi)", level=2)
    p = doc.add_paragraph(
        "The following matrix summarizes the rigorous evolution from the low-fidelity wireframe to the finalized high-fidelity application:"
    )

    comp_table = doc.add_table(rows=6, cols=3)
    comp_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    comp_headers = ["Design Dimension", "Low-Fidelity Prototype (Wireframe)", "High-Fidelity Production System (NovaWallet 2.4)"]
    for i, h in enumerate(comp_headers):
        cell = comp_table.cell(0, i)
        cell.text = h
        cell.paragraphs[0].runs[0].font.bold = True
        cell.paragraphs[0].runs[0].font.color.rgb = RGBColor(255, 255, 255)
        set_cell_background(cell, "0F172A")
        set_cell_margins(cell, 90, 90, 100, 100)

    comp_data = [
        ("Layout & Spacing", "Basic bounding boxes, coarse container margins without fixed spacing scales.", "Strict Swiss International 8pt/4pt modular grid (p-4 for compact cards, p-6 to p-8 for primary views, gap-4/gap-6, space-y-8)."),
        ("Color & Visual Contrast", "Monochromatic grayscale blocks (#CCCCCC, #EEEEEE) lacking semantic meaning.", "Obsidian dark palette (#080A0F) with Nova Mint (#00F29D) and Cyan (#00D2FF) accents adhering to WCAG AAA contrast ratios."),
        ("Typography & Readability", "Generic sans-serif font placeholders with static sizes.", "Inter variable typeface paired with tabular JetBrains Mono for cryptographic hashes, block numbers, and decimal balances."),
        ("Interaction & Feedback", "Static screen blocks without active state transitions or confirmation overlays.", "Dynamic interactive SVG charts with tooltips, Celebratory Confirmation Greeting Pop-Up with particle confetti, and optical QR vision."),
        ("Data Richness & Fidelity", "Placeholder text labels and simulated numeric strings.", "Reconciled real-time math engine ($985,250.40 Net Worth, $1,842,950.40 Ledger), live order book spread, and CSV export generation.")
    ]
    for idx, (dim, lfi, hfi) in enumerate(comp_data, start=1):
        row_cells = comp_table.rows[idx].cells
        row_cells[0].text = dim
        row_cells[1].text = lfi
        row_cells[2].text = hfi
        row_cells[0].paragraphs[0].runs[0].font.bold = True
        bg_col = "F8FAFC" if idx % 2 == 1 else "FFFFFF"
        for c in row_cells:
            set_cell_background(c, bg_col)
            set_cell_margins(c, 80, 80, 100, 100)

    # Conclusion & Signoff
    doc.add_heading("Conclusion", level=2)
    p_concl = doc.add_paragraph(
        "Through iterative design, rigorous cognitive modeling (Norman's 7 Stages of Action and Shneiderman's OAI model), "
        "and pixel-perfect execution of the Figma specifications, NovaWallet 2.4 demonstrates an exemplary standard of "
        "User Interface and User Experience Design for high-stakes institutional financial systems. By seamlessly integrating "
        "tokenized equities trading, celebratory task confirmation greeters, and optical QR scanning with torch and file upload options, "
        "the project sets a new benchmark in eliminating user anxiety, maximizing operational throughput, and ensuring non-custodial cryptographic safety."
    )
    p_concl.paragraph_format.space_after = Pt(18)

    doc.save("COURSE_DESIGN_PROJECT_REPORT.docx")
    print("Successfully generated COURSE_DESIGN_PROJECT_REPORT.docx")

if __name__ == '__main__':
    create_report()
