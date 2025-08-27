import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft } from "lucide-react";
import React from "react";
import PaymentMethodTabs from "../PaymentMethodTabs";

const PaymentStep = ({
  toInformation,
  toShipping,
  shipping,
}: {
  toInformation: () => void;
  toShipping: () => void;
  shipping: number;
}) => {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border p-4 space-y-4">
        <div className="flex justify-between">
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
            onClick={toInformation}
          >
            Change
          </Button>
        </div>
        <Separator />
        <div className="flex justify-between">
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
            onClick={toInformation}
          >
            Change
          </Button>
        </div>
        <Separator />
        <div className="flex justify-between">
          <div>
            <h3 className="font-medium">Method</h3>
            <p className="text-sm text-muted-foreground">
              Standard Shipping ·{" "}
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </p>
          </div>
          <Button
            variant="link"
            size="sm"
            className="h-auto p-0"
            onClick={toShipping}
          >
            Change
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium">Payment Method</h2>
        <PaymentMethodTabs />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium">Billing Address</h2>
        <div className="flex items-center space-x-2">
          <Checkbox id="sameAsShipping" defaultChecked />
          <Label htmlFor="sameAsShipping">Same as shipping address</Label>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" className="gap-2" onClick={toShipping}>
          <ChevronLeft className="h-4 w-4" />
          Return to shipping
        </Button>
        <Button>Complete Order</Button>
      </div>
    </div>
  );
};

export default PaymentStep;
