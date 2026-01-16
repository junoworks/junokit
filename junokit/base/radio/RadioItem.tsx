import { forwardRef, useId } from "react";
import type { RadioInputProps, RadioInputVariant } from "./RadioInput";
import RadioInput from "./RadioInput";
import type { RadioColor, RadioSize } from "./types";

export type RadioItemProps = {
	size?: RadioSize;
	color?: RadioColor;
	variant?: RadioInputVariant;
	label?: React.ReactNode;
	labelPosition?: "left" | "right";
} & Omit<RadioInputProps, "size" | "color" | "variant">;

export const defaults = {
	variant: "solid" as RadioInputVariant,
	labelPosition: "right" as const,
};

const RadioItem = forwardRef<HTMLInputElement, RadioItemProps>((props, ref) => {
	const { size, color, variant, label, labelPosition, className, id, ...inputProps } = { ...defaults, ...props };

	const generatedId = useId();
	const inputId = id || generatedId;

	const sizeClass =
		size === "small"
			? "juno-radio-item-sm"
			: size === "large"
				? "juno-radio-item-lg"
				: size === "medium"
					? "juno-radio-item-md"
					: "";
	const colorClass = color ? `text-${color}` : "";

	const classes = ["juno-radio-item", sizeClass, colorClass, className].filter(Boolean).join(" ");

	const radioOrder = labelPosition === "left" ? "order-2" : "order-1";
	const labelOrder = labelPosition === "left" ? "order-1" : "order-2";

	return (
		<label className={classes}>
			<RadioInput
				ref={ref}
				id={inputId}
				size={size}
				color={color}
				variant={variant}
				className={radioOrder}
				{...inputProps}
			/>
			{label && <span className={labelOrder}>{label}</span>}
		</label>
	);
});

const RadioItemWithDefaults = RadioItem as typeof RadioItem & {
	defaults: typeof defaults;
};
RadioItemWithDefaults.defaults = defaults;

export default RadioItemWithDefaults;
