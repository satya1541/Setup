import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from "lucide-react";
import { Step } from "@/data/steps";

interface SidebarProps {
  steps: Step[];
  completedSteps: Set<number>;
  onResetProgress: () => void;
  onStepClick: (stepId: string) => void;
}

export function Sidebar({ steps, completedSteps, onResetProgress, onStepClick }: SidebarProps) {
  const totalSteps = steps.length;
  const completed = completedSteps.size;
  const percentage = Math.round((completed / totalSteps) * 100);

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-80 bg-card border-r border-border overflow-hidden z-40">
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Progress</h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetProgress}
              className="text-sm text-primary hover:text-primary/80"
            >
              Reset
            </Button>
          </div>
          <Progress value={percentage} className="mb-2" />
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">{completed}</span> of <span className="font-medium">{totalSteps}</span> steps completed
          </p>
        </div>
        
        <ScrollArea className="h-[calc(100vh-200px)] sidebar-scroll">
          <nav className="space-y-2">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = completedSteps.has(stepNumber);
              
              return (
                <div key={step.id} className="step-indicator">
                  <button
                    onClick={() => onStepClick(step.id)}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-muted/50 transition-colors group w-full text-left"
                  >
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${
                      isCompleted 
                        ? 'border-green-500 bg-green-500' 
                        : 'border-muted-foreground/30'
                    }`}>
                      {isCompleted ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : (
                        <span className="text-sm font-medium text-muted-foreground">{stepNumber}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium group-hover:text-primary transition-colors truncate">
                        {step.title}
                      </p>
                    </div>
                  </button>
                </div>
              );
            })}
          </nav>
        </ScrollArea>
      </div>
    </aside>
  );
}
