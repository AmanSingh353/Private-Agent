interface StatusChipProps {
  status: "approved" | "pending" | "denied";
}

const labels: Record<string, { icon: string; text: string; className: string }> = {
  approved: { icon: "✅", text: "Approved", className: "status-approved" },
  pending: { icon: "⏳", text: "Pending", className: "status-pending" },
  denied: { icon: "❌", text: "Denied", className: "status-denied" },
};

const StatusChip = ({ status }: StatusChipProps) => {
  const l = labels[status];
  return (
    <span className={`inline-flex items-center gap-1 text-sm font-medium ${l.className}`}>
      {l.icon} {l.text}
    </span>
  );
};

export default StatusChip;
