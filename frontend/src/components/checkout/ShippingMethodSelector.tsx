import React from "react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

const ShippingMethodSelector = ({ shipping }: { shipping: number }) => {
  return (
    <RadioGroup defaultValue="standard" className="space-y-3">
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="standard" id="standard" />
          <Label htmlFor="standard" className="font-medium">
            Standard Shipping
          </Label>
        </div>
        <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
      </div>
      <div className="flex items-center justify-between rounded-lg border p-4">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="express" id="express" />
          <Label htmlFor="express" className="font-medium">
            Express Shipping
          </Label>
        </div>
        <span>$15.00</span>
      </div>
    </RadioGroup>
  );
};

export default ShippingMethodSelector;
