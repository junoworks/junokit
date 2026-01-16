import { forwardRef, useRef } from "react";
import type { InputColor, InputRadius, InputSize, InputVariant } from "./types";

export type InputBoxProps = {
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

const InputBox = forwardRef<HTMLDivElement, InputBoxProps>((props, forwardedRef) => {
	const { size, variant, color, radius, children, className, onPointerDown, ...rest } = { ...defaults, ...props };

	const internalRef = useRef<HTMLDivElement>(null);
	const ref = (forwardedRef as React.RefObject<HTMLDivElement>) || internalRef;

	const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
		const target = e.target as HTMLElement;
		if (target.closest("input, button, a, textarea, select")) return;

		const input = ref.current?.querySelector<HTMLInputElement | HTMLTextAreaElement>("input, textarea");
		if (!input) return;

		requestAnimationFrame(() => input.focus());
		onPointerDown?.(e);
	};

	const classes = [
		"input-box",
		"juno-input",
		`juno-input-${size}`,
		`juno-input-${variant}`,
		`juno-input-color-${color}`,
		radius && `rounded-${radius}`,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return (
		<div ref={forwardedRef || internalRef} {...rest} className={classes} onPointerDown={handlePointerDown}>
			{children}
		</div>
	);
});

InputBox.displayName = "InputBox";

export default InputBox;
