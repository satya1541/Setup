import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTheme } from "@/components/theme-provider";
import { ProgressCircle } from "@/components/progress-circle";
import { Moon, Sun, Search, Server } from "lucide-react";

interface NavigationHeaderProps {
  completedSteps: number;
  totalSteps: number;
  onSearch: (query: string) => void;
}

export function NavigationHeader({ completedSteps, totalSteps, onSearch }: NavigationHeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const percentage = Math.round((completedSteps / totalSteps) * 100);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    onSearch(value);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-border/50 shadow-elegant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center shadow-lg animate-pulse-gentle">
                <Server className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">LEMP Setup Guide</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Complete Ubuntu 24.04 Setup</p>
              </div>
            </div>
            <div className="hidden lg:flex items-center space-x-3 px-3 py-1.5 bg-muted/50 rounded-full border">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-muted-foreground">Ubuntu 24.04</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-sm font-medium text-muted-foreground">by Satya</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative hidden md:block">
              <Input
                type="text"
                placeholder="Search steps..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-64 pl-10 pr-4 h-9 bg-muted/50 border-muted-foreground/20 focus:border-primary/50 focus:bg-background/80 transition-all duration-200"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            </div>
            
            <div className="flex items-center space-x-2">
              <ProgressCircle percentage={percentage} />
              <span className="text-sm font-medium text-muted-foreground hidden sm:block">
                {percentage}%
              </span>
            </div>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="h-9 w-9 hover:bg-muted/50 transition-colors duration-200"
            >
              {theme === "dark" ? (
                <Sun className="h-4 w-4 text-yellow-500 transition-colors" />
              ) : (
                <Moon className="h-4 w-4 text-blue-600 transition-colors" />
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
