import { createContext, useContext, useMemo, useState } from "react";
import type { AgentCategory } from "@/components/private-agent/AgentSetupForm";
import type { PrivateRuleCategory } from "@/components/private-agent/EncryptedRuleForm";
import type { PurchaseVerificationStep } from "@/components/private-agent/PurchaseRequestForm";
import type { TransactionItem } from "@/components/private-agent/TransactionHistoryList";
import { demoCategories, demoConfidentialBudget, demoInitialPurchaseRequest, demoTransactions } from "@/data/privateAgentDemoData";

interface PurchaseRequest {
  merchant: string;
  amount: number;
  categoryId: string;
  categoryLabel: string;
}

interface PurchaseDecision {
  status: "approved" | "denied";
  output: "approved" | "denied" | "category blocked" | "threshold exceeded";
}

interface ConfidentialState {
  monthlyBudget: number;
  maxPerPurchase: number;
  spentThisMonth: number;
  categoryPermissions: Record<string, boolean>;
}

interface PrivateAgentStateValue {
  categories: AgentCategory[];
  encryptedMonthlyBudget: string;
  encryptedSpent: string;
  encryptedMaxPerPurchase: string;
  activeRules: PrivateRuleCategory[];
  usagePercent: number;
  revealedBudget: string;
  revealedSpent: string;
  setupDraft: {
    budget: string;
    maxPurchase: string;
    selectedCategories: string[];
  };
  deploying: boolean;
  deployed: boolean;
  setBudget: (value: string) => void;
  setMaxPurchase: (value: string) => void;
  toggleCategory: (id: string) => void;
  deployAgent: () => void;
  updatingRules: boolean;
  resettingMonth: boolean;
  updateRules: () => void;
  resetMonth: () => void;
  purchaseRequest: PurchaseRequest;
  setPurchaseMerchant: (value: string) => void;
  setPurchaseAmount: (value: string) => void;
  setPurchaseCategory: (categoryId: string) => void;
  verificationSteps: PurchaseVerificationStep[];
  verificationOutcomes: boolean[];
  checkingPurchase: boolean;
  currentVerificationStep: number;
  purchaseDone: boolean;
  purchaseDecision: PurchaseDecision;
  startPurchaseVerification: () => void;
  transactions: TransactionItem[];
}

const categories: AgentCategory[] = demoCategories;

const verificationSteps: PurchaseVerificationStep[] = [
  { label: "Verifying budget", icon: "🔍" },
  { label: "Checking max purchase", icon: "🔍" },
  { label: "Category allowed", icon: "🔍" },
];

const initialConfidentialState: ConfidentialState = demoConfidentialBudget;

const initialTransactions: TransactionItem[] = demoTransactions;

const initialPurchaseRequest: PurchaseRequest = {
  merchant: demoInitialPurchaseRequest.merchant,
  amount: demoInitialPurchaseRequest.amount,
  categoryId: demoInitialPurchaseRequest.categoryId,
  categoryLabel: demoInitialPurchaseRequest.categoryLabel,
};

const PrivateAgentStateContext = createContext<PrivateAgentStateValue | undefined>(undefined);

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 2 }).format(value);

const toCipher = (value: string) => {
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return `0x${Math.abs(hash).toString(16).padStart(8, "0").toUpperCase()}`;
};

