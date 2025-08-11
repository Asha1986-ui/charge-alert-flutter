import { Badge } from '@/components/ui/badge';
import { Play, AlertTriangle, Square, Zap } from 'lucide-react';

interface StatusIndicatorProps {
  isMonitoring: boolean;
  targetReached: boolean;
  charging?: boolean;
}

export const StatusIndicator = ({ 
  isMonitoring, 
  targetReached, 
  charging = false 
}: StatusIndicatorProps) => {
  if (targetReached) {
    return (
      <Badge 
        variant="destructive" 
        className="flex items-center gap-2 px-4 py-2 text-lg bg-battery-critical/20 border border-battery-critical/30 text-battery-critical animate-pulse-glow"
      >
        <AlertTriangle className="w-5 h-5 animate-bounce" />
        Alarm Triggered
      </Badge>
    );
  }

  if (isMonitoring) {
    return (
      <Badge 
        variant="secondary" 
        className="flex items-center gap-2 px-4 py-2 text-lg bg-battery-full/20 border border-battery-full/30 text-battery-full"
      >
        <div className="w-3 h-3 rounded-full bg-battery-full animate-pulse" />
        Monitoring
      </Badge>
    );
  }

  return (
    <Badge 
      variant="outline" 
      className="flex items-center gap-2 px-4 py-2 text-lg bg-muted/20 border border-muted/30 text-muted-foreground"
    >
      <Square className="w-4 h-4" />
      Stopped
    </Badge>
  );
};