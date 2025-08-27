"use client";

import * as React from "react";
import { Check, ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface IOption {
  value: string;
  name: string;
}

interface ComboboxProps {
  options: IOption[];
  value: string | { name: string; value: string };
  onValueChange: (value: string) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  disabled?: boolean;
  searchTerm?: string;
  setSearchTerm?: (searchTerm: string) => void;
  isLoading?: boolean;
  isFetching?: boolean;
  isFetchingNextPage?: boolean;
  isError?: boolean;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export function SearchableCombobox({
  options,
  searchTerm,
  setSearchTerm,
  value,
  onValueChange,
  placeholder = "Select option...",
  searchPlaceholder = "Search options...",
  emptyMessage = "No options found.",
  className,
  disabled = false,
  isLoading = false,
  isFetching = false,
  isFetchingNextPage = false,
  isError = false,
  onLoadMore,
  hasMore,
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false);
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const searchInputRef = React.useRef<HTMLInputElement>(null);
  const optionRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const selectedOption = options.find((option) =>
    typeof value === "object" && value !== null
      ? option.value === value.value
      : option.value === value
  );

  const showSearchLoading =
    (isLoading || isFetching) && options.length === 0 && !!searchTerm?.length;

  // Reset highlight when options change
  React.useEffect(() => {
    setHighlightedIndex(-1);
    optionRefs.current = optionRefs.current.slice(0, options.length);
  }, [options]);

  // Autofocus search when dropdown opens
  React.useEffect(() => {
    if (open && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 0);
    }
  }, [open]);

  // Close dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setSearchTerm?.("");
        setHighlightedIndex(-1);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open, setSearchTerm]);

  const scrollToHighlighted = (index: number) => {
    optionRefs.current[index]?.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  };

  const handleButtonClick = () => {
    setOpen((prev) => !prev);
    if (!open) {
      setSearchTerm?.("");
      setHighlightedIndex(-1);
    }
  };

  const handleSelect = (option: IOption) => {
    onValueChange(option.value);
    setOpen(false);
    setSearchTerm?.("");
    setHighlightedIndex(-1);
    buttonRef.current?.focus();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm?.(e.target.value);
    setHighlightedIndex(-1);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        if (options.length > 0) {
          const nextIndex =
            highlightedIndex < options.length - 1 ? highlightedIndex + 1 : 0;
          setHighlightedIndex(nextIndex);
          scrollToHighlighted(nextIndex);
        }
        break;
      case "ArrowUp":
        e.preventDefault();
        if (options.length > 0) {
          const prevIndex =
            highlightedIndex > 0 ? highlightedIndex - 1 : options.length - 1;
          setHighlightedIndex(prevIndex);
          scrollToHighlighted(prevIndex);
        }
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && options[highlightedIndex]) {
          handleSelect(options[highlightedIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setOpen(false);
        setSearchTerm?.("");
        setHighlightedIndex(-1);
        buttonRef.current?.focus();
        break;
    }
  };

  const handleButtonKeyDown = (e: React.KeyboardEvent) => {
    if (["ArrowDown", "ArrowUp", "Enter", " "].includes(e.key)) {
      e.preventDefault();
      setOpen(true);
    }
  };

  // Infinite scroll handler
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    // Calculate how far you've scrolled (in pixels)
    const scrollPosition = target.scrollTop + target.clientHeight;

    const scrollThreshold = target.scrollHeight * 1;

    const isPastScrollThreshold = scrollPosition >= scrollThreshold;
    if (isPastScrollThreshold && hasMore && !isFetchingNextPage && onLoadMore) {
      onLoadMore();
    }
  };

  const getDisplayText = () => {
    if (isLoading) return "Loading...";
    if (isError) return "Error loading data";
    if (selectedOption) return selectedOption.name;
    return placeholder;
  };

  return (
    <div className="relative">
      <Button
        ref={buttonRef}
        type="button"
        variant="outline"
        role="combobox"
        aria-expanded={open}
        aria-haspopup="listbox"
        className={cn("w-full justify-between", className)}
        disabled={disabled || isLoading || isError}
        onClick={handleButtonClick}
        onKeyDown={handleButtonKeyDown}
      >
        <span className="truncate">{getDisplayText()}</span>
        <ChevronDown
          className={cn(
            "ml-2 h-4 w-4 shrink-0 transition-transform",
            open && "rotate-180"
          )}
        />
      </Button>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute top-full z-[9999] mt-1 w-full rounded-md border bg-popover shadow-lg"
          role="listbox"
        >
          {/* Search Input */}
          <div className="flex items-center border-b px-3 py-2">
            <Search className="mr-2 h-4 w-4 shrink-0 text-muted-foreground" />
            <Input
              ref={searchInputRef}
              placeholder={searchPlaceholder}
              value={searchTerm}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              className="border-0 p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
          </div>

          {/* Options List */}
          <div className="max-h-42 overflow-y-auto p-1" onScroll={handleScroll}>
            {showSearchLoading ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                Searching...
              </div>
            ) : options.length === 0 ? (
              <div className="py-6 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </div>
            ) : (
              options.map((option, index) => (
                <div
                  key={option.value}
                  ref={(el) => {
                    optionRefs.current[index] = el;
                  }}
                  className={cn(
                    "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                    selectedOption?.value === option.value &&
                      "bg-accent text-accent-foreground font-medium",
                    highlightedIndex === index &&
                      "bg-accent text-accent-foreground"
                  )}
                  onClick={() => handleSelect(option)}
                  role="option"
                  aria-selected={selectedOption?.value === option.value}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedOption?.value === option.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {option.name}
                </div>
              ))
            )}

            {(isFetchingNextPage || (isFetching && hasMore)) &&
              options.length > 0 && (
                <div className="p-2 text-center text-sm">Loading more...</div>
              )}
          </div>
        </div>
      )}
    </div>
  );
}
