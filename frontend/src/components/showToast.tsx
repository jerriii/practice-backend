import { toast } from "sonner";
import { CheckCircle, Info, AlertTriangle, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import "../../src/app/globals.css";

export type ToastType = "success" | "info" | "warning" | "error";

const toastStyles = {
  success: {
    progress: "bg-green-600",
    text: "text-green-600",
    border: "border-green-500",
  },
  info: {
    progress: "bg-blue-600",
    text: "text-blue-600",
    border: "border-blue-500",
  },
  warning: {
    progress: "bg-yellow-600",
    text: "text-yellow-600",
    border: "border-yellow-500",
  },
  error: {
    progress: "bg-red-600",
    text: "text-red-600",
    border: "border-red-500",
  },
};

const toastIcons = {
  success: <CheckCircle className={toastStyles.success.text} />,
  info: <Info className={toastStyles.info.text} />,
  warning: <AlertTriangle className={toastStyles.warning.text} />,
  error: <XCircle className={toastStyles.error.text} />,
};

const ToastWithProgress = ({
  type,
  title,
  description,
  duration,
  onDismiss,
}: {
  type: ToastType;
  title: string;
  description?: string;
  duration: number;
  onDismiss: () => void;
}) => {
  const [progress, setProgress] = useState(100);
  const [isPaused, setIsPaused] = useState(false);
  const startTime = useRef(Date.now());
  const elapsedBeforePause = useRef(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (!isPaused) {
      interval = setInterval(() => {
        const elapsed =
          Date.now() - startTime.current + elapsedBeforePause.current;
        const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
        setProgress(remaining);

        if (remaining <= 0) {
          clearInterval(interval);
          onDismiss();
        }
      }, 50);
    }

    return () => clearInterval(interval);
  }, [duration, isPaused, onDismiss]);

  const handleMouseEnter = () => {
    setIsPaused(true);
    elapsedBeforePause.current += Date.now() - startTime.current;
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
    startTime.current = Date.now(); // Reset the start time for the remaining duration
  };

  return (
    <div
      className={`flex items-start gap-3 p-4 rounded-lg shadow-lg border w-80 bg-background toast-container`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {toastIcons[type]}
      <div className="flex-1">
        <h1 className="text-sm font-semibold">{title}</h1>
        {description && <p className="text-xs opacity-90">{description}</p>}
        <div className="w-full rounded-full bg-gray-200 h-1.5 mt-2 fixed bottom-0 left-0 right-0">
          <div
            className={`h-1.5 rounded-full transition-all duration-50 ease-linear origin-left ${toastStyles[type].progress} progress-transformation`}
            style={{ "--progress": `${progress / 100}` } as React.CSSProperties}
          />
        </div>
      </div>
      <button
        className="opacity-70 hover:opacity-100 hover:cursor-pointer"
        onClick={onDismiss}
      >
        ✕
      </button>
    </div>
  );
};

export const showToast = ({
  type = "info",
  title,
  description,
  duration = 5000,
}: {
  type?: ToastType;
  title: string;
  description?: string;
  duration?: number;
}) => {
  toast.custom(
    (t) => (
      <ToastWithProgress
        type={type}
        title={title}
        description={description}
        duration={duration}
        onDismiss={() => toast.dismiss(t)}
      />
    ),
    { duration }
  );
};
