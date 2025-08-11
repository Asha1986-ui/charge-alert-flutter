import { Slider } from '@/components/ui/slider';

interface TargetSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const TargetSlider = ({ value, onChange }: TargetSliderProps) => {
  const handleValueChange = (values: number[]) => {
    onChange(values[0]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Target Percentage</h3>
        <span className="text-2xl font-bold text-primary">{value}%</span>
      </div>
      
      <div className="px-4">
        <Slider
          value={[value]}
          onValueChange={handleValueChange}
          max={100}
          min={10}
          step={5}
          className="w-full"
        />
      </div>
      
      <div className="flex justify-between text-sm text-muted-foreground px-4">
        <span>10%</span>
        <span>100%</span>
      </div>
    </div>
  );
};