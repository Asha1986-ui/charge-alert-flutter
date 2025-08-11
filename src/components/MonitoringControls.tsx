import { Button } from '@/components/ui/button';
import { Play, Square } from 'lucide-react';
import { StatusIndicator } from './StatusIndicator';

interface MonitoringControlsProps {
  isMonitoring: boolean;
  onStart: () => void;
  onStop: () => void;
  targetReached: boolean;
  charging?: boolean;
}

export const MonitoringControls = ({ 
  isMonitoring, 
  onStart, 
  onStop, 
  targetReached,
  charging = false
}: MonitoringControlsProps) => {
  return (
    <div className="space-y-6">
      {/* Status Indicator */}
      <div className="flex justify-center">
        <StatusIndicator 
          isMonitoring={isMonitoring} 
          targetReached={targetReached} 
          charging={charging}
        />
      </div>

      {/* Control Buttons - Mobile Optimized */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          onClick={onStart}
          disabled={isMonitoring}
          className="flex-1 h-14 text-lg font-semibold bg-battery-full hover:bg-battery-full/80 text-primary-foreground shadow-lg"
          size="lg"
        >
          <Play className="w-6 h-6 mr-3" />
          Start Monitoring
        </Button>
        
        <Button
          onClick={onStop}
          disabled={!isMonitoring}
          variant="outline"
          className="flex-1 h-14 text-lg font-semibold border-2 hover:bg-destructive hover:text-destructive-foreground hover:border-destructive shadow-lg"
          size="lg"
        >
          <Square className="w-6 h-6 mr-3" />
          Stop
        </Button>
      </div>
    </div>
  );
};