import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Droplet, Utensils, Trash2, Zap, Pickaxe } from "lucide-react";

interface ResourceStats {
  water: number;
  food: number;
  minerals: number;
  energy: number;
}

interface ResourcePanelProps {
  stats: ResourceStats;
  connectedBuildings: number;
  totalBuildings: number;
}

export default function ResourcePanel({ stats, connectedBuildings, totalBuildings }: ResourcePanelProps) {
  const resources = [
    { name: "Energy", value: stats.energy, icon: Zap, color: "text-yellow-400", unit: "kW" },
    { name: "Water", value: stats.water, icon: Droplet, color: "text-cyan-400", unit: "L/h" },
    { name: "Food", value: stats.food, icon: Utensils, color: "text-green-400", unit: "kg/h" },
    { name: "Minerals", value: stats.minerals, icon: Pickaxe, color: "text-orange-400", unit: "kg/h" },
  ];

  return (
    <div className="h-full flex flex-col bg-sidebar border-l border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-lg font-semibold text-sidebar-foreground">Resource Status</h2>
        <p className="text-xs text-muted-foreground mt-1">Net production/consumption</p>
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
          const isPositive = resource.value >= 0;
          const isNeutral = resource.value === 0;
          
          return (
            <Card key={resource.name} className="p-4" data-testid={`card-resource-${resource.name.toLowerCase()}`}>
              <div className="flex items-center gap-3 mb-3">
                <Icon className={`w-5 h-5 ${resource.color}`} />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-card-foreground">{resource.name}</span>
                    <span className={`text-sm font-mono font-semibold ${
                      isNeutral ? "text-muted-foreground" : isPositive ? "text-green-400" : "text-red-400"
                    }`}>
                      {isPositive && !isNeutral ? "+" : ""}{resource.value} {resource.unit}
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                {isNeutral ? "Balanced" : isPositive ? "Surplus" : "Deficit"}
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
