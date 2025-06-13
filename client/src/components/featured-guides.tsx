import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, Star, ArrowRight, Sparkles, Trophy, Zap } from "lucide-react";
import * as Icons from "lucide-react";
import { SetupGuide } from "@/data/setup-categories";

interface FeaturedGuidesProps {
  guides: SetupGuide[];
  onGuideSelect: (guideId: string) => void;
}

export function FeaturedGuides({ guides, onGuideSelect }: FeaturedGuidesProps) {
  return (
    <section className="mb-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex items-center space-x-4 mb-8"
      >
        <div className="w-12 h-12 gradient-accent rounded-2xl flex items-center justify-center shadow-lg animate-pulse-gentle">
          <Star className="w-6 h-6 text-white" />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-gradient">Featured Guides</h2>
          <p className="text-muted-foreground text-lg">Popular and recommended setup tutorials</p>
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {guides.map((guide, index) => {
          const GuideIcon = Icons[guide.icon as keyof typeof Icons] as any;
          return (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="h-full"
            >
              <Card className="h-full shadow-elegant border-2 card-hover group cursor-pointer overflow-hidden bg-gradient-to-br from-card to-card/50"
                   onClick={() => onGuideSelect(guide.id)}>
                <div className="p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-14 h-14 gradient-primary rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <GuideIcon className="w-7 h-7 text-white" />
                    </div>
                    <Badge variant="secondary" className="bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 dark:from-yellow-900 dark:to-orange-900 dark:text-orange-200 border-orange-200 dark:border-orange-800">
                      <Star className="w-3 h-3 mr-1" />
                      Featured
                    </Badge>
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed">
                    {guide.description}
                  </p>
                  
                  <div className="flex items-center space-x-4 mb-6 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2 bg-muted/50 px-3 py-1.5 rounded-full">
                      <Clock className="w-4 h-4" />
                      <span className="font-medium">{guide.duration}</span>
                    </div>
                    <div className="flex items-center space-x-2 bg-muted/50 px-3 py-1.5 rounded-full">
                      <User className="w-4 h-4" />
                      <span className="font-medium capitalize">{guide.difficulty}</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-6">
                    {guide.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="outline" className="text-xs font-medium px-2 py-1">
                        {tech}
                      </Badge>
                    ))}
                    {guide.technologies.length > 3 && (
                      <Badge variant="outline" className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary border-primary/30">
                        +{guide.technologies.length - 3} more
                      </Badge>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full gradient-primary text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 group-hover:scale-105"
                    size="lg"
                  >
                    Start Guide
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}