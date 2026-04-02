import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";

export interface AgentCategory {
  id: string;
  label: string;
  icon: string;
}

interface AgentSetupFormProps {
  budget: string;
  maxPurchase: string;
  selectedCategories: string[];
  categories: AgentCategory[];
  deploying: boolean;
  deployed: boolean;
  onBudgetChange: (value: string) => void;
  onMaxPurchaseChange: (value: string) => void;
  onToggleCategory: (id: string) => void;
  onDeploy: () => void;
}

const AgentSetupForm = ({
  budget,
  maxPurchase,
  selectedCategories,
  categories,
  deploying,
  deployed,
  onBudgetChange,
  onMaxPurchaseChange,
  onToggleCategory,
  onDeploy,
}: AgentSetupFormProps) => {
  const [touched, setTouched] = useState({ budget: false, maxPurchase: false });

  const budgetError = useMemo(() => {
    if (!budget.trim()) return "Monthly budget is required.";
    if (Number(budget) <= 0) return "Monthly budget must be greater than 0.";
    return "";
  }, [budget]);

  const maxPurchaseError = useMemo(() => {
    if (!maxPurchase.trim()) return "Spending limit is required.";
    if (Number(maxPurchase) <= 0) return "Spending limit must be greater than 0.";
    return "";
  }, [maxPurchase]);

  const canDeploy = !budgetError && !maxPurchaseError;

  const handleDeploy = () => {
    setTouched({ budget: true, maxPurchase: true });
    if (!canDeploy) return;
    onDeploy();
  };

  return (
    <div className="card-glass p-6 space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Monthly Budget ($)</label>
        <input
          type="number"
          value={budget}
          onChange={(e) => onBudgetChange(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, budget: true }))}
          className="w-full rounded-xl bg-secondary border border-border px-4 py-3 text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        {touched.budget && budgetError && <p className="text-xs text-destructive">{budgetError}</p>}
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Spending Limit Per Purchase ($)</label>
        <input
          type="number"
          value={maxPurchase}
          onChange={(e) => onMaxPurchaseChange(e.target.value)}
          onBlur={() => setTouched((prev) => ({ ...prev, maxPurchase: true }))}
          className="w-full rounded-xl bg-secondary border border-border px-4 py-3 text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        {touched.maxPurchase && maxPurchaseError && <p className="text-xs text-destructive">{maxPurchaseError}</p>}
      </div>

      <div className="space-y-3">
        <label className="text-sm font-medium text-muted-foreground">Allowed Categories</label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => {
            const active = selectedCategories.includes(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => onToggleCategory(cat.id)}
                className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium border transition-all ${
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-secondary text-muted-foreground hover:border-muted-foreground"
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
                {active && <CheckCircle className="h-4 w-4 ml-auto" />}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-muted-foreground">Optional: if none are selected, requests rely on budget and spending limit checks.</p>
      </div>

      {deployed && (
        <div className="rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
          Success: confidential policy bundle deployed for the demo flow.
        </div>
      )}

      <Button variant="cta" size="lg" className="w-full" onClick={handleDeploy} disabled={deploying || deployed || !canDeploy}>
        {deploying ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Encrypting policy bundle...
          </>
        ) : deployed ? (
          <>
            <CheckCircle className="h-4 w-4" />
            Agent Deployed!
          </>
        ) : (
          "🔒 Encrypt & Deploy Agent"
        )}
      </Button>
    </div>
  );
};

export default AgentSetupForm;
