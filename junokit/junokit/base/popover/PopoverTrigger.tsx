import { cloneElement, isValidElement, type ReactElement } from "react";
import { usePopover } from "./PopoverContext";

type PopoverTriggerProps = {
	children: ReactElement;
};

// Compose multiple refs into one
function composeRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
	return (node: T | null) => {
		refs.forEach((ref) => {
			if (typeof ref === "function") {
				ref(node);
			} else if (ref && typeof ref === "object") {
				(ref as React.MutableRefObject<T | null>).current = node;
			}
		});
	};
}

export function PopoverTrigger({ children }: PopoverTriggerProps) {
	const { open, setOpen, triggerRef } = usePopover();

	if (!isValidElement(children)) {
		return null;
	}

	const childProps = children.props as { onClick?: (e: React.MouseEvent) => void };

	const handleClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		childProps.onClick?.(e);
		setOpen(!open);
	};

	// Merge our triggerRef with child's existing ref
	const childRef = (children as any).ref;
	const composedRef = composeRefs(triggerRef, childRef);

	return cloneElement(children, {
		ref: composedRef,
		onClick: handleClick,
		"aria-expanded": open,
		"aria-haspopup": "dialog",
	} as any);
}
