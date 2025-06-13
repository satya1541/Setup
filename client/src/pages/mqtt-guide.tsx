import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { NavigationHeader } from "@/components/navigation-header";
import { Sidebar } from "@/components/sidebar";
import { StepCard } from "@/components/step-card";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/hooks/use-progress";
import { mqttSteps } from "@/data/mqtt-steps";
import { Radio, Clock, User, CheckCircle, ArrowLeft, Shield } from "lucide-react";
import { Link } from "wouter";

export default function MqttGuide() {
  const { completedSteps, toggleStep, resetProgress } = useProgress();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredSteps, setFilteredSteps] = useState(mqttSteps);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredSteps(mqttSteps);
      return;
    }

    const filtered = mqttSteps.filter(step =>
      step.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      step.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredSteps(filtered);
  }, [searchQuery]);

  const handleStepClick = (stepId: string) => {
    const element = document.getElementById(stepId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const isAllCompleted = completedSteps.size === mqttSteps.length;

  return (
    <div className="min-h-screen bg-background">
      <NavigationHeader
        completedSteps={completedSteps.size}
        totalSteps={mqttSteps.length}
        onSearch={setSearchQuery}
      />
      
      <div className="flex pt-16">
        <Sidebar
          steps={mqttSteps}
          completedSteps={completedSteps}
          onResetProgress={resetProgress}
          onStepClick={handleStepClick}
        />
        
        <main className="flex-1 ml-80 min-h-screen">
          <div className="max-w-4xl mx-auto px-6 py-8">
            {/* Navigation Back */}
            <div className="mb-6">
              <Link href="/">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
            </div>

            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative overflow-hidden rounded-2xl gradient-bg text-white mb-12"
            >
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="relative p-8 md:p-12">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <Radio className="w-8 h-8" />
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold mb-2">MQTT WSS/MQTTS Setup</h1>
                    <p className="text-xl opacity-90">Secure MQTT broker with SSL/TLS and WebSocket support</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 text-sm">
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                    <Clock className="w-4 h-4 mr-2" />
                    ~45 minutes
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                    <User className="w-4 h-4 mr-2" />
                    Advanced
                  </Badge>
                  <Badge variant="secondary" className="bg-white/20 text-white border-white/20">
                    <Shield className="w-4 h-4 mr-2" />
                    SSL/TLS Secured
                  </Badge>
                </div>
              </div>
            </motion.div>

            {/* Steps Container */}
            <div className="space-y-8">
              {searchQuery && filteredSteps.length === 0 && (
                <Card>
                  <CardContent className="p-8 text-center">
                    <p className="text-muted-foreground">No steps found matching "{searchQuery}"</p>
                  </CardContent>
                </Card>
              )}
              
              {filteredSteps.map((step, index) => {
                const stepNumber = mqttSteps.indexOf(step) + 1;
                return (
                  <StepCard
                    key={step.id}
                    step={step}
                    stepNumber={stepNumber}
                    isCompleted={completedSteps.has(stepNumber)}
                    onToggleComplete={toggleStep}
                  />
                );
              })}
            </div>
            
            {/* Completion Section */}
            {isAllCompleted && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="mt-12 p-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl text-center"
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-10 h-10" />
                </motion.div>
                <h2 className="text-2xl font-bold mb-2">MQTT Broker Ready! 🎉</h2>
                <p className="text-lg opacity-90 mb-4">Your secure MQTT broker is now operational!</p>
                <div className="bg-white/20 rounded-lg p-4 max-w-md mx-auto">
                  <p className="text-sm mb-2">Connect to your broker at:</p>
                  <code className="text-lg font-mono">mqtt.thynxai.tech:8883</code>
                  <div className="mt-3 pt-3 border-t border-white/20">
                    <p className="text-xs opacity-80">Username: satya | Password: satya123</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}