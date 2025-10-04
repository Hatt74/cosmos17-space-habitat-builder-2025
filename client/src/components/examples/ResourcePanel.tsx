import ResourcePanel from '../ResourcePanel';

export default function ResourcePanelExample() {
  return (
    <div className="h-screen">
      <ResourcePanel 
        stats={{
          water: 85,
          food: 65,
          waste: 45,
          energy: 92,
        }}
        connectedBuildings={7}
        totalBuildings={10}
      />
    </div>
  );
}
