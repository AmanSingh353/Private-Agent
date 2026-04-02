import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import type { AgentCategory } from "@/components/private-agent/AgentSetupForm";

export interface PurchaseVerificationStep {
  label: string;
  icon: string;
}

interface PurchaseRequestFormProps {
  categories: AgentCategory[];
  merchant: string;
  amount: string;
  categoryId: string;
  onMerchantChange: (value: string) => void;
  onAmountChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  checking: boolean;
  done: boolean;
  currentStep: number;
  steps: PurchaseVerificationStep[];
  outcomes: boolean[];
  onStartCheck: () => void;
}

const PurchaseRequestForm = ({
  categories,
  merchant,
  amount,
  categoryId,
  onMerchantChange,
  onAmountChange,
  onCategoryChange,
  checking,
  done,
  currentStep,
  steps,
  outcomes,
  onStartCheck,
}: PurchaseRequestFormProps) => {
  return (
    <>
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground text-sm">Merchant</span>
          <input
            type="text"
            value={merchant}
            onChange={(e) => onMerchantChange(e.target.value)}
            className="w-44 rounded-xl bg-secondary border border-border px-3 py-2 text-right text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground text-sm">Amount</span>
          <input
            type="number"
            step="0.01"
            min="0"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            className="w-32 rounded-xl bg-secondary border border-border px-3 py-2 text-right text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground text-sm">Category</span>
          <select
            value={categoryId}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="w-44 rounded-xl bg-secondary border border-border px-3 py-2 text-right text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="h-px bg-border" />

      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">Confidential Rule Verification</p>
        <p className="text-xs text-muted-foreground">
          Evaluation runs on encrypted policy logic. Only necessary decision outcomes are disclosed externally.
        </p>
        {checking && (
          <div className="rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-primary">
            Running encrypted checks for buildathon demo...
          </div>
        )}
        {steps.map((step, i) => (
          <div key={i} className="flex items-center gap-3 py-2">
            {currentStep > i ? (
              outcomes[i] ? <CheckCircle className="h-5 w-5 text-primary" /> : <XCircle className="h-5 w-5 text-destructive" />
            ) : currentStep === i && checking ? (
              <Loader2 className="h-5 w-5 text-primary animate-spin" />
            ) : (
              <div className="h-5 w-5 rounded-full border border-border" />
            )}
            <span
              className={`text-sm ${
                currentStep > i && outcomes[i]
                  ? "text-primary font-medium"
                  : currentStep > i && !outcomes[i]
                    ? "text-destructive font-medium"
                  : currentStep === i
                    ? "text-foreground"
                    : "text-muted-foreground"
              }`}
            >
              {step.icon} {step.label}
            </span>
          </div>
        ))}
      </div>

      {!checking && !done && (
        <Button variant="cta" size="lg" className="w-full" onClick={onStartCheck}>
          🔒 Verify & Check Rules
        </Button>
      )}
    </>
  );
};

export default PurchaseRequestForm;
