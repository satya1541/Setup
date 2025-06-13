import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";
import { Lightbulb, Check } from "lucide-react";
import { Step } from "@/data/steps";

interface StepCardProps {
  step: Step;
  stepNumber: number;
  isCompleted: boolean;
  onToggleComplete: (stepNumber: number) => void;
}

export function StepCard({ step, stepNumber, isCompleted, onToggleComplete }: StepCardProps) {
  return (
    <motion.div
      id={step.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: stepNumber * 0.1 }}
      className="animate-fade-in"
    >
      <Card className={`overflow-hidden shadow-elegant border-2 card-hover transition-all duration-300 ${
        isCompleted ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-950/20' : 'border-border hover:border-primary/30'
      }`}>
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-start space-x-4">
              <div className={`flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg transition-all duration-300 ${
                isCompleted 
                  ? 'gradient-secondary animate-pulse-gentle' 
                  : 'gradient-primary hover:scale-105'
              }`}>
                {isCompleted ? (
                  <Check className="w-6 h-6" />
                ) : (
                  stepNumber
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h2 className="text-xl sm:text-2xl font-bold text-gradient">{step.title}</h2>
                  {isCompleted && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                      <Check className="w-3 h-3 mr-1" />
                      Completed
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                checked={isCompleted}
                onCheckedChange={() => onToggleComplete(stepNumber)}
                className="w-6 h-6 border-2 transition-all duration-200"
              />
              <span className="text-sm text-muted-foreground font-medium">Mark Complete</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="relative">
              <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-secondary rounded-full opacity-30"></div>
              <CodeBlock code={step.code} language={step.language} />
            </div>
            
            {step.additionalCode && (
              <div className="mt-8">
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-6 h-6 gradient-accent rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">+</span>
                  </div>
                  <h4 className="text-lg font-semibold">{step.additionalCode.title}</h4>
                </div>
                <div className="relative">
                  <div className="absolute -left-2 top-0 bottom-0 w-1 bg-gradient-to-b from-accent to-warning rounded-full opacity-30"></div>
                  <CodeBlock 
                    code={step.additionalCode.code} 
                    language={step.additionalCode.language} 
                  />
                </div>
              </div>
            )}
            
            {step.tips && (
              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl border border-blue-200 dark:border-blue-800 shadow-lg">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3 text-lg">💡 Pro Tips</h4>
                    <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-200">
                      {step.tips.map((tip, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                          <span className="leading-relaxed">{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
