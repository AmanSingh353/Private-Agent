import TransactionHistoryList from "@/components/private-agent/TransactionHistoryList";
import { usePrivateAgentState } from "@/state/PrivateAgentState";

const TransactionHistory = () => {
  const { transactions } = usePrivateAgentState();

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Purchase History 🔒</h1>
        <p className="text-muted-foreground">Privacy-safe audit trail showing request details and outcomes, without exposing underlying rule values.</p>
      </div>

      <TransactionHistoryList transactions={transactions} />
    </div>
  );
};

export default TransactionHistory;
