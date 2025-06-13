import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, User, ArrowRight } from "lucide-react";
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
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow border-2">
        <CardHeader className="pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">{category.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">{category.description}</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {category.guides.map((guide) => {
              const GuideIcon = Icons[guide.icon as keyof typeof Icons] as any;
              return (
                <div
                  key={guide.id}
                  className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                      <GuideIcon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-sm truncate">{guide.title}</h4>
                        {guide.featured && (
                          <Badge variant="secondary" className="text-xs">Featured</Badge>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-1">{guide.description}</p>
                      <div className="flex items-center space-x-3 mt-2 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{guide.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <User className="w-3 h-3" />
                          <span>{guide.difficulty}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onGuideSelect(guide.id)}
                    className="ml-2"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}