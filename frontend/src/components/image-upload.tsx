"use client";

import { useState, useRef, useEffect } from "react";
import { X, Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Image from "next/image";

interface ImageUploadProps {
  onChange: (file: File | string | null) => void;
  error?: string;
  isLoading?: boolean;
  label?: string;
  required?: boolean;
  initialImage?: string;
  disabled?: boolean;
}

export function ImageUpload({
  onChange,
  error,
  isLoading = false,
  initialImage,
  label = "Image",
  required = false,
  disabled = false,
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Construct full image URL for display
  const getImageUrl = (imagePath: string | null) => {
    if (!imagePath) return null;

    if (/^https?:\/\/|^blob:/.test(imagePath)) return imagePath;

    const normalizedPath = imagePath.replace(/\\/g, "/");
    const cleanPath = normalizedPath.replace(/^\/+|\/+$/g, "");

    const baseUrl = process.env.NEXT_PUBLIC_IMAGE_BASE_URL?.replace(/\/+$/, "");
    if (!baseUrl) {
      console.error("NEXT_PUBLIC_IMAGE_BASE_URL is not defined");
      return null;
    }

    return `${baseUrl}/${cleanPath}`;
  };

  // Initialize preview
  useEffect(() => {
    if (initialImage) {
      const fullUrl = getImageUrl(initialImage);
      if (fullUrl) {
        setIsImageLoaded(false);
        setPreview(fullUrl);
      } else {
        setPreview(null);
      }
    } else {
      setPreview(null);
    }
  }, [initialImage]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      onChange(null);
      return;
    }

    // Validate file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      onChange(null);
      return;
    }

    // Create preview
    setIsImageLoaded(false);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      onChange(file);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;

    setPreview(null);
    setIsImageLoaded(false);
    onChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleUploadClick = () => {
    if (disabled) return;
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-2">
      <Label>
        {label} {required && <span className="text-red-500 text-xs">*</span>}
      </Label>

      <div className="relative max-w-fit">
        <div
          className={`w-32 h-32 border-2 ${isLoading ? "border-primary" : "border-dashed"} rounded-lg flex items-center justify-center cursor-pointer transition-colors hover:border-primary/50 ${
            error ? "border-red-500" : "border-muted-foreground/25"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleUploadClick}
        >
          {isLoading ? (
            <div className="w-full h-full flex items-center justify-center">
              <Loader2 className="animate-spin h-6 w-6 text-primary" />
            </div>
          ) : preview ? (
            <div className="relative w-full h-full group">
              {!isImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                  <Loader2 className="animate-spin h-6 w-6 text-primary" />
                </div>
              )}
              <Image
                src={preview}
                alt="Preview"
                fill
                className={`object-cover rounded-lg ${
                  isImageLoaded ? "opacity-100" : "opacity-0"
                } transition-opacity`}
                onLoad={() => setIsImageLoaded(true)}
                unoptimized={
                  process.env.NODE_ENV === "development" ||
                  preview.startsWith("blob:")
                }
                onError={() => {
                  setPreview(null);
                  setIsImageLoaded(false);
                }}
              />
              {!disabled && isImageLoaded && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={handleRemove}
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          ) : (
            <div className="text-center">
              <Plus className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">Upload Image</p>
            </div>
          )}
        </div>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        disabled={disabled}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
