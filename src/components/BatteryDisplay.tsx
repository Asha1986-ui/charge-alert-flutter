import { CircularBatteryProgress } from './CircularBatteryProgress';
import { AlertTriangle } from 'lucide-react';

interface BatteryDisplayProps {
  level: number;
  charging: boolean;
  supported: boolean;
}

export const BatteryDisplay = ({ level, charging, supported }: BatteryDisplayProps) => {
  if (!supported) {
    return (
      <div className="bg-card/80 backdrop-blur-glass border border-white/10 rounded-2xl p-8 text-center shadow-glass">
        <AlertTriangle className="w-12 h-12 mx-auto mb-4 text-battery-medium animate-bounce" />
        <h2 className="text-xl font-semibold text-foreground mb-2">Battery API Not Supported</h2>
        <p className="text-muted-foreground mb-6">
          Your browser doesn't support the Battery API. Using demo data for preview.
        </p>
        <CircularBatteryProgress level={level} charging={charging} size={180} />
      </div>
    );
  }

  return (
    <div className="bg-card/80 backdrop-blur-glass border border-white/10 rounded-2xl p-8 text-center shadow-glass animate-float">
      <CircularBatteryProgress level={level} charging={charging} size={220} />
    </div>
  );
};