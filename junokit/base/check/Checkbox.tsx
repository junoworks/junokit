import { forwardRef, useState } from "react";
import type { CheckColor, CheckSize, CheckVariant } from "./Check";
import Check from "./Check";

export type { CheckSize, CheckColor, CheckVariant };

export type CheckboxVariant = CheckVariant | "native";

export type CheckboxProps = {
	size?: CheckSize;
	color?: CheckColor;
	variant?: CheckboxVariant;
	indeterminate?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "color">;

export const defaults = {
	variant: "solid" as CheckboxVariant,
};

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>((props, ref) => {
	const { size, color, variant, indeterminate, checked, defaultChecked, className, ...inputProps } = {
		...defaults,
		...props,
	};

	const isControlled = checked !== undefined;
	const [internalChecked, setInternalChecked] = useState(defaultChecked ?? false);
	const isChecked = isControlled ? checked : internalChecked;

	if (variant === "native") {
		const sizeClass =
			size === "small"
				? "juno-checkbox-native-sm"
				: size === "large"
					? "juno-checkbox-native-lg"
					: size === "medium"
						? "juno-checkbox-native-md"
						: "";
		const classes = ["juno-checkbox-native", sizeClass, className].filter(Boolean).join(" ");

		return (
			<input
				{...inputProps}
				ref={ref}
				type="checkbox"
				className={classes}
				checked={checked}
				defaultChecked={defaultChecked}
			/>
		);
	}

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		if (!isControlled) {
			setInternalChecked(event.target.checked);
		}
		props.onChange?.(event);
	};

	return (
		<Check
			size={size}
			color={color}
			variant={variant}
			checked={isChecked}
			indeterminate={indeterminate}
			className={className}
		>
			<input
				{...inputProps}
				onChange={handleChange}
				ref={ref}
				type="checkbox"
				className="juno-check-input"
				checked={checked}
				defaultChecked={defaultChecked}
			/>
		</Check>
	);
});

const CheckboxWithDefaults = Checkbox as typeof Checkbox & {
	defaults: typeof defaults;
};
CheckboxWithDefaults.defaults = defaults;

export default CheckboxWithDefaults;
