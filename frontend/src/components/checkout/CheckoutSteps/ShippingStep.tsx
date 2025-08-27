import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import React from "react";
import ShippingMethodSelector from "../ShippingMethodSelector";

const ShippingStep = ({
  shipping,
  onPrev,
  onNext,
}: {
  shipping: number;
  onPrev: () => void;
  onNext: () => void;
}) => {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4">
        <div className="flex justify-between mb-4">
          <div>
            <h3 className="font-medium">Contact</h3>
            <p className="text-sm text-muted-foreground">
              john.doe@example.com
            </p>
          </div>
          <Button
            variant="link"
            size="sm"
            className="h-auto p-0"
            onClick={onPrev}
          >
            Change
          </Button>
        </div>
        <Separator />
        <div className="flex justify-between mt-4">
          <div>
            <h3 className="font-medium">Ship to</h3>
            <p className="text-sm text-muted-foreground">
              123 Main St, Apt 4B, New York, NY 10001, United States
            </p>
          </div>
          <Button
            variant="link"
            size="sm"
            className="h-auto p-0"
            onClick={onPrev}
          >
            Change
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium">Shipping Method</h2>
        <ShippingMethodSelector shipping={shipping} />
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" className="gap-2" onClick={onPrev}>
          <ChevronLeft className="h-4 w-4" />
          Return to information
        </Button>
        <Button onClick={onNext}>Continue to Payment</Button>
      </div>
    </div>
  );
};

export default ShippingStep;
