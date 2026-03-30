import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import StatusChip from "@/components/StatusChip";

const steps = [
  { label: "Verifying budget", icon: "🔍" },
  { label: "Checking max purchase", icon: "🔍" },
  { label: "Category allowed", icon: "🔍" },
];

const NewPurchase = () => {
  const [checking, setChecking] = useState(false);
  const [currentStep, setCurrentStep] = useState(-1);
  const [done, setDone] = useState(false);

  const startCheck = () => {
    setChecking(true);
    setCurrentStep(0);
    setDone(false);
  };

  useEffect(() => {
    if (!checking || currentStep < 0) return;
    if (currentStep >= steps.length) {
      setChecking(false);
      setDone(true);
      return;
    }
    const t = setTimeout(() => setCurrentStep((s) => s + 1), 1200);
    return () => clearTimeout(t);
  }, [checking, currentStep]);

  return (
    <div className="max-w-lg mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">New Purchase Request 🔒</h1>
        <p className="text-muted-foreground">Verify spending rules on encrypted data</p>
      </div>

      <div className="card-glass p-6 space-y-6">
        {/* Purchase info */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Merchant</span>
            <span className="font-semibold">CoffeeShop.eth</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Amount</span>
            <span className="font-semibold">$4.75</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground text-sm">Category</span>
            <span className="font-semibold">☕ Cafe</span>
          </div>
        </div>

        <div className="h-px bg-border" />

        {/* Rule checks */}
        <div className="space-y-3">
          <p className="text-sm font-medium text-muted-foreground">Rule Verification</p>
          {steps.map((step, i) => (
            <div key={i} className="flex items-center gap-3 py-2">
              {currentStep > i ? (
                <CheckCircle className="h-5 w-5 text-primary" />
              ) : currentStep === i && checking ? (
                <Loader2 className="h-5 w-5 text-primary animate-spin" />
              ) : (
                <div className="h-5 w-5 rounded-full border border-border" />
              )}
              <span
                className={`text-sm ${
                  currentStep > i
                    ? "text-primary font-medium"
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

        {done && (
          <div className="rounded-xl bg-primary/10 border border-primary/30 p-4 text-center animate-fade-in">
            <StatusChip status="approved" />
            <p className="text-sm text-muted-foreground mt-1">All rules satisfied on ciphertext</p>
          </div>
        )}

        {/* Actions */}
        {!checking && !done && (
          <Button variant="cta" size="lg" className="w-full" onClick={startCheck}>
            🔒 Verify & Check Rules
          </Button>
        )}

        {done && (
          <div className="flex gap-3">
            <Button variant="cta" size="lg" className="flex-1">
              Approve Payment
            </Button>
            <Button variant="outline" size="lg" className="flex-1">
              Cancel
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewPurchase;
