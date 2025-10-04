import { Button } from "@/components/ui/button";
import { Wrench, Zap } from "lucide-react";

interface ModeToggleProps {
  isSimulationMode: boolean;
  onToggle: () => void;
}

export default function ModeToggle({ isSimulationMode, onToggle }: ModeToggleProps) {
  return (
    <div className="inline-flex rounded-md border border-border bg-background p-1">
      <Button
        variant={!isSimulationMode ? "default" : "ghost"}
        size="sm"
        onClick={() => !isSimulationMode || onToggle()}
        className="gap-2"
        data-testid="button-design-mode"
      >
        <Wrench className="w-4 h-4" />
        Design Mode
      </Button>
      <Button
        variant={isSimulationMode ? "default" : "ghost"}
        size="sm"
        onClick={() => isSimulationMode || onToggle()}
        className="gap-2"
        data-testid="button-simulation-mode"
      >
        <Zap className="w-4 h-4" />
        Simulation Mode
      </Button>
    </div>
  );
}
