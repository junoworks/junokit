import type React from "react";
import { createPortal } from "react-dom";

export type DialogOverlayProps = {
  backdrop?: "none" | "darken" | "blur";
  children?: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const darkBackground = `color-mix(in srgb, black 16%, transparent)`;
const lightBackground = `color-mix(in srgb, black 8%, transparent)`;

export function DialogOverlay(props: DialogOverlayProps) {
  const { backdrop, children, className, style, ...rest } = props;

  // Handle backdrop styles
  const backgroundColor = {
    none: "transparent",
    darken: darkBackground,
    blur: lightBackground,
  }[backdrop ?? "blur"];

  const backdropFilter = backdrop === "blur" ? "blur(2px)" : undefined;

  const overlayClasses = ["!fixed inset-0 flex flex-col", "z-50", "juno-modal-overlay", className].filter(Boolean).join(" ");

  const overlayContent = (
    <div
      {...rest}
      className={overlayClasses}
      style={{
        backgroundColor,
        backdropFilter,
        WebkitBackdropFilter: backdropFilter /* For Safari compatibility */,
        pointerEvents: backdrop === "none" ? "none" : "auto",
        overscrollBehavior: "contain",
        ...style,
      }}
    >
      {children}
    </div>
  );

  // Render into modal-root portal if it exists
  const modalRoot = document.getElementById("modal-root");
  if (modalRoot) {
    return createPortal(overlayContent, modalRoot);
  }

  // Fallback to direct render if modal-root doesn't exist
  return overlayContent;
}
