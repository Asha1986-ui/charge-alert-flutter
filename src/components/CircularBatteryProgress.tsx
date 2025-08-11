import { useEffect, useState } from 'react';
import { Battery, BatteryLow, Zap } from 'lucide-react';

interface CircularBatteryProgressProps {
  level: number;
  charging: boolean;
  size?: number;
}

export const CircularBatteryProgress = ({ 
  level, 
  charging, 
  size = 200 
}: CircularBatteryProgressProps) => {
  const [displayLevel, setDisplayLevel] = useState(0);
  
  // Smooth animation of level changes
  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayLevel(level);
    }, 100);
    return () => clearTimeout(timer);
  }, [level]);

  const getBatteryColor = (percentage: number) => {
    if (percentage >= 80) return 'battery-full';
    if (percentage >= 40) return 'battery-medium';
    if (percentage >= 20) return 'battery-low';
    return 'battery-critical';
  };

  const circumference = 2 * Math.PI * 80; // radius = 80
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (displayLevel / 100) * circumference;

  const colorClass = getBatteryColor(displayLevel);

  return (
    <div className="relative flex items-center justify-center">
      {/* Outer glow effect */}
      <div 
        className={`absolute rounded-full animate-pulse-glow bg-${colorClass}/20 blur-xl`}
        style={{ width: size + 40, height: size + 40 }}
      />
      
      {/* Main progress circle */}
      <div className="relative" style={{ width: size, height: size }}>
        <svg 
          className="transform -rotate-90" 
          width={size} 
          height={size}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={80}
            stroke="hsl(var(--muted))"
            strokeWidth="12"
            fill="none"
            opacity="0.2"
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={80}
            stroke={`hsl(var(--${colorClass}))`}
            strokeWidth="12"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            style={{
              transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1), stroke 0.3s ease',
            }}
            className={charging ? 'animate-pulse-glow' : ''}
          />
        </svg>
        
        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex items-center gap-2 mb-2">
            {charging ? (
              <Zap className="w-8 h-8 text-primary animate-pulse" />
            ) : displayLevel <= 20 ? (
              <BatteryLow className="w-8 h-8 text-battery-critical animate-bounce" />
            ) : (
              <Battery className="w-8 h-8 text-muted-foreground" />
            )}
          </div>
          
          <div className="text-center">
            <span className={`text-4xl font-bold text-${colorClass}`}>
              {displayLevel}%
            </span>
            <div className="text-sm text-muted-foreground mt-1">
              {charging ? 'Charging' : 'Battery'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};