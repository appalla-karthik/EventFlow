import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import AllEventsPage from "@/pages/AllEventsPage";
import EventDetail from "@/pages/EventDetail";
import PortfolioPage from "@/pages/PortfolioPage";
import ReservePage from "@/pages/ReservePage";
import CategoryDetail from "@/pages/CategoryDetail";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    }
  }
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/events" component={AllEventsPage} />
      <Route path="/portfolio" component={PortfolioPage} />
      <Route path="/reserve" component={ReservePage} />
      <Route path="/categories/:slug" component={CategoryDetail} />
      <Route path="/events/:id" component={EventDetail} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
