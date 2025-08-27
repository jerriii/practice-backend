"use client";

import { useState } from "react";
import { Search, Edit, Trash2, Package, Eye } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AdminDashboardLayout from "../dashboard/admin-dashboard-layout";
import AddProducts from "./add-products";
import Image from "next/image";
import { NameValueObject } from "@/types";

interface Products {
  id: number;
  name: string;
  categoryId: NameValueObject;
  subcategoryId: NameValueObject;
  price: string;
  stock: number;
  status: string;
  image: string;
}

// Mock data
const products: Products[] = [
  {
    id: 1,
    name: "iPhone 15 Pro",
    categoryId: { name: "Electronics", value: 1 },
    subcategoryId: { name: "Smartphones", value: 1 },
    price: "$999",
    stock: 45,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 2,
    name: "MacBook Air M2",
    categoryId: { name: "Electronics", value: 1 },
    subcategoryId: { name: "Laptops", value: 2 },
    price: "$1,199",
    stock: 23,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 3,
    name: "Nike Air Max",
    categoryId: { name: "Fashion", value: 2 },
    subcategoryId: { name: "Men's Clothing", value: 3 },
    price: "$129",
    stock: 67,
    status: "Active",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 4,
    name: "Samsung 4K TV",
    categoryId: { name: "Electronics", value: 1 },
    subcategoryId: { name: "TVs", value: 4 },
    price: "$799",
    stock: 12,
    status: "Low Stock",
    image: "/placeholder.svg?height=40&width=40",
  },
  {
    id: 5,
    name: "Coffee Maker",
    categoryId: { name: "Home & Garden", value: 3 },
    subcategoryId: { name: "Kitchen Appliances", value: 5 },
    price: "$89",
    stock: 0,
    status: "Out of Stock",
    image: "/placeholder.svg?height=40&width=40",
  },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.categoryId.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      product.subcategoryId.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "Low Stock":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "Out of Stock":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <AdminDashboardLayout breadcrumbs={[{ label: "Products" }]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Products</h1>
            <p className="text-muted-foreground">
              Manage your product inventory
            </p>
          </div>
          <AddProducts
            isAddDialogOpen={isAddDialogOpen}
            setIsAddDialogOpen={setIsAddDialogOpen}
          />
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              All Products
            </CardTitle>
            <CardDescription>
              A list of all products in your store.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>SubCategory</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Image
                          width={40}
                          height={40}
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="rounded-md object-cover"
                        />
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {product.categoryId.name}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary/50 text-secondary-foreground">
                        {product.subcategoryId.name}
                      </span>
                    </TableCell>
                    <TableCell className="font-medium">
                      {product.price}
                    </TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(product.status)}`}
                      >
                        {product.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminDashboardLayout>
  );
}
