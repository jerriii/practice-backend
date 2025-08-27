"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ShoppingBag } from "lucide-react";
import CheckoutStepper from "@/components/checkout/CheckoutStepper";
import InformationStep from "@/components/checkout/CheckoutSteps/InformationStep";
import ShippingStep from "@/components/checkout/CheckoutSteps/ShippingStep";
import PaymentStep from "@/components/checkout/CheckoutSteps/PaymentStep";
import OrderSummary from "@/components/checkout/OrderSummary";
import { CartItemType } from "@/types/checkout";

export default function CheckoutPage() {
  const [step, setStep] = useState<"information" | "shipping" | "payment">(
    "information"
  );

  const cartItems: CartItemType[] = [
    {
      id: "1",
      name: "Classic White T-Shirt",
      price: 29.99,
      image: "/placeholder.svg?height=80&width=80",
      quantity: 2,
      size: "M",
      color: "White",
    },
    {
      id: "3",
      name: "Leather Jacket",
      price: 199.99,
      image: "/placeholder.svg?height=80&width=80",
      quantity: 1,
      size: "L",
      color: "Black",
    },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.1; // 10% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="container min-w-full lg:px-8 px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center gap-2">
          <ShoppingBag className="h-6 w-6" />
          <span className="text-lg font-bold">E-Commerce</span>
        </Link>
        <Link
          href="/cart"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          <span className="flex items-center gap-1">
            <ChevronLeft className="h-4 w-4" />
            Return to cart
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="space-y-8">
            <CheckoutStepper step={step} />

            {step === "information" && (
              <InformationStep onNext={() => setStep("shipping")} />
            )}

            {step === "shipping" && (
              <ShippingStep
                shipping={shipping}
                onPrev={() => setStep("information")}
                onNext={() => setStep("payment")}
              />
            )}

            {step === "payment" && (
              <PaymentStep
                shipping={shipping}
                toShipping={() => setStep("shipping")}
                toInformation={() => setStep("information")}
              />
            )}
          </div>
        </div>
        <div className="lg:col-span-1">
          <OrderSummary
            cartItems={cartItems}
            subtotal={subtotal}
            shipping={shipping}
            tax={tax}
            total={total}
          />
        </div>
      </div>
    </div>
  );
}
