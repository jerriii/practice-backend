// components/form/FormSwitch.tsx
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface FormSwitchProps {
  label: string;
  description?: string;
  id: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export const FormSwitch = ({
  label,
  description,
  id,
  checked,
  onCheckedChange,
}: FormSwitchProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
      <div className="space-y-1">
        <Label htmlFor={id}>{label}</Label>
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
      </div>
    </div>
  );
};
