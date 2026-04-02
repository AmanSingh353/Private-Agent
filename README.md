# Private Guardian (PrivateAgent Prototype)

Privacy-first spending assistant prototype for buildathon demos.  
Users configure confidential spending rules, submit purchase requests, and receive privacy-safe outcomes without exposing private policy values in the UI.

## Tech Stack

- React + TypeScript + Vite
- Tailwind + shadcn/ui primitives
- Local app state with mock confidential evaluation logic

## Current Product Flow (UI Working)

Wave 1 screens are implemented and connected:

1. **Onboarding** (`/onboarding`)
2. **Create Agent** (`/create-agent`)
3. **Private Rules** (`/private-rules`)
4. **Purchase Request** (`/purchase-request`)
5. **History** (`/history`)

The prototype also includes a **Judge Walkthrough Mode** in the header to guide evaluators through the full narrative.

## What Is Already Working in the UI

- Reusable modular frontend components for setup, rules, purchase, result, and history
- Required form validation for:
  - monthly budget
  - spending limit per purchase
- Privacy-focused copy throughout the app
- Empty/loading/success/denial UI states aligned with demo UX
- Runtime transaction history logging with:
  - merchant
  - category
  - request amount label
  - timestamp
  - decision status
- Wave 1 route mapping and navigation with legacy path redirects

## What Is Simulated with Mock Confidential Logic (Frontend)

The app currently simulates confidentiality in the client:

- Confidential policy values are stored in local frontend state
- Purchase evaluation runs internal checks for:
  - monthly budget remaining
  - max-per-purchase threshold
  - category permissions
- UI exposes only privacy-safe outcome labels:
  - `approved`
  - `denied`
  - `category blocked`
  - `threshold exceeded`
- Encrypted-looking display values are mock representations (demo-only)

See:

- `src/state/PrivateAgentState.tsx`
- `src/data/privateAgentDemoData.ts`

## What Will Move On-Chain with Fhenix Confidential Smart Contracts

Planned production architecture:

- Store private policy values (budget, limits, category permissions) as encrypted confidential state on-chain
- Perform rule evaluation inside confidential smart contract logic (not in frontend state)
- Return only minimal decision signals/events to external observers and merchants
- Commit approved/denied transaction outcomes on-chain for verifiable auditability
- Use frontend as a privacy-preserving client that submits encrypted inputs and renders safe outputs

## Project Structure

```text
src/
  App.tsx
  main.tsx
  config/
    wave1Flow.ts
  data/
    privateAgentDemoData.ts
  state/
    PrivateAgentState.tsx
  pages/
    Index.tsx
    SetupAgent.tsx
    AgentRules.tsx
    NewPurchase.tsx
    TransactionHistory.tsx
    NotFound.tsx
  components/
    AppLayout.tsx
    EncryptedValue.tsx
    StatusChip.tsx
    private-agent/
      AgentSetupForm.tsx
      EncryptedRuleForm.tsx
      PurchaseRequestForm.tsx
      ApprovalResultState.tsx
      TransactionHistoryList.tsx
```

## Local Development

```bash
npm install
npm run dev
```

Build production bundle:

```bash
npm run build
```

## Wallet Connection Setup (RainbowKit)

1. Create a Reown/WalletConnect project and copy the Project ID.
2. Add it to `.env`:

```bash
VITE_RAINBOWKIT_PROJECT_ID=your_reown_project_id
```

3. In Reown dashboard allowlist your local origins (for example):
   - `http://localhost:5173`
   - `http://localhost:8080`

If the origin is not allowlisted, wallet modal requests may return `403`.
