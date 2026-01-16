import { forwardRef, useRef } from "react";
import type { InputColor, InputRadius, InputSize, InputVariant } from "../input/types";

export type SelectBoxProps = {
	size?: InputSize;
	variant?: InputVariant;
	color?: InputColor;
	radius?: InputRadius;
	children?: React.ReactNode;
	className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "className">;

const defaults = {
	size: "medium" as const,
	variant: "light" as const,
	color: undefined,
};

const SelectBox = forwardRef<HTMLDivElement, SelectBoxProps>((props, forwardedRef) => {
	const { size, variant, color, radius, children, className, onClick, ...rest } = { ...defaults, ...props };

	const internalRef = useRef<HTMLDivElement>(null);

	// Use forwarded ref or internal ref
	const ref = (forwardedRef as React.RefObject<HTMLDivElement>) || internalRef;

	const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
		const target = e.target as HTMLElement;

		// If clicking on button/link, let it handle itself
		if (target.closest("button, a")) return;

		// Try to find and click the native select inside
		const selectEl =
			typeof ref === "object" && ref?.current ? ref.current.querySelector<HTMLSelectElement>("select") : null;

		if (selectEl) {
			selectEl.focus();
			// Some browsers need showPicker for native dropdown
			if ("showPicker" in selectEl) {
				try {
					(selectEl as any).showPicker();
				} catch {
					// showPicker may fail in some contexts, ignore
				}
			}
		}

		// Call custom onClick if provided (for non-native mode)
		onClick?.(e);
	};

	const classes = [
		"select-box",
		"juno-input",
		`juno-input-${size}`,
		`juno-input-${variant}`,
		color && `juno-input-color-${color}`,
		radius && `rounded-${radius}`,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div ref={forwardedRef || internalRef} {...rest} className={classes} onClick={handleClick} tabIndex={0}>
			{children}
		</div>
	);
});

SelectBox.displayName = "SelectBox";

export default SelectBox;
