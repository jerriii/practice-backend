"use client";

import { useReducer } from "react";
import { Edit, Trash2, Tags } from "lucide-react";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
import AdminDashboardLayout from "../dashboard/admin-dashboard-layout";
import { AddSubCategory } from "./add-subcategory";
import DataTableCard, { StatusOption } from "@/components/data-table-card";
import { useDebounce } from "@/hooks/useDebounce";
import { ISubCategory } from "@/types/subcategories";
import {
  useDeleteSubCategory,
  useGetSubCategories,
} from "@/hooks/SubCategories";
import EditSubCategories from "./edit-subcategories";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const columns = [
  <TableHead key="name">Name</TableHead>,
  <TableHead key="category">Category</TableHead>,
  <TableHead key="description">Description</TableHead>,
  <TableHead key="products">Products</TableHead>,
  <TableHead key="status">Status</TableHead>,
  <TableHead key="actions" className="text-right">
    Actions
  </TableHead>,
];

interface SubCategoryState {
  searchTerm: string;
  isAddDialogOpen: boolean;
  isEditDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  page: number;
  limit: number;
  statusFilter: string;
  selectedCategory: ISubCategory | null;
  categoryToDelete: string | null;
}

const initialState: SubCategoryState = {
  searchTerm: "",
  isAddDialogOpen: false,
  isEditDialogOpen: false,
  isDeleteDialogOpen: false,
  page: 1,
  limit: 10,
  statusFilter: "all",
  selectedCategory: null,
  categoryToDelete: null,
};

const statusOptions: StatusOption[] = [
  { value: "all", label: "All Status" },
  { value: "true", label: "Active" },
  { value: "false", label: "Inactive" },
];

type SubCategoryAction =
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "TOGGLE_ADD_DIALOG"; payload?: boolean }
  | { type: "TOGGLE_EDIT_DIALOG"; payload?: boolean }
  | { type: "TOGGLE_DELETE_DIALOG"; payload: boolean }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_LIMIT"; payload: number }
  | { type: "SET_STATUS_FILTER"; payload: string }
  | { type: "SET_SELECTED_SUB_CATEGORY"; payload: ISubCategory }
  | { type: "SET_SUB_CATEGORY_TO_DELETE"; payload: string | null };

const reducer = (
  state: SubCategoryState,
  action: SubCategoryAction
): SubCategoryState => {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "TOGGLE_ADD_DIALOG":
      return { ...state, isAddDialogOpen: !state.isAddDialogOpen };
    case "TOGGLE_EDIT_DIALOG":
      return { ...state, isEditDialogOpen: !state.isEditDialogOpen };
    case "TOGGLE_DELETE_DIALOG":
      return { ...state, isDeleteDialogOpen: action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_LIMIT":
      return { ...state, limit: action.payload };
    case "SET_STATUS_FILTER":
      return { ...state, statusFilter: action.payload };
    case "SET_SELECTED_SUB_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "SET_SUB_CATEGORY_TO_DELETE":
      return { ...state, categoryToDelete: action.payload };
    default:
      return state;
  }
};

