import { forwardRef } from "react";
import Radio from "./Radio";
import type { RadioColor, RadioSize, RadioVariant } from "./types";

export type RadioInputVariant = RadioVariant | "native";

export type RadioInputProps = {
	size?: RadioSize;
	color?: RadioColor;
	variant?: RadioInputVariant;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "color" | "type">;

export const defaults = {
	variant: "solid" as RadioInputVariant,
};

const RadioInput = forwardRef<HTMLInputElement, RadioInputProps>((props, ref) => {
	const { size, color, variant, checked, defaultChecked, className, ...inputProps } = { ...defaults, ...props };

	if (variant === "native") {
		const sizeClass =
			size === "small"
				? "juno-radio-native-sm"
				: size === "large"
					? "juno-radio-native-lg"
					: size === "medium"
						? "juno-radio-native-md"
						: "";
		const classes = ["juno-radio-native", sizeClass, className].filter(Boolean).join(" ");
		return (
			<input
				{...inputProps}
				ref={ref}
				type="radio"
				className={classes}
				checked={checked}
				defaultChecked={defaultChecked}
			/>
		);
	}

	// For controlled mode, pass checked to Radio for the class-based styling
	// For uncontrolled mode, CSS :has(:checked) handles the visual
	const isControlled = checked !== undefined;

	return (
		<Radio
			size={size}
			color={color}
			variant={variant}
			checked={isControlled ? checked : undefined}
			className={className}
		>
			<input
				{...inputProps}
				ref={ref}
				type="radio"
				className="juno-radio-input"
				checked={checked}
				defaultChecked={defaultChecked}
			/>
		</Radio>
	);
});

const RadioInputWithDefaults = RadioInput as typeof RadioInput & {
	defaults: typeof defaults;
};
RadioInputWithDefaults.defaults = defaults;

export default RadioInputWithDefaults;
