import { useState } from "react";
import BuildingPalette from "@/components/BuildingPalette";
import HabitatCanvas from "@/components/HabitatCanvas";
import ResourcePanel from "@/components/ResourcePanel";
import SimulationControls from "@/components/SimulationControls";
import ModeToggle from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Save, Download, Upload, Info, Cable } from "lucide-react";
import type { Building, BuildingType, Pipe, DisasterType } from "@shared/schema";

export default function Home() {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [pipes, setPipes] = useState<Pipe[]>([]);
  const [selectedBuildingType, setSelectedBuildingType] = useState<BuildingType | null>(null);
  const [isSimulationMode, setIsSimulationMode] = useState(false);
  const [isSimulating, setIsSimulating] = useState(false);
  const [buildingZoneRadius, setBuildingZoneRadius] = useState(300);
  const [isConnectingMode, setIsConnectingMode] = useState(false);

  const gridSize = 60;

  const handleAddBuilding = (position: { x: number; y: number }) => {
    if (!selectedBuildingType) return;

    const newBuilding: Building = {
      id: `building-${Date.now()}`,
      type: selectedBuildingType,
      position,
      health: 100,
      isConnected: false,
      isDamaged: false,
    };

    setBuildings([...buildings, newBuilding]);
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const distance = Math.sqrt(
      Math.pow(position.x - centerX, 2) + Math.pow(position.y - centerY, 2)
    );
    
    if (distance + 100 > buildingZoneRadius) {
      setBuildingZoneRadius(distance + 150);
    }
    
    setSelectedBuildingType(null);
  };

  const handleMoveBuilding = (id: string, position: { x: number; y: number }) => {
    setBuildings(buildings.map((b) => (b.id === id ? { ...b, position } : b)));
  };

  const handleDeleteBuilding = (id: string) => {
    setBuildings(buildings.filter((b) => b.id !== id));
    setPipes(pipes.filter((p) => p.from !== id && p.to !== id));
  };

  const handleConnectBuildings = (from: string, to: string) => {
    const existingPipe = pipes.find(
      (p) => (p.from === from && p.to === to) || (p.from === to && p.to === from)
    );

    if (!existingPipe) {
      const newPipe: Pipe = {
        id: `pipe-${Date.now()}`,
        from,
        to,
        isDamaged: false,
      };
      setPipes([...pipes, newPipe]);
      
      setBuildings(
        buildings.map((b) =>
          b.id === from || b.id === to ? { ...b, isConnected: true } : b
        )
      );
    }
  };

  const handleTriggerDisaster = (type: DisasterType, intensity: number) => {
    const affectedCount = Math.floor((buildings.length * intensity) / 100);
    const shuffled = [...buildings].sort(() => Math.random() - 0.5);
    const affected = shuffled.slice(0, Math.max(1, affectedCount));

    setBuildings(
      buildings.map((b) => {
        if (affected.find((a) => a.id === b.id)) {
          const damage = Math.random() * intensity;
          return {
            ...b,
            health: Math.max(0, b.health - damage),
            isDamaged: damage > 30,
          };
        }
        return b;
      })
    );

    const affectedPipeCount = Math.floor((pipes.length * intensity) / 150);
    const shuffledPipes = [...pipes].sort(() => Math.random() - 0.5);
    const affectedPipes = shuffledPipes.slice(0, Math.max(1, affectedPipeCount));

    setPipes(
      pipes.map((p) => {
        if (affectedPipes.find((a) => a.id === p.id)) {
          return { ...p, isDamaged: Math.random() > 0.5 };
        }
        return p;
      })
    );
  };

  const handleReset = () => {
    setIsSimulating(false);
    setBuildings(
      buildings.map((b) => ({
        ...b,
        health: 100,
        isDamaged: false,
      }))
    );
    setPipes(
      pipes.map((p) => ({
        ...p,
        isDamaged: false,
      }))
    );
  };

  const connectedBuildings = buildings.filter((b) => b.isConnected).length;
  
  const stats = {
    water: Math.min(100, (buildings.filter((b) => b.type === "water_drill").length / Math.max(1, buildings.length)) * 200),
    food: Math.min(100, (buildings.filter((b) => b.type === "food_station").length / Math.max(1, buildings.length)) * 200),
    waste: Math.min(100, (buildings.filter((b) => b.type === "waste_management").length / Math.max(1, buildings.length)) * 150),
    energy: Math.min(100, (buildings.filter((b) => b.type === "energy_generator").length / Math.max(1, buildings.length)) * 180),
  };

  return (
    <div className="flex h-screen bg-background">
      <div className="w-72 flex-shrink-0">
        <BuildingPalette
          onBuildingSelect={setSelectedBuildingType}
          selectedBuilding={selectedBuildingType}
        />
      </div>

      <div className="flex-1 flex flex-col">
        <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold text-foreground">Space Habitat Planner</h1>
            <ModeToggle
              isSimulationMode={isSimulationMode}
              onToggle={() => {
                setIsSimulationMode(!isSimulationMode);
                setIsConnectingMode(false);
                if (!isSimulationMode) {
                  setSelectedBuildingType(null);
                }
              }}
            />
          </div>
          
          <div className="flex items-center gap-2">
            {!isSimulationMode && (
              <Button 
                variant={isConnectingMode ? "default" : "outline"} 
                size="sm" 
                onClick={() => {
                  setIsConnectingMode(!isConnectingMode);
                  setSelectedBuildingType(null);
                }}
                data-testid="button-connect-pipes"
              >
                <Cable className="w-4 h-4 mr-2" />
                {isConnectingMode ? "Connecting..." : "Connect Pipes"}
              </Button>
            )}
            <Button variant="outline" size="sm" data-testid="button-save">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm" data-testid="button-export">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm" data-testid="button-import">
              <Upload className="w-4 h-4 mr-2" />
              Import
            </Button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden">
          <HabitatCanvas
            buildings={buildings}
            pipes={pipes}
            selectedBuildingType={selectedBuildingType}
            onAddBuilding={handleAddBuilding}
            onMoveBuilding={handleMoveBuilding}
            onDeleteBuilding={handleDeleteBuilding}
            onConnectBuildings={handleConnectBuildings}
            gridSize={gridSize}
            isSimulationMode={isSimulationMode}
            isConnectingMode={isConnectingMode}
          />
        </div>

        {!isSimulationMode && selectedBuildingType && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg px-4 py-2 shadow-lg">
            <p className="text-sm text-foreground flex items-center gap-2">
              <Info className="w-4 h-4 text-primary" />
              Click on the canvas to place your {selectedBuildingType.replace('_', ' ')}
            </p>
          </div>
        )}
        
        {!isSimulationMode && isConnectingMode && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card border border-border rounded-lg px-4 py-2 shadow-lg">
            <p className="text-sm text-foreground flex items-center gap-2">
              <Cable className="w-4 h-4 text-primary" />
              Click on two buildings to connect them with a pipe
            </p>
          </div>
        )}
      </div>

      <div className="w-80 flex-shrink-0 flex flex-col">
        <div className="flex-1 overflow-hidden">
          <ResourcePanel
            stats={stats}
            connectedBuildings={connectedBuildings}
            totalBuildings={buildings.length}
          />
        </div>
        
        {isSimulationMode && (
          <div className="p-4 border-t border-sidebar-border bg-sidebar">
            <SimulationControls
              isSimulating={isSimulating}
              onToggleSimulation={() => setIsSimulating(!isSimulating)}
              onReset={handleReset}
              onTriggerDisaster={handleTriggerDisaster}
            />
          </div>
        )}
      </div>
    </div>
  );
}
