import { useState } from "react";
import { Button } from "@/components/ui/button";
import EncryptedValue from "@/components/EncryptedValue";
import { CheckCircle, Loader2 } from "lucide-react";

const categories = [
  { name: "Groceries", enabled: true, icon: "🛒" },
  { name: "Transport", enabled: true, icon: "🚗" },
  { name: "Dining", enabled: true, icon: "🍽️" },
  { name: "Electronics", enabled: false, icon: "💻" },
  { name: "Luxury", enabled: false, icon: "💎" },
];

const AgentRules = () => {
  const [updating, setUpdating] = useState(false);
  const [resetting, setResetting] = useState(false);

  const handleUpdate = () => {
    setUpdating(true);
    setTimeout(() => setUpdating(false), 2000);
  };

  const handleReset = () => {
    setResetting(true);
    setTimeout(() => setResetting(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Agent Rules 🔒</h1>
        <p className="text-muted-foreground">View and manage your encrypted spending rules</p>
      </div>

      {/* Budget Usage */}
      <div className="card-glass glow-border p-6 space-y-4">
        <h2 className="font-semibold flex items-center gap-2">
          Budget Usage
          <span className="ml-auto text-xs text-muted-foreground">Click values to reveal</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-xl bg-secondary/50 p-4 space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Budget</p>
            <EncryptedValue value="$2,000" revealable />
          </div>
          <div className="rounded-xl bg-secondary/50 p-4 space-y-1">
            <p className="text-xs text-muted-foreground uppercase tracking-wider">Used</p>
            <EncryptedValue value="$1,847" revealable />
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <div className="h-full rounded-full bg-primary transition-all" style={{ width: "92%" }} />
        </div>
        <p className="text-xs text-muted-foreground text-right">~92% used</p>
      </div>

      {/* Current Rules */}
      <div className="card-glass p-6 space-y-4">
        <h2 className="font-semibold">Current Rules</h2>
        <div className="space-y-2">
          {categories.map((cat) => (
            <div
              key={cat.name}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 border ${
                cat.enabled
                  ? "border-primary/30 bg-primary/5"
                  : "border-border bg-secondary/30"
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

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="cta" size="lg" className="flex-1" onClick={handleUpdate} disabled={updating}>
          {updating ? <><Loader2 className="h-4 w-4 animate-spin" /> Updating...</> : "🔒 Update Rules"}
        </Button>
        <Button variant="outline" size="lg" className="flex-1" onClick={handleReset} disabled={resetting}>
          {resetting ? <><Loader2 className="h-4 w-4 animate-spin" /> Resetting...</> : "Reset Month"}
        </Button>
      </div>
    </div>
  );
};

export default AgentRules;
