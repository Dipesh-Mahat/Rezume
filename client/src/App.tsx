import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ErrorBoundary } from "@/components/error-boundary";
import LandingPage from "@/pages/landing";
import ResumeBuilder from "@/pages/resume-builder";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={LandingPage} />
      <Route path="/builder" component={ResumeBuilder} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <TooltipProvider>
        <div className="min-h-screen font-inter">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </ErrorBoundary>
  );
}

export default App;
