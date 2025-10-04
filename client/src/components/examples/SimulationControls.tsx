import SimulationControls from '../SimulationControls';
import { useState } from 'react';

export default function SimulationControlsExample() {
  const [isSimulating, setIsSimulating] = useState(false);
  
  return (
    <div className="p-8 bg-background">
      <SimulationControls
        isSimulating={isSimulating}
        onToggleSimulation={() => {
          setIsSimulating(!isSimulating);
          console.log('Simulation toggled:', !isSimulating);
        }}
        onReset={() => {
          setIsSimulating(false);
          console.log('Simulation reset');
        }}
        onTriggerDisaster={(type, intensity) => {
          console.log('Disaster triggered:', type, 'Intensity:', intensity);
        }}
      />
    </div>
  );
}
