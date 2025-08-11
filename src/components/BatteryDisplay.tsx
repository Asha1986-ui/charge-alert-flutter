import { Battery, Zap, BatteryLow } from 'lucide-react';

interface BatteryDisplayProps {
  level: number;
  charging: boolean;
  supported: boolean;
}

const getBatteryColor = (level: number) => {
  if (level >= 50) return 'text-battery-full';
  if (level >= 20) return 'text-battery-medium';
  if (level >= 10) return 'text-battery-low';
  return 'text-battery-critical';
};

const getBatteryIcon = (level: number, charging: boolean) => {
  if (charging) return Zap;
  if (level < 20) return BatteryLow;
  return Battery;
};

export const BatteryDisplay = ({ level, charging, supported }: BatteryDisplayProps) => {
  const colorClass = getBatteryColor(level);
  const IconComponent = getBatteryIcon(level, charging);

  return (
    <div className="relative">
      <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 text-center">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-background/50 mb-4 ${colorClass}`}>
          <IconComponent className="w-10 h-10" />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-4xl font-bold text-foreground">{level}%</h2>
          <p className="text-muted-foreground">
            {charging ? '⚡ Charging' : '🔋 On Battery'}
          </p>
          {!supported && (
            <p className="text-xs text-muted-foreground/60">
              Demo Mode - Battery API not supported
            </p>
          )}
        </div>

        {/* Battery level indicator */}
        <div className="mt-6 w-full bg-secondary/30 rounded-full h-3 overflow-hidden">
          <div 
            className={`h-full transition-all duration-500 rounded-full ${
              level >= 50 ? 'bg-battery-full' : 
              level >= 20 ? 'bg-battery-medium' : 
              level >= 10 ? 'bg-battery-low' : 'bg-battery-critical'
            }`}
            style={{ width: `${level}%` }}
          />
        </div>
      </div>
    </div>
  );
};