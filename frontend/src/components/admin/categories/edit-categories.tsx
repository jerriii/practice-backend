"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Category } from "@/types/categories";
import { useEffect, useRef, useReducer } from "react";
import { ApiError } from "@/types";
import { ImageUpload } from "@/components/image-upload";
import { ErrorState } from "@/components/ErrorState";
import { useGetCategoryById, useUpdateCategory } from "@/hooks/Categories";
type FormData = Partial<Category> & { categoryImage?: File | string | null };

const INITIAL_FORM_DATA: FormData = {
  name: "",
  slug: "",
  description: "",
  categoryImage: "",
  isActive: false,
};

const INITIAL_STATE = {
  formData: INITIAL_FORM_DATA,
  errors: {} as Record<string, string>,
};

type Action =
  | {
      type: "FIELD_CHANGE";
      field: string;
      value: string | boolean | File | null;
    }
  | { type: "SET_ERRORS"; errors: Record<string, string> }
  | { type: "RESET" }
  | { type: "SET_FORM_DATA"; payload: FormData };

function reducer(
  state: typeof INITIAL_STATE,
  action: Action
): typeof INITIAL_STATE {
  switch (action.type) {
    case "FIELD_CHANGE":
      return {
        ...state,
        formData: { ...state.formData, [action.field]: action.value },
        errors: { ...state.errors, [action.field]: "" },
      };

    case "SET_ERRORS":
      return { ...state, errors: action.errors };

    case "SET_FORM_DATA":
      return { ...state, formData: action.payload };

    case "RESET":
      return INITIAL_STATE;

    default:
      return state;
  }
}

export default function EditCategories({
  isEditDialogOpen,
  setIsEditDialogOpen,
  category,
}: {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  category: Category;
}) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const abortControllerRef = useRef<AbortController | null>(null);

  const {
    data: getCategoryByIdData,
    isLoading: getCategoryByIdLoading,
    error: getCategoryByIdError,
    refetch: getCategoryByIdRefetch,
  } = useGetCategoryById(category.id, {
    enabled: isEditDialogOpen,
  });

  const {
    mutateAsync: updateCategory,
    isPending: updateCategoryLoading,
    error: updateCategoryError,
  } = useUpdateCategory();

  // Load category data when dialog opens
  useEffect(() => {
    if (isEditDialogOpen) {
      // Create new AbortController when dialog opens
      abortControllerRef.current = new AbortController();

      // Reset form data and fetch fresh data
      dispatch({ type: "RESET" });
      getCategoryByIdRefetch();
    } else {
      // Clean up when dialog closes
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      dispatch({ type: "RESET" });
    }
  }, [isEditDialogOpen, category.id, getCategoryByIdRefetch]);

  // Update form data when API data is loaded
  useEffect(() => {
    if (getCategoryByIdData?.data && isEditDialogOpen) {
      dispatch({
        type: "SET_FORM_DATA",
        payload: getCategoryByIdData.data,
      });
    }
  }, [getCategoryByIdData, isEditDialogOpen]);

  // Handle API errors
  useEffect(() => {
    if (
      updateCategoryError &&
      Array.isArray((updateCategoryError as ApiError)?.details)
    ) {
      const fieldErrors: Record<string, string> = {};
      (updateCategoryError as ApiError)?.details?.forEach(
        (detail: { field: string; message: string }) => {
          fieldErrors[detail.field] = detail.message;
        }
      );
      dispatch({ type: "SET_ERRORS", errors: fieldErrors });
    }
  }, [updateCategoryError]);

  const handleCancel = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    setIsEditDialogOpen(false);
  };

  const handleChange = (
    field: string,
    value: string | boolean | File | null
  ) => {
    dispatch({
      type: "FIELD_CHANGE",
      field,
      value,
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!state.formData.name?.trim())
      newErrors.name = "Category name is required";
    if (!state.formData.slug?.trim()) newErrors.slug = "Slug is required";
    if (!state.formData.categoryImage)
      newErrors.categoryImage = "Image is required";

    dispatch({ type: "SET_ERRORS", errors: newErrors });
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", state.formData.name || "");
    formDataToSend.append("slug", state.formData.slug || "");
    formDataToSend.append("description", state.formData.description || "");
    if (state.formData.categoryImage instanceof File) {
      formDataToSend.append("categoryImage", state.formData.categoryImage);
    }
    formDataToSend.append("isActive", String(state.formData.isActive));

    try {
      await updateCategory({
        id: category.id,
        payload: formDataToSend,
      });
      setIsEditDialogOpen(false);
    } catch (err) {
      console.error("Category update failed", err);
    }
  };

  return (
    <Dialog
      open={isEditDialogOpen}
      onOpenChange={(open) => {
        if (!open) {
          handleCancel();
        }
      }}
    >
      <DialogContent
        className="dark max-h-[calc(100dvh-10rem)] overflow-y-auto"
        onEscapeKeyDown={(e) => e.preventDefault()}
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Update Category</DialogTitle>
          <DialogDescription>
            Update the details for the selected category. Click update when
            you&#39;re done.
          </DialogDescription>
        </DialogHeader>

        {getCategoryByIdError ? (
          <ErrorState
            title="Error loading category"
            message={getCategoryByIdError.message}
            onRetry={getCategoryByIdRefetch}
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Category Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={state.formData.name || ""}
                placeholder={
                  getCategoryByIdLoading ? "Loading..." : "Enter category name"
                }
                onChange={(e) => handleChange("name", e.target.value)}
                disabled={getCategoryByIdLoading}
              />
              {state.errors.name && (
                <p className="text-red-500 text-xs">{state.errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="slug">
                Slug <span className="text-red-500">*</span>
              </Label>
              <Input
                id="slug"
                name="slug"
                value={state.formData.slug || ""}
                placeholder={
                  getCategoryByIdLoading ? "Loading..." : "Enter category slug"
                }
                disabled
              />
              {state.errors.slug && (
                <p className="text-red-500 text-xs">{state.errors.slug}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={state.formData.description || ""}
                aria-describedby="edit-category-description"
                placeholder={
                  getCategoryByIdLoading
                    ? "Loading..."
                    : "Enter category description"
                }
                onChange={(e) => handleChange("description", e.target.value)}
                disabled={getCategoryByIdLoading}
              />
              {state.errors.description && (
                <p className="text-red-500 text-xs">
                  {state.errors.description}
                </p>
              )}
            </div>

            <div
              className={`space-y-2 ${getCategoryByIdLoading ? "opacity-50" : ""}`}
            >
              <ImageUpload
                onChange={(file) => {
                  handleChange("categoryImage", file);
                }}
                error={state.errors.categoryImage}
                label="Image"
                required
                isLoading={getCategoryByIdLoading}
                initialImage={
                  getCategoryByIdData?.data?.categoryImage as string
                }
                disabled={getCategoryByIdLoading}
              />
            </div>

            <div
              className={`flex items-center space-x-2 ${getCategoryByIdLoading ? "opacity-50" : ""}`}
            >
              <Switch
                id="active-status"
                checked={state.formData.isActive || false}
                onCheckedChange={(checked) => handleChange("isActive", checked)}
                disabled={getCategoryByIdLoading}
              />
              <Label htmlFor="active-status">
                {state.formData.isActive ? "Active" : "Inactive"}
              </Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                disabled={getCategoryByIdLoading || updateCategoryLoading}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  updateCategoryLoading ||
                  getCategoryByIdLoading ||
                  !getCategoryByIdData?.data
                }
              >
                {updateCategoryLoading ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
