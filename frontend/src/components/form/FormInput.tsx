// components/form/FormInput.tsx
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FormInputProps {
  label: string;
  error?: string;
  required?: boolean;
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  isLoading?: boolean;
  isPending?: boolean;
}

export const FormInput = ({
  label,
  error,
  required = false,
  id,
  value,
  onChange,
  placeholder,
  isLoading,
  isPending,
}: FormInputProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={isLoading || isPending}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
};
