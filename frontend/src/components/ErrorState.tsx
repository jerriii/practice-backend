"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
  fullWidth?: boolean;
}

export function ErrorState({
  title = "Error loading content",
  message = "Something went wrong. Please try again.",
  onRetry,
  className = "",
  fullWidth = false,
}: ErrorStateProps) {
  return (
    <div className={`py-8 ${fullWidth ? "col-span-full" : ""} ${className}`}>
      <Alert variant="destructive" className="max-w-md mx-auto">
        <div className="flex items-start gap-3 min-w-max">
          <AlertTriangle className="h-4 w-4 mt-0.5 flex-shrink-0" />
          <div>
            <AlertTitle>{title}</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
            {onRetry && (
              <Button
                variant="outline"
                size="sm"
                className="mt-4 min-w-fit"
                onClick={onRetry}
              >
                Retry
              </Button>
            )}
          </div>
        </div>
      </Alert>
    </div>
  );
}