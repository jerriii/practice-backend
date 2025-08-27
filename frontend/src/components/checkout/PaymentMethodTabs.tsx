import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { CreditCard } from "lucide-react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Image from "next/image";

const PaymentMethodTabs = () => {
  return (
    <Tabs defaultValue="card" className="w-full">
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="card" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          Credit Card
        </TabsTrigger>
        <TabsTrigger value="paypal">PayPal</TabsTrigger>
        <TabsTrigger value="apple">Apple Pay</TabsTrigger>
      </TabsList>
      <TabsContent value="card" className="space-y-4 pt-4">
        <div className="space-y-2">
          <Label htmlFor="cardNumber">Card Number</Label>
          <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="expiration">Expiration Date</Label>
            <Input id="expiration" placeholder="MM / YY" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cvc">CVC</Label>
            <Input id="cvc" placeholder="123" />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="nameOnCard">Name on Card</Label>
          <Input id="nameOnCard" placeholder="John Doe" />
        </div>
      </TabsContent>
      <TabsContent value="paypal" className="pt-4">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="mb-4">
            You will be redirected to PayPal to complete your purchase securely.
          </p>
          <Image
            src="/placeholder.svg?height=60&width=150"
            width={150}
            height={60}
            alt="PayPal"
            className="mb-4"
          />
        </div>
      </TabsContent>
      <TabsContent value="apple" className="pt-4">
        <div className="flex flex-col items-center justify-center py-8 text-center">
          <p className="mb-4">
            You will be redirected to Apple Pay to complete your purchase
            securely.
          </p>
          <Image
            src="/placeholder.svg?height=60&width=150"
            width={150}
            height={60}
            alt="Apple Pay"
            className="mb-4"
          />
        </div>
      </TabsContent>
    </Tabs>
  );
};

export default PaymentMethodTabs;
