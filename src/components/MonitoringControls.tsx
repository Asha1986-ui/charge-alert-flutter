import { Button } from '@/components/ui/button';
import { Play, Square, Volume2 } from 'lucide-react';

interface MonitoringControlsProps {
  isMonitoring: boolean;
  onStart: () => void;
  onStop: () => void;
  targetReached: boolean;
}

export const MonitoringControls = ({ 
  isMonitoring, 
  onStart, 
  onStop, 
  targetReached 
}: MonitoringControlsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Button
          onClick={onStart}
          disabled={isMonitoring}
          className="flex-1"
          size="lg"
        >
          <Play className="w-5 h-5 mr-2" />
          Start Monitoring
        </Button>
        
        <Button
          onClick={onStop}
          disabled={!isMonitoring}
          variant="secondary"
          className="flex-1"
          size="lg"
        >
          <Square className="w-5 h-5 mr-2" />
          Stop
        </Button>
      </div>

      {targetReached && (
        <div className="flex items-center justify-center gap-2 p-4 bg-primary/10 border border-primary/20 rounded-xl">
          <Volume2 className="w-5 h-5 text-primary animate-pulse" />
          <span className="text-primary font-medium">Target Reached - Alarm Playing!</span>
        </div>
      )}
      
      {isMonitoring && (
        <div className="flex items-center justify-center gap-2 p-3 bg-secondary/50 rounded-xl">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
          <span className="text-sm text-foreground">Monitoring active...</span>
        </div>
      )}
    </div>
  );
};