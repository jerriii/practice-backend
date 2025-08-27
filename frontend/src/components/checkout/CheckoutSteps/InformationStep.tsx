import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import ContactInfoForm from "../ContactInfoForm";
import ShippingAddressForm from "../ShippingAddressForm";

const InformationStep = ({
  onNext,
}: {
  onNext: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Contact Information</h2>
        <ContactInfoForm />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-medium">Shipping Address</h2>
        <ShippingAddressForm />
      </div>

      <div className="flex justify-between pt-4">
        <Link href="/cart">
          <Button variant="outline" className="gap-2">
            <ChevronLeft className="h-4 w-4" />
            Return to cart
          </Button>
        </Link>
        <Button onClick={onNext}>Continue to Shipping</Button>
      </div>
    </div>
  );
};

export default InformationStep;
