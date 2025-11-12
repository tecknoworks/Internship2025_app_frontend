"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { XIcon } from "lucide-react";

import { cn } from "./utils";

type DialogContextValue = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
};

const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialog(component: string): DialogContextValue {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error(`${component} must be used within <Dialog>`);
  }
  return context;
}

function Dialog(
  { open = false, onOpenChange, children }: React.PropsWithChildren<{
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
  }>,
) {
  return (
    <DialogContext.Provider value={{ open: Boolean(open), onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

function DialogTrigger({ children }: { children: React.ReactNode }) {
  const { onOpenChange } = useDialog("DialogTrigger");

  if (!React.isValidElement(children)) {
    return null;
  }

  const child = children as React.ReactElement<{
    onClick?: (event: React.MouseEvent) => void;
  }>;

  return React.cloneElement(child, {
    onClick: (event: React.MouseEvent) => {
      child.props.onClick?.(event);
      onOpenChange?.(true);
    },
  });
}

function DialogPortal({ children }: { children: React.ReactNode }) {
  const { open } = useDialog("DialogPortal");
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!open || !mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(children, document.body);
}

function DialogOverlay({ className, style, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-dialog-overlay
      className={cn("fixed inset-0 z-[1000]", className)}
      style={{
        backgroundColor: "rgba(12, 10, 29, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        ...style,
      }}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  style,
  ...props
}: React.ComponentProps<"div">) {
  const { open, onOpenChange } = useDialog("DialogContent");
  if (!open) {
    return null;
  }

  const handleClose = React.useCallback(() => {
    onOpenChange?.(false);
  }, [onOpenChange]);

  const contentRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    contentRef.current?.focus({ preventScroll: true });
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, [handleClose]);

  return (
    <DialogPortal>
      <>
        <DialogOverlay onClick={handleClose} />
        <div
          data-dialog-container
          className="pointer-events-none"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 1001,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "min(40px, 6vw)",
            pointerEvents: "none",
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            data-dialog-content
            className={cn(
              "pointer-events-auto relative flex w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl",
              className,
            )}
            style={{
              maxWidth: "520px",
              width: "min(92vw, 520px)",
              maxHeight: "calc(100vh - 80px)",
              overflowY: "auto",
              boxShadow: "0 24px 60px rgba(22, 16, 94, 0.25)",
              pointerEvents: "auto",
              ...style,
            }}
            onClick={(event) => event.stopPropagation()}
            ref={contentRef}
            tabIndex={-1}
            {...props}
          >
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 rounded-full p-1 opacity-70 ring-offset-white transition-all hover:opacity-100 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-slate-950 focus:ring-offset-2 disabled:pointer-events-none"
              style={{ zIndex: 10 }}
              aria-label="Close"
            >
              <XIcon className="h-6 w-6" />
              <span className="sr-only">Close</span>
            </button>
            {children}
          </div>
        </div>
      </>
    </DialogPortal>
  );
}

function DialogClose({
  children,
  onClick,
  ...props
}: React.ComponentProps<"button">) {
  const { onOpenChange } = useDialog("DialogClose");
  return (
    <button
      type="button"
      onClick={(event) => {
        onClick?.(event);
        onOpenChange?.(false);
      }}
      {...props}
    >
      {children}
    </button>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2 className={cn("text-lg font-semibold leading-none", className)} {...props} />
  );
}

function DialogDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
