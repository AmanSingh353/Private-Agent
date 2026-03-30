import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Shield, Menu, X, LayoutDashboard, Settings, ShoppingCart, Clock, FileText } from "lucide-react";

const navItems = [
  { path: "/", label: "Dashboard", icon: LayoutDashboard },
  { path: "/setup", label: "Setup", icon: Settings },
  { path: "/purchase", label: "Purchase", icon: ShoppingCart },
  { path: "/history", label: "History", icon: Clock },
  { path: "/rules", label: "Rules", icon: FileText },
];

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

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
          </nav>
        )}
      </header>

      {/* Content */}
      <main className="flex-1 container py-8">{children}</main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-muted-foreground">
          <span>
            Powered by <span className="text-primary font-semibold">Fhenix FHE</span>
          </span>
          <span className="text-primary/60">Wave 1 Buildathon</span>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
