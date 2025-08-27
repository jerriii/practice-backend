"use client";

import React, { ReactNode } from "react";
import { Search } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PaginationControls } from "@/components/PaginationControls";
import { ErrorState } from "@/components/ErrorState";
import TableSkeleton from "./table-skeleton";

export type StatusOption = { value: string; label: string };

interface DataTableCardProps {
  title: string;
  icon: ReactNode;
  description?: string;
  searchTerm: string;
  setSearchTerm: (v: string) => void;
  statusFilter: string;
  setStatusFilter: (v: string) => void;
  statusOptions: StatusOption[];
  limit: number;
  setLimit: (v: number) => void;
  page: number;
  setPage: (v: number) => void;
  totalData: number;
  totalPages: number;
  columns: ReactNode[];
  renderRows: () => ReactNode;
  isLoading?: boolean;
  error?: unknown;
  onRetry?: () => void;
}

export default function DataTableCard(props: DataTableCardProps) {
  const {
    title,
    icon,
    description,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    statusOptions,
    limit,
    setLimit,
    page,
    setPage,
    totalData,
    totalPages,
    columns,
    renderRows,
    isLoading,
    onRetry,
    error,
  } = props;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {title}
        </CardTitle>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center flex-wrap justify-between gap-4 mb-4 px-6">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Search
            id="search"
            name="search"
            className="h-4 w-4 text-muted-foreground"
          />
          <Input
            id="search"
            name="search"
            placeholder={`Search ${title.toLowerCase()}...`}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="max-w-sm"
          />
        </div>

        <div className="flex items-center flex-wrap space-x-4 gap-4 w-full sm:w-auto">
          {statusOptions.length > 0 && (
            <Select
              value={statusFilter}
              onValueChange={(v) => {
                setStatusFilter(v);
                setPage(1);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          <Select
            value={limit.toString()}
            onValueChange={(v) => {
              setLimit(Number(v));
              setPage(1);
            }}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue>{limit} items per page</SelectValue>
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((n) => (
                <SelectItem key={n} value={n.toString()}>
                  {n}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <CardContent>
        {/* Table */}
        {error ? (
          <ErrorState onRetry={onRetry} />
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>{columns}</TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableSkeleton columns={columns.length} rows={6} />
                ) : (
                  renderRows()
                )}
              </TableBody>
            </Table>

            {/* Pagination */}
            {totalPages > 0 && (
              <div className="mt-4">
                <div className="text-sm text-muted-foreground mb-2">
                  Showing{" "}
                  <strong>
                    {(page - 1) * limit + 1}-{Math.min(page * limit, totalData)}
                  </strong>{" "}
                  of <strong>{totalData}</strong> {title.toLowerCase()}
                </div>
                <PaginationControls
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={setPage}
                />
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
