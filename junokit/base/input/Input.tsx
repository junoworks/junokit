import { forwardRef } from "react";
import type { InputColor, InputRadius, InputSize, InputVariant } from "./types";

export type InputProps = {
	size?: InputSize;
	variant?: InputVariant;
	color?: InputColor;
	radius?: InputRadius;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">;

const defaults = {
	size: "medium" as const,
	variant: "light" as const,
	color: undefined,
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
	const { size, variant, color, radius, className, ...rest } = { ...defaults, ...props };

	const classes = [
		"juno-input",
		`juno-input-${size}`,
		`juno-input-${variant}`,
		color && `juno-input-color-${color}`,
		radius && `rounded-${radius}`,
		className,
	]
		.filter(Boolean)
		.join(" ");

	return <input {...rest} ref={ref} className={classes} />;
});

const InputWithDefaults = Input as typeof Input & {
	defaults: typeof defaults;
};
InputWithDefaults.defaults = defaults;

export default InputWithDefaults;
