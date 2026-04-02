import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X, LayoutDashboard, Settings, ShoppingCart, Clock, FileText } from "lucide-react";
import { appFlow } from "@/config/appFlow";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

const iconByStep = {
  onboarding: LayoutDashboard,
  "create-agent": Settings,
  "private-rules": FileText,
  "purchase-request": ShoppingCart,
  history: Clock,
};

const navItems = appFlow.map((step) => ({
  path: step.path,
  label: step.label,
  icon: iconByStep[step.id],
}));

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openConnectModal } = useConnectModal();
  const { isConnected, address } = useAccount();
  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "";

  const handleConnect = () => {
    openConnectModal?.();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground">PrivateAgent</span>
            <span className="text-sm">🔒</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            <button
              type="button"
              className="hidden sm:flex items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-sm font-medium text-foreground border border-border hover:bg-muted transition-colors"
              onClick={handleConnect}
            >
              <div className={`h-2 w-2 rounded-full ${isConnected ? "bg-primary" : "bg-primary animate-pulse"}`} />
              {isConnected ? `Connected: ${shortAddress}` : "Connect Wallet"}
            </button>
            <button
              className="md:hidden p-2 text-muted-foreground"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <nav className="md:hidden border-t border-border bg-background p-4 animate-fade-in">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-2 px-3 py-3 rounded-lg text-sm font-medium ${
                    active
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              );
            })}
            <button
              type="button"
              className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-sm font-medium text-foreground border border-border"
              onClick={handleConnect}
            >
              <div className={`h-2 w-2 rounded-full ${isConnected ? "bg-primary" : "bg-primary animate-pulse"}`} />
              {isConnected ? `Connected: ${shortAddress}` : "Connect Wallet"}
            </button>
          </nav>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 container py-8">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <span>
            Powered by <span className="text-primary font-semibold">Fhenix FHE</span> for confidential policy evaluation
          </span>
          <span className="text-primary/60">Only outcome-level signals are shared externally</span>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
