import EncryptedRuleForm from "@/components/private-agent/EncryptedRuleForm";
import { usePrivateAgentState } from "@/state/PrivateAgentState";

const AgentRules = () => {
  const {
    activeRules,
    revealedBudget,
    revealedSpent,
    usagePercent,
    updatingRules,
    resettingMonth,
    updateRules,
    resetMonth,
  } = usePrivateAgentState();

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Define Private Rules 🔒</h1>
        <p className="text-muted-foreground">Manage confidential spending policies used in encrypted rule evaluation.</p>
      </div>

      <EncryptedRuleForm
        categories={activeRules}
        totalBudgetValue={revealedBudget}
        usedBudgetValue={revealedSpent}
        usagePercent={usagePercent}
        updating={updatingRules}
        resetting={resettingMonth}
        onUpdate={updateRules}
        onReset={resetMonth}
      />
    </div>
  );
};

export default AgentRules;
