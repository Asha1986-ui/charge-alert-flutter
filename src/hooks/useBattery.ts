import { useState, useEffect } from 'react';

interface BatteryStatus {
  level: number;
  charging: boolean;
  chargingTime: number | null;
  dischargingTime: number | null;
  supported: boolean;
}

export const useBattery = () => {
  const [battery, setBattery] = useState<BatteryStatus>({
    level: 0,
    charging: false,
    chargingTime: null,
    dischargingTime: null,
    supported: false,
  });

  useEffect(() => {
    let batteryRef: any = null;

    const updateBatteryInfo = (batteryObj: any) => {
      setBattery({
        level: Math.round(batteryObj.level * 100),
        charging: batteryObj.charging,
        chargingTime: batteryObj.chargingTime,
        dischargingTime: batteryObj.dischargingTime,
        supported: true,
      });
    };

    const initBattery = async () => {
      if ('getBattery' in navigator) {
        try {
          const batteryObj = await (navigator as any).getBattery();
          batteryRef = batteryObj;
          updateBatteryInfo(batteryObj);

          // Add event listeners
          batteryObj.addEventListener('chargingchange', () => updateBatteryInfo(batteryObj));
          batteryObj.addEventListener('levelchange', () => updateBatteryInfo(batteryObj));
          batteryObj.addEventListener('chargingtimechange', () => updateBatteryInfo(batteryObj));
          batteryObj.addEventListener('dischargingtimechange', () => updateBatteryInfo(batteryObj));
        } catch (error) {
          console.warn('Battery API not supported:', error);
          // Fallback for demo purposes
          setBattery({
            level: 75,
            charging: false,
            chargingTime: null,
            dischargingTime: null,
            supported: false,
          });
        }
      } else {
        // Fallback for demo purposes
        console.warn('Battery API not supported');
        setBattery({
          level: 75,
          charging: false,
          chargingTime: null,
          dischargingTime: null,
          supported: false,
        });
      }
    };

    initBattery();

    return () => {
      if (batteryRef) {
        batteryRef.removeEventListener('chargingchange', updateBatteryInfo);
        batteryRef.removeEventListener('levelchange', updateBatteryInfo);
        batteryRef.removeEventListener('chargingtimechange', updateBatteryInfo);
        batteryRef.removeEventListener('dischargingtimechange', updateBatteryInfo);
      }
    };
  }, []);

  return battery;
};