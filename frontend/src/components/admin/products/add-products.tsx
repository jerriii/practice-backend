import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useEffect, useState } from "react";

export default function AddProducts({
  isAddDialogOpen,
  setIsAddDialogOpen,
}: {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
}) {
  const categories = [
    "Electronics",
    "Fashion",
    "Home & Garden",
    "Sports",
    "Books",
  ];
  const subcategories = [
    "Smartphones",
    "Laptops",
    "Men's Clothing",
    "Women's Clothing",
    "Kitchen Appliances",
  ];
  const statusOptions = ["Active", "Draft", "Archived"];
  const materialOptions = [
    "Wood",
    "Metal",
    "Ceramic",
    "Glass",
    "Fabric",
    "Leather",
  ];
  const [sellingPrice, setSellingPrice] = useState<string>("");
  const [originalPrice, setOriginalPrice] = useState<string>("");
  const [discountPercentage, setDiscountPercentage] = useState<string>("");

  // Update selling price whenever original price or discount changes
  useEffect(() => {
    // Clear selling price if both inputs are empty
    if (originalPrice === "" && discountPercentage === "") {
      setSellingPrice("");
      return;
    }
  
    const original = parseFloat(originalPrice);
    const discount = parseFloat(discountPercentage);
  
    // Only calculate if we have valid numbers
    if (!isNaN(original)) {
      if (!isNaN(discount)) {
        // Both original price and discount exist
        const discountedPrice = original - (original * discount / 100);
        setSellingPrice(discountedPrice.toFixed(2));
      } else {
        // Only original price exists
        setSellingPrice(original.toFixed(2));
      }
    } else {
      // Invalid original price
      setSellingPrice("");
    }
  }, [originalPrice, discountPercentage]);

  // Handle original price change (only numbers and decimals)
  const handleOriginalPriceChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setOriginalPrice(value);
    }
  };

  // Handle discount percentage change
  const handleDiscountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only numbers 0-100 with up to 2 decimal places
    if (/^(100(\.0{0,2})?|\d{0,2}(\.\d{0,2})?)$/.test(value) || value === "") {
      setDiscountPercentage(value);
    }
  };

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="dark max-w-2xl max-h-[calc(100vh-10rem)] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogDescription>
            Create a new product for your store.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input id="name" placeholder="Enter product name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="price">Original Price</Label>
              <Input
                id="price"
                placeholder="$0.00"
                type="text"
                value={originalPrice}
                onChange={handleOriginalPriceChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="oldPrice">Selling Price</Label>
              <Input
                id="oldPrice"
                placeholder="$0.00"
                type="text"
                readOnly
                value={sellingPrice}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="discount">Discount %</Label>
              <Input
                id="discount"
                placeholder="0%"
                type="text"
                value={discountPercentage}
                onChange={handleDiscountChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category.toLowerCase()}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subcategory">SubCategory</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select subcategory" />
                </SelectTrigger>
                <SelectContent>
                  {subcategories.map((subcategory) => (
                    <SelectItem
                      key={subcategory}
                      value={subcategory.toLowerCase()}
                    >
                      {subcategory}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="stock">Stock Quantity</Label>
              <Input id="stock" type="number" placeholder="0" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((status) => (
                    <SelectItem key={status} value={status.toLowerCase()}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="rating">Rating (optional)</Label>
              <Input
                id="rating"
                type="number"
                placeholder="0-5"
                min="0"
                max="5"
                step="0.1"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="reviews">Reviews Count (optional)</Label>
              <Input id="reviews" type="number" placeholder="0" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter product description"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="materials">Materials</Label>
            <div className="flex flex-wrap gap-2">
              {materialOptions.map((material) => (
                <div key={material} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`material-${material}`}
                    value={material}
                  />
                  <Label htmlFor={`material-${material}`}>{material}</Label>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="artisan-name">Artisan Name</Label>
              <Input id="artisan-name" placeholder="Artisan name" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="artisan-location">Artisan Location</Label>
              <Input id="artisan-location" placeholder="Artisan location" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="featuredImage">Featured Image URL</Label>
            <Input
              id="featuredImage"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additionalImages">
              Additional Image URLs (one per line)
            </Label>
            <Textarea
              id="additionalImages"
              placeholder="https://example.com/image1.jpg\nhttps://example.com/image2.jpg"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="icon">Icon URL (optional)</Label>
            <Input id="icon" placeholder="https://example.com/icon.svg" />
          </div>

          <div className="flex items-center space-x-2">
            <Switch id="isFeatured" />
            <Label htmlFor="isFeatured">Featured Product</Label>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsAddDialogOpen(false)}>
            Create Product
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
