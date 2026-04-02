# PrivateAgent Wave 1 Screen Map

The existing Lovable UI is preserved and mapped into a Wave 1 privacy-first demo flow.

## Flow Order

1. **Onboarding** (`/onboarding`)
   - Existing screen: `src/pages/Index.tsx`
   - Purpose: Explain the private spending model and show encrypted agent status.

2. **Create Agent** (`/create-agent`)
   - Existing screen: `src/pages/SetupAgent.tsx`
   - Purpose: Configure baseline limits and deploy an encrypted agent profile.

3. **Define Private Rules** (`/private-rules`)
   - Existing screen: `src/pages/AgentRules.tsx`
   - Purpose: Manage encrypted category permissions and policy updates.

4. **Submit Purchase Request** (`/purchase-request`)
   - Existing screen: `src/pages/NewPurchase.tsx`
   - Purpose: Run encrypted rule checks for a proposed purchase before approval.

5. **View History** (`/history`)
   - Existing screen: `src/pages/TransactionHistory.tsx`
   - Purpose: Review privacy-preserving outcomes (approved/denied) over time.

## Code Organization

- Centralized flow metadata lives in `src/config/wave1Flow.ts`.
- Router uses Wave 1 canonical paths and keeps legacy redirects (`/setup`, `/rules`, `/purchase`) for compatibility.
- Global navigation in `src/components/AppLayout.tsx` is generated from the Wave 1 flow map for a single source of truth.
