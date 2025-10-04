import HabitatCanvas from '../HabitatCanvas';
import { useState } from 'react';
import type { Building, Pipe, BuildingType } from '@shared/schema';

export default function HabitatCanvasExample() {
  const [buildings, setBuildings] = useState<Building[]>([
    {
      id: '1',
      type: 'water_drill',
      position: { x: 100, y: 100 },
      health: 100,
      isConnected: true,
      isDamaged: false,
    },
    {
      id: '2',
      type: 'house',
      position: { x: 250, y: 150 },
      health: 85,
      isConnected: true,
      isDamaged: false,
    },
  ]);
  
  const [pipes, setPipes] = useState<Pipe[]>([
    {
      id: 'p1',
      from: '1',
      to: '2',
      isDamaged: false,
    },
  ]);
  
  const [selectedType, setSelectedType] = useState<BuildingType | null>('house');

  return (
    <div className="h-screen bg-background">
      <div className="p-4 border-b border-border flex gap-2">
        <button 
          className="px-3 py-1 bg-primary text-primary-foreground rounded"
          onClick={() => setSelectedType('house')}
        >
          Select House
        </button>
        <button 
          className="px-3 py-1 bg-secondary text-secondary-foreground rounded"
          onClick={() => setSelectedType(null)}
        >
          Clear Selection
        </button>
      </div>
      <div className="h-[calc(100vh-60px)]">
        <HabitatCanvas
          buildings={buildings}
          pipes={pipes}
          selectedBuildingType={selectedType}
          gridSize={60}
          isSimulationMode={false}
          isConnectingMode={false}
          onAddBuilding={(pos) => {
            if (!selectedType) return;
            const newBuilding: Building = {
              id: Date.now().toString(),
              type: selectedType,
              position: pos,
              health: 100,
              isConnected: false,
              isDamaged: false,
            };
            setBuildings([...buildings, newBuilding]);
            console.log('Added building:', newBuilding);
          }}
          onMoveBuilding={(id, pos) => {
            setBuildings(buildings.map(b => 
              b.id === id ? { ...b, position: pos } : b
            ));
          }}
          onDeleteBuilding={(id) => {
            setBuildings(buildings.filter(b => b.id !== id));
            setPipes(pipes.filter(p => p.from !== id && p.to !== id));
          }}
          onConnectBuildings={(from, to) => {
            const newPipe: Pipe = {
              id: `p${Date.now()}`,
              from,
              to,
              isDamaged: false,
            };
            setPipes([...pipes, newPipe]);
            console.log('Connected buildings:', from, to);
          }}
        />
      </div>
    </div>
  );
}
