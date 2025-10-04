import BuildingPalette from '../BuildingPalette';
import { useState } from 'react';
import type { BuildingType } from '@shared/schema';

export default function BuildingPaletteExample() {
  const [selected, setSelected] = useState<BuildingType | null>(null);
  
  return (
    <div className="h-screen">
      <BuildingPalette 
        onBuildingSelect={(type) => {
          setSelected(type);
          console.log('Selected building:', type);
        }}
        selectedBuilding={selected}
      />
    </div>
  );
}
