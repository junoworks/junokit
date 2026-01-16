import type React from "react";
import { forwardRef } from "react";
import { Loader } from "../..";
import type { ButtonColor, ButtonRadius, ButtonSize, ButtonVariant } from "./types";

export type ButtonProps = {
	variant?: ButtonVariant;
	color?: ButtonColor | undefined;

	width?: "fit" | "full"; // may not need this
	size?: ButtonSize;
	radius?: ButtonRadius;
	justify?: "start" | "center" | "end";
	truncate?: boolean;

	disabled?: boolean;
	loading?: boolean;
	inline?: boolean;
	wide?: boolean;

	style?: React.CSSProperties;
	className?: string;
	children?: React.ReactNode;
	as?: "button" | "div";
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement | HTMLDivElement>, "size">;

export const defaults = {
	color: "base" as const,
	variant: "light" as const,
	size: undefined, // will use medium
	width: undefined,
	radius: undefined,
	justify: "center" as const,
	truncate: true,
	disabled: false,
	loading: false,
	inline: false,
	wide: false,
	as: "button" as const,
};

const Button = forwardRef<HTMLButtonElement | HTMLDivElement, ButtonProps>((props, ref) => {
	const {
		children,
		style,
		className,
		width,
		color,
		variant,
		size,
		radius,
		justify,
		truncate,
		disabled,
		loading,
		inline,
		wide,
		as,
		...buttonProps
	} = { ...defaults, ...props };

	const variantStyles = variant ? `juno-button-${variant}` : "";

	const getVariantStyles = (): React.CSSProperties & Record<string, string> => {
		const textColor = variant === "solid" ? "var(--base-0)" : `var(--${color}${variant === "soft" ? "-content" : ""})`;

		const styles: React.CSSProperties & Record<string, string> = {
			"--juno-button-color": `var(--${color})`,
			"--juno-button-text-color": textColor,
			
		};

		if (radius) {
			const radiusMap = {
				none: "0px",
				sm: "var(--border-radius-sm)",
				md: "var(--border-radius-md)",
				lg: "var(--border-radius-lg)",
				xl: "var(--border-radius-xl)",
				full: "9998px",
			};
			styles["--custom-radius"] = radiusMap[radius];
		}

		return styles;
	};

	const buttonClasses = [
		`juno-button`,
		size ? `juno-button-${size}` : undefined,
		inline ? "juno-button-inline" : "",
		wide ? "juno-button-wide" : "",
		radius === "full" ? "juno-prefers-rounded" : "",
	]
		.filter(Boolean)
		.join(" ");

	const widthStyle = width ? "w-" + width : undefined;

	// consider adding pointer-events-none to disabled state
	const classes = [variantStyles, buttonClasses, widthStyle, disabled ? "opacity-50 saturate-50" : "", className]
		.filter(Boolean)
		.join(" ")
		.trim();

	const Component = as === "button" ? "button" : "div";

	return (
		<Component
			{...buttonProps}
			ref={ref as React.Ref<HTMLButtonElement & HTMLDivElement>}
			className={classes}
			style={{ ...getVariantStyles(), ...style }}
			disabled={as === "button" ? disabled : undefined}
			aria-disabled={disabled || undefined}
		>
			{loading && <LoadingState />}
			{children}
		</Component>
	);
});

const ButtonWithDefaults = Button as typeof Button & {
	defaults: typeof defaults;
};
ButtonWithDefaults.defaults = defaults;

export default ButtonWithDefaults;

const LoadingState = () => {
	return <Loader className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 scale-110" data-juno-block />;
};