const formatTimestampLabel = (date: Date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")} ${String(
    date.getHours(),
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;

export const PrivateAgentStateProvider = ({ children }: { children: React.ReactNode }) => {
  const [confidentialState, setConfidentialState] = useState<ConfidentialState>(initialConfidentialState);
  const [budget, setBudget] = useState(String(initialConfidentialState.monthlyBudget));
  const [maxPurchase, setMaxPurchase] = useState(String(initialConfidentialState.maxPerPurchase));
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categories.filter((cat) => initialConfidentialState.categoryPermissions[cat.id]).map((cat) => cat.id),
  );
  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [updatingRules, setUpdatingRules] = useState(false);
  const [resettingMonth, setResettingMonth] = useState(false);
  const [checkingPurchase, setCheckingPurchase] = useState(false);
  const [currentVerificationStep, setCurrentVerificationStep] = useState(-1);
  const [purchaseDone, setPurchaseDone] = useState(false);
  const [purchaseRequest, setPurchaseRequest] = useState<PurchaseRequest>(initialPurchaseRequest);
  const [transactions, setTransactions] = useState<TransactionItem[]>(initialTransactions);
  const [verificationOutcomes, setVerificationOutcomes] = useState<boolean[]>([]);
  const [purchaseDecision, setPurchaseDecision] = useState<PurchaseDecision>({
    status: "approved",
    output: "approved",
  });

  const deployAgent = () => {
    setDeploying(true);
    setTimeout(() => {
      const numericBudget = Number(budget) || 0;
      const numericMaxPurchase = Number(maxPurchase) || 0;
      const nextPermissions = categories.reduce<Record<string, boolean>>((acc, cat) => {
        acc[cat.id] = selectedCategories.includes(cat.id);
        return acc;
      }, {});

      setConfidentialState((prev) => ({
        ...prev,
        monthlyBudget: numericBudget,
        maxPerPurchase: numericMaxPurchase,
        categoryPermissions: nextPermissions,
      }));

      setDeploying(false);
      setDeployed(true);
    }, 3000);
  };

  const toggleCategory = (id: string) =>
    setSelectedCategories((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const updateRules = () => {
    setUpdatingRules(true);
    setTimeout(() => {
      setUpdatingRules(false);
    }, 2000);
  };

  const resetMonth = () => {
    setResettingMonth(true);
    setTimeout(() => {
      setConfidentialState((prev) => ({ ...prev, spentThisMonth: 0 }));
      setResettingMonth(false);
    }, 2000);
  };

  const startPurchaseVerification = () => {
    const requestSnapshot = { ...purchaseRequest };
    const budgetCheck = confidentialState.spentThisMonth + purchaseRequest.amount <= confidentialState.monthlyBudget;
    const maxPurchaseCheck = purchaseRequest.amount <= confidentialState.maxPerPurchase;
    const categoryCheck = Boolean(confidentialState.categoryPermissions[purchaseRequest.categoryId]);
    const outcomes = [budgetCheck, maxPurchaseCheck, categoryCheck];
    const failedStep = outcomes.findIndex((check) => !check);
    const allPassed = failedStep === -1;
    const stepsToRun = allPassed ? verificationSteps.length : failedStep + 1;

    setCheckingPurchase(true);
    setCurrentVerificationStep(0);
    setPurchaseDone(false);
    setVerificationOutcomes(outcomes);
    setPurchaseDecision(
      allPassed
        ? { status: "approved", output: "approved" }
        : failedStep === 0
          ? { status: "denied", output: "threshold exceeded" }
          : failedStep === 1
            ? { status: "denied", output: "threshold exceeded" }
            : { status: "denied", output: "category blocked" },
    );

    for (let i = 0; i < stepsToRun; i += 1) {
      setTimeout(() => setCurrentVerificationStep(i + 1), 1200 * (i + 1));
    }

    setTimeout(() => {
      setTransactions((prev) => {
        const maxId = prev.reduce((acc, item) => Math.max(acc, item.id), 0);
        const next: TransactionItem = {
          id: maxId + 1,
          merchant: requestSnapshot.merchant,
          amount: formatCurrency(requestSnapshot.amount),
          category: requestSnapshot.categoryLabel,
          time: formatTimestampLabel(new Date()),
          status: allPassed ? "approved" : "denied",
          encrypted: true,
        };
        return [next, ...prev];
      });
      setCheckingPurchase(false);
      setPurchaseDone(true);
    }, 1200 * stepsToRun + 50);
  };

  const usagePercent = useMemo(() => {
    if (confidentialState.monthlyBudget <= 0) return 0;
    return Math.min(100, Math.round((confidentialState.spentThisMonth / confidentialState.monthlyBudget) * 100));
  }, [confidentialState.monthlyBudget, confidentialState.spentThisMonth]);

  const activeRules = useMemo<PrivateRuleCategory[]>(
    () =>
      categories.map((cat) => ({
        name: cat.label,
        icon: cat.icon,
        enabled: Boolean(confidentialState.categoryPermissions[cat.id]),
      })),
    [confidentialState.categoryPermissions],
  );

  const value: PrivateAgentStateValue = {
    categories,
    encryptedMonthlyBudget: toCipher(`budget:${confidentialState.monthlyBudget}`),
    encryptedSpent: toCipher(`spent:${confidentialState.spentThisMonth}`),
    encryptedMaxPerPurchase: toCipher(`max:${confidentialState.maxPerPurchase}`),
    activeRules,
    usagePercent,
    revealedBudget: formatCurrency(confidentialState.monthlyBudget),
    revealedSpent: formatCurrency(confidentialState.spentThisMonth),
    setupDraft: { budget, maxPurchase, selectedCategories },
    deploying,
    deployed,
    setBudget,
    setMaxPurchase,
    toggleCategory,
    deployAgent,
    updatingRules,
    resettingMonth,
    updateRules,
    resetMonth,
    purchaseRequest,
    setPurchaseMerchant: (value) => setPurchaseRequest((prev) => ({ ...prev, merchant: value })),
    setPurchaseAmount: (value) =>
      setPurchaseRequest((prev) => ({
        ...prev,
        amount: Number(value) || 0,
      })),
    setPurchaseCategory: (categoryId) => {
      const category = categories.find((item) => item.id === categoryId);
      setPurchaseRequest((prev) => ({
        ...prev,
        categoryId,
        categoryLabel: category ? `${category.icon} ${category.label}` : prev.categoryLabel,
      }));
    },
    verificationSteps,
    verificationOutcomes,
    checkingPurchase,
    currentVerificationStep,
    purchaseDone,
    purchaseDecision,
    startPurchaseVerification,
    transactions,
  };

  return <PrivateAgentStateContext.Provider value={value}>{children}</PrivateAgentStateContext.Provider>;
};

export const usePrivateAgentState = () => {
  const context = useContext(PrivateAgentStateContext);
  if (!context) {
    throw new Error("usePrivateAgentState must be used within PrivateAgentStateProvider");
  }
  return context;
};
