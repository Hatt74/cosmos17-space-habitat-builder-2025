import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, RotateCcw, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { DisasterType } from "@shared/schema";

interface SimulationControlsProps {
  isSimulating: boolean;
  onToggleSimulation: () => void;
  onReset: () => void;
  onTriggerDisaster: (type: DisasterType, intensity: number) => void;
}

const disasters: { value: DisasterType; label: string; description: string }[] = [
  { value: "dust_storm", label: "Dust Storm", description: "Damages exposed structures" },
  { value: "freezing_temperature", label: "Freezing Temp", description: "Affects habitat modules" },
  { value: "radiation_event", label: "Radiation Event", description: "Damages comm towers" },
];

export default function SimulationControls({
  isSimulating,
  onToggleSimulation,
  onReset,
  onTriggerDisaster,
}: SimulationControlsProps) {
  const [selectedDisaster, setSelectedDisaster] = useState<DisasterType>("dust_storm");
  const [intensity, setIntensity] = useState([50]);

  const handleTriggerDisaster = () => {
    onTriggerDisaster(selectedDisaster, intensity[0]);
  };

  return (
    <Card className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-card-foreground flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          Simulation Controls
        </h3>
        <Badge variant={isSimulating ? "default" : "secondary"}>
          {isSimulating ? "Active" : "Paused"}
        </Badge>
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant={isSimulating ? "secondary" : "default"}
          onClick={onToggleSimulation}
          className="flex-1"
          data-testid="button-toggle-simulation"
        >
          {isSimulating ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Start
            </>
          )}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={onReset}
          data-testid="button-reset-simulation"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      <div className="pt-4 border-t border-border space-y-4">
        <div>
          <label className="text-xs font-medium text-foreground mb-2 block">
            Disaster Type
          </label>
          <Select
            value={selectedDisaster}
            onValueChange={(value) => setSelectedDisaster(value as DisasterType)}
          >
            <SelectTrigger data-testid="select-disaster-type">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {disasters.map((disaster) => (
                <SelectItem key={disaster.value} value={disaster.value}>
                  <div>
                    <div className="font-medium">{disaster.label}</div>
                    <div className="text-xs text-muted-foreground">{disaster.description}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-medium text-foreground">Intensity</label>
            <span className="text-xs font-mono text-muted-foreground">{intensity[0]}%</span>
          </div>
          <Slider
            value={intensity}
            onValueChange={setIntensity}
            min={0}
            max={100}
            step={10}
            data-testid="slider-disaster-intensity"
          />
        </div>

        <Button
          size="sm"
          variant="destructive"
          onClick={handleTriggerDisaster}
          className="w-full"
          disabled={!isSimulating}
          data-testid="button-trigger-disaster"
        >
          Trigger Disaster
        </Button>
      </div>

      <div className="pt-4 border-t border-border">
        <h4 className="text-xs font-semibold text-foreground mb-2">Event Log</h4>
        <div className="space-y-1 max-h-32 overflow-y-auto">
          <p className="text-xs text-muted-foreground">No events yet...</p>
        </div>
      </div>
    </Card>
  );
}
