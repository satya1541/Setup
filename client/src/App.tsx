import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import Home from "@/pages/home";
import LempGuide from "@/pages/lemp-guide";
import MqttGuide from "@/pages/mqtt-guide";
import PhpMyAdminImportGuide from "@/pages/phpmyadmin-import-guide";
import PhpMyAdmin504Guide from "@/pages/phpmyadmin-504-guide";
import SecureMqttGuide from "@/pages/secure-mqtt-guide";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/lemp-guide" component={LempGuide} />
      <Route path="/mqtt-guide" component={MqttGuide} />
      <Route path="/phpmyadmin-import-guide" component={PhpMyAdminImportGuide} />
      <Route path="/phpmyadmin-504-guide" component={PhpMyAdmin504Guide} />
      <Route path="/secure-mqtt-guide" component={SecureMqttGuide} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
