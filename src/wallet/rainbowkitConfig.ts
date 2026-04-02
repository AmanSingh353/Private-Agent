import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { http } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

const projectId =
  (import.meta.env.VITE_RAINBOWKIT_PROJECT_ID as string | undefined) ??
  (import.meta.env.VITE_WALLETCONNECT_PROJECT_ID as string | undefined) ??
  "";

export const rainbowkitConfig = getDefaultConfig({
  appName: "PrivateAgent",
  projectId: projectId || "00000000000000000000000000000000",
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

export const hasWalletConnectProjectId = Boolean(projectId.trim());
