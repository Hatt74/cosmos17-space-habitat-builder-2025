import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Droplet, Utensils, Trash2, Zap } from "lucide-react";

interface ResourceStats {
  water: number;
  food: number;
  waste: number;
  energy: number;
}

interface ResourcePanelProps {
  stats: ResourceStats;
  connectedBuildings: number;
  totalBuildings: number;
}

export default function ResourcePanel({ stats, connectedBuildings, totalBuildings }: ResourcePanelProps) {
  const resources = [
    { name: "Water", value: stats.water, icon: Droplet, color: "text-cyan-400" },
    { name: "Food", value: stats.food, icon: Utensils, color: "text-green-400" },
    { name: "Waste", value: stats.waste, icon: Trash2, color: "text-amber-400" },
    { name: "Energy", value: stats.energy, icon: Zap, color: "text-purple-400" },
  ];

  return (
    <div className="h-full flex flex-col bg-sidebar border-l border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-lg font-semibold text-sidebar-foreground">Resource Status</h2>
        <p className="text-xs text-muted-foreground mt-1">Colony resource levels</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <Card className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-card-foreground">Buildings Connected</span>
            <Badge variant={connectedBuildings === totalBuildings ? "default" : "secondary"}>
              {connectedBuildings}/{totalBuildings}
            </Badge>
          </div>
          <Progress value={(connectedBuildings / Math.max(totalBuildings, 1)) * 100} className="h-2" />
        </Card>

        {resources.map((resource) => {
          const Icon = resource.icon;
          const getVariant = (value: number) => {
            if (value >= 70) return "default";
            if (value >= 40) return "secondary";
            return "destructive";
          };
          
          return (
            <Card key={resource.name} className="p-4" data-testid={`card-resource-${resource.name.toLowerCase()}`}>
              <div className="flex items-center gap-3 mb-3">
                <Icon className={`w-5 h-5 ${resource.color}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-card-foreground">{resource.name}</span>
                    <span className="text-sm font-mono text-muted-foreground">{resource.value}%</span>
                  </div>
                </div>
              </div>
              <Progress value={resource.value} className="h-2" />
              <p className="text-xs text-muted-foreground mt-2">
                {resource.value >= 70 ? "Optimal" : resource.value >= 40 ? "Adequate" : "Critical"}
              </p>
            </Card>
          );
        })}

        <Card className="p-4 bg-muted/30">
          <h3 className="text-sm font-semibold text-card-foreground mb-2">Network Status</h3>
          <div className="space-y-2 text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Active Pipes:</span>
              <span className="font-mono">{connectedBuildings > 0 ? connectedBuildings - 1 : 0}</span>
            </div>
            <div className="flex justify-between">
              <span>System Health:</span>
              <span className="font-mono text-green-400">100%</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
