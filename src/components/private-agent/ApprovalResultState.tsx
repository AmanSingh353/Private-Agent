import { Button } from "@/components/ui/button";
import StatusChip from "@/components/StatusChip";

interface ApprovalResultStateProps {
  visible: boolean;
  status: "approved" | "denied";
  output: "approved" | "denied" | "category blocked" | "threshold exceeded";
}

const ApprovalResultState = ({ visible, status, output }: ApprovalResultStateProps) => {
  if (!visible) return null;

  const approved = status === "approved";
  const resultTitle = approved ? "Purchase approved" : "Purchase denied";
  const resultSummary =
    output === "category blocked"
      ? "Category blocked"
      : output === "threshold exceeded"
        ? "Threshold exceeded"
        : output === "approved"
          ? "Approved"
          : "Denied";

  return (
    <>
      <div
        className={`rounded-xl p-4 text-center animate-fade-in ${
          approved
            ? "bg-primary/10 border border-primary/30"
            : "bg-destructive/10 border border-destructive/30"
        }`}
      >
        <p className={`text-sm font-semibold ${approved ? "text-primary" : "text-destructive"}`}>{resultTitle}</p>
        <StatusChip status={status} />
        <p className="text-sm text-muted-foreground mt-1">{resultSummary}</p>
        <p className="text-xs text-muted-foreground mt-1">
          Outcome shared: private rule thresholds and policy internals remain confidential.
        </p>
      </div>

      <div className="flex gap-3">
        <Button variant="cta" size="lg" className="flex-1">
          {approved ? "Approve Payment" : "Review Rules"}
        </Button>
        <Button variant="outline" size="lg" className="flex-1">
          {approved ? "Cancel" : "Try Again"}
        </Button>
      </div>
    </>
  );
};

export default ApprovalResultState;
