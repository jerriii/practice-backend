"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useEffect, useReducer, useRef } from "react";
import { ApiError } from "@/types";
import { ImageUpload } from "@/components/image-upload";
import { useCreateCategory } from "@/hooks/Categories";

const INITIAL_FORM_DATA = {
  name: "",
  slug: "",
  description: "",
  categoryImage: null as File | null,
  isActive: true,
};

const INITIAL_STATE = {
  formData: INITIAL_FORM_DATA,
  errors: {} as Record<string, string>,
};

type Actions =
  | {
      type: "SET_FORM_DATA";
      field: string;
      value: string | boolean | File | null;
    }
  | { type: "SET_ERRORS"; errors: Record<string, string> }
  | { type: "RESET" };

function reducer(state: typeof INITIAL_STATE, action: Actions) {
  switch (action.type) {
    case "SET_FORM_DATA":
      return {
        ...state,
        formData: { ...state.formData, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: "" },
      };
    case "SET_ERRORS":
      return { ...state, errors: action.errors };
    case "RESET":
      return INITIAL_STATE;
    default:
      return state;
  }
}

export default function AddCategories({
  isAddDialogOpen,
  setIsAddDialogOpen,
}: {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
}) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const fileInputRef = useRef<HTMLInputElement>(null);

  console.log(state.errors);

  const {
    mutateAsync: createCategory,
    isPending,
    error,
    isError,
  } = useCreateCategory();

  const handleCancel = () => {
    dispatch({ type: "RESET" });
    setIsAddDialogOpen(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleChange = (
    field: string,
    value: string | boolean | File | null
  ) => {
    dispatch({
      type: "SET_FORM_DATA",
      field,
      value,
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!state.formData.name.trim())
      newErrors.name = "Category name is required";
    if (!state.formData.slug.trim()) newErrors.slug = "Slug is required";
    if (!state.formData.categoryImage)
      newErrors.categoryImage = "Image is required";

    dispatch({ type: "SET_ERRORS", errors: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    const formDataToSend = new FormData();
    formDataToSend.append("name", state.formData.name);
    formDataToSend.append("slug", state.formData.slug);
    formDataToSend.append("description", state.formData.description);
    formDataToSend.append(
      "categoryImage",
      state.formData.categoryImage as File
    );
    formDataToSend.append("isActive", state.formData.isActive.toString());
    try {
      await createCategory(formDataToSend);
      setIsAddDialogOpen(false);
    } catch (err) {
      console.error("Category creation failed", err);
    }
  };

  // Generate slug when name changes
  useEffect(() => {
    const generatedSlug = state.formData.name
      .toLowerCase()
      .replace(/[^\w\s]/g, "") // Remove special characters
      .trim()
      .replace(/\s+/g, "-"); // Replace spaces with hyphens
    dispatch({
      type: "SET_FORM_DATA",
      field: "slug",
      value: generatedSlug,
    });
  }, [state.formData.name]);

  // Handle API errors
  useEffect(() => {
    console.log("API error:", error);
    console.log("isError:", isError);
    if (isError && Array.isArray((error as ApiError)?.details)) {
      const fieldErrors: Record<string, string> = {};
      (error as ApiError)?.details?.forEach(
        (detail: { field: string; message: string }) => {
          fieldErrors[detail.field] = detail.message;
        }
      );
      dispatch({ type: "SET_ERRORS", errors: fieldErrors });
    }
  }, [error, isError]);

  return (
    <Dialog
      open={isAddDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleCancel(); // Use the centralized cancel handler
        } else {
          setIsAddDialogOpen(true);
          dispatch({ type: "RESET" });
          if (fileInputRef.current) {
            fileInputRef.current.value = "";
          }
        }
      }}
    >
      <DialogTrigger asChild>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Category
        </Button>
      </DialogTrigger>
      <DialogContent
        className="dark max-h-[calc(100dvh-10rem)] overflow-y-auto"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
          <DialogDescription>
            Create a new category for your store.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              Category Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={state.formData.name}
              onChange={(e) => handleChange("name", e.target.value)}
              placeholder="Enter category name"
            />
            {state.errors.name && (
              <p className="text-red-500 text-xs">{state.errors.name}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">
              Slug <span className="text-red-500 text-xs">*</span>
            </Label>
            <Input
              id="slug"
              value={state.formData.slug}
              onChange={(e) => handleChange("slug", e.target.value)}
              placeholder="Enter URL slug (e.g., 'electronics')"
            />
            {state.errors.slug && (
              <p className="text-red-500 text-xs">{state.errors.slug}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={state.formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              placeholder="Enter category description"
              className="break-words"
            />
            {state.errors.description && (
              <p className="text-red-500 text-xs">{state.errors.description}</p>
            )}
          </div>
          <ImageUpload
            onChange={(file) => handleChange("categoryImage", file)}
            error={state.errors.categoryImage}
            label="Image"
            required
          />
          <div className="flex items-center space-x-2">
            <Label htmlFor="isActive">Status</Label>
            <Switch
              id="isActive"
              name="isActive"
              checked={state.formData.isActive}
              onCheckedChange={(checked) => handleChange("isActive", checked)}
            />
            <p className="text-muted-foreground">
              {state.formData.isActive ? "Active" : "Inactive"}
            </p>
            {state.errors.isActive && (
              <p className="text-red-500 text-xs">{state.errors.isActive}</p>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              disabled={isPending}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
