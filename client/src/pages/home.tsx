import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { CategoryCard } from "@/components/category-card";
import { FeaturedGuides } from "@/components/featured-guides";
import { setupCategories, featuredGuides } from "@/data/setup-categories";
import { Search, Moon, Sun, Code, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [, setLocation] = useLocation();

  const handleGuideSelect = (guideId: string) => {
    if (guideId === 'lemp-stack') {
      setLocation('/lemp-guide');
    } else if (guideId === 'mqtt-setup') {
      setLocation('/mqtt-guide');
    } else if (guideId === 'phpmyadmin-import-size') {
      setLocation('/phpmyadmin-import-guide');
    } else if (guideId === 'phpmyadmin-504-timeout') {
      setLocation('/phpmyadmin-504-guide');
    } else if (guideId === 'secure-mqtt-setup') {
      setLocation('/secure-mqtt-guide');
    } else {
      // For now, show a coming soon message for other guides
      alert(`${guideId} guide coming soon!`);
    }
  };

  const filteredCategories = setupCategories.map(category => ({
    ...category,
    guides: category.guides.filter(guide =>
      guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guide.technologies.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
    )
  })).filter(category => category.guides.length > 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-effect border-b border-border/50 shadow-elegant">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 gradient-primary rounded-2xl flex items-center justify-center shadow-lg animate-pulse-gentle relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-slide-in"></div>
                <Code className="w-6 h-6 text-white relative z-10" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">DevSetup Hub</h1>
                <p className="text-xs text-muted-foreground hidden sm:block flex items-center">
                  <Zap className="w-3 h-3 mr-1 text-primary" />
                  Complete setup guides for developers
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Input
                  type="text"
                  placeholder="Search guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10 pr-4 h-10 bg-muted/50 border-muted-foreground/20 focus:border-primary/50 focus:bg-background/80 transition-all duration-200 rounded-xl"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-10 w-10 hover:bg-muted/50 transition-all duration-200 rounded-xl"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4 text-yellow-500" />
                ) : (
                  <Moon className="h-4 w-4 text-blue-600" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-3xl gradient-bg text-white mb-16 shadow-2xl"
        >
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
          
          {/* Floating decorative elements */}
          <div className="absolute top-4 left-4 w-8 h-8 bg-white/10 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-12 right-12 w-6 h-6 bg-white/15 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-8 left-16 w-4 h-4 bg-white/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          
          <div className="relative p-8 md:p-16 text-center">
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-24 h-24 bg-white/20 rounded-3xl flex items-center justify-center mx-auto mb-8 backdrop-blur-sm shadow-2xl animate-float relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/30 to-white/20 rounded-3xl"></div>
              <Zap className="w-12 h-12 relative z-10" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
            >
              DevSetup Hub
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-3xl opacity-95 mb-8 max-w-4xl mx-auto font-light leading-relaxed"
            >
              Complete, step-by-step setup guides for modern development environments
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-lg md:text-xl opacity-85 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              From web servers to databases, containers to development tools - get your environment ready in minutes
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1 }}
              className="flex flex-wrap justify-center gap-4 text-sm opacity-80"
            >
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span>Always Updated</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Production Ready</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                <span>Community Tested</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Mobile Search */}
        <div className="md:hidden mb-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search guides..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          </div>
        </div>

        {/* Featured Guides */}
        {!searchQuery && (
          <FeaturedGuides guides={featuredGuides} onGuideSelect={handleGuideSelect} />
        )}

        {/* Categories */}
        <section>
          <div className="flex items-center space-x-3 mb-6">
            <h2 className="text-2xl font-bold">
              {searchQuery ? `Search Results for "${searchQuery}"` : "All Categories"}
            </h2>
          </div>
          
          {filteredCategories.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No guides found</h3>
                <p className="text-muted-foreground">
                  Try searching for something else or browse our categories above
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredCategories.map((category) => (
                <CategoryCard
                  key={category.id}
                  category={category}
                  onGuideSelect={handleGuideSelect}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
