import EncryptedValue from "@/components/EncryptedValue";
import StatusChip from "@/components/StatusChip";

const transactions = [
  { id: 124, merchant: "CoffeeShop.eth", amount: "$4.75", category: "☕ Cafe", time: "2h ago", status: "approved" as const, encrypted: true },
  { id: 123, merchant: "GroceryStore.eth", amount: "$27.50", category: "🛒 Groceries", time: "1d ago", status: "approved" as const, encrypted: false },
  { id: 122, merchant: "Uber.eth", amount: "$12.30", category: "🚗 Transport", time: "2d ago", status: "approved" as const, encrypted: true },
  { id: 121, merchant: "ElectroWorld.eth", amount: "$899.00", category: "💻 Electronics", time: "3d ago", status: "denied" as const, encrypted: true },
  { id: 120, merchant: "Bistro.eth", amount: "$34.50", category: "🍽️ Dining", time: "5d ago", status: "approved" as const, encrypted: false },
];

const TransactionHistory = () => {
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold">Transaction History 🔒</h1>
        <p className="text-muted-foreground">All purchases processed by your agent</p>
      </div>

      <div className="space-y-3">
        {transactions.map((tx) => (
          <div key={tx.id} className="card-glass p-4 flex items-center gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs text-muted-foreground">#{tx.id}</span>
                <span className="font-semibold truncate">{tx.merchant}</span>
                <StatusChip status={tx.status} />
              </div>
              <div className="flex items-center gap-3 text-sm">
                {tx.encrypted ? (
                  <EncryptedValue value={tx.amount} revealable />
                ) : (
                  <span className="font-medium">{tx.amount}</span>
                )}
                <span className="text-muted-foreground">{tx.category}</span>
                <span className="text-muted-foreground ml-auto">{tx.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionHistory;
