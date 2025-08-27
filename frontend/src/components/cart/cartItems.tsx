import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { CartItem } from "@/app/cart/page";

export const CartItems = ({
  item,
  updateQuantity,
  removeItem,
}: {
  item: CartItem;
  updateQuantity: (id: string, newQuantity: number) => void;
  removeItem: (id: string) => void;
}) => {
  return (
    <div className="flex flex-col sm:flex-row">
      <div className="relative h-40 w-full sm:h-auto sm:w-40">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h3 className="font-medium">{item.name}</h3>
            <div className="text-sm text-muted-foreground mt-1">
              <span>Size: {item.size}</span>
              <span className="mx-2">•</span>
              <span>Color: {item.color}</span>
            </div>
            <div className="font-medium mt-2">${item.price.toFixed(2)}</div>
          </div>
          <div className="flex items-center">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-r-none"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              -
            </Button>
            <div className="flex h-8 w-10 items-center justify-center border-y">
              {item.quantity}
            </div>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8 rounded-l-none"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              +
            </Button>
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-muted-foreground"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Remove
          </Button>
          <div className="font-medium">
            ${(item.price * item.quantity).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
