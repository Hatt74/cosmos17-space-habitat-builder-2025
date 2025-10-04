import { Home, Utensils, Droplet, Trash2, Radio } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BuildingType } from "@shared/schema";

interface BuildingInfo {
  type: BuildingType;
  name: string;
  icon: React.ElementType;
  color: string;
  requirements: string[];
}

const buildings: BuildingInfo[] = [
  {
    type: "house",
    name: "Habitat Module",
    icon: Home,
    color: "bg-slate-600",
    requirements: ["Water", "Power"],
  },
  {
    type: "food_station",
    name: "Food Station",
    icon: Utensils,
    color: "bg-green-700",
    requirements: ["Water", "Power"],
  },
  {
    type: "water_drill",
    name: "Water Drill",
    icon: Droplet,
    color: "bg-cyan-600",
    requirements: ["Power"],
  },
  {
    type: "waste_management",
    name: "Waste Management",
    icon: Trash2,
    color: "bg-amber-700",
    requirements: ["Power"],
  },
  {
    type: "communication_tower",
    name: "Comm Tower",
    icon: Radio,
    color: "bg-purple-600",
    requirements: ["Power"],
  },
];

interface BuildingPaletteProps {
  onBuildingSelect: (type: BuildingType) => void;
  selectedBuilding: BuildingType | null;
}

export default function BuildingPalette({ onBuildingSelect, selectedBuilding }: BuildingPaletteProps) {
  return (
    <div className="h-full flex flex-col bg-sidebar border-r border-sidebar-border">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="text-lg font-semibold text-sidebar-foreground">Building Palette</h2>
        <p className="text-xs text-muted-foreground mt-1">Select a building to place</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {buildings.map((building) => {
          const Icon = building.icon;
          const isSelected = selectedBuilding === building.type;
          
          return (
            <Card
              key={building.type}
              className={`p-3 cursor-pointer hover-elevate active-elevate-2 transition-all ${
                isSelected ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => onBuildingSelect(building.type)}
              data-testid={`card-building-${building.type}`}
            >
              <div className="flex items-start gap-3">
                <div className={`${building.color} p-2 rounded-md text-white`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm text-card-foreground">{building.name}</h3>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {building.requirements.map((req) => (
                      <Badge key={req} variant="secondary" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
      
      <div className="p-4 border-t border-sidebar-border bg-sidebar">
        <p className="text-xs text-muted-foreground">
          💡 Click a building, then click on the canvas to place it
        </p>
      </div>
    </div>
  );
}
