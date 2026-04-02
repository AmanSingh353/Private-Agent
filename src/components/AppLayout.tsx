import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X, LayoutDashboard, Settings, ShoppingCart, Clock, FileText } from "lucide-react";
import { wave1Flow } from "@/config/wave1Flow";

const iconByStep = {
  onboarding: LayoutDashboard,
  "create-agent": Settings,
  "private-rules": FileText,
  "purchase-request": ShoppingCart,
  history: Clock,
};

const navItems = wave1Flow.map((step) => ({
  path: step.path,
  label: step.label,
  icon: iconByStep[step.id],
}));

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [judgeMode, setJudgeMode] = useState(false);
  const currentStepIndex = wave1Flow.findIndex((step) => step.path === location.pathname);
  const activeStep = currentStepIndex >= 0 ? wave1Flow[currentStepIndex] : null;
  const nextStep = currentStepIndex >= 0 && currentStepIndex < wave1Flow.length - 1 ? wave1Flow[currentStepIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-primary" />
            <span className="text-lg font-bold text-foreground">PrivateAgent</span>
            <span className="text-sm">🔒</span>
            <span className="ml-2 hidden sm:inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary border border-primary/20">
              Wave 1 Buildathon
            </span>
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
              className={`hidden sm:flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium border transition-colors ${
                judgeMode
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-secondary text-foreground border-border hover:bg-muted"
              }`}
              onClick={() => setJudgeMode((prev) => !prev)}
            >
              <div className={`h-2 w-2 rounded-full ${judgeMode ? "bg-primary animate-pulse" : "bg-muted-foreground/60"}`} />
              {judgeMode ? "Judge Walkthrough On" : "Judge Walkthrough"}
            </button>
            <button className="hidden sm:flex items-center gap-2 rounded-xl bg-secondary px-4 py-2 text-sm font-medium text-foreground border border-border hover:bg-muted transition-colors">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Connect Wallet
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
            <button className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl bg-secondary px-4 py-2.5 text-sm font-medium text-foreground border border-border">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Connect Wallet
            </button>
            <button
              className={`mt-3 w-full flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium border transition-colors ${
                judgeMode
                  ? "bg-primary/10 border-primary/30 text-primary"
                  : "bg-secondary text-foreground border-border"
              }`}
              onClick={() => setJudgeMode((prev) => !prev)}
            >
              <div className={`h-2 w-2 rounded-full ${judgeMode ? "bg-primary animate-pulse" : "bg-muted-foreground/60"}`} />
              {judgeMode ? "Judge Walkthrough On" : "Judge Walkthrough"}
            </button>
          </nav>
        )}

        {judgeMode && (
          <div className="border-t border-border bg-background">
            <div className="container py-4 space-y-3 animate-fade-in">
              <div className="flex flex-wrap items-center gap-2">
                {wave1Flow.map((step, index) => {
                  const active = step.path === location.pathname;
                  return (
                    <Link
                      key={step.id}
                      to={step.path}
                      className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                        active
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "border-border bg-secondary/40 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span>{index + 1}.</span>
                      {step.label}
                    </Link>
                  );
                })}
              </div>

              {activeStep && (
                <div className="rounded-xl border border-primary/20 bg-primary/5 p-3 text-sm">
                  <p className="font-medium text-foreground">Judge Story Step {currentStepIndex + 1}: {activeStep.label}</p>
                  <p className="text-muted-foreground">
                    {activeStep.purpose}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Walkthrough: create private agent, set hidden rules, submit request, receive privacy-safe result, inspect transaction log.
                  </p>
                  {nextStep && (
                    <Link to={nextStep.path} className="inline-flex mt-2 text-xs font-medium text-primary hover:underline">
                      Continue to Step {currentStepIndex + 2}: {nextStep.label}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
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
