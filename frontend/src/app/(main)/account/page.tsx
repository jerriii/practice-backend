"use client";

import { useState } from "react";
import Link from 'next/link';

import {
  LogOut,
} from "lucide-react";
import NProgress from 'nprogress';

import { Button } from "@/components/ui/button";
import {
  Card,
  CardFooter,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Order, WishlistItem } from "@/types/about";
import UserProfileHeader from "@/components/account/UserProfileHeader";
import NavigationMenu from "@/components/account/NavigationMenu";
import ProfileTab from "@/components/account/ProfileTab";
import OrdersTab from "@/components/account/OrdersTab";
import AddressesTab from "@/components/account/AddressesTab";
import PaymentTab from "@/components/account/PaymentTab";
import WishlistTab from "@/components/account/WishlistTab";
import SettingsTab from "@/components/account/SettingsTab";

export default function AccountPage() {
  /* State Management */
  const [activeTab, setActiveTab] = useState("profile");
  const router = useRouter();

  return (
    <div className="container py-8 min-w-full lg:px-8 px-4">
      {/* Layout Container */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Section */}
        <div className="md:w-1/4">
          <Card>
            {/* User Profile Header */}
            <UserProfileHeader />

            {/* Navigation Menu */}
            <NavigationMenu activeTab={activeTab} setActiveTab={setActiveTab} />

            {/* Sign Out Button */}
            <CardFooter className="border-t p-4">
              <Button 
                variant="outline" 
                className="w-full gap-2"
                asChild
              >
                <Link href="/login">
                  <span className="flex items-center justify-center gap-2">
                    <LogOut className="h-4 w-4" />
                    Sign Out
                  </span>
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Main Content Section */}
        <div className="md:w-3/4">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <ProfileTab />
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <OrdersTab orders={orders} />
          )}

          {activeTab === "addresses" && (
            <AddressesTab />
          )}

          {activeTab === "payment" && (
            <PaymentTab />
          )}

          {activeTab === "wishlist" && (
            <WishlistTab wishlistItems={wishlistItems} />
          )}

          {activeTab === "settings" && (
            <SettingsTab />
          )}
        </div>
      </div>
    </div>
  );
}

// Sample data
const orders: Order[] = [
  {
    id: 1,
    date: "March 15, 2023",
    status: "Delivered",
    total: 259.98,
    items: 2,
  },
  {
    id: 2,
    date: "February 28, 2023",
    status: "Shipped",
    total: 89.99,
    items: 1,
  },
  {
    id: 3,
    date: "February 15, 2023",
    status: "Processing",
    total: 149.99,
    items: 3,
  },
];

const wishlistItems: WishlistItem[] = [
  {
    id: 1,
    name: "Classic White T-Shirt",
    price: "$29.99",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 2,
    name: "Slim Fit Jeans",
    price: "$59.99",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: 3,
    name: "Leather Jacket",
    price: "$199.99",
    image: "/placeholder.svg?height=200&width=200",
  },
];
