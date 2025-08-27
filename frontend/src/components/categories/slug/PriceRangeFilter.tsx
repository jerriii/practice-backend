import { Input } from "@/components/ui/input";

interface PriceRangeFilterProps {
    min?: string;
    max?: string;
    onMinChange: (value: string) => void;
    onMaxChange: (value: string) => void;
}

const PriceRangeFilter = ({min,
    max,
    onMinChange,
    onMaxChange}: PriceRangeFilterProps) => {
    return (
        <div>
      <h4 className="font-medium mb-2">Price Range</h4>
      <div className="flex items-center space-x-2">
        <Input
          type="number"
          placeholder="Min"
          className="h-9 text-xs"
          value={min?.toString() ?? ''}
          onChange={(e) => {
            const value = e.target.value;
            onMinChange(value);
          }}
        />
        <span className="text-muted-foreground">to</span>
        <Input
          type="number"
          placeholder="Max"
          className="h-9 text-xs"
          value={max?.toString() ?? ''}
          onChange={(e) => {
            const value = e.target.value;
            onMaxChange(value);
          }}
        />
      </div>
    </div>
    )
}

export default PriceRangeFilter;