export default function SubCategoriesPage() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    searchTerm,
    isAddDialogOpen,
    isEditDialogOpen,
    isDeleteDialogOpen,
    page,
    limit,
    statusFilter,
    selectedCategory,
    categoryToDelete,
  } = state;

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const { data, isLoading, isFetching, error, refetch } = useGetSubCategories({
    page,
    limit,
    search: debouncedSearchTerm,
    isActive: statusFilter === "all" ? "all" : statusFilter,
  });

  const { mutate: deleteSubCategory, isPending: deleteSubCategoryIsPending } =
    useDeleteSubCategory();

  const handleEdit = (value: ISubCategory) => {
    dispatch({ type: "SET_SELECTED_SUB_CATEGORY", payload: value });
    dispatch({ type: "TOGGLE_EDIT_DIALOG", payload: true });
  };

  const handleDeleteClick = (id: string) => {
    dispatch({ type: "SET_SUB_CATEGORY_TO_DELETE", payload: id });
    dispatch({ type: "TOGGLE_DELETE_DIALOG", payload: true });
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;

    try {
      await deleteSubCategory(categoryToDelete);
      dispatch({ type: "SET_SUB_CATEGORY_TO_DELETE", payload: null });
      dispatch({ type: "TOGGLE_DELETE_DIALOG", payload: false });
    } catch (error) {
      console.log("Error deleting subcategory:", error);
    }
  };

  const renderRows = () =>
    data?.data?.length ? (
      data?.data?.map((subcategory: ISubCategory) => (
        <TableRow key={subcategory.id}>
          <TableCell className="font-medium">{subcategory.name}</TableCell>
          <TableCell>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
              {typeof subcategory.categoryId !== "string" &&
                subcategory.categoryId?.name}
            </span>
          </TableCell>
          <TableCell className="text-muted-foreground">
            {subcategory.description}
          </TableCell>
          <TableCell>{subcategory.productCount}</TableCell>
          <TableCell>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                subcategory.isActive
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
              }`}
            >
              {subcategory.isActive ? "Active" : "Inactive"}
            </span>
          </TableCell>
          <TableCell className="text-right">
            <div className="flex items-center justify-end space-x-2">
              <Edit
                className="h-4 w-4 cursor-pointer hover:text-primary"
                onClick={() => {
                  handleEdit(subcategory);
                }}
              />
              <Trash2
                className="h-4 w-4 cursor-pointer text-destructive hover:text-destructive/80"
                onClick={() => {
                  handleDeleteClick(subcategory.id);
                }}
              />
            </div>
          </TableCell>
        </TableRow>
      ))
    ) : (
      <TableRow>
        <TableCell colSpan={6} className="text-center h-24">
          No subcategories found.
        </TableCell>
      </TableRow>
    );

  return (
    <AdminDashboardLayout breadcrumbs={[{ label: "SubCategories" }]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              SubCategories
            </h1>
            <p className="text-muted-foreground">
              Manage your product subcategories
            </p>
          </div>
          <AddSubCategory
            isAddDialogOpen={isAddDialogOpen}
            setIsAddDialogOpen={(open) =>
              dispatch({ type: "TOGGLE_ADD_DIALOG", payload: open })
            }
          />

          {selectedCategory && (
            <EditSubCategories
              isEditDialogOpen={isEditDialogOpen}
              setIsEditDialogOpen={(open: boolean) =>
                dispatch({ type: "TOGGLE_EDIT_DIALOG", payload: open })
              }
              subCategory={selectedCategory}
            />
          )}
        </div>
        <DataTableCard
          title="All SubCategories"
          icon={<Tags className="h-5 w-5" />}
          description="A list of all product subcategories in your store."
          searchTerm={searchTerm}
          setSearchTerm={(v) =>
            dispatch({ type: "SET_SEARCH_TERM", payload: v })
          }
          statusFilter={statusFilter}
          setStatusFilter={(v) =>
            dispatch({ type: "SET_STATUS_FILTER", payload: v })
          }
          statusOptions={statusOptions}
          limit={limit}
          setLimit={(v) => dispatch({ type: "SET_LIMIT", payload: v })}
          page={page}
          setPage={(v) => dispatch({ type: "SET_PAGE", payload: v })}
          totalData={data?.pagination?.totalData || 0}
          totalPages={data?.pagination?.totalPages || 0}
          columns={columns}
          renderRows={renderRows}
          isLoading={isLoading || isFetching}
          error={error}
          onRetry={refetch}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen || deleteSubCategoryIsPending}
        onOpenChange={() => {
          dispatch({ type: "TOGGLE_DELETE_DIALOG", payload: false });
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              category.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleteSubCategoryIsPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteSubCategoryIsPending}
            >
              {deleteSubCategoryIsPending ? "Deleting..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminDashboardLayout>
  );
}
