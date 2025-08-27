import { ChevronLeft } from "lucide-react";

const CheckoutStepper = ({
  step,
}: {
  step: "information" | "shipping" | "payment";
}) => {
  return (
    <div className="flex justify-between border-b pb-4">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <div className="flex items-center gap-2">
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full ${step === "information" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
        >
          1
        </span>
        <span className="text-sm">Information</span>
        <ChevronLeft className="h-4 w-4 rotate-180 text-muted-foreground" />
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full ${step === "shipping" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
        >
          2
        </span>
        <span className="text-sm">Shipping</span>
        <ChevronLeft className="h-4 w-4 rotate-180 text-muted-foreground" />
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full ${step === "payment" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`}
        >
          3
        </span>
        <span className="text-sm">Payment</span>
      </div>
    </div>
  );
};

export default CheckoutStepper;
