import { useState } from 'react';
import { Slider } from '@/components/ui/slider';

interface ModernTargetSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const ModernTargetSlider = ({ value, onChange }: ModernTargetSliderProps) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleValueChange = (values: number[]) => {
    onChange(values[0]);
  };

  const getTargetColor = (percentage: number) => {
    if (percentage >= 80) return 'battery-full';
    if (percentage >= 40) return 'battery-medium';
    return 'battery-low';
  };

  const colorClass = getTargetColor(value);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <label className="text-sm font-medium text-muted-foreground">Target Battery Level</label>
      </div>
      
      {/* Value Display */}
      <div className="relative flex justify-center">
        <div 
          className={`px-6 py-3 rounded-2xl bg-${colorClass}/10 border border-${colorClass}/20 backdrop-blur-sm transition-all duration-300 ${
            isDragging ? 'scale-110 shadow-lg shadow-' + colorClass + '/20' : ''
          }`}
        >
          <span className={`text-3xl font-bold text-${colorClass}`}>
            {value}%
          </span>
        </div>
      </div>

      {/* Modern Slider */}
      <div className="relative px-4">
        <Slider
          value={[value]}
          onValueChange={handleValueChange}
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          min={10}
          max={100}
          step={5}
          className="w-full"
        />
        
        {/* Range Labels */}
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>10%</span>
          <span>25%</span>
          <span>50%</span>
          <span>75%</span>
          <span>100%</span>
        </div>
      </div>

      {/* Quick Preset Buttons */}
      <div className="flex justify-center gap-2">
        {[50, 80, 90, 100].map((preset) => (
          <button
            key={preset}
            onClick={() => onChange(preset)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              value === preset
                ? `bg-${getTargetColor(preset)}/20 text-${getTargetColor(preset)} border border-${getTargetColor(preset)}/30`
                : 'bg-muted/50 text-muted-foreground hover:bg-muted border border-transparent'
            }`}
          >
            {preset}%
          </button>
        ))}
      </div>
    </div>
  );
};