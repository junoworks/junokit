import { type ReactNode, useEffect, useRef, useState } from "react";
import { PopoverContext, type PopoverSize } from "./PopoverContext";

type PopoverProps = {
	children: ReactNode;
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
	size?: PopoverSize;
};

export function Popover({
	children,
	defaultOpen = false,
	open: controlledOpen,
	onOpenChange,
	size = "medium",
}: PopoverProps) {
	const [internalOpen, setInternalOpen] = useState(defaultOpen);
	const triggerRef = useRef<HTMLElement>(null);

	// Controlled vs uncontrolled
	const isControlled = controlledOpen !== undefined;
	const open = isControlled ? controlledOpen : internalOpen;
	const setOpen = (value: boolean) => {
		if (!isControlled) setInternalOpen(value);
		onOpenChange?.(value);
	};

	// Close on Escape
	useEffect(() => {
		if (!open) return;

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") setOpen(false);
		};

		document.addEventListener("keydown", handleEscape);
		return () => document.removeEventListener("keydown", handleEscape);
	}, [open]);

	return <PopoverContext.Provider value={{ open, setOpen, triggerRef, size }}>{children}</PopoverContext.Provider>;
}
