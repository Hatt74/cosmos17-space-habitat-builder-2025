import { useRef, useState } from "react";
import { Home, Utensils, Droplet, Trash2, Radio, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Building, BuildingType, Pipe } from "@shared/schema";

interface HabitatCanvasProps {
  buildings: Building[];
  pipes: Pipe[];
  selectedBuildingType: BuildingType | null;
  onAddBuilding: (position: { x: number; y: number }) => void;
  onMoveBuilding: (id: string, position: { x: number; y: number }) => void;
  onDeleteBuilding: (id: string) => void;
  onConnectBuildings: (from: string, to: string) => void;
  gridSize: number;
  isSimulationMode: boolean;
}

const buildingIcons: Record<BuildingType, React.ElementType> = {
  house: Home,
  food_station: Utensils,
  water_drill: Droplet,
  waste_management: Trash2,
  communication_tower: Radio,
};

const buildingColors: Record<BuildingType, string> = {
  house: "bg-slate-600",
  food_station: "bg-green-700",
  water_drill: "bg-cyan-600",
  waste_management: "bg-amber-700",
  communication_tower: "bg-purple-600",
};

export default function HabitatCanvas({
  buildings,
  pipes,
  selectedBuildingType,
  onAddBuilding,
  onMoveBuilding,
  onDeleteBuilding,
  onConnectBuildings,
  gridSize,
  isSimulationMode,
}: HabitatCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [draggingBuilding, setDraggingBuilding] = useState<string | null>(null);
  const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isSimulationMode || !selectedBuildingType) return;
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = Math.floor((e.clientX - rect.left) / gridSize) * gridSize;
    const y = Math.floor((e.clientY - rect.top) / gridSize) * gridSize;

    onAddBuilding({ x, y });
  };

  const handleBuildingMouseDown = (e: React.MouseEvent, buildingId: string) => {
    e.stopPropagation();
    if (!isSimulationMode) {
      setDraggingBuilding(buildingId);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!draggingBuilding || isSimulationMode) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = Math.floor((e.clientX - rect.left) / gridSize) * gridSize;
    const y = Math.floor((e.clientY - rect.top) / gridSize) * gridSize;

    onMoveBuilding(draggingBuilding, { x, y });
  };

  const handleMouseUp = () => {
    setDraggingBuilding(null);
  };

  const handleBuildingClick = (e: React.MouseEvent, buildingId: string) => {
    e.stopPropagation();
    
    if (connectingFrom === null) {
      setConnectingFrom(buildingId);
    } else if (connectingFrom !== buildingId) {
      onConnectBuildings(connectingFrom, buildingId);
      setConnectingFrom(null);
    } else {
      setConnectingFrom(null);
    }
  };

  const isConnected = (buildingId: string, otherBuildingId: string) => {
    return pipes.some(
      (pipe) =>
        (pipe.from === buildingId && pipe.to === otherBuildingId) ||
        (pipe.to === buildingId && pipe.from === otherBuildingId)
    );
  };

  return (
    <div
      ref={canvasRef}
      className="relative w-full h-full bg-background overflow-auto"
      onClick={handleCanvasClick}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      data-testid="canvas-habitat"
      style={{
        backgroundImage: `
          linear-gradient(rgba(195, 210, 220, 0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(195, 210, 220, 0.03) 1px, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
      }}
    >
      <svg className="absolute inset-0 pointer-events-none" style={{ width: '100%', height: '100%' }}>
        {pipes.map((pipe) => {
          const fromBuilding = buildings.find((b) => b.id === pipe.from);
          const toBuilding = buildings.find((b) => b.id === pipe.to);
          
          if (!fromBuilding || !toBuilding) return null;
          
          const x1 = fromBuilding.position.x + gridSize / 2;
          const y1 = fromBuilding.position.y + gridSize / 2;
          const x2 = toBuilding.position.x + gridSize / 2;
          const y2 = toBuilding.position.y + gridSize / 2;
          
          return (
            <line
              key={pipe.id}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={pipe.isDamaged ? "#ef4444" : "#06b6d4"}
              strokeWidth="2"
              strokeDasharray={pipe.isDamaged ? "5,5" : "10,5"}
              opacity={pipe.isDamaged ? 0.5 : 0.7}
            />
          );
        })}
        
        {connectingFrom && buildings.find((b) => b.id === connectingFrom) && (
          <circle
            cx={buildings.find((b) => b.id === connectingFrom)!.position.x + gridSize / 2}
            cy={buildings.find((b) => b.id === connectingFrom)!.position.y + gridSize / 2}
            r={gridSize / 2 + 8}
            fill="none"
            stroke="#06b6d4"
            strokeWidth="2"
            strokeDasharray="4,4"
            opacity="0.5"
          />
        )}
      </svg>

      {buildings.map((building) => {
        const Icon = buildingIcons[building.type];
        const isBeingDragged = draggingBuilding === building.id;
        const isConnecting = connectingFrom === building.id;
        const isHovered = hoveredBuilding === building.id;
        
        return (
          <div
            key={building.id}
            className={`absolute cursor-pointer transition-transform ${
              isBeingDragged ? "scale-110 z-50" : "z-10"
            }`}
            style={{
              left: building.position.x,
              top: building.position.y,
              width: gridSize,
              height: gridSize,
            }}
            onMouseDown={(e) => handleBuildingMouseDown(e, building.id)}
            onClick={(e) => handleBuildingClick(e, building.id)}
            onMouseEnter={() => setHoveredBuilding(building.id)}
            onMouseLeave={() => setHoveredBuilding(null)}
            data-testid={`building-${building.id}`}
          >
            <div
              className={`w-full h-full rounded-md ${buildingColors[building.type]} ${
                isConnecting ? "ring-4 ring-primary" : ""
              } ${isHovered ? "ring-2 ring-foreground/30" : ""} flex items-center justify-center relative overflow-visible`}
            >
              <Icon className="w-8 h-8 text-white" />
              
              {building.isDamaged && (
                <div className="absolute inset-0 bg-destructive/30 rounded-md">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-full h-0.5 bg-destructive rotate-45" />
                    <div className="w-full h-0.5 bg-destructive -rotate-45 absolute" />
                  </div>
                </div>
              )}
              
              <div
                className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${
                  building.health >= 70
                    ? "bg-green-500"
                    : building.health >= 40
                    ? "bg-amber-500"
                    : "bg-destructive"
                }`}
              />
              
              {isHovered && !isSimulationMode && (
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute -top-2 -left-2 w-6 h-6 opacity-0 hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteBuilding(building.id);
                  }}
                  data-testid={`button-delete-${building.id}`}
                >
                  <Trash className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
