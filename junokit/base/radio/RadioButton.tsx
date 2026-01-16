import { forwardRef, useId } from "react";
import Radio from "./Radio";
import type { RadioColor, RadioSize, RadioVariant } from "./types";

export type RadioButtonProps = {
	size?: RadioSize;
	color?: RadioColor;
	variant?: RadioVariant;
	label?: React.ReactNode;
	description?: React.ReactNode;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "color" | "type">;

export const defaults = {
	variant: "light" as RadioVariant,
};

const RadioButton = forwardRef<HTMLInputElement, RadioButtonProps>((props, ref) => {
	const { size, color, variant, label, description, className, id, ...inputProps } = { ...defaults, ...props };

	const generatedId = useId();
	const inputId = id || generatedId;

	const sizeClass =
		size === "small"
			? "juno-radio-button-sm"
			: size === "large"
				? "juno-radio-button-lg"
				: size === "medium"
					? "juno-radio-button-md"
					: "";
	const variantClass = variant ? `juno-radio-button-${variant}` : "";
	const colorClass = color ? `juno-radio-button-${color}` : "";

	const classes = ["juno-radio-button", sizeClass, variantClass, colorClass, className].filter(Boolean).join(" ");

	return (
		<label className={classes}>
			<input ref={ref} id={inputId} type="radio" className="juno-radio-button-input" {...inputProps} />
			<Radio size={size} color={color} variant={variant} />
			{(label || description) && (
				<span className="juno-radio-button-content">
					{label && <span className="juno-radio-button-label">{label}</span>}
					{description && <span className="juno-radio-button-description">{description}</span>}
				</span>
			)}
		</label>
	);
});

const RadioButtonWithDefaults = RadioButton as typeof RadioButton & {
	defaults: typeof defaults;
};
RadioButtonWithDefaults.defaults = defaults;

export default RadioButtonWithDefaults;
