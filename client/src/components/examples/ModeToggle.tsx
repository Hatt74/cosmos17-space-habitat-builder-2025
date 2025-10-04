import ModeToggle from '../ModeToggle';
import { useState } from 'react';

export default function ModeToggleExample() {
  const [isSimulation, setIsSimulation] = useState(false);
  
  return (
    <div className="p-8 bg-background">
      <ModeToggle
        isSimulationMode={isSimulation}
        onToggle={() => {
          setIsSimulation(!isSimulation);
          console.log('Mode toggled to:', !isSimulation ? 'Simulation' : 'Design');
        }}
      />
    </div>
  );
}
