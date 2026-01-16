import { createContext, type RefObject, useContext } from "react";

type PopoverSize = "none" | "small" | "medium" | "large";

type PopoverContextType = {
	open: boolean;
	setOpen: (open: boolean) => void;
	triggerRef: RefObject<HTMLElement>;
	size: PopoverSize;
};

export const PopoverContext = createContext<PopoverContextType | null>(null);

export function usePopover() {
	const context = useContext(PopoverContext);
	if (!context) throw new Error("Popover components must be used within <Popover>");
	return context;
}

export type { PopoverSize };
