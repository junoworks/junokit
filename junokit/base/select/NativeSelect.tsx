import { forwardRef } from "react";
import type { InputColor, InputRadius, InputSize, InputVariant } from "../input/types";

export type NativeSelectProps = {
	size?: InputSize;
	variant?: InputVariant;
	color?: InputColor;
	radius?: InputRadius;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size">;

const defaults = {
	size: "medium" as const,
	variant: "light" as const,
	color: undefined,
};

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>((props, ref) => {
	const { size, variant, color, radius, className, children, ...rest } = { ...defaults, ...props };

	const classes = [
		"juno-select",
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
		<select {...rest} ref={ref} className={classes}>
			{children}
		</select>
	);
});

const NativeSelectWithDefaults = NativeSelect as typeof NativeSelect & {
	defaults: typeof defaults;
};
NativeSelectWithDefaults.defaults = defaults;

export default NativeSelectWithDefaults;
