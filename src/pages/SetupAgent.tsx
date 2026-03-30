import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, CheckCircle } from "lucide-react";

const allCategories = [
  { id: "groceries", label: "Groceries", icon: "🛒" },
  { id: "transport", label: "Transport", icon: "🚗" },
  { id: "dining", label: "Dining", icon: "🍽️" },
  { id: "electronics", label: "Electronics", icon: "💻" },
  { id: "luxury", label: "Luxury", icon: "💎" },
  { id: "gambling", label: "Gambling", icon: "🎰" },
];

const SetupAgent = () => {
  const [budget, setBudget] = useState("2000");
  const [maxPurchase, setMaxPurchase] = useState("500");
  const [selected, setSelected] = useState<string[]>(["groceries", "transport", "dining"]);
  const [deploying, setDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);

  const toggle = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const handleDeploy = () => {
    setDeploying(true);
    setTimeout(() => {
      setDeploying(false);
      setDeployed(true);
    }, 3000);
  };

  return (
    <div className="max-w-lg mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Setup Your PrivateAgent 🔒</h1>
        <p className="text-muted-foreground">
          Define spending rules. They'll be encrypted client-side using FHE before deployment.
        </p>
      </div>

      <div className="card-glass p-6 space-y-6">
        {/* Budget input */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Monthly Budget ($)</label>
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="w-full rounded-xl bg-secondary border border-border px-4 py-3 text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-muted-foreground">Max Per Purchase ($)</label>
          <input
            type="number"
            value={maxPurchase}
            onChange={(e) => setMaxPurchase(e.target.value)}
            className="w-full rounded-xl bg-secondary border border-border px-4 py-3 text-foreground font-semibold focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>

        {/* Categories */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-muted-foreground">Allowed Categories</label>
          <div className="grid grid-cols-2 gap-2">
            {allCategories.map((cat) => {
              const active = selected.includes(cat.id);
              return (
                <button
                  key={cat.id}
                  onClick={() => toggle(cat.id)}
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
        </div>

        {/* Deploy */}
        <Button
          variant="cta"
          size="lg"
          className="w-full"
          onClick={handleDeploy}
          disabled={deploying || deployed}
        >
          {deploying ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              Encrypting & Deploying...
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

      <p className="text-center text-xs text-muted-foreground">
        Rules will be encrypted client-side using FHE before deployment to Fhenix.
      </p>
    </div>
  );
};

export default SetupAgent;
