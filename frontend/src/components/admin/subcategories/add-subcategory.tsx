import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { ImageUpload } from "@/components/image-upload";
import { IOption, SearchableCombobox } from "@/components/searchable-combobox";
import { validateForm } from "@/lib/utils";
import { ApiError } from "@/types";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetNameValueCategoriesList } from "@/hooks/Categories";
import { useCreateSubCategory } from "@/hooks/SubCategories";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export interface SubCategoryFormData {
  name: string;
  description: string;
  categoryId: string;
  subCategoryImage: File | string | null;
  isActive: boolean;
}

const INITIAL_FORM_DATA: SubCategoryFormData = {
  name: "",
  description: "",
  categoryId: "",
  subCategoryImage: null,
  isActive: true,
};

type FormAction =
  | {
      type: "SET_FORM_DATA";
      field: keyof SubCategoryFormData;
      value: SubCategoryFormData[keyof SubCategoryFormData];
    }
  | { type: "SET_ERRORS"; errors: Record<string, string> }
  | { type: "RESET" };

function formReducer(
  state: { formData: SubCategoryFormData; errors: Record<string, string> },
  action: FormAction
) {
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
      return { formData: INITIAL_FORM_DATA, errors: {} };
    default:
      return state;
  }
}

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

interface AddSubCategoryProps {
  isAddDialogOpen: boolean;
  setIsAddDialogOpen: (open: boolean) => void;
}

export const AddSubCategory = ({
  isAddDialogOpen,
  setIsAddDialogOpen,
}: AddSubCategoryProps) => {
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(formReducer, {
    formData: INITIAL_FORM_DATA,
    errors: {},
  });
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Categories query
  const {
    data: categoriesData,
    isLoading,
    isFetching,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetNameValueCategoriesList(
    {
      limit: 10,
      search: debouncedSearchTerm,
    },
    {
      enabled: isAddDialogOpen,
    }
  );

  const categoryOptions =
    categoriesData?.pages?.flatMap((page: { data: IOption[] }) => page.data) ||
    [];

  // Create subcategory mutation
  const {
    mutateAsync: createSubCategory,
    isPending,
    error,
    isError,
  } = useCreateSubCategory();

  // Handle API errors
  useEffect(() => {
    if (isError && error) {
      const apiError = error as ApiError;
      if (Array.isArray(apiError.details)) {
        const fieldErrors: Record<string, string> = {};
        apiError.details.forEach((detail) => {
          fieldErrors[detail.field] = detail.message;
        });
        dispatch({ type: "SET_ERRORS", errors: fieldErrors });
      }
    }
  }, [error, isError]);

  // Reset form when dialog opens/closes
  useEffect(() => {
    if (isAddDialogOpen) {
      setSearchTerm("");
      dispatch({ type: "RESET" });
    }
  }, [isAddDialogOpen]);

  const handleCancel = useCallback(() => {
    queryClient.cancelQueries({
      queryKey: ["categories", { search: debouncedSearchTerm }],
    });
    setIsAddDialogOpen(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }, [queryClient, debouncedSearchTerm, setIsAddDialogOpen]);

  const handleChange = useCallback(
    (
      field: keyof SubCategoryFormData,
      value: SubCategoryFormData[keyof SubCategoryFormData]
    ) => {
      dispatch({ type: "SET_FORM_DATA", field, value });
    },
    []
  );

  const validateFormSubmission = useCallback(() => {
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
  }, [state.formData]);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!validateFormSubmission()) return;

      const formData = new FormData();
      formData.append("name", state.formData.name);
      formData.append("description", state.formData.description);
      formData.append("categoryId", state.formData.categoryId);
      if (state.formData.subCategoryImage) {
        formData.append("subCategoryImage", state.formData.subCategoryImage);
      }
      formData.append("isActive", String(state.formData.isActive));

      try {
        await createSubCategory(formData);
        setIsAddDialogOpen(false);
      } catch (err) {
        console.error("SubCategory creation failed", err);
      }
    },
    [
      state.formData,
      validateFormSubmission,
      createSubCategory,
      setIsAddDialogOpen,
    ]
  );

  return (
    <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add SubCategory
        </Button>
      </DialogTrigger>
      <DialogContent
        className="max-h-[calc(100dvh-10rem)] overflow-y-auto"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Add New SubCategory</DialogTitle>
          <DialogDescription>
            Create a new product subcategory for your store.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="category">
              Category <span className="text-red-500">*</span>
            </Label>
            <SearchableCombobox
              options={categoryOptions}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              value={state.formData.categoryId}
              onValueChange={(value) => handleChange("categoryId", value)}
              placeholder="Select a category"
              emptyMessage="No category found."
              className="w-full"
              disabled={isPending}
              isLoading={isLoading}
              isFetching={isFetching}
              hasMore={hasNextPage || false}
              onLoadMore={() => {
                if (hasNextPage && !isFetchingNextPage) {
                  fetchNextPage();
                }
              }}
              isFetchingNextPage={isFetchingNextPage}
            />
            {state.errors.categoryId && (
              <p className="text-red-500 text-xs">{state.errors.categoryId}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">
              SubCategory Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              value={state.formData.name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleChange("name", e.target.value)
              }
              placeholder="Enter subcategory name"
            />
            {state.errors.name && (
              <p className="text-red-500 text-xs">{state.errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={state.formData.description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleChange("description", e.target.value)
              }
              placeholder="Enter subcategory description"
            />
            {state.errors.description && (
              <p className="text-red-500 text-xs">{state.errors.description}</p>
            )}
          </div>

          <ImageUpload
            onChange={(file) => handleChange("subCategoryImage", file)}
            error={state.errors.subCategoryImage}
            label="Image"
            required
          />

          <div className="flex items-center space-x-2">
            <Label htmlFor="isActive">Status</Label>
            <Switch
              id="isActive"
              checked={state.formData.isActive}
              onCheckedChange={(checked: boolean) =>
                handleChange("isActive", checked)
              }
            />
            <p className="text-muted-foreground">
              {state.formData.isActive ? "Active" : "Inactive"}
            </p>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Creating..." : "Create SubCategory"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
