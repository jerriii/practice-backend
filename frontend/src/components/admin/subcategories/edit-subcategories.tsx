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
import { useEffect, useRef, useReducer, useState } from "react";
import { ApiError } from "@/types";
import { ImageUpload } from "@/components/image-upload";
import { ErrorState } from "@/components/ErrorState";
import { ISubCategory } from "@/types/subcategories";
import {
  useGetSubCategoryById,
  useUpdateSubCategory,
} from "@/hooks/SubCategories";
import { validateForm } from "@/lib/utils";
import { useGetNameValueCategoriesList } from "@/hooks/Categories";
import { IOption, SearchableCombobox } from "@/components/searchable-combobox";
import { useDebounce } from "@/hooks/useDebounce";

type FormData = Partial<ISubCategory>;

const INITIAL_FORM_DATA: FormData = {
  name: "",
  description: "",
  categoryId: "",
  subCategoryImage: "",
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

export default function EditSubCategories({
  isEditDialogOpen,
  setIsEditDialogOpen,
  subCategory,
}: {
  isEditDialogOpen: boolean;
  setIsEditDialogOpen: (open: boolean) => void;
  subCategory: ISubCategory;
}) {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  console.log("form data when updating", state.formData);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const abortControllerRef = useRef<AbortController | null>(null);
  const subCategorySchema = {
    name: { required: true, maxLength: 100 },
    description: { maxLength: 500 },
    categoryId: { required: true },
    subCategoryImage: {
      required: true,
      customValidator: (value: File | null) => {
        if (!value) return "Image is required";
        if (value.size > 5 * 1024 * 1024) {
          return "Image size must be less than 5MB";
        }
        return null;
      },
    },
  };
  const {
    data: getSubCategoryByIdData,
    isLoading: getSubCategoryByIdLoading,
    isFetching: getSubCategoryByIdFetching,
    error: getSubCategoryByIdError,
    refetch: getSubCategoryByIdRefetch,
  } = useGetSubCategoryById(subCategory.id, {
    enabled: isEditDialogOpen,
  });

  console.log(state.formData);

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isFetching: categoriesFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetNameValueCategoriesList(
    {
      limit: 10,
      search: debouncedSearchTerm,
    },
    {
      enabled: isEditDialogOpen,
    }
  );

  const {
    mutateAsync: updateSubCategory,
    isPending: updateSubCategoryLoading,
    error: updateSubCategoryError,
  } = useUpdateSubCategory();

  const categoryOptions =
    categoriesData?.pages?.flatMap((page: { data: IOption[] }) => page.data) ||
    [];

  // Load category data when dialog opens
  useEffect(() => {
    if (isEditDialogOpen) {
      // Create new AbortController when dialog opens
      abortControllerRef.current = new AbortController();

      // Reset form data and fetch fresh data
      dispatch({ type: "RESET" });
      getSubCategoryByIdRefetch();
    } else {
      // Clean up when dialog closes
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      dispatch({ type: "RESET" });
    }
  }, [isEditDialogOpen, subCategory.id, getSubCategoryByIdRefetch]);

  // Update form data when API data is loaded
  useEffect(() => {
    if (getSubCategoryByIdData?.data && isEditDialogOpen) {
      dispatch({
        type: "SET_FORM_DATA",
        payload: {
          ...getSubCategoryByIdData.data,
        },
      });
    }
  }, [getSubCategoryByIdData, isEditDialogOpen]);

  // Handle API errors
  useEffect(() => {
    if (
      updateSubCategoryError &&
      Array.isArray((updateSubCategoryError as ApiError)?.details)
    ) {
      const fieldErrors: Record<string, string> = {};
      (updateSubCategoryError as ApiError)?.details?.forEach(
        (detail: { field: string; message: string }) => {
          fieldErrors[detail.field] = detail.message;
        }
      );
      dispatch({ type: "SET_ERRORS", errors: fieldErrors });
    }
  }, [updateSubCategoryError]);

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

  const validateFormSubmission = () => {
    const { errors, isValid } = validateForm(
      state.formData,
      subCategorySchema,
      {
        name: "SubCategory Name",
        categoryId: "Category",
        subCategoryImage: "Image",
      }
    );
    dispatch({ type: "SET_ERRORS", errors });
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateFormSubmission()) {
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", state.formData.name || "");
    formDataToSend.append(
      "categoryId",
      typeof state.formData.categoryId === "object"
        ? state.formData.categoryId.value.toString()
        : state.formData.categoryId || ""
    );
    formDataToSend.append("description", state.formData.description || "");
    if (state.formData.subCategoryImage instanceof File) {
      formDataToSend.append(
        "subCategoryImage",
        state.formData.subCategoryImage
      );
    }
    formDataToSend.append("isActive", String(state.formData.isActive));

    try {
      await updateSubCategory({
        id: subCategory.id,
        payload: formDataToSend,
      });
      setIsEditDialogOpen(false);
    } catch (err) {
      console.error("SubCategory update failed", err);
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
          <DialogTitle>Update Sub Category</DialogTitle>
          <DialogDescription>
            Update the details for the selected sub category. Click update when
            you&#39;re done.
          </DialogDescription>
        </DialogHeader>

        {getSubCategoryByIdError ? (
          <ErrorState
            title="Error loading Sub Category"
            message={getSubCategoryByIdError.message}
            onRetry={getSubCategoryByIdRefetch}
          />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="category">
                Category <span className="text-red-500">*</span>
              </Label>
              <SearchableCombobox
                options={categoryOptions}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                value={
                  typeof state.formData.categoryId === "object"
                    ? state.formData.categoryId
                    : ""
                }
                onValueChange={(value) => {
                  console.log("value of category", value);
                  handleChange("categoryId", value);
                }}
                placeholder="Select a category"
                emptyMessage="No category found."
                className="w-full"
                disabled={categoriesLoading || categoriesFetching}
                isLoading={categoriesLoading || categoriesFetching}
                isFetching={categoriesFetching}
                hasMore={hasNextPage || false}
                onLoadMore={() => {
                  if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage();
                  }
                }}
                isFetchingNextPage={isFetchingNextPage}
              />
              {state.errors.categoryId && (
                <p className="text-red-500 text-xs">
                  {state.errors.categoryId}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">
                Sub Category Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                name="name"
                value={state.formData.name || ""}
                placeholder={
                  getSubCategoryByIdLoading || getSubCategoryByIdFetching
                    ? "Loading..."
                    : "Enter subcategory name"
                }
                onChange={(e) => handleChange("name", e.target.value)}
                disabled={
                  getSubCategoryByIdLoading || getSubCategoryByIdFetching
                }
              />
              {state.errors.name && (
                <p className="text-red-500 text-xs">{state.errors.name}</p>
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
                  getSubCategoryByIdLoading || getSubCategoryByIdFetching
                    ? "Loading..."
                    : "Enter subcategory description"
                }
                onChange={(e) => handleChange("description", e.target.value)}
                disabled={
                  getSubCategoryByIdLoading || getSubCategoryByIdFetching
                }
              />
              {state.errors.description && (
                <p className="text-red-500 text-xs">
                  {state.errors.description}
                </p>
              )}
            </div>

            <div
              className={`space-y-2 ${getSubCategoryByIdLoading || getSubCategoryByIdFetching ? "opacity-50" : ""}`}
            >
              <ImageUpload
                onChange={(file) => {
                  handleChange("subCategoryImage", file);
                }}
                error={state.errors.subCategoryImage}
                label="Image"
                required
                isLoading={
                  getSubCategoryByIdLoading || getSubCategoryByIdFetching
                }
                initialImage={
                  getSubCategoryByIdData?.data?.subCategoryImage as string
                }
                disabled={
                  getSubCategoryByIdLoading || getSubCategoryByIdFetching
                }
              />
            </div>

            <div
              className={`flex items-center space-x-2 ${getSubCategoryByIdLoading || getSubCategoryByIdFetching ? "opacity-50" : ""}`}
            >
              <Switch
                id="active-status"
                checked={state.formData.isActive || false}
                onCheckedChange={(checked) => handleChange("isActive", checked)}
                disabled={
                  getSubCategoryByIdLoading || getSubCategoryByIdFetching
                }
              />
              <Label htmlFor="active-status">
                {state.formData.isActive ? "Active" : "Inactive"}
              </Label>
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                disabled={getSubCategoryByIdLoading || updateSubCategoryLoading}
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  updateSubCategoryLoading ||
                  getSubCategoryByIdLoading ||
                  getSubCategoryByIdFetching ||
                  categoriesLoading ||
                  categoriesFetching ||
                  !getSubCategoryByIdData?.data
                }
              >
                {updateSubCategoryLoading ? "Updating..." : "Update"}
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}
