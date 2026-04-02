import EncryptedValue from "@/components/EncryptedValue";
import StatusChip from "@/components/StatusChip";

export interface TransactionItem {
  id: number;
  merchant: string;
  amount: string;
  category: string;
  time: string;
  status: "approved" | "denied";
  encrypted: boolean;
}

interface TransactionHistoryListProps {
  transactions: TransactionItem[];
}

const TransactionHistoryList = ({ transactions }: TransactionHistoryListProps) => {
  if (transactions.length === 0) {
    return (
      <div className="card-glass p-8 text-center space-y-2">
        <p className="text-base font-semibold">No decisions yet</p>
        <p className="text-sm text-muted-foreground">
          Run a purchase check to populate this buildathon demo audit trail.
        </p>
      </div>
    );
  }

  return (
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
              {tx.encrypted ? <EncryptedValue value={tx.amount} revealable /> : <span className="font-medium">{tx.amount}</span>}
              <span className="text-muted-foreground">{tx.category}</span>
              <span className="text-xs text-muted-foreground">request amount</span>
              <span className="text-muted-foreground ml-auto">{tx.time}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionHistoryList;
