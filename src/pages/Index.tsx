import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import EncryptedValue from "@/components/EncryptedValue";
import { ShoppingCart, Settings, Activity } from "lucide-react";
import { usePrivateAgentState } from "@/state/PrivateAgentState";

const Dashboard = () => {
  const { encryptedMonthlyBudget, encryptedSpent, encryptedMaxPerPurchase, activeRules } = usePrivateAgentState();

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Hero */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl font-bold tracking-tight">
          Private Spending Agent
        </h1>
        <p className="text-muted-foreground text-lg max-w-lg mx-auto">
          Your spending rules stay confidential. Requests are evaluated with encrypted logic, and merchants only receive necessary outcomes.
        </p>
      </div>

      {/* Agent Status */}
      <div className="max-w-2xl mx-auto">
        <div className="card-glass glow-border p-6 space-y-6">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            <h2 className="text-lg font-semibold">Agent Status</h2>
            <div className="ml-auto flex items-center gap-1.5">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs text-primary font-medium">Active</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="rounded-xl bg-secondary/50 p-4 space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Monthly Budget</p>
              <EncryptedValue value={encryptedMonthlyBudget} />
            </div>
            <div className="rounded-xl bg-secondary/50 p-4 space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Spent</p>
              <EncryptedValue value={encryptedSpent} />
            </div>
            <div className="rounded-xl bg-secondary/50 p-4 space-y-1">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">Max / Purchase</p>
              <EncryptedValue value={encryptedMaxPerPurchase} />
            </div>
          </div>

          {/* Categories */}
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">Active Rules</p>
            <div className="flex flex-wrap gap-2">
              {activeRules.map((cat) => (
                <span
                  key={cat.name}
                  className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium border ${
                    cat.enabled
                      ? "border-primary/30 bg-primary/10 text-primary"
                      : "border-border bg-secondary text-muted-foreground"
                  }`}
                >
                  {cat.icon} {cat.name}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Rule details remain private by default and are never shared with merchants.
            </p>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Button variant="cta" size="lg" asChild>
          <Link to="/purchase-request">
            <ShoppingCart className="h-4 w-4" />
            Submit Purchase Request
          </Link>
        </Button>
        <Button variant="outline" size="lg" asChild>
          <Link to="/create-agent">
            <Settings className="h-4 w-4" />
            Create Agent
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
