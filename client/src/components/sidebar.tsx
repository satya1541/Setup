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
    <aside className="fixed left-0 top-16 bottom-0 w-80 glass-effect border-r border-border/50 overflow-hidden z-40 shadow-elegant">
      <div className="p-6">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 gradient-secondary rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm"></div>
              </div>
              <h2 className="text-lg font-semibold">Progress Tracker</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetProgress}
              className="text-sm text-primary hover:text-primary/80 hover:bg-primary/10 transition-all duration-200"
            >
              Reset
            </Button>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <Progress value={percentage} className="h-2 bg-muted/50" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary/40 opacity-50"></div>
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">
                <span className="font-semibold text-foreground">{completed}</span> of <span className="font-semibold text-foreground">{totalSteps}</span> completed
              </span>
              <span className="font-semibold text-primary">{percentage}%</span>
            </div>
            
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-muted/30 rounded-lg">
                <div className="text-lg font-bold text-green-600">{completed}</div>
                <div className="text-xs text-muted-foreground">Done</div>
              </div>
              <div className="p-2 bg-muted/30 rounded-lg">
                <div className="text-lg font-bold text-orange-600">{totalSteps - completed}</div>
                <div className="text-xs text-muted-foreground">Remaining</div>
              </div>
              <div className="p-2 bg-muted/30 rounded-lg">
                <div className="text-lg font-bold text-blue-600">{totalSteps}</div>
                <div className="text-xs text-muted-foreground">Total</div>
              </div>
            </div>
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100vh-320px)] sidebar-scroll">
          <nav className="space-y-1">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = completedSteps.has(stepNumber);
              
              return (
                <div key={step.id} className="step-indicator">
                  <button
                    onClick={() => onStepClick(step.id)}
                    className={`flex items-center space-x-3 p-3 rounded-xl hover:bg-muted/50 transition-all duration-200 group w-full text-left ${
                      isCompleted ? 'bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800' : ''
                    }`}
                  >
                    <div className={`flex-shrink-0 w-9 h-9 rounded-xl border-2 flex items-center justify-center transition-all duration-200 ${
                      isCompleted 
                        ? 'border-green-500 bg-green-500 shadow-lg shadow-green-500/30' 
                        : 'border-muted-foreground/30 group-hover:border-primary/50'
                    }`}>
                      {isCompleted ? (
                        <Check className="w-4 h-4 text-white" />
                      ) : (
                        <span className="text-sm font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                          {stepNumber}
                        </span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium group-hover:text-primary transition-colors truncate ${
                        isCompleted ? 'text-green-700 dark:text-green-400' : ''
                      }`}>
                        {step.title}
                      </p>
                      {isCompleted && (
                        <p className="text-xs text-green-600 dark:text-green-500 mt-0.5">
                          ✓ Completed
                        </p>
                      )}
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
