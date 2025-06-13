import { useState, useEffect } from "react";

export function useProgress() {
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  useEffect(() => {
    const saved = localStorage.getItem("lemp-guide-progress");
    if (saved) {
      try {
        const progress = JSON.parse(saved);
        setCompletedSteps(new Set(progress));
      } catch (error) {
        console.error("Failed to load saved progress:", error);
      }
    }
  }, []);

  const saveProgress = (steps: Set<number>) => {
    localStorage.setItem("lemp-guide-progress", JSON.stringify([...steps]));
  };

  const toggleStep = (stepNumber: number) => {
    setCompletedSteps(prev => {
      const newSet = new Set(prev);
      if (newSet.has(stepNumber)) {
        newSet.delete(stepNumber);
      } else {
        newSet.add(stepNumber);
      }
      saveProgress(newSet);
      return newSet;
    });
  };

  const resetProgress = () => {
    setCompletedSteps(new Set());
    localStorage.removeItem("lemp-guide-progress");
  };

  return {
    completedSteps,
    toggleStep,
    resetProgress
  };
}
