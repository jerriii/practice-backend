import React from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CartItemType } from "@/types/checkout";
import CartItem from "./CartItem";

const OrderSummary = ({
  cartItems,
  subtotal,
  shipping,
  tax,
  total,
}: {
  cartItems: CartItemType[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <Separator />
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>
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
      </CardFooter>
    </Card>
  );
};

export default OrderSummary;
