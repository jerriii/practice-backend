"use client";

import { useReducer } from "react";
import { FolderTree, Edit, Trash2 } from "lucide-react";
import { TableCell, TableHead, TableRow } from "@/components/ui/table";
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

import AdminDashboardLayout from "@/components/admin/dashboard/admin-dashboard-layout";
import AddCategories from "./add-category";
import { Category } from "@/types/categories";
import EditCategories from "./edit-categories";
import { truncateText } from "@/lib/utils";
import DataTableCard, { StatusOption } from "../../data-table-card";
import { useDebounce } from "@/hooks/useDebounce";
import { useDeleteCategory, useGetCategories } from "@/hooks/Categories";

// Columns shown in the table
const columns = [
  <TableHead key="name">Name</TableHead>,
  <TableHead key="desc">Description</TableHead>,
  <TableHead key="prod">Products</TableHead>,
  <TableHead key="status">Status</TableHead>,
  <TableHead key="actions" className="text-right">
    Actions
  </TableHead>,
];

type State = {
  searchTerm: string;
  isAddDialogOpen: boolean;
  isEditDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  page: number;
  limit: number;
  statusFilter: string;
  selectedCategory: Category | null;
  categoryToDelete: string | null;
};

type Action =
  | { type: "SET_SEARCH_TERM"; payload: string }
  | { type: "TOGGLE_ADD_DIALOG"; payload: boolean }
  | { type: "TOGGLE_EDIT_DIALOG"; payload: boolean }
  | { type: "TOGGLE_DELETE_DIALOG"; payload: boolean }
  | { type: "SET_PAGE"; payload: number }
  | { type: "SET_LIMIT"; payload: number }
  | { type: "SET_STATUS_FILTER"; payload: string }
  | { type: "SET_SELECTED_CATEGORY"; payload: Category | null }
  | { type: "SET_CATEGORY_TO_DELETE"; payload: string | null };

const initialState: State = {
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

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.payload };
    case "TOGGLE_ADD_DIALOG":
      return { ...state, isAddDialogOpen: action.payload };
    case "TOGGLE_EDIT_DIALOG":
      return { ...state, isEditDialogOpen: action.payload };
    case "TOGGLE_DELETE_DIALOG":
      return { ...state, isDeleteDialogOpen: action.payload };
    case "SET_PAGE":
      return { ...state, page: action.payload };
    case "SET_LIMIT":
      return { ...state, limit: action.payload };
    case "SET_STATUS_FILTER":
      return { ...state, statusFilter: action.payload };
    case "SET_SELECTED_CATEGORY":
      return { ...state, selectedCategory: action.payload };
    case "SET_CATEGORY_TO_DELETE":
      return { ...state, categoryToDelete: action.payload };
    default:
      return state;
  }
}

export default function CategoriesPage() {
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
  const { data, isLoading, error, refetch, isFetching } = useGetCategories({
    page,
    limit,
    search: debouncedSearchTerm,
    isActive: statusFilter === "all" ? "all" : statusFilter,
  });
  const { mutateAsync: deleteCategory, isPending: deleteCategoryPending } =
    useDeleteCategory();

  const handleDeleteClick = (id: string) => {
    dispatch({ type: "SET_CATEGORY_TO_DELETE", payload: id });
    dispatch({ type: "TOGGLE_DELETE_DIALOG", payload: true });
  };

  const handleDelete = async () => {
    if (!categoryToDelete) return;
    try {
      await deleteCategory(categoryToDelete);
      dispatch({ type: "SET_CATEGORY_TO_DELETE", payload: null });
      dispatch({ type: "TOGGLE_DELETE_DIALOG", payload: false });
      refetch();
    } catch (error) {
      console.error("Category deletion failed", error);
    }
  };

  const handleEdit = (category: Category) => {
    dispatch({ type: "TOGGLE_EDIT_DIALOG", payload: true });
    dispatch({ type: "SET_SELECTED_CATEGORY", payload: category });
  };

  const statusOptions: StatusOption[] = [
    { value: "all", label: "All Status" },
    { value: "true", label: "Active" },
    { value: "false", label: "Inactive" },
  ];

  const renderRows = () => {
    if (data?.data?.length) {
      return data.data.map((cat: Category) => (
        <TableRow key={cat.id}>
          <TableCell className="font-medium">{cat.name}</TableCell>

          <TableCell className="text-muted-foreground">
            {truncateText(cat.description)}
          </TableCell>

          <TableCell>{cat.productCount}</TableCell>

          <TableCell>
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                cat.isActive
                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300"
              }`}
            >
              {cat.isActive ? "Active" : "Inactive"}
            </span>
          </TableCell>

          <TableCell className="text-right">
            <div className="flex items-center justify-end space-x-2">
              <Edit
                className="h-4 w-4 cursor-pointer hover:text-primary"
                onClick={() => handleEdit(cat)}
              />
              <Trash2
                className="h-4 w-4 cursor-pointer text-destructive hover:text-destructive/80"
                onClick={() => handleDeleteClick(cat.id)}
              />
            </div>
          </TableCell>
        </TableRow>
      ));
    }

    return [
      <TableRow key="empty">
        <TableCell colSpan={columns.length} className="text-center h-24">
          No categories found
        </TableCell>
      </TableRow>,
    ];
  };

  return (
    <AdminDashboardLayout breadcrumbs={[{ label: "Categories" }]}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Categories</h1>
            <p className="text-muted-foreground">
              Manage your product categories
            </p>
          </div>
          <AddCategories
            isAddDialogOpen={isAddDialogOpen}
            setIsAddDialogOpen={(open) =>
              dispatch({ type: "TOGGLE_ADD_DIALOG", payload: open })
            }
          />
          {selectedCategory && (
            <EditCategories
              isEditDialogOpen={isEditDialogOpen}
              setIsEditDialogOpen={(open) =>
                dispatch({ type: "TOGGLE_EDIT_DIALOG", payload: open })
              }
              category={selectedCategory}
            />
          )}
        </div>
        <DataTableCard
          isLoading={isLoading || isFetching}
          error={error}
          onRetry={refetch}
          title="All Categories"
          icon={<FolderTree className="h-5 w-5" />}
          description="A list of all product categories in your store."
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
          totalData={data?.pagination?.totalData ?? 0}
          totalPages={data?.pagination?.totalPages ?? 0}
          columns={columns}
          renderRows={renderRows}
        />
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog
        open={isDeleteDialogOpen || deleteCategoryPending}
        onOpenChange={() =>
          dispatch({ type: "TOGGLE_DELETE_DIALOG", payload: false })
        }
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
            <AlertDialogCancel disabled={deleteCategoryPending}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleteCategoryPending}
            >
              {deleteCategoryPending ? "Deleting..." : "Confirm"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminDashboardLayout>
  );
}
