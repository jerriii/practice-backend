import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface OrderSummaryProps {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  clearCart: () => void; // Function to clear the cart
}

export default function OrderSummary({
  subtotal,
  shipping,
  tax,
  total,
  clearCart,
}: OrderSummaryProps) {
  return (
    <div className="lg:col-span-1">
      <Card>
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4 p-6 pt-0">
          <div className="flex gap-2">
            <Input placeholder="Discount code" className="flex-1" />
            <Button variant="outline">Apply</Button>
          </div>
          <Link href="/checkout" className="w-full">
            <Button className="w-full">Proceed to Checkout</Button>
          </Link>
          {/* Add a button to clear the cart */}
          <Button variant="outline" onClick={clearCart} className="mt-4">
            Clear Cart
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
