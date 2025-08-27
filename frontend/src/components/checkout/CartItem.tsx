import { CartItemType } from "@/types/checkout";
import Image from "next/image";
import React from "react";

const CartItem = ({ item }: { item: CartItemType }) => {
  return (
    <div key={item.id} className="flex gap-4">
      <div className="relative h-16 w-16 rounded-md overflow-hidden border">
        <Image
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          fill
          className="object-cover"
        />
        <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs w-5 h-5 flex items-center justify-center rounded-full -mt-1 -mr-1">
          {item.quantity}
        </div>
      </div>
      <div className="flex-1">
        <h3 className="font-medium text-sm line-clamp-1">{item.name}</h3>
        <p className="text-xs text-muted-foreground">
          {item.size} / {item.color}
        </p>
      </div>
      <div className="text-sm font-medium">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;
