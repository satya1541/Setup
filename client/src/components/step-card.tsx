import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { CodeBlock } from "@/components/code-block";
import { Lightbulb } from "lucide-react";
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: stepNumber * 0.1 }}
    >
      <Card className="overflow-hidden shadow-lg border-2 hover:shadow-xl transition-shadow">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                {stepNumber}
              </div>
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-2">{step.title}</h2>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={isCompleted}
                onCheckedChange={() => onToggleComplete(stepNumber)}
                className="w-5 h-5"
              />
              <span className="text-sm text-muted-foreground">Complete</span>
            </div>
          </div>
          
          <div className="space-y-4">
            <CodeBlock code={step.code} language={step.language} />
            
            {step.additionalCode && (
              <div className="mt-6">
                <h4 className="text-lg font-semibold mb-3">{step.additionalCode.title}</h4>
                <CodeBlock 
                  code={step.additionalCode.code} 
                  language={step.additionalCode.language} 
                />
              </div>
            )}
            
            {step.tips && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-start space-x-3">
                  <Lightbulb className="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">Tips</h4>
                    <ul className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                      {step.tips.map((tip, index) => (
                        <li key={index}>• {tip}</li>
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
