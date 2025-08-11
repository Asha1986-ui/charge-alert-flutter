import { useState, useEffect } from 'react';
import { useBattery } from '@/hooks/useBattery';
import { useAlarm } from '@/hooks/useAlarm';
import { BatteryDisplay } from './BatteryDisplay';
import { TargetSlider } from './TargetSlider';
import { MonitoringControls } from './MonitoringControls';
import { useToast } from '@/hooks/use-toast';

export const BatteryAlarm = () => {
  const [targetPercentage, setTargetPercentage] = useState(80);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [targetReached, setTargetReached] = useState(false);
  
  const battery = useBattery();
  const { playAlarm, stopAlarm } = useAlarm();
  const { toast } = useToast();

  useEffect(() => {
    if (isMonitoring && battery.charging && battery.level >= targetPercentage && !targetReached) {
      setTargetReached(true);
      playAlarm();
      toast({
        title: "🎯 Target Reached!",
        description: `Battery charged to ${battery.level}%`,
      });
    }

    // Stop alarm if charger is unplugged
    if (targetReached && !battery.charging) {
      setTargetReached(false);
      stopAlarm();
      toast({
        title: "🔌 Charger Unplugged",
        description: "Alarm stopped automatically",
      });
    }
  }, [battery.level, battery.charging, targetPercentage, isMonitoring, targetReached, playAlarm, stopAlarm, toast]);

  const handleStart = () => {
    if (!battery.charging) {
      toast({
        title: "⚠️ Not Charging",
        description: "Please plug in your charger to start monitoring",
        variant: "destructive",
      });
      return;
    }

    if (battery.level >= targetPercentage) {
      toast({
        title: "✅ Already at Target",
        description: `Current level (${battery.level}%) is already at or above target (${targetPercentage}%)`,
      });
      return;
    }

    setIsMonitoring(true);
    setTargetReached(false);
    toast({
      title: "🎯 Monitoring Started",
      description: `Will alert when battery reaches ${targetPercentage}%`,
    });
  };

  const handleStop = () => {
    setIsMonitoring(false);
    setTargetReached(false);
    stopAlarm();
    toast({
      title: "⏹️ Monitoring Stopped",
      description: "Battery monitoring has been disabled",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center pt-8 pb-4">
          <h1 className="text-3xl font-bold text-foreground mb-2">Battery Alarm</h1>
          <p className="text-muted-foreground">Monitor your battery charging progress</p>
        </div>

        {/* Battery Display */}
        <BatteryDisplay 
          level={battery.level}
          charging={battery.charging}
          supported={battery.supported}
        />

        {/* Target Slider */}
        <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <TargetSlider
            value={targetPercentage}
            onChange={setTargetPercentage}
          />
        </div>

        {/* Monitoring Controls */}
        <div className="bg-card/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
          <MonitoringControls
            isMonitoring={isMonitoring}
            onStart={handleStart}
            onStop={handleStop}
            targetReached={targetReached}
          />
        </div>
      </div>
    </div>
  );
};