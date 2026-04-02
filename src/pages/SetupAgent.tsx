import AgentSetupForm from "@/components/private-agent/AgentSetupForm";
import { usePrivateAgentState } from "@/state/PrivateAgentState";

const SetupAgent = () => {
  const {
    categories,
    setupDraft,
    deploying,
    deployed,
    setBudget,
    setMaxPurchase,
    toggleCategory,
    deployAgent,
  } = usePrivateAgentState();

  return (
    <div className="max-w-lg mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Create Your PrivateAgent 🔒</h1>
        <p className="text-muted-foreground">
          Set confidential spending policies that are encrypted before deployment and kept hidden during evaluation.
        </p>
      </div>

      <AgentSetupForm
        budget={setupDraft.budget}
        maxPurchase={setupDraft.maxPurchase}
        selectedCategories={setupDraft.selectedCategories}
        categories={categories}
        deploying={deploying}
        deployed={deployed}
        onBudgetChange={setBudget}
        onMaxPurchaseChange={setMaxPurchase}
        onToggleCategory={toggleCategory}
        onDeploy={deployAgent}
      />

      <p className="text-center text-xs text-muted-foreground">
        Private rules are encrypted client-side; observers only see allow/deny outcomes, not policy values.
      </p>
    </div>
  );
};

export default SetupAgent;
