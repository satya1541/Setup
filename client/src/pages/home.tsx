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
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Code className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold">DevSetup Hub</h1>
                <p className="text-xs text-muted-foreground hidden sm:block">Complete setup guides for developers</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Input
                  type="text"
                  placeholder="Search guides..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-64 pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-9 w-9"
              >
                {theme === "dark" ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative overflow-hidden rounded-2xl gradient-bg text-white mb-12"
        >
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative p-8 md:p-12 text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm"
            >
              <Zap className="w-10 h-10" />
            </motion.div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              DevSetup Hub
            </h1>
            <p className="text-xl md:text-2xl opacity-90 mb-6 max-w-3xl mx-auto">
              Complete, step-by-step setup guides for modern development environments
            </p>
            <p className="text-lg opacity-80 max-w-2xl mx-auto">
              From web servers to databases, containers to development tools - get your environment ready in minutes
            </p>
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
