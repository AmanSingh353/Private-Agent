import { Button } from "@/components/ui/button";
import EncryptedValue from "@/components/EncryptedValue";
import { CheckCircle, Loader2 } from "lucide-react";

export interface PrivateRuleCategory {
  name: string;
  enabled: boolean;
  icon: string;
}

interface EncryptedRuleFormProps {
  categories: PrivateRuleCategory[];
  totalBudgetValue: string;
  usedBudgetValue: string;
  usagePercent: number;
  updating: boolean;
  resetting: boolean;
  onUpdate: () => void;
  onReset: () => void;
}

const EncryptedRuleForm = ({
  categories,
  totalBudgetValue,
  usedBudgetValue,
  usagePercent,
  updating,
  resetting,
  onUpdate,
  onReset,
}: EncryptedRuleFormProps) => {
  const enabledCount = categories.filter((cat) => cat.enabled).length;

  return (
    <>
      <div className="card-glass glow-border p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2">
          Confidential Budget Usage
          <span className="ml-auto text-xs text-muted-foreground">Reveal only when needed</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl bg-secondary/50 p-4 space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Budget</p>
            <EncryptedValue value={totalBudgetValue} revealable />
          </div>
          <div className="rounded-xl bg-secondary/50 p-4 space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Used</p>
            <EncryptedValue value={usedBudgetValue} revealable />
          </div>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${usagePercent}%` }} />
        </div>
        <p className="text-xs text-muted-foreground text-right">~{usagePercent}% used</p>
      </div>

      <div className="card-glass p-6 space-y-4">
        <h2 className="font-semibold">Confidential Rule Set</h2>
        <p className="text-xs text-muted-foreground">
          These permissions are enforced privately during evaluation; only allow/deny style outcomes are disclosed.
        </p>
        {enabledCount === 0 && (
          <div className="rounded-xl border border-border bg-secondary/40 px-4 py-3 text-sm text-muted-foreground">
            Empty state: no categories are currently allowed. New requests will be denied until a rule is enabled.
          </div>
        )}
        <div className="space-y-2">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 border ${
                cat.enabled ? "border-primary/30 bg-primary/5" : "border-border bg-secondary/30"
              }`}
            >
              <span>{cat.icon}</span>
              <span className={`text-sm font-medium ${cat.enabled ? "text-foreground" : "text-muted-foreground"}`}>
                {cat.name}
              </span>
              {cat.enabled && <CheckCircle className="h-4 w-4 text-primary ml-auto" />}
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="cta" size="lg" className="flex-1" onClick={onUpdate} disabled={updating}>
          {updating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Encrypting rule update...
            </>
          ) : (
            "🔒 Update Rules"
          )}
        </Button>
        <Button variant="outline" size="lg" className="flex-1" onClick={onReset} disabled={resetting}>
          {resetting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Resetting cycle...
            </>
          ) : (
            "Reset Month"
          )}
        </Button>
      </div>
    </>
  );
};

export default EncryptedRuleForm;
