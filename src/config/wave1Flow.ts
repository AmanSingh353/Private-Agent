export const wave1Flow = [
  {
    id: "onboarding",
    path: "/onboarding",
    label: "Onboarding",
    purpose: "Introduce the privacy-first agent and current encrypted spending status.",
  },
  {
    id: "create-agent",
    path: "/create-agent",
    label: "Create Agent",
    purpose: "Set budget constraints and deploy a private agent with encrypted defaults.",
  },
  {
    id: "private-rules",
    path: "/private-rules",
    label: "Private Rules",
    purpose: "Review and update encrypted category and budget policies.",
  },
  {
    id: "purchase-request",
    path: "/purchase-request",
    label: "Purchase Request",
    purpose: "Submit a purchase and validate against encrypted rules.",
  },
  {
    id: "history",
    path: "/history",
    label: "History",
    purpose: "Audit approved and denied requests processed by the agent.",
  },
] as const;

export type Wave1FlowStep = (typeof wave1Flow)[number];
