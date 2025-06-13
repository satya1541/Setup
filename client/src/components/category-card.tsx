import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, ArrowRight, Star, Sparkles } from "lucide-react";
import * as Icons from "lucide-react";
import { SetupCategory } from "@/data/setup-categories";

interface CategoryCardProps {
  category: SetupCategory;
  onGuideSelect: (guideId: string) => void;
}

export function CategoryCard({ category, onGuideSelect }: CategoryCardProps) {
  const IconComponent = Icons[category.icon as keyof typeof Icons] as any;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="h-full"
    >
      <Card className="h-full card-hover border-2 shadow-elegant overflow-hidden">
        <CardHeader className="pb-6 bg-gradient-to-br from-muted/30 to-muted/10 relative overflow-hidden">
          <div className="absolute top-2 right-2 w-20 h-20 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-2xl"></div>
          <div className="flex items-start space-x-4 relative z-10">
            <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center shadow-lg animate-float relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-slide-in"></div>
              <IconComponent className="w-8 h-8 text-white relative z-10" />
            </div>
            <div className="flex-1">
              <CardTitle className="text-2xl font-bold text-gradient mb-2 flex items-center">
                {category.title}
                <Sparkles className="w-5 h-5 ml-2 text-primary animate-pulse-gentle" />
              </CardTitle>
              <p className="text-sm text-muted-foreground leading-relaxed">{category.description}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {category.guides.map((guide, index) => {
              const GuideIcon = Icons[guide.icon as keyof typeof Icons] as any;
              return (
                <motion.div
                  key={guide.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group flex items-center justify-between p-4 rounded-xl border-2 border-border/50 hover:border-primary/30 hover:bg-muted/30 transition-all duration-300 cursor-pointer"
                  onClick={() => onGuideSelect(guide.id)}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-10 h-10 gradient-secondary rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-200 shadow-md relative overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-slide-in"></div>
                      <GuideIcon className="w-5 h-5 text-white relative z-10" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-base truncate group-hover:text-primary transition-colors">
                          {guide.title}
                        </h4>
                        {guide.featured && (
                          <Badge variant="secondary" className="text-xs bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-800 dark:from-yellow-900 dark:to-orange-900 dark:text-orange-200 border-orange-200 dark:border-orange-800 animate-pulse-gentle">
                            <Star className="w-3 h-3 mr-1 animate-bounce-subtle" />
                            Featured
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{guide.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{guide.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span className="capitalize">{guide.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-3 gradient-accent text-white hover:shadow-lg hover:shadow-accent/30 group-hover:translate-x-1 transition-all duration-200 rounded-xl"
                  >
                    <ArrowRight className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  </Button>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}