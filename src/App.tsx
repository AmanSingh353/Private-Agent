import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";
import Index from "./pages/Index";
import SetupAgent from "./pages/SetupAgent";
import NewPurchase from "./pages/NewPurchase";
import TransactionHistory from "./pages/TransactionHistory";
import AgentRules from "./pages/AgentRules";
import NotFound from "./pages/NotFound";
import { PrivateAgentStateProvider } from "./state/PrivateAgentState";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <PrivateAgentStateProvider>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Navigate to="/onboarding" replace />} />
              <Route path="/onboarding" element={<Index />} />
              <Route path="/create-agent" element={<SetupAgent />} />
              <Route path="/purchase-request" element={<NewPurchase />} />
              <Route path="/history" element={<TransactionHistory />} />
              <Route path="/private-rules" element={<AgentRules />} />
              <Route path="/setup" element={<Navigate to="/create-agent" replace />} />
              <Route path="/purchase" element={<Navigate to="/purchase-request" replace />} />
              <Route path="/rules" element={<Navigate to="/private-rules" replace />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </PrivateAgentStateProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
