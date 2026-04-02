import type { TransactionItem } from "@/components/private-agent/TransactionHistoryList";

export interface DemoCategory {
  id: string;
  label: string;
  icon: string;
}

export interface DemoPurchaseRequest {
  merchant: string;
  amount: number;
  categoryId: string;
  categoryLabel: string;
}

export interface DemoApprovalScenario {
  id: string;
  merchant: string;
  categoryId: string;
  categoryLabel: string;
  requestAmount: number;
  expectedOutcome: "approved" | "category blocked" | "threshold exceeded";
  consumerStory: string;
}

export const demoCategories: DemoCategory[] = [
  { id: "groceries", label: "Groceries", icon: "🛒" },
  { id: "transport", label: "Transport", icon: "🚗" },
  { id: "dining", label: "Dining", icon: "🍽️" },
  { id: "health", label: "Health", icon: "🏥" },
  { id: "subscriptions", label: "Subscriptions", icon: "📺" },
  { id: "electronics", label: "Electronics", icon: "💻" },
  { id: "luxury", label: "Luxury", icon: "💎" },
];

export const demoConfidentialBudget = {
  monthlyBudget: 2400,
  maxPerPurchase: 350,
  spentThisMonth: 1268,
  categoryPermissions: {
    groceries: true,
    transport: true,
    dining: true,
    health: true,
    subscriptions: true,
    electronics: false,
    luxury: false,
  },
};

export const demoInitialPurchaseRequest: DemoPurchaseRequest = {
  merchant: "FreshBasket Market",
  amount: 82.45,
  categoryId: "groceries",
  categoryLabel: "🛒 Groceries",
};

export const demoApprovalScenarios: DemoApprovalScenario[] = [
  {
    id: "weekly-groceries",
    merchant: "FreshBasket Market",
    categoryId: "groceries",
    categoryLabel: "🛒 Groceries",
    requestAmount: 82.45,
    expectedOutcome: "approved",
    consumerStory: "Weekly family grocery refill from a local delivery app.",
  },
  {
    id: "rideshare-commute",
    merchant: "RideNow",
    categoryId: "transport",
    categoryLabel: "🚗 Transport",
    requestAmount: 24.9,
    expectedOutcome: "approved",
    consumerStory: "Evening rideshare home after office hours.",
  },
  {
    id: "gaming-laptop",
    merchant: "PixelHub Electronics",
    categoryId: "electronics",
    categoryLabel: "💻 Electronics",
    requestAmount: 1299,
    expectedOutcome: "category blocked",
    consumerStory: "Impulse high-value electronics purchase blocked by private policy.",
  },
  {
    id: "designer-bag",
    merchant: "Maison Luxe",
    categoryId: "luxury",
    categoryLabel: "💎 Luxury",
    requestAmount: 480,
    expectedOutcome: "threshold exceeded",
    consumerStory: "Premium luxury purchase exceeds confidential threshold constraints.",
  },
];

export const demoTransactions: TransactionItem[] = [
  { id: 312, merchant: "FreshBasket Market", amount: "$82.45", category: "🛒 Groceries", time: "2026-04-02 09:18", status: "approved", encrypted: true },
  { id: 311, merchant: "CityMed Pharmacy", amount: "$36.20", category: "🏥 Health", time: "2026-04-01 19:42", status: "approved", encrypted: true },
  { id: 310, merchant: "StreamFlix", amount: "$14.99", category: "📺 Subscriptions", time: "2026-04-01 07:55", status: "approved", encrypted: true },
  { id: 309, merchant: "PixelHub Electronics", amount: "$899.00", category: "💻 Electronics", time: "2026-03-31 21:06", status: "denied", encrypted: true },
  { id: 308, merchant: "RideNow", amount: "$24.90", category: "🚗 Transport", time: "2026-03-31 08:23", status: "approved", encrypted: true },
  { id: 307, merchant: "Maison Luxe", amount: "$480.00", category: "💎 Luxury", time: "2026-03-30 17:14", status: "denied", encrypted: true },
];
