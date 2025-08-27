"use client"
import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import Link from "next/link";
import { Input } from "../ui/input";
import { usePathname } from "next/navigation";


const Header = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return pathname === href;
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="container flex h-16 items-center max-w-full lg:px-8 px-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-lg font-bold">
                E-Commerce
              </Link>
              <Link href="/" className={`text-sm font-medium ${isActive('/') ? 'text-primary' : ''}`}>
                Home
              </Link>
              <Link href="/products" className={`text-sm font-medium ${isActive('/products') ? 'text-primary' : ''}`}>
                Products
              </Link>
              <Link href="/categories" className={`text-sm font-medium ${isActive('/categories') ? 'text-primary' : ''}`}>
                Categories
              </Link>
              <Link href="/about" className={`text-sm font-medium ${isActive('/about') ? 'text-primary' : ''}`}>
                About
              </Link>
              <Link href="/contact" className={`text-sm font-medium ${isActive('/contact') ? 'text-primary' : ''}`}>
                Contact
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
        <Link href="/" className="lg:mr-6 flex items-center space-x-2">
          <ShoppingBag className="h-6 w-6" />
          <span className="lg:text-lg text-sm font-bold">E-Commerce</span>
        </Link>
        <nav className="hidden md:flex lg:gap-6 gap-4 justify-center flex-1">
          <Link href="/" className={`text-sm font-medium ${isActive('/') ? 'text-primary' : ''}`}>
            Home
          </Link>
          <Link href="/products" className={`text-sm font-medium ${isActive('/products') ? 'text-primary' : ''}`}>
            Products
          </Link>
          <Link href="/categories" className={`text-sm font-medium ${isActive('/categories') ? 'text-primary' : ''}`}>
            Categories
          </Link>
          <Link href="/about" className={`text-sm font-medium ${isActive('/about') ? 'text-primary' : ''}`}>
            About
          </Link>
          <Link href="/contact" className={`text-sm font-medium ${isActive('/contact') ? 'text-primary' : ''}`}>
            Contact
          </Link>
        </nav>
        <div className="hidden md:flex items-center lg:gap-4 gap-2 ml-auto">
          <form className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full md:w-[180px] lg:w-[300px] pl-8"
            />
          </form>
          <Link href="/account">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                0
              </span>
            </Button>
          </Link>
        </div>
        <div className="flex items-center gap-2 md:hidden ml-auto">
          <Link href="/search">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          </Link>
          <Link href="/account">
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
              <span className="sr-only">Account</span>
            </Button>
          </Link>
          <Link href="/cart">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
                0
              </span>
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
